import TransactionTableRow from "./TransactionTableRow";
import { Transaction } from "../types";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
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
