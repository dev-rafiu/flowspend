export interface Transaction {
  id: string;
  text: string;
  amount: number;
  category?: string | null;
  userId: string;
  createdAt: Date;
  transactionDate?: Date;
}

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "category";

export interface TransactionsPage {
  transactions: Transaction[];
  nextCursor: string | null;
}
