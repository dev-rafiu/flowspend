import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { AnalyticsPeriod, PeriodComparison } from "../types";

interface Props {
  period: AnalyticsPeriod;
  data: PeriodComparison;
}

const COMPARISON_LABEL: Record<AnalyticsPeriod, string> = {
  month: "vs last month",
  "3months": "vs prior 3 months",
  year: "vs last year",
  all: "",
};

type Direction = "higherIsBetter" | "lowerIsBetter";

interface Tile {
  label: string;
  value: number;
  delta: number | null;
  direction: Direction;
}

function deltaPct(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

function formatSigned(value: number) {
  return `${value < 0 ? "-" : ""}$${formatCurrency(Math.abs(value))}`;
}

export default function PeriodSummary({ period, data }: Props) {
  const { current, previous, hasPrevious } = data;
  const comparisonLabel = COMPARISON_LABEL[period];

  const tiles: Tile[] = [
    {
      label: "Spent",
      value: current.expense,
      delta:
        hasPrevious && previous ? deltaPct(current.expense, previous.expense) : null,
      direction: "lowerIsBetter",
    },
    {
      label: "Earned",
      value: current.income,
      delta:
        hasPrevious && previous ? deltaPct(current.income, previous.income) : null,
      direction: "higherIsBetter",
    },
    {
      label: "Net",
      value: current.net,
      delta:
        hasPrevious && previous ? deltaPct(current.net, previous.net) : null,
      direction: "higherIsBetter",
    },
  ];

  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:divide-x sm:divide-slate-100 dark:divide-slate-800">
        {tiles.map((tile, idx) => (
          <div key={tile.label} className={idx > 0 ? "sm:pl-6" : undefined}>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{tile.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {formatSigned(tile.value)}
            </p>
            <DeltaBadge
              delta={tile.delta}
              direction={tile.direction}
              comparisonLabel={comparisonLabel}
              hasPrevious={hasPrevious}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function DeltaBadge({
  delta,
  direction,
  comparisonLabel,
  hasPrevious,
}: {
  delta: number | null;
  direction: Direction;
  comparisonLabel: string;
  hasPrevious: boolean;
}) {
  if (!comparisonLabel) return null;

  if (!hasPrevious) {
    return <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">No prior data</p>;
  }

  if (delta === null) {
    return <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Nothing prior to compare</p>;
  }

  const rounded = Math.abs(delta).toFixed(1);
  let Icon = Minus;
  let color = "text-slate-500 dark:text-slate-400";

  if (delta !== 0) {
    Icon = delta > 0 ? ArrowUp : ArrowDown;
    const isImprovement =
      direction === "higherIsBetter" ? delta > 0 : delta < 0;
    color = isImprovement ? "text-green-600" : "text-red-600";
  }

  return (
    <div className={`mt-1 flex items-center gap-1 text-xs ${color}`}>
      <Icon className="h-3 w-3" />
      <span className="font-medium">{rounded}%</span>
      <span className="text-slate-500 dark:text-slate-400">{comparisonLabel}</span>
    </div>
  );
}
