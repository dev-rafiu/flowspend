import type { Transaction, TransactionType } from "../types";

type CategoryRel = { label: string } | { label: string }[] | null;

export type TransactionRow = {
  id: string;
  user_id: string;
  amount: number | string;
  type: TransactionType;
  category_id: string | null;
  note: string | null;
  transaction_date: string;
  created_at: string;
  category?: CategoryRel;
};

export const TRANSACTION_SELECT = "*, category:categories(label)";

export function mapTransactionRow(row: TransactionRow): Transaction {
  const cat = Array.isArray(row.category) ? row.category[0] : row.category;
  return {
    id: row.id,
    userId: row.user_id,
    amount: typeof row.amount === "string" ? parseFloat(row.amount) : row.amount,
    type: row.type,
    categoryId: row.category_id,
    categoryLabel: cat?.label ?? null,
    note: row.note,
    transactionDate: new Date(row.transaction_date),
    createdAt: new Date(row.created_at),
  };
}
