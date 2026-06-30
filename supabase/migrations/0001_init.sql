-- Claroo initial schema
-- Run via Supabase SQL Editor or `supabase db push`

create type transaction_type as enum ('income', 'expense');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  type transaction_type not null,
  created_at timestamptz not null default now(),
  unique (user_id, label, type)
);
create index categories_user_id_idx on public.categories(user_id);

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

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  expense_label text;
  income_label text;
  expense_defaults text[] := array[
    'Food', 'Grocery', 'Bills', 'Subscriptions', 'Transport',
    'Shopping', 'Entertainment', 'Health', 'Education', 'Other'
  ];
  income_defaults text[] := array[
    'Salary', 'Freelance', 'Investment', 'Gift', 'Refund', 'Other'
  ];
begin
  insert into public.profiles (id, email, name, image_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'image_url'
  );

  foreach expense_label in array expense_defaults loop
    insert into public.categories (user_id, label, type)
    values (new.id, expense_label, 'expense')
    on conflict do nothing;
  end loop;

  foreach income_label in array income_defaults loop
    insert into public.categories (user_id, label, type)
    values (new.id, income_label, 'income')
    on conflict do nothing;
  end loop;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;

create policy "profiles self read"   on public.profiles   for select using (auth.uid() = id);
create policy "profiles self update" on public.profiles   for update using (auth.uid() = id);

create policy "categories self all"  on public.categories for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "transactions self all" on public.transactions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
