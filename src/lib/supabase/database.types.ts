export type TransactionType = "income" | "expense";

type ProfileRow = {
  id: string;
  email: string;
  name: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

type CategoryRow = {
  id: string;
  user_id: string;
  label: string;
  type: TransactionType;
  created_at: string;
};

type TransactionRow = {
  id: string;
  user_id: string;
  amount: number;
  type: TransactionType;
  category_id: string | null;
  note: string | null;
  transaction_date: string;
  created_at: string;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<Omit<ProfileRow, "id">> & { id: string };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      categories: {
        Row: CategoryRow;
        Insert: Partial<Omit<CategoryRow, "user_id" | "label" | "type">> & {
          user_id: string;
          label: string;
          type: TransactionType;
        };
        Update: Partial<CategoryRow>;
        Relationships: [];
      };
      transactions: {
        Row: TransactionRow;
        Insert: Partial<Omit<TransactionRow, "user_id" | "amount" | "type">> & {
          user_id: string;
          amount: number;
          type: TransactionType;
        };
        Update: Partial<TransactionRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      category_breakdown: {
        Args: { period_from?: string | null; period_to?: string | null };
        Returns: {
          category: string;
          total: number;
          count: number;
          percentage: number;
        }[];
      };
      daily_spending: {
        Args: { period_from?: string | null; period_to?: string | null };
        Returns: { day: string; expense: number }[];
      };
      monthly_trend: {
        Args: { months_back?: number };
        Returns: {
          month: string;
          income: number;
          expense: number;
          net: number;
        }[];
      };
      period_comparison: {
        Args: {
          current_from?: string | null;
          current_to?: string | null;
          previous_from?: string | null;
          previous_to?: string | null;
        };
        Returns: {
          current_income: number;
          current_expense: number;
          current_net: number;
          previous_income: number;
          previous_expense: number;
          previous_net: number;
          has_previous: boolean;
        }[];
      };
    };
    Enums: {
      transaction_type: TransactionType;
    };
    CompositeTypes: Record<string, never>;
  };
}
