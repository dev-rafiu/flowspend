# Claroo — Clerk + Prisma + Neon → Supabase Rewrite Plan

> **Note:** Step 0 of execution is to copy this file's content to `claroo-web/rewriteplan.md` so it lives in the project for ongoing reference.

---

## Context

The project's PRD (`/PRD.md`) specifies **Supabase (Auth + Database) with Row Level Security**. The current codebase uses **Clerk** for auth and **Prisma + Neon Postgres** for data — a stack misaligned with the PRD on three axes: auth provider, ORM, and security model (manual `userId` filtering vs. RLS). The schema also diverges from the PRD: `transactions` is missing the `type` enum and uses a free-form `category` string instead of `category_id` FK; the field `text` should be `note`.

### Confirmed decisions
- **Full PRD alignment** — auth + DB host + schema reshape
- **Drop Prisma entirely**, use `@supabase/supabase-js`
- **Custom auth pages** with `@supabase/ssr`
- **Fresh start** — Neon DB is throwaway dev data

### Outcomes
- Single Supabase project hosts auth + Postgres
- RLS-enforced data isolation (no manual `userId` filtering in app code)
- Schema matches PRD: `users`, `categories`, `transactions(id, user_id, amount, type, category_id, created_at, note)`
- App compiles after each phase

---

## Target architecture

```
claroo-web/
├── src/
│   ├── lib/
│   │   └── supabase/
│   │       ├── server.ts          # createServerClient (cookies)
│   │       ├── client.ts          # createBrowserClient
│   │       ├── middleware.ts      # session refresh helper
│   │       ├── admin.ts           # service-role client (server-only)
│   │       └── database.types.ts  # generated from `supabase gen types`
│   ├── middleware.ts              # rewritten — Supabase session refresh + protected routes
│   ├── app/
│   │   ├── login/page.tsx         # NEW
│   │   ├── signup/page.tsx        # NEW
│   │   └── auth/callback/route.ts # NEW — email confirmation handler
│   └── features/
│       └── auth/
│           ├── actions/
│           │   ├── signIn.ts       # NEW
│           │   ├── signUp.ts       # NEW
│           │   └── signOut.ts      # NEW
│           └── components/         # Header.tsx, Guest.tsx rewritten
└── supabase/
    └── migrations/                # SQL files (replaces prisma/migrations/)
```

### Key design choices

**Schema:** create a `public.profiles` table that 1-to-1 mirrors `auth.users` (FK `id` references `auth.users.id`, cascade delete). All `user_id` columns reference `auth.users.id` directly. A Postgres trigger on `auth.users` insert auto-creates a `profiles` row. This keeps the `users { id, email }` shape PRD describes while leaving auth metadata in `auth.users`.

**Categories:** PRD shows `categories { id, name }` but the current UX requires per-user categories. Keep `user_id` on categories — RLS enforces isolation.

**Transaction sign convention:** `type` enum (`'income' | 'expense'`) is the source of truth. `amount` is **unsigned** (`numeric(12,2) CHECK (amount > 0)`). This matches the PRD exactly and removes ambiguity. Existing analytics code reads sign-of-amount; it will be updated to read `type` + `amount`.

**`category_id`:** nullable FK to allow uncategorized transactions during entry. Server validates if needed.

---

## SQL migration (single file: `supabase/migrations/0001_init.sql`)

```sql
-- Enums
create type transaction_type as enum ('income', 'expense');

-- Profiles (mirrors auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Categories (per-user)
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  type transaction_type not null,
  created_at timestamptz not null default now(),
  unique (user_id, label, type)
);
create index categories_user_id_idx on public.categories(user_id);

-- Transactions
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  type transaction_type not null,
  category_id uuid references public.categories(id) on delete set null,
  note text,
  transaction_date timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index transactions_user_id_idx on public.transactions(user_id);
create index transactions_user_date_idx on public.transactions(user_id, transaction_date desc);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, image_url)
  values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'image_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;

create policy "profiles self read"   on public.profiles   for select using (auth.uid() = id);
create policy "profiles self update" on public.profiles   for update using (auth.uid() = id);

create policy "categories self all"  on public.categories for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "transactions self all" on public.transactions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

---

## Execution phases

Each phase ends with a working build (`npm run build`) and passing tests (`npm run test -- --run`).

### Phase 0 — Setup (no app changes)
- [ ] Copy this plan to `claroo-web/rewriteplan.md`
- [ ] Create Supabase project (dashboard or `supabase init && supabase start` for local)
- [ ] Run the SQL migration above against Supabase (SQL Editor or `supabase db push`)
- [ ] Run `npx supabase gen types typescript --project-id <ref> > src/lib/supabase/database.types.ts`
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_ROLE_KEY=...   # server-only
  ```
