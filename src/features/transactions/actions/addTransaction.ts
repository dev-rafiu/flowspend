"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { mapTransactionRow, TRANSACTION_SELECT, TransactionRow } from "../utils/mapRow";
import type { Transaction, TransactionType } from "../types";

export interface AddTransactionInput {
  note: string;
  amount: number;
  type: TransactionType;
  categoryId?: string | null;
  transactionDate?: string;
}

export default async function addTransaction(
  input: AddTransactionInput
): Promise<{ data?: Transaction; error?: string }> {
  if (!input.note?.trim() || !Number.isFinite(input.amount) || input.amount <= 0) {
    return { error: "Missing required fields" };
  }
  if (input.type !== "income" && input.type !== "expense") {
    return { error: "Invalid transaction type" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userData.user.id,
      note: input.note.trim(),
      amount: input.amount,
      type: input.type,
      category_id: input.categoryId ?? null,
      transaction_date: input.transactionDate ?? new Date().toISOString(),
    })
    .select(TRANSACTION_SELECT)
    .single<TransactionRow>();

  if (error || !data) return { error: error?.message ?? "Failed to add transaction" };

  revalidatePath("/");
  revalidatePath("/transactions");
  return { data: mapTransactionRow(data) };
}
