import getCategoryBreakdown from "../actions/getCategoryBreakdown";
import { AnalyticsPeriod } from "../types";
import CategoryBreakdownChart from "./CategoryBreakdownChart";

interface Props {
  period: AnalyticsPeriod;
}

export default async function CategoryBreakdownContent({ period }: Props) {
  const { items, error } = await getCategoryBreakdown(period);

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
        {error}
      </div>
    );
  }

  return <CategoryBreakdownChart items={items ?? []} />;
}
