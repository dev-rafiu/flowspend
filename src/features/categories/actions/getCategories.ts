"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CategoryType, UserCategory } from "../types";

export default async function getCategories(): Promise<{
  categories: UserCategory[];
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { categories: [], error: "User not found" };

  try {
    const rows = await db.category.findMany({
      where: { userId },
      orderBy: [{ type: "asc" }, { label: "asc" }],
      select: { id: true, label: true, type: true },
    });

    return {
      categories: rows.map((r) => ({
        id: r.id,
        label: r.label,
        type: r.type as CategoryType,
      })),
    };
  } catch {
    return { categories: [], error: "Failed to load categories" };
  }
}
