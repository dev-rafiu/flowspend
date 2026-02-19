"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
interface Transaction {
  id: string;
  text: string;
  amount: number;
  category?: string | null;
  userId: string;
  createdAt: Date;
  transactionDate?: Date;
}

export default async function getRecentTransactions(
  limit: number = 5
): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return { transactions };
  } catch (error) {
    return { error: "Failed to get transactions" + error };
  }
}
