"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getTransactionCount(): Promise<{
  count: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { count: 0, error: "User not found" };

  try {
    const count = await db.transaction.count({ where: { userId } });
    return { count };
  } catch {
    return { count: 0, error: "Failed to load count" };
  }
}
