import { LucideIcon, Tag } from "lucide-react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/features/transactions/constants/categories";

export interface CategoryDisplay {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  isCustom: boolean;
}

const FALLBACK = {
  icon: Tag,
  color: "text-slate-600 dark:text-slate-400",
  bgColor: "bg-slate-100 dark:bg-slate-800",
};

export function getCategoryDisplay(
  categoryLabel: string | null | undefined
): CategoryDisplay | null {
  if (!categoryLabel) return null;

  const key = categoryLabel.trim().toLowerCase();
  const match =
    EXPENSE_CATEGORIES.find((c) => c.value === key || c.label.toLowerCase() === key) ||
    INCOME_CATEGORIES.find((c) => c.value === key || c.label.toLowerCase() === key);

  if (match) {
    return {
      label: categoryLabel,
      icon: match.icon,
      color: match.color,
      bgColor: match.bgColor,
      isCustom: false,
    };
  }

  return {
    label: categoryLabel,
    ...FALLBACK,
    isCustom: true,
  };
}
