"use server";

import { createClient } from "@/lib/supabase/server";
import { CategoryType, UserCategory } from "../types";

export default async function getCategories(): Promise<{
  categories: UserCategory[];
  error?: string;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, label, type")
    .order("type", { ascending: true })
    .order("label", { ascending: true })
    .returns<{ id: string; label: string; type: CategoryType }[]>();

  if (error) return { categories: [], error: error.message };

  return {
    categories: (data ?? []).map((r) => ({
      id: r.id,
      label: r.label,
      type: r.type as CategoryType,
    })),
  };
}
