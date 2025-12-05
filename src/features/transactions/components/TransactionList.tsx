import TransactionItem from "./TransactionItem";
import getTransactions from "../actions/getTransactions";

async function TransactionList() {
  const { transactions, error } = await getTransactions();

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

  // group transactions by date
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt);
    const dateKey = date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(transaction);
    return acc;
  }, {} as Record<string, typeof transactions>);

  const formatGroupDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-900">Transactions</p>

      <div className="space-y-6">
        {Object.entries(groupedTransactions)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([dateKey, dateTransactions]) => (
            <div key={dateKey} className="flex flex-col gap-2">
              <h4 className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                {formatGroupDate(dateKey)}
              </h4>

              <ul className="space-y-2">
                {dateTransactions
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TransactionList;