- [ ] Remove Clerk env vars, `DATABASE_URL`

### Phase 1 — Install Supabase deps
```
npm install @supabase/supabase-js @supabase/ssr
npm uninstall @clerk/nextjs @prisma/client prisma @prisma/adapter-pg pg @types/pg
```
Create `src/lib/supabase/{server,client,middleware,admin}.ts` (canonical Supabase Next.js SSR snippets — server uses `cookies()` from `next/headers`, client uses `createBrowserClient`, admin uses service role and is never imported from client code).

After this phase the app **will not compile** until Phase 2 — that's expected; the next phase is the bulk rewrite.

### Phase 2 — Auth surface
1. **New middleware** — `src/middleware.ts` calls `updateSession()` from `lib/supabase/middleware.ts`, redirects unauthenticated requests for protected routes (`/dashboard`, `/transactions`, `/analytics`, `/profile`) to `/login`.
2. **Auth pages** — `src/app/login/page.tsx` and `src/app/signup/page.tsx` (server components rendering ShadCN-styled forms that submit to server actions).
3. **Auth actions** — `src/features/auth/actions/{signIn,signUp,signOut}.ts`. `signUp` writes `name` to `user_metadata` so the trigger picks it up.
4. **Email callback** — `src/app/auth/callback/route.ts` exchanges the code for a session.
5. **Layout** — remove `<ClerkProvider>` wrapper from `src/app/layout.tsx`. Supabase doesn't need a provider; clients are created per request.
6. **Replace Clerk UI components:**
   - `LandingHeader.tsx`, `HeroSection.tsx`, `CTASection.tsx` — `<SignInButton>` → `<Link href="/login">` (or `/signup`)
   - `Guest.tsx` — same swap
   - `Header.tsx` — replace `<UserButton>` with custom ShadCN dropdown (avatar from `profiles.image_url`, sign-out via server action form)

### Phase 3 — Server-action rewrite (the bulk of the work)

**Canonical pattern** (replaces the old Clerk + Prisma shape):

```ts
// src/features/transactions/actions/addTransaction.ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function addTransaction(input: {
  amount: number;
  type: "income" | "expense";
  categoryId?: string | null;
  note?: string | null;
  transactionDate?: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      amount: input.amount,
      type: input.type,
      category_id: input.categoryId ?? null,
      note: input.note ?? null,
      transaction_date: input.transactionDate ?? new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath("/transactions");
  return { transaction: data };
}
```

Notes:
- No `auth()` call — RLS uses the JWT from the cookie, and the server client passes it automatically.
- No explicit `user_id` in the insert — set via a DB default or via RLS check; simpler approach is to set it explicitly: `user_id: (await supabase.auth.getUser()).data.user!.id`. RLS still enforces it.
- All field renames: `text` → `note`, free-form `category` string → `category_id`.

**18 actions to rewrite** (apply the same pattern):

Transactions (`src/features/transactions/actions/`):
- `addTransaction.ts` — insert; sign convention change (amount unsigned + type)
- `getTransactions.ts` — `.select()` with filters, range pagination instead of cursor (or keep cursor with `lt` on `created_at`)
- `updateTransaction.ts` — `.update().eq('id', id)`
- `deleteTransaction.ts` — `.delete().eq('id', id)`
- `getRecentTransactions.ts` — `.order('created_at', { ascending: false }).limit(n)`
- `getTransactionCount.ts` — `.select('*', { count: 'exact', head: true })`
- `getKPIs.ts` — sum aggregates; do this via a Postgres view or RPC for simplicity (recommended: create `kpis_for_user` RPC)
- `getUserCategories.ts` — likely deletable; replaced by `getCategories` from the categories feature

Categories (`src/features/categories/actions/`):
- `getCategories.ts` — `.select().order(...)`
- `createCategory.ts` — `.insert().select().single()`; map Postgres error code `23505` to "already exists"
- `deleteCategory.ts` — `.delete().eq('id', id)`

