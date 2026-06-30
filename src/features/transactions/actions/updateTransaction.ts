"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { mapTransactionRow, TRANSACTION_SELECT, TransactionRow } from "../utils/mapRow";
import type { Transaction, TransactionType } from "../types";
import type { Database } from "@/lib/supabase/database.types";

type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

export interface UpdateTransactionInput {
  note: string;
  amount: number;
  type: TransactionType;
  categoryId?: string | null;
  transactionDate?: string;
}

export default async function updateTransaction(
  id: string,
  input: UpdateTransactionInput
): Promise<{ data?: Transaction; error?: string }> {
  if (!input.note?.trim() || !Number.isFinite(input.amount) || input.amount <= 0) {
    return { error: "Missing required fields" };
  }
  if (input.type !== "income" && input.type !== "expense") {
    return { error: "Invalid transaction type" };
  }

  const supabase = await createClient();

  const update: TransactionUpdate = {
    note: input.note.trim(),
    amount: input.amount,
    type: input.type,
    category_id: input.categoryId ?? null,
  };
  if (input.transactionDate) update.transaction_date = input.transactionDate;

  const { data, error } = await supabase
    .from("transactions")
    .update(update)
    .eq("id", id)
    .select(TRANSACTION_SELECT)
    .single<TransactionRow>();

  if (error || !data) return { error: error?.message ?? "Failed to update transaction" };

  revalidatePath("/");
  revalidatePath("/transactions");
  return { data: mapTransactionRow(data) };
}
