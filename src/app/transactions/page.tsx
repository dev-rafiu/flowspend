import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TransactionList from "@/features/transactions/components/TransactionList";
import FloatingAddButton from "@/features/transactions/components/FloatingAddButton";
import getTransactions from "@/features/transactions/actions/getTransactions";

export default async function TransactionsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { transactions, error } = await getTransactions();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 pb-24 md:pb-12">
      <TransactionList transactions={transactions || []} error={error} />
      <FloatingAddButton />
    </div>
  );
}
