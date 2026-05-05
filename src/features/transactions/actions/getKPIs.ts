"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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
  const { userId } = await auth();
  if (!userId) return { error: "User not found" };

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const [
      incomeAgg,
      expenseAgg,
      countAgg,
      monthlyIncomeAgg,
      monthlyExpenseAgg,
    ] = await Promise.all([
      db.transaction.aggregate({
        where: { userId, amount: { gt: 0 } },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: { userId, amount: { lt: 0 } },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: { userId },
        _count: { _all: true },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: {
          userId,
          amount: { gt: 0 },
          transactionDate: { gte: startOfMonth, lte: endOfMonth },
        },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: {
          userId,
          amount: { lt: 0 },
          transactionDate: { gte: startOfMonth, lte: endOfMonth },
        },
        _sum: { amount: true },
      }),
    ]);

    const income = incomeAgg._sum.amount ?? 0;
    const expense = Math.abs(expenseAgg._sum.amount ?? 0);
    const totalTransactions = countAgg._count._all;
    const grossMovement = Math.abs(income) + expense;
    const averageTransaction =
      totalTransactions > 0 ? grossMovement / totalTransactions : 0;
    const monthlyIncome = monthlyIncomeAgg._sum.amount ?? 0;
    const monthlyExpense = Math.abs(monthlyExpenseAgg._sum.amount ?? 0);

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
  } catch {
    return { error: "Failed to load KPIs" };
  }
}
