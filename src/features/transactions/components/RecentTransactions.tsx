import TransactionItem from "./TransactionItem";
import TransactionTableRow from "./TransactionTableRow";
import getRecentTransactions from "../actions/getRecentTransactions";
import AddTransactionModal from "./AddTransactionModal";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

async function RecentTransactions() {
  const { transactions, error } = await getRecentTransactions(5);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  if (transactions?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
          <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Add your first transaction
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track every dollar in seconds — record an income or expense to get
            started.
          </p>
        </div>
        <AddTransactionModal>
          <Button type="button" size="sm">
            <Plus className="h-4 w-4" />
            Add transaction
          </Button>
        </AddTransactionModal>
      </div>
    );
  }

  return (
    <div className="mb-10 space-y-4 md:mb-0">
      <header className="flex items-center justify-between">
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Recent transactions
        </p>

        <Link
          href="/transactions"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:text-slate-800 dark:text-slate-100"
        >
          View All
        </Link>
      </header>

      {/* mobile cards */}
      <ul className="space-y-2 md:hidden">
        {transactions?.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>

      {/* desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 md:block">
        <table className="w-full">
          <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white dark:bg-slate-900">
            {transactions?.map((transaction) => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
