import TransactionTableRow from "./TransactionTableRow";
import { Transaction } from "../types";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
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
          {transactions.map((transaction) => (
            <TransactionTableRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
