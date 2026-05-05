import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FloatingAddButton from "@/features/transactions/components/FloatingAddButton";
import ExportCsvButton from "@/features/transactions/components/ExportCsvButton";
import ExportPdfButton from "@/features/transactions/components/ExportPdfButton";
import ImportCsvButton from "@/features/transactions/components/ImportCsvButton";
import TransactionListLoader from "@/features/transactions/components/TransactionListLoader";
import TransactionListSkeleton from "@/features/transactions/components/skeletons/TransactionListSkeleton";
import getTransactionCount from "@/features/transactions/actions/getTransactionCount";

export default async function TransactionsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const { count } = await getTransactionCount();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 pb-24 md:py-12 md:pb-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 md:text-2xl dark:text-slate-100">
            Transactions
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            All your activity in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ImportCsvButton />
          <ExportCsvButton disabled={count === 0} />
          <ExportPdfButton disabled={count === 0} />
        </div>
      </div>

      <Suspense fallback={<TransactionListSkeleton />}>
        <TransactionListLoader />
      </Suspense>
      <FloatingAddButton />
    </div>
  );
}
