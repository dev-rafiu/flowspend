"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { AnalyticsPeriod, PeriodComparison, PeriodTotals } from "../types";
import { getPeriodRange, getPreviousPeriodRange } from "../utils/period";

async function computeTotals(
  userId: string,
  from: Date | null,
  to: Date | null
): Promise<PeriodTotals> {
  const dateFilter = from && to ? { transactionDate: { gte: from, lte: to } } : {};

  const [incomeAgg, expenseAgg] = await Promise.all([
    db.transaction.aggregate({
      where: { userId, amount: { gt: 0 }, ...dateFilter },
      _sum: { amount: true },
    }),
    db.transaction.aggregate({
      where: { userId, amount: { lt: 0 }, ...dateFilter },
      _sum: { amount: true },
    }),
  ]);

  const income = incomeAgg._sum.amount ?? 0;
  const expense = Math.abs(expenseAgg._sum.amount ?? 0);
  return { income, expense, net: income - expense };
}

export default async function getPeriodComparison(
  period: AnalyticsPeriod = "month"
): Promise<{ data?: PeriodComparison; error?: string }> {
  const { userId } = await auth();

  if (!userId) return { error: "User not found" };

  try {
    const current = getPeriodRange(period);
    const previous = getPreviousPeriodRange(period);

    const [currentTotals, previousTotals] = await Promise.all([
      computeTotals(userId, current.from, current.to),
      previous.from && previous.to
        ? computeTotals(userId, previous.from, previous.to)
        : Promise.resolve(null),
    ]);

    return {
      data: {
        current: currentTotals,
        previous: previousTotals,
        hasPrevious: previousTotals !== null,
      },
    };
  } catch {
    return { error: "Failed to load period comparison" };
  }
}
