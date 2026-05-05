"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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
  const { userId } = await auth();

  if (!userId) return { error: "User not found" };

  try {
    const [count, incomeAgg, expenseAgg] = await Promise.all([
      db.transaction.count({ where: { userId } }),
      db.transaction.aggregate({
        where: { userId, amount: { gt: 0 } },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: { userId, amount: { lt: 0 } },
        _sum: { amount: true },
      }),
    ]);

    const lifetimeIncome = incomeAgg._sum.amount ?? 0;
    const lifetimeExpense = Math.abs(expenseAgg._sum.amount ?? 0);

    return {
      stats: {
        totalTransactions: count,
        lifetimeIncome,
        lifetimeExpense,
        balance: lifetimeIncome - lifetimeExpense,
      },
    };
  } catch {
    return { error: "Failed to load profile stats" };
  }
}
