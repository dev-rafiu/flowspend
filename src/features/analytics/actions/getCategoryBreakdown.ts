"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { AnalyticsPeriod, CategoryBreakdownItem } from "../types";
import { getPeriodRange } from "../utils/period";

export default async function getCategoryBreakdown(
  period: AnalyticsPeriod = "month"
): Promise<{ items?: CategoryBreakdownItem[]; error?: string }> {
  const { userId } = await auth();

  if (!userId) return { error: "User not found" };

  try {
    const { from, to } = getPeriodRange(period);

    const grouped = await db.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        amount: { lt: 0 },
        ...(from && to ? { transactionDate: { gte: from, lte: to } } : {}),
      },
      _sum: { amount: true },
      _count: { _all: true },
    });

    const rows = grouped.map((row) => ({
      category: row.category ?? "other",
      total: Math.abs(row._sum.amount ?? 0),
      count: row._count._all,
    }));

    const grandTotal = rows.reduce((sum, r) => sum + r.total, 0);

    const items: CategoryBreakdownItem[] = rows
      .map((r) => ({
        ...r,
        percentage: grandTotal > 0 ? (r.total / grandTotal) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    return { items };
  } catch {
    return { error: "Failed to load category breakdown" };
  }
}
