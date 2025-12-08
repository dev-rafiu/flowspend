import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Balance from "@/features/transactions/components/Balance";
import KPIs from "@/features/transactions/components/KPIs";
import RecentTransactions from "@/features/transactions/components/RecentTransactions";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
        Welcome back, {user.firstName}!
      </h2>

      <Balance />
      <KPIs />
      <RecentTransactions />
    </div>
  );
}
