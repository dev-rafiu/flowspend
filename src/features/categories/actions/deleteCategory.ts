"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function deleteCategory(
  id: string
): Promise<{ ok?: true; error?: string }> {
  const supabase = await createClient();
  const { error, count } = await supabase
    .from("categories")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) return { error: error.message };
  if (!count) return { error: "Category not found" };

  revalidatePath("/profile");
  revalidatePath("/transactions");
  return { ok: true };
}
