import TransactionItem from "./TransactionItem";
import TransactionTableRow from "./TransactionTableRow";
import getRecentTransactions from "../actions/getRecentTransactions";
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
      <div className="rounded-lg border border-slate-200 bg-slate-100 p-12 text-center">
        <p className="text-base text-slate-600">No transactions found</p>
        <p className="mt-2 text-sm text-slate-500">
          Start by adding your first transaction on the transactions page
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10 space-y-4 md:mb-0">
      <header className="flex items-center justify-between">
        <p className="text-lg font-semibold text-slate-800">
          Recent transactions
        </p>

        <Link
          href="/transactions"
          className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-800"
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
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 md:block">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
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
