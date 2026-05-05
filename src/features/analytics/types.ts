export type AnalyticsPeriod = "month" | "3months" | "year" | "all";

export interface CategoryBreakdownItem {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlyTrendItem {
  month: string;
  monthLabel: string;
  income: number;
  expense: number;
  net: number;
}

export interface PeriodTotals {
  income: number;
  expense: number;
  net: number;
}

export interface PeriodComparison {
  current: PeriodTotals;
  previous: PeriodTotals | null;
  hasPrevious: boolean;
}

export interface DailySpendItem {
  date: string;
  dateLabel: string;
  expense: number;
}

export const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  month: "This month",
  "3months": "Last 3 months",
  year: "This year",
  all: "All time",
};
