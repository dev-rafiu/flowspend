"use server";

import { createClient } from "@/lib/supabase/server";
import { mapTransactionRow, TRANSACTION_SELECT, TransactionRow } from "../utils/mapRow";
import type { SortOption, TransactionsPage } from "../types";

interface GetTransactionsParams {
  cursor?: string;
  limit?: number;
  search?: string;
  category?: string; // category_id (uuid) or "all"
  sort?: SortOption;
}

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

const ORDER_BY: Record<SortOption, { column: string; ascending: boolean }> = {
  "date-desc": { column: "transaction_date", ascending: false },
  "date-asc": { column: "transaction_date", ascending: true },
  "amount-desc": { column: "amount", ascending: false },
  "amount-asc": { column: "amount", ascending: true },
  category: { column: "category_id", ascending: true },
};

export default async function getTransactions(
  params: GetTransactionsParams = {}
): Promise<{ page?: TransactionsPage; error?: string }> {
  const supabase = await createClient();

  const limit = Math.min(Math.max(params.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
  const sort = params.sort ?? "date-desc";
  const order = ORDER_BY[sort] ?? ORDER_BY["date-desc"];

  const search = params.search?.trim();
  const category =
    params.category && params.category !== "all" ? params.category : undefined;

  let query = supabase
    .from("transactions")
    .select(TRANSACTION_SELECT)
    .order(order.column, { ascending: order.ascending })
    .order("id", { ascending: order.ascending })
    .limit(limit + 1);

  if (category) query = query.eq("category_id", category);
  if (search) query = query.ilike("note", `%${search}%`);

  if (params.cursor) {
    // Cursor pagination: fetch the cursor row and use its sort key + id
    // as a strict-greater/less-than filter to seek past it.
    const { data: cursorRow } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", params.cursor)
      .single();

    if (cursorRow) {
      const sortValue = (cursorRow as Record<string, unknown>)[order.column];
      const op = order.ascending ? "gt" : "lt";
      query = query.or(
        `${order.column}.${op}.${sortValue},and(${order.column}.eq.${sortValue},id.${op}.${params.cursor})`
      );
    }
  }

  const { data, error } = await query.returns<TransactionRow[]>();
  if (error) return { error: error.message };

  const rows = data ?? [];
  const hasMore = rows.length > limit;
  const trimmed = hasMore ? rows.slice(0, limit) : rows;
  const transactions = trimmed.map(mapTransactionRow);
  const nextCursor = hasMore ? trimmed[trimmed.length - 1].id : null;

  return { page: { transactions, nextCursor } };
}
