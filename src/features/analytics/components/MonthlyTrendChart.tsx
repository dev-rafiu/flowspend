"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { MonthlyTrendItem } from "../types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  items: MonthlyTrendItem[];
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-md dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1 font-medium text-slate-900 dark:text-slate-100">
        {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-slate-700 dark:text-slate-300">
          <span className="capitalize">{entry.name}</span>:{" "}
          <span className="font-medium" style={{ color: entry.color }}>
            ${formatCurrency(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}

const formatAxisTick = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value}`;
};

export default function MonthlyTrendChart({ items }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const gridStroke = isDark ? "#1e293b" : "#e2e8f0";
  const axisStroke = isDark ? "#94a3b8" : "#64748b";
  const cursorFill = isDark ? "#1e293b" : "#f1f5f9";

  const hasData = items.some((i) => i.income > 0 || i.expense > 0);

  if (!hasData) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No transactions in the last 6 months yet.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={items}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="monthLabel"
            stroke={axisStroke}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={axisStroke}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatAxisTick}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: cursorFill }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="circle"
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="#059669"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
          <Bar
            dataKey="expense"
            name="Expense"
            fill="#ea580c"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
