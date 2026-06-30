"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function deleteAccount(): Promise<{
  ok?: true;
  error?: string;
}> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: "Not authenticated" };

  try {
    const admin = createAdminClient();
    const { error } = await admin.auth.admin.deleteUser(userData.user.id);
    if (error) return { error: error.message };
    return { ok: true };
  } catch (error) {
    console.error("Account deletion failed:", error);
    return { error: "Failed to delete account. Please try again." };
  }
}
