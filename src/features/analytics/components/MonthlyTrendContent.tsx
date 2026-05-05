import getMonthlyTrend from "../actions/getMonthlyTrend";
import MonthlyTrendChart from "./MonthlyTrendChart";

export default async function MonthlyTrendContent() {
  const { items, error } = await getMonthlyTrend(6);

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
        {error}
      </div>
    );
  }

  return <MonthlyTrendChart items={items ?? []} />;
}
