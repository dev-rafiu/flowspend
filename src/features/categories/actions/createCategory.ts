"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CategoryType } from "../types";

const MAX_LABEL_LENGTH = 40;

interface CreateCategoryInput {
  label: string;
  type: CategoryType;
}

export default async function createCategory(
  input: CreateCategoryInput
): Promise<{ ok?: true; error?: string }> {
  const label = input.label.trim();
  if (!label) return { error: "Label is required" };
  if (label.length > MAX_LABEL_LENGTH) {
    return { error: `Label must be ${MAX_LABEL_LENGTH} characters or fewer` };
  }
  if (input.type !== "expense" && input.type !== "income") {
    return { error: "Invalid category type" };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Not authenticated" };

  const { error } = await supabase.from("categories").insert({
    user_id: userData.user.id,
    label,
    type: input.type,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You already have a category with that name" };
    }
    return { error: error.message };
  }

  revalidatePath("/profile");
  revalidatePath("/transactions");
  return { ok: true };
}
