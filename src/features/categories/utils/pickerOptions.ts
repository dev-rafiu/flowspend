import { Tag, LucideIcon } from "lucide-react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/features/transactions/constants/categories";
import { CategoryType, UserCategory } from "../types";

export interface PickerOption {
  value: string;
  label: string;
  Icon: LucideIcon;
  iconClass: string;
  isCustom: boolean;
}

export function buildPickerOptions(
  type: CategoryType,
  userCategories: UserCategory[]
): PickerOption[] {
  const defaults = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const defaultOptions: PickerOption[] = defaults.map((c) => ({
    value: c.value,
    label: c.label,
    Icon: c.icon,
    iconClass: c.color,
    isCustom: false,
  }));

  const customOptions: PickerOption[] = userCategories
    .filter((c) => c.type === type)
    .map((c) => ({
      value: c.label,
      label: c.label,
      Icon: Tag,
      iconClass: "text-slate-500 dark:text-slate-400",
      isCustom: true,
    }));

  return [...defaultOptions, ...customOptions];
}

export function findPickerOption(
  value: string,
  type: CategoryType,
  userCategories: UserCategory[]
): PickerOption | undefined {
  return buildPickerOptions(type, userCategories).find(
    (opt) => opt.value === value
  );
}