Analytics (`src/features/analytics/actions/`) — these do client-side aggregation today; for cleanliness move to Postgres RPCs:
- `getCategoryBreakdown.ts` → RPC `category_breakdown(period_from, period_to)`
- `getDailySpending.ts` → RPC `daily_spending(period_from, period_to)`
- `getMonthlyTrend.ts` → RPC `monthly_trend(months_back)`
- `getPeriodComparison.ts` → RPC `period_comparison(current_from, current_to, prev_from, prev_to)`
RPCs are defined in a follow-up SQL migration. Each is `security invoker` so RLS still applies.

Profile (`src/features/profile/actions/`):
- `getProfileStats.ts` — same aggregate pattern (or RPC)
- `deleteAccount.ts` — uses `lib/supabase/admin.ts` to call `supabase.auth.admin.deleteUser(userId)`. Cascade on `auth.users` removes profile + categories + transactions automatically.

### Phase 4 — Pages & API routes

**Pages** (5):
- `src/app/page.tsx` — `currentUser()` → `(await createClient()).auth.getUser()`. Redirect logic identical.
- `src/app/dashboard/page.tsx` — same swap. Greeting reads `profiles.name`.
- `src/app/profile/page.tsx` — replaces every `user.firstName / lastName / imageUrl / emailAddresses[0] / createdAt` with the `profiles` row + `auth.users` data. Image fallback if `image_url` null.
- `src/app/transactions/page.tsx` — auth check only; just swap.
- `src/app/analytics/page.tsx` — auth check only; just swap.

**Conditional nav components** (3):
- `ConditionalHeader.tsx`, `ConditionalSidebar.tsx`, `ConditionalBottomNav.tsx` — swap `currentUser()` for `getUser()`.

**API routes** (3):
- `src/app/api/export/transactions/route.ts` — server client + `.select()`.
- `src/app/api/export/transactions/pdf/route.ts` — same; the filename used `firstName`/`lastName` from Clerk; pull from `profiles.name`.
- `src/app/api/import/transactions/route.ts` — server client + `.insert(...)` batch.

**`next.config.ts`:** remove `img.clerk.com` from `remotePatterns`. Add the Supabase storage host if you'll store avatars there later (skip for now).

### Phase 5 — Cleanup

Delete:
- `prisma/` directory
- `prisma.config.ts`
- `src/lib/db.ts`
- `src/generated/` (Prisma output)
- `src/features/auth/lib/checkUser.ts` (trigger handles it now)

`package.json`: confirm Clerk + Prisma + pg deps are gone.

### Phase 6 — Tests

The current `AddTransactionForm.test.tsx` mocks `getCategories` because it transitively imports `@clerk/nextjs/server` (`server-only`). After migration, server actions import the Supabase server client (also `server-only`), so the same mock pattern is required. **Recommendation:** add a global mock in `src/test/setup.ts` for the server-only-importing modules to avoid per-test boilerplate:

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: "test-user" } } }) },
  })),
}));
```

Per-test mocks of specific actions remain (the test mocks `addTransaction` etc. — those stay valid).

---

## Files touched (summary)

**Create (~12):** Supabase clients (4), middleware, login/signup pages, auth callback route, 3 auth actions, supabase migrations directory.

**Rewrite (~33):** every Clerk/Prisma touchpoint identified in the audit — middleware, layout, 5 pages, 3 nav components, 18 server actions, 3 API routes, 5 components with Clerk UI.

**Delete (~6 paths):** `prisma/`, `prisma.config.ts`, `src/lib/db.ts`, `src/generated/`, `src/features/auth/lib/checkUser.ts`.

---

## Verification

Per-phase: `npm run build && npm run test -- --run`.

End-to-end smoke test (manual, after Phase 6):
1. `npm run dev`
2. Visit `/` → see landing
3. `/signup` → create account → email confirmation (or auto-confirm in Supabase dev settings) → land on `/dashboard`
4. Add a category (Food, expense)
5. Add a transaction (amount 12, type expense, category Food, note "lunch")
6. Dashboard shows updated KPIs and recent transactions
7. `/transactions` lists it; edit, delete work
8. `/analytics` shows charts
9. `/profile` → delete account → redirected, account gone from `auth.users`, cascade verified in Supabase Studio
10. Re-signup with same email — works (no leftover rows)

---

## Open questions to resolve mid-execution

- **Local Supabase or hosted?** If local (`supabase start`), `.env.local` points at `localhost`. If hosted, the project ref goes into env. Both are fine; local is faster to iterate.
- **OAuth providers?** PRD doesn't specify. Email/password is the MVP. Adding Google/GitHub later is a one-config change.
- **Pagination shape:** keep cursor-based (`lt` on `created_at`) or switch to `range()`? Cursor is what the UI expects today — keep it.
