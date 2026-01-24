import { Transaction } from "../types/Transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "category";

export const getCategoryLabel = (categoryValue: string) => {
  const expenseCat = EXPENSE_CATEGORIES.find(
    (c) => c.value === categoryValue
  );
  const incomeCat = INCOME_CATEGORIES.find((c) => c.value === categoryValue);
  return expenseCat?.label || incomeCat?.label || categoryValue;
};

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

export const filterAndSortTransactions = (
  transactions: Transaction[],
  searchQuery: string,
  selectedCategory: string,
  sortBy: SortOption
): Transaction[] => {
  let filtered = transactions;

  // filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.text.toLowerCase().includes(query) ||
        t.category?.toLowerCase().includes(query) ||
        Math.abs(t.amount).toString().includes(query)
    );
  }

  // filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter((t) => t.category === selectedCategory);
  }

  // sort transactions
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        const bDate = b.transactionDate
          ? new Date(b.transactionDate)
          : new Date(b.createdAt);
        const aDate = a.transactionDate
          ? new Date(a.transactionDate)
          : new Date(a.createdAt);
        return bDate.getTime() - aDate.getTime();
      case "date-asc":
        const aDateAsc = a.transactionDate
          ? new Date(a.transactionDate)
          : new Date(a.createdAt);
        const bDateAsc = b.transactionDate
          ? new Date(b.transactionDate)
          : new Date(b.createdAt);
        return aDateAsc.getTime() - bDateAsc.getTime();
      case "amount-desc":
        return Math.abs(b.amount) - Math.abs(a.amount);
      case "amount-asc":
        return Math.abs(a.amount) - Math.abs(b.amount);
      case "category":
        const aCategory = a.category || "zzz";
        const bCategory = b.category || "zzz";
        return aCategory.localeCompare(bCategory);
      default:
        return 0;
    }
  });

  return sorted;
};

export const groupTransactionsByDate = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  const grouped = transactions.reduce(
    (acc, transaction) => {
      // use transactionDate if available, otherwise createdAt
      const date = transaction.transactionDate
        ? new Date(transaction.transactionDate)
        : new Date(transaction.createdAt);
      const dateKey = date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>
  );

  return grouped;
};
