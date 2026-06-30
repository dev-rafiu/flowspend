"use server";

import { createClient } from "@/lib/supabase/server";
import { AnalyticsPeriod, PeriodComparison } from "../types";
import { getPeriodRange, getPreviousPeriodRange } from "../utils/period";

export default async function getPeriodComparison(
  period: AnalyticsPeriod = "month"
): Promise<{ data?: PeriodComparison; error?: string }> {
  const supabase = await createClient();
  const current = getPeriodRange(period);
  const previous = getPreviousPeriodRange(period);

  const { data, error } = await supabase.rpc("period_comparison", {
    current_from: current.from ? current.from.toISOString() : null,
    current_to: current.to ? current.to.toISOString() : null,
    previous_from: previous.from ? previous.from.toISOString() : null,
    previous_to: previous.to ? previous.to.toISOString() : null,
  });

  if (error) return { error: error.message };

  const row = data?.[0];
  if (!row) return { error: "Failed to load period comparison" };

  return {
    data: {
      current: {
        income: Number(row.current_income),
        expense: Number(row.current_expense),
        net: Number(row.current_net),
      },
      previous: row.has_previous
        ? {
            income: Number(row.previous_income),
            expense: Number(row.previous_expense),
            net: Number(row.previous_net),
          }
        : null,
      hasPrevious: row.has_previous,
    },
  };
}
