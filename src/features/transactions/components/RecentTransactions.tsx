import TransactionItem from "./TransactionItem";
import getRecentTransactions from "../actions/getRecentTransactions";
import Link from "next/link";

async function RecentTransactions() {
  const { transactions, error } = await getRecentTransactions(5);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
        <p className="text-slate-600 text-base">No transactions found</p>
        <p className="text-slate-500 text-sm mt-2">
          Start by adding your first transaction
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <p className="font-semibold text-slate-900">Recent transactions</p>

        <Link
          href="/transactions"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          View All
        </Link>
      </header>

      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}

export default RecentTransactions;
