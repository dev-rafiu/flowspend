"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function deleteAccount(): Promise<{
  ok?: true;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  try {
    await db.transaction.deleteMany({ where: { userId } });
    await db.user.deleteMany({ where: { clerkUserId: userId } });

    const client = await clerkClient();
    await client.users.deleteUser(userId);

    return { ok: true };
  } catch (error) {
    console.error("Account deletion failed:", error);
    return { error: "Failed to delete account. Please try again." };
  }
}
