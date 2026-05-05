"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function deleteCategory(
  id: string
): Promise<{ ok?: true; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  try {
    const result = await db.category.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) {
      return { error: "Category not found" };
    }

    revalidatePath("/profile");
    revalidatePath("/transactions");
    return { ok: true };
  } catch {
    return { error: "Failed to delete category" };
  }
}
