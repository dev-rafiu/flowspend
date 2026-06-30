"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import signUp from "../actions/signUp";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Name
        </label>
        <Input id="name" name="name" type="text" autoComplete="name" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
        </label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Password
        </label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={6} />
      </div>

      {state?.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {state.error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
