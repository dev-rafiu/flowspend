import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TransactionList from "@/features/transactions/components/TransactionList";
import FloatingAddButton from "@/features/transactions/components/FloatingAddButton";

export default async function TransactionsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
      <TransactionList />
      <FloatingAddButton />
    </div>
  );
}
