import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import KPIs from "@/features/transactions/components/KPIs";
import RecentTransactions from "@/features/transactions/components/RecentTransactions";
import KPIsSkeleton from "@/features/transactions/components/skeletons/KPIsSkeleton";
import RecentTransactionsSkeleton from "@/features/transactions/components/skeletons/RecentTransactionsSkeleton";
import WelcomeModalGate from "@/features/onboarding/components/WelcomeModalGate";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single<{ name: string | null }>();

  const greetingName = profile?.name?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <h2 className="text-xl font-semibold text-slate-800 md:text-2xl dark:text-slate-100">
        Welcome back, {greetingName}!
      </h2>

      <Suspense fallback={<KPIsSkeleton />}>
        <KPIs />
      </Suspense>

      <Suspense fallback={<RecentTransactionsSkeleton />}>
        <RecentTransactions />
      </Suspense>

      <WelcomeModalGate />
    </div>
  );
}
