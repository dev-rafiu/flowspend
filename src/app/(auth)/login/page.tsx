import Link from "next/link";
import LoginForm from "@/features/auth/components/LoginForm";
import Logo from "@/components/layout/Logo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; confirm?: string; error?: string }>;
}) {
  const { next, confirm, error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Logo href="/" />
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Welcome back
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sign in to keep tracking your flow
          </p>
        </div>

        {confirm === "1" && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            Check your email to confirm your account, then sign in.
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            {error}
          </div>
        )}

        <LoginForm next={next} />

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-slate-900 hover:underline dark:text-slate-50"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
