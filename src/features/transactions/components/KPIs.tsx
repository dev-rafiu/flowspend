import { formatCurrency } from "@/lib/utils";
import getKPIs from "../actions/getKPIs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

async function IncomeExpense() {
  const { kpis, error } = await getKPIs();

  if (error || !kpis) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/40">
        <p className="text-sm text-red-800 dark:text-red-300">
          {error || "Failed to load KPIs"}
        </p>
      </div>
    );
  }

  const { monthlyIncome, monthlyExpense } = kpis;
  const monthlyNet = monthlyIncome - monthlyExpense;
  const monthLabel = new Date().toLocaleString("default", { month: "long" });

  const kpiCards = [
    {
      title: "Income",
      value: `$${formatCurrency(monthlyIncome)}`,
      description: `${monthLabel} income`,
      icon: ArrowUp,
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/40",
      cardBg:
        "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-950/40 dark:to-emerald-950/40 dark:border-green-900/50",
    },
    {
      title: "Expenses",
      value: `$${formatCurrency(monthlyExpense)}`,
      description: `${monthLabel} expenses`,
      icon: ArrowDown,
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/40",
      cardBg:
        "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 dark:from-red-950/40 dark:to-rose-950/40 dark:border-red-900/50",
    },
    {
      title: "Net",
      value: `${monthlyNet < 0 ? "-" : ""}$${formatCurrency(Math.abs(monthlyNet))}`,
      description: `${monthLabel} balance`,
      icon: TrendingUp,
      iconColor:
        monthlyNet >= 0
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-orange-600 dark:text-orange-400",
      iconBg:
        monthlyNet >= 0
          ? "bg-indigo-100 dark:bg-indigo-900/40"
          : "bg-orange-100 dark:bg-orange-900/40",
      cardBg:
        monthlyNet >= 0
          ? "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 dark:from-indigo-950/40 dark:to-blue-950/40 dark:border-indigo-900/50"
          : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 dark:from-orange-950/40 dark:to-amber-950/40 dark:border-orange-900/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {kpiCards.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <Card
            key={kpi.title}
            className={`transition-all duration-200 hover:shadow-lg ${kpi.cardBg}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {kpi.title}
              </CardTitle>
              <div
                className={`${kpi.iconBg} flex items-center justify-center rounded-full p-2`}
              >
                <Icon className={`h-4 w-4 ${kpi.iconColor}`} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {kpi.value}
              </div>

              <CardDescription className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {kpi.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default IncomeExpense;
