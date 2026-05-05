"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getUserCategories(): Promise<{
  categories?: string[];
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: "User not found" };

  try {
    const rows = await db.transaction.findMany({
      where: { userId, category: { not: null } },
      distinct: ["category"],
      select: { category: true },
    });

    const categories = rows
      .map((r) => r.category)
      .filter((c): c is string => Boolean(c))
      .sort();

    return { categories };
  } catch {
    return { error: "Failed to load categories" };
  }
}
