"use server";

import { createClient } from "@/lib/supabase/server";

export interface KPIData {
  income: number;
  expense: number;
  netBalance: number;
  totalTransactions: number;
  averageTransaction: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

export default async function getKPIs(): Promise<{
  kpis?: KPIData;
  error?: string;
}> {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  ).toISOString();

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type, transaction_date");

  if (error) return { error: error.message };

  let income = 0;
  let expense = 0;
  let monthlyIncome = 0;
  let monthlyExpense = 0;
  const totalTransactions = data?.length ?? 0;

  for (const row of data ?? []) {
    const amount = typeof row.amount === "string" ? parseFloat(row.amount) : row.amount;
    const isMonthly =
      row.transaction_date >= startOfMonth && row.transaction_date <= endOfMonth;

    if (row.type === "income") {
      income += amount;
      if (isMonthly) monthlyIncome += amount;
    } else {
      expense += amount;
      if (isMonthly) monthlyExpense += amount;
    }
  }

  const grossMovement = income + expense;
  const averageTransaction =
    totalTransactions > 0 ? grossMovement / totalTransactions : 0;

  return {
    kpis: {
      income,
      expense,
      netBalance: income - expense,
      totalTransactions,
      averageTransaction,
      monthlyIncome,
      monthlyExpense,
    },
  };
}
