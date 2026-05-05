"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { DailySpendItem } from "../types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  items: DailySpendItem[];
}

interface TooltipPayload {
  payload: { dateLabel: string; expense: number };
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-md dark:border-slate-700 dark:bg-slate-900">
      <p className="font-medium text-slate-900 dark:text-slate-100">
        {item.dateLabel}
      </p>
      <p className="text-slate-600 dark:text-slate-400">
        ${formatCurrency(item.expense)}
      </p>
    </div>
  );
}

const formatAxisTick = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value}`;
};

export default function DailySpendingChart({ items }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const gridStroke = isDark ? "#1e293b" : "#e2e8f0";
  const axisStroke = isDark ? "#94a3b8" : "#64748b";
  const cursorStroke = isDark ? "#475569" : "#cbd5e1";

  const hasData = items.some((i) => i.expense > 0);

  if (!hasData) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
        No spending in this period yet.
      </div>
    );
  }

  const tickInterval =
    items.length > 90
      ? Math.floor(items.length / 12)
      : items.length > 30
        ? 6
        : 3;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={items}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="dailyExpenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke={gridStroke}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="dateLabel"
            stroke={axisStroke}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval={tickInterval}
            minTickGap={20}
          />
          <YAxis
            stroke={axisStroke}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatAxisTick}
            width={48}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: cursorStroke, strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={2}
            fill="url(#dailyExpenseFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
