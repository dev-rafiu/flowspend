"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function deleteTransaction(
  id: string
): Promise<{ message?: string; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/transactions");
  return { message: "Transaction deleted successfully" };
}
