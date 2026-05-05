import getPeriodComparison from "../actions/getPeriodComparison";
import { AnalyticsPeriod } from "../types";
import PeriodSummary from "./PeriodSummary";

interface Props {
  period: AnalyticsPeriod;
}

export default async function PeriodSummaryServer({ period }: Props) {
  const { data } = await getPeriodComparison(period);
  if (!data) return null;
  return <PeriodSummary period={period} data={data} />;
}
