import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Balance from "@/features/transactions/components/Balance";
import KPIs from "@/features/transactions/components/KPIs";
import RecentTransactions from "@/features/transactions/components/RecentTransactions";
import getTransactions from "@/features/transactions/actions/getTransactions";

export default async function Dashboard() {
  const user = await currentUser();
  const { transactions } = await getTransactions();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-8">
      <h2 className="text-xl font-semibold text-slate-800 md:text-2xl">
        Welcome back, {user.firstName}!
      </h2>

      <Balance />

      {transactions && transactions?.length > 0 && <KPIs />}

      <RecentTransactions />
    </div>
  );
}
