"use server";

import { Transaction } from "@/generated/client";
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

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = Math.abs(
      transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    );

    const netBalance = income - expense;

    const totalTransactions = transactions.length;

    const averageTransaction =
      totalTransactions > 0
        ? Math.abs(
            transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0) /
              totalTransactions
          )
        : 0;

    // get current month transactions
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyTransactions = transactions.filter((transaction) => {
      const transactionDate = (transaction as Transaction).transactionDate
        ? new Date((transaction as Transaction).transactionDate)
        : new Date(transaction.createdAt);
      return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
    });

    const monthlyIncome = monthlyTransactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const monthlyExpense = Math.abs(
      monthlyTransactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    );

    return {
      kpis: {
        income,
        expense,
        netBalance,
        totalTransactions,
        averageTransaction,
        monthlyIncome,
        monthlyExpense,
      },
    };
  } catch (error) {
    return { error: "Failed to get KPIs: " + error };
  }
}
