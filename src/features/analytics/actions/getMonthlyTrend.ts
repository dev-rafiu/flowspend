"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { MonthlyTrendItem } from "../types";

export default async function getMonthlyTrend(
  months: number = 6
): Promise<{ items?: MonthlyTrendItem[]; error?: string }> {
  const { userId } = await auth();

  if (!userId) return { error: "User not found" };

  try {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const transactions = await db.transaction.findMany({
      where: {
        userId,
        transactionDate: { gte: from, lte: to },
      },
      select: { amount: true, transactionDate: true },
    });

    const buckets = new Map<string, MonthlyTrendItem>();

    for (let i = 0; i < months; i++) {
      const d = new Date(
        now.getFullYear(),
        now.getMonth() - (months - 1 - i),
        1
      );
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      buckets.set(key, {
        month: key,
        monthLabel: d.toLocaleString("default", { month: "short" }),
        income: 0,
        expense: 0,
        net: 0,
      });
    }

    for (const t of transactions) {
      const d = new Date(t.transactionDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const bucket = buckets.get(key);
      if (!bucket) continue;
      if (t.amount >= 0) bucket.income += t.amount;
      else bucket.expense += Math.abs(t.amount);
    }

    const items = Array.from(buckets.values()).map((b) => ({
      ...b,
      net: b.income - b.expense,
    }));

    return { items };
  } catch {
    return { error: "Failed to load monthly trend" };
  }
}
