import TransactionItem from "./TransactionItem";
import { Transaction } from "../types";

interface TransactionMobileListProps {
  groupedTransactions: Record<string, Transaction[]>;
  formatGroupDate: (dateString: string) => string;
}

const TransactionMobileList = ({
  groupedTransactions,
  formatGroupDate,
}: TransactionMobileListProps) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:hidden">
      {Object.entries(groupedTransactions)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        .map(([dateKey, dateTransactions]) => (
          <div key={dateKey} className="flex flex-col gap-2">
            <h4 className="px-1 text-xs font-medium tracking-wide text-slate-600 dark:text-slate-400 uppercase sm:px-0">
              {formatGroupDate(dateKey)}
            </h4>

            <ul className="space-y-2">
              {dateTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default TransactionMobileList;
