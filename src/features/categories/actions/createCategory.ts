"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/features/transactions/constants/categories";
import { CategoryType } from "../types";

const MAX_LABEL_LENGTH = 40;

const DEFAULT_LABELS = new Set(
  [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map((c) => c.label.toLowerCase())
);

interface CreateCategoryInput {
  label: string;
  type: CategoryType;
}

export default async function createCategory(
  input: CreateCategoryInput
): Promise<{ ok?: true; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  const label = input.label.trim();
  if (!label) return { error: "Label is required" };
  if (label.length > MAX_LABEL_LENGTH) {
    return { error: `Label must be ${MAX_LABEL_LENGTH} characters or fewer` };
  }
  if (input.type !== "expense" && input.type !== "income") {
    return { error: "Invalid category type" };
  }
  if (DEFAULT_LABELS.has(label.toLowerCase())) {
    return { error: `${label} already exists as a default category` };
  }

  try {
    await db.category.create({
      data: { userId, label, type: input.type },
    });
    revalidatePath("/profile");
    revalidatePath("/transactions");
    return { ok: true };
  } catch (error) {
    console.error("createCategory failed:", error);

    if (error && typeof error === "object" && "code" in error) {
      const code = (error as { code?: string }).code;
      if (code === "P2002") {
        return { error: "You already have a category with that name" };
      }
      if (code === "P2021" || code === "42P01") {
        return {
          error:
            "Categories table missing — run `npx prisma migrate deploy`",
        };
      }
    }

    return { error: "Failed to create category" };
  }
}
