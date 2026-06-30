"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export default async function signUp(_prev: { error?: string } | null, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  const origin = (await headers()).get("origin") ?? "";
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name || null },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmations are off in Supabase settings, the session is set immediately.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  redirect("/login?confirm=1");
}
