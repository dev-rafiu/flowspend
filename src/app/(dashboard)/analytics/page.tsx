import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PeriodSelector from "@/features/analytics/components/PeriodSelector";
import PeriodSummaryServer from "@/features/analytics/components/PeriodSummaryServer";
import CategoryBreakdownContent from "@/features/analytics/components/CategoryBreakdownContent";
import DailySpendingContent from "@/features/analytics/components/DailySpendingContent";
import MonthlyTrendContent from "@/features/analytics/components/MonthlyTrendContent";
import PeriodSummarySkeleton from "@/features/analytics/components/skeletons/PeriodSummarySkeleton";
import ChartSkeleton from "@/features/analytics/components/skeletons/ChartSkeleton";
import { AnalyticsPeriod, PERIOD_LABELS } from "@/features/analytics/types";

const VALID_PERIODS: AnalyticsPeriod[] = ["month", "3months", "year", "all"];

interface PageProps {
  searchParams: Promise<{ period?: string }>;
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const { period: rawPeriod } = await searchParams;
  const period: AnalyticsPeriod = VALID_PERIODS.includes(
    rawPeriod as AnalyticsPeriod
  )
    ? (rawPeriod as AnalyticsPeriod)
    : "month";

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 pb-24 md:py-12 md:pb-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="">
          <h2 className="text-xl font-semibold text-slate-800 md:text-2xl dark:text-slate-100">
            Analytics
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Where your money is going.
          </p>
        </div>
        <PeriodSelector value={period} />
      </div>

      <Suspense fallback={<PeriodSummarySkeleton />}>
        <PeriodSummaryServer period={period} />
      </Suspense>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spending by category</CardTitle>
          <CardDescription>{PERIOD_LABELS[period]}</CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<ChartSkeleton withLegend />}>
            <CategoryBreakdownContent period={period} />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spending over time</CardTitle>
          <CardDescription>{PERIOD_LABELS[period]} · daily</CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<ChartSkeleton />}>
            <DailySpendingContent period={period} />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Income vs expense</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<ChartSkeleton />}>
            <MonthlyTrendContent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
