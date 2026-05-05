import { AnalyticsPeriod } from "../types";

export function getPeriodRange(period: AnalyticsPeriod): {
  from: Date | null;
  to: Date | null;
} {
  const now = new Date();

  if (period === "month") {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    return { from, to };
  }

  if (period === "3months") {
    const from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    return { from, to };
  }

  if (period === "year") {
    const from = new Date(now.getFullYear(), 0, 1);
    const to = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    return { from, to };
  }

  return { from: null, to: null };
}

export function getPreviousPeriodRange(period: AnalyticsPeriod): {
  from: Date | null;
  to: Date | null;
} {
  const now = new Date();

  if (period === "month") {
    const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    return { from, to };
  }

  if (period === "3months") {
    const from = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const to = new Date(
      now.getFullYear(),
      now.getMonth() - 2,
      0,
      23,
      59,
      59
    );
    return { from, to };
  }

  if (period === "year") {
    const from = new Date(now.getFullYear() - 1, 0, 1);
    const to = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59);
    return { from, to };
  }

  return { from: null, to: null };
}
