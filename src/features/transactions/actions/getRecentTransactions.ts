"use server";

import { createClient } from "@/lib/supabase/server";
import { mapTransactionRow, TRANSACTION_SELECT, TransactionRow } from "../utils/mapRow";
import type { Transaction } from "../types";

export default async function getRecentTransactions(
  limit: number = 5
): Promise<{ transactions?: Transaction[]; error?: string }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(TRANSACTION_SELECT)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<TransactionRow[]>();

  if (error) return { error: error.message };

  return { transactions: (data ?? []).map(mapTransactionRow) };
}
