import { LucideIcon } from "lucide-react";
import { CategoryType, UserCategory } from "../types";
import { getCategoryDisplay } from "./categoryDisplay";

export interface PickerOption {
  value: string; // category UUID
  label: string;
  Icon: LucideIcon;
  iconClass: string;
}

export function buildPickerOptions(
  type: CategoryType,
  categories: UserCategory[]
): PickerOption[] {
  return categories
    .filter((c) => c.type === type)
    .map((c) => {
      const display = getCategoryDisplay(c.label);
      return {
        value: c.id,
        label: c.label,
        Icon: display!.icon,
        iconClass: display!.color,
      };
    });
}

export function findPickerOption(
  value: string,
  type: CategoryType,
  categories: UserCategory[]
): PickerOption | undefined {
  return buildPickerOptions(type, categories).find((opt) => opt.value === value);
}
