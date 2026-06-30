"use server";

import { createClient } from "@/lib/supabase/server";

export interface ProfileStats {
  totalTransactions: number;
  lifetimeIncome: number;
  lifetimeExpense: number;
  balance: number;
}

export default async function getProfileStats(): Promise<{
  stats?: ProfileStats;
  error?: string;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type")
    .returns<{ amount: number | string; type: "income" | "expense" }[]>();

  if (error) return { error: error.message };

  let lifetimeIncome = 0;
  let lifetimeExpense = 0;
  for (const row of data ?? []) {
    const amount = typeof row.amount === "string" ? parseFloat(row.amount) : row.amount;
    if (row.type === "income") lifetimeIncome += amount;
    else lifetimeExpense += amount;
  }

  return {
    stats: {
      totalTransactions: data?.length ?? 0,
      lifetimeIncome,
      lifetimeExpense,
      balance: lifetimeIncome - lifetimeExpense,
    },
  };
}
