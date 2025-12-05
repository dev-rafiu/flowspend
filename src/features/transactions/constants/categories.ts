import {
  UtensilsCrossed,
  ShoppingCart,
  CreditCard,
  Smartphone,
  Car,
  ShoppingBag,
  Film,
  Heart,
  BookOpen,
  Package,
  DollarSign,
  Briefcase,
  Gift,
  TrendingUp,
  Wallet,
  LucideIcon,
} from "lucide-react";

export interface CategoryConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const EXPENSE_CATEGORIES: CategoryConfig[] = [
  {
    value: "food",
    label: "Food",
    icon: UtensilsCrossed,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    value: "grocery",
    label: "Grocery",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    value: "bills",
    label: "Bills",
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    value: "subscriptions",
    label: "Subscriptions",
    icon: Smartphone,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    value: "transport",
    label: "Transport",
    icon: Car,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
  },
  {
    value: "shopping",
    label: "Shopping",
    icon: ShoppingBag,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: Film,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    value: "health",
    label: "Health",
    icon: Heart,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    value: "education",
    label: "Education",
    icon: BookOpen,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    value: "other",
    label: "Other",
    icon: Package,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
  },
] as const;

export const INCOME_CATEGORIES: CategoryConfig[] = [
  {
    value: "salary",
    label: "Salary",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    value: "freelance",
    label: "Freelance",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    value: "investment",
    label: "Investment",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    value: "gift",
    label: "Gift",
    icon: Gift,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    value: "refund",
    label: "Refund",
    icon: Wallet,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    value: "other",
    label: "Other",
    icon: Package,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
  },
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]["value"];
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number]["value"];
