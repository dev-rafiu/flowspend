"use server";

import { Transaction } from "../types/Transaction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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
