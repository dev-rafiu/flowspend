export type CategoryType = "expense" | "income";

export interface UserCategory {
  id: string;
  label: string;
  type: CategoryType;
}
