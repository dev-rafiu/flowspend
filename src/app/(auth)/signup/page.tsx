import Link from "next/link";
import SignupForm from "@/features/auth/components/SignupForm";
import Logo from "@/components/layout/Logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Logo href="/" />
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Create your account
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Start tracking your flow in seconds
          </p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-slate-900 hover:underline dark:text-slate-50"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
