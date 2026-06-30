import { Transaction } from "../types";

export const formatGroupDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dateToCompare = new Date(date);
  dateToCompare.setHours(0, 0, 0, 0);

  if (dateToCompare.getTime() === today.getTime()) {
    return "Today";
  } else if (dateToCompare.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
};

export const groupTransactionsByDate = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  return transactions.reduce(
    (acc, transaction) => {
      const date = transaction.transactionDate
        ? new Date(transaction.transactionDate)
        : new Date(transaction.createdAt);
      const dateKey = date.toDateString();
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>
  );
};
