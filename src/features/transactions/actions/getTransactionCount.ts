"use server";

import { createClient } from "@/lib/supabase/server";

export default async function getTransactionCount(): Promise<{
  count: number;
  error?: string;
}> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true });

  if (error) return { count: 0, error: error.message };
  return { count: count ?? 0 };
}
