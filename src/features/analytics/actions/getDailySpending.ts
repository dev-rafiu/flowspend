"use server";

import { createClient } from "@/lib/supabase/server";
import { AnalyticsPeriod, DailySpendItem } from "../types";
import { getPeriodRange } from "../utils/period";

export default async function getDailySpending(
  period: AnalyticsPeriod = "month"
): Promise<{ items?: DailySpendItem[]; error?: string }> {
  const supabase = await createClient();
  const { from, to } = getPeriodRange(period);

  const { data, error } = await supabase.rpc("daily_spending", {
    period_from: from ? from.toISOString() : null,
    period_to: to ? to.toISOString() : null,
  });

  if (error) return { error: error.message };

  const items: DailySpendItem[] = (data ?? []).map((row) => {
    // row.day is a date string "YYYY-MM-DD" — parse as UTC to avoid TZ drift.
    const d = new Date(`${row.day}T00:00:00Z`);
    return {
      date: row.day,
      dateLabel: d.toLocaleString("default", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      expense: Number(row.expense),
    };
  });

  return { items };
}
