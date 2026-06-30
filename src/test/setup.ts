import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Stub Supabase server client for component tests. Server actions imported
// transitively pull in `@/lib/supabase/server`, which is `server-only` and
// would otherwise blow up in jsdom.

vi.mock("@/lib/supabase/server", () => {
  const builder = {
    select: vi.fn().mockResolvedValue({ data: [], error: null, count: 0 }),
    insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    update: vi.fn().mockResolvedValue({ data: null, error: null }),
    delete: vi.fn().mockResolvedValue({ data: null, error: null }),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
    returns: vi.fn().mockResolvedValue({ data: [], error: null }),
  };

  return {
    createClient: vi.fn(async () => ({
      from: vi.fn(() => builder),
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: "test-user", email: "test@example.com" } },
          error: null,
        }),
      },
    })),
  };
});
