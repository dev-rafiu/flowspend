import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import KPIs from "@/features/transactions/components/KPIs";
import RecentTransactions from "@/features/transactions/components/RecentTransactions";
import KPIsSkeleton from "@/features/transactions/components/skeletons/KPIsSkeleton";
import RecentTransactionsSkeleton from "@/features/transactions/components/skeletons/RecentTransactionsSkeleton";
import WelcomeModalGate from "@/features/onboarding/components/WelcomeModalGate";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <h2 className="text-xl font-semibold text-slate-800 md:text-2xl dark:text-slate-100">
        Welcome back, {user.firstName}!
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
