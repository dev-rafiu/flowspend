"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/features/transactions/constants/categories";
import { CategoryBreakdownItem } from "../types";
import { getCategoryColor } from "../utils/categoryColors";
import { formatCurrency } from "@/lib/utils";

interface Props {
  items: CategoryBreakdownItem[];
}

const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

function getCategoryLabel(value: string) {
  return ALL_CATEGORIES.find((c) => c.value === value)?.label ?? "Other";
}

interface TooltipPayload {
  payload: { category: string; total: number; percentage: number };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-md dark:border-slate-700 dark:bg-slate-900">
      <p className="font-medium text-slate-900 dark:text-slate-100">
        {getCategoryLabel(item.category)}
      </p>
      <p className="text-slate-600 dark:text-slate-400">
        ${formatCurrency(item.total)} ·{" "}
        <span className="font-medium">{item.percentage.toFixed(1)}%</span>
      </p>
    </div>
  );
}

export default function CategoryBreakdownChart({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No expenses in this period yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="h-64 w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              stroke="none"
            >
              {items.map((item) => (
                <Cell
                  key={item.category}
                  fill={getCategoryColor(item.category)}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2 sm:w-1/2 sm:grid-cols-1 lg:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.category}
            className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: getCategoryColor(item.category) }}
              aria-hidden="true"
            />
            <span className="truncate">{getCategoryLabel(item.category)}</span>
            <span className="ml-auto text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {item.percentage.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
