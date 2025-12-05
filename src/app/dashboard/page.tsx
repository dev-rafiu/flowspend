import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Balance from "@/features/transactions/components/Balance";
import IncomeExpense from "@/features/transactions/components/IncomeExpense";
import RecentTransactions from "@/features/transactions/components/RecentTransactions";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-slate-900">Welcome back, {user.firstName}!</h2>

      <Balance />
      <IncomeExpense />
      <RecentTransactions />
    </div>
  );
}
