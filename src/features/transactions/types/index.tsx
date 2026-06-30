export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  note: string | null;
  amount: number; // always positive; sign is implied by `type`
  type: TransactionType;
  categoryId: string | null;
  categoryLabel: string | null;
  userId: string;
  transactionDate: Date;
  createdAt: Date;
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
