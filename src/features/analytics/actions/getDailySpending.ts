"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { AnalyticsPeriod, DailySpendItem } from "../types";
import { getPeriodRange } from "../utils/period";

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default async function getDailySpending(
  period: AnalyticsPeriod = "month"
): Promise<{ items?: DailySpendItem[]; error?: string }> {
  const { userId } = await auth();

  if (!userId) return { error: "User not found" };

  try {
    let { from, to } = getPeriodRange(period);

    if (!from || !to) {
      const earliest = await db.transaction.findFirst({
        where: { userId },
        orderBy: { transactionDate: "asc" },
        select: { transactionDate: true },
      });
      const today = new Date();
      to = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      from = earliest
        ? new Date(earliest.transactionDate)
        : new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }

    const transactions = await db.transaction.findMany({
      where: {
        userId,
        amount: { lt: 0 },
        transactionDate: { gte: from, lte: to },
      },
      select: { amount: true, transactionDate: true },
    });

    const buckets = new Map<string, DailySpendItem>();

    const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    while (cursor <= end) {
      const key = dateKey(cursor);
      buckets.set(key, {
        date: key,
        dateLabel: cursor.toLocaleString("default", {
          month: "short",
          day: "numeric",
        }),
        expense: 0,
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    for (const t of transactions) {
      const d = new Date(t.transactionDate);
      const key = dateKey(d);
      const bucket = buckets.get(key);
      if (bucket) bucket.expense += Math.abs(t.amount);
    }

    return { items: Array.from(buckets.values()) };
  } catch {
    return { error: "Failed to load daily spending" };
  }
}
