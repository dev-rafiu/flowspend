"use server";

import { createClient } from "@/lib/supabase/server";
import { AnalyticsPeriod, CategoryBreakdownItem } from "../types";
import { getPeriodRange } from "../utils/period";

export default async function getCategoryBreakdown(
  period: AnalyticsPeriod = "month"
): Promise<{ items?: CategoryBreakdownItem[]; error?: string }> {
  const supabase = await createClient();
  const { from, to } = getPeriodRange(period);

  const { data, error } = await supabase.rpc("category_breakdown", {
    period_from: from ? from.toISOString() : null,
    period_to: to ? to.toISOString() : null,
  });

  if (error) return { error: error.message };

  const items: CategoryBreakdownItem[] = (data ?? []).map((row) => ({
    category: row.category,
    total: Number(row.total),
    count: Number(row.count),
    percentage: Number(row.percentage),
  }));

  return { items };
}
