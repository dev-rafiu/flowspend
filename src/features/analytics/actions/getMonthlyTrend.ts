"use server";

import { createClient } from "@/lib/supabase/server";
import { MonthlyTrendItem } from "../types";

export default async function getMonthlyTrend(
  months: number = 6
): Promise<{ items?: MonthlyTrendItem[]; error?: string }> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("monthly_trend", {
    months_back: months,
  });

  if (error) return { error: error.message };

  const items: MonthlyTrendItem[] = (data ?? []).map((row) => {
    const d = new Date(`${row.month}T00:00:00Z`);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    return {
      month: key,
      monthLabel: d.toLocaleString("default", {
        month: "short",
        timeZone: "UTC",
      }),
      income: Number(row.income),
      expense: Number(row.expense),
      net: Number(row.net),
    };
  });

  return { items };
}
