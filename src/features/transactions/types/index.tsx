export interface Transaction {
  id: string;
  text: string;
  amount: number;
  category?: string | null;
  userId: string;
  createdAt: Date;
  transactionDate?: Date;
}
