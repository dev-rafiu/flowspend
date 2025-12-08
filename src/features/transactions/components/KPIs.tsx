import { formatCurrency } from "@/lib/utils";
import getKPIs from "../actions/getKPIs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowUp,
  ArrowDown,
  Wallet,
  TrendingUp,
  Receipt,
  DollarSign,
} from "lucide-react";

async function IncomeExpense() {
  const { kpis, error } = await getKPIs();

  if (error || !kpis) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">{error || "Failed to load KPIs"}</p>
      </div>
    );
  }

  const {
    income,
    expense,
    netBalance,
    totalTransactions,
    averageTransaction,
    monthlyIncome,
    monthlyExpense,
  } = kpis;

  const kpiCards = [
    {
      title: "Total Income",
      value: `$${formatCurrency(income)}`,
      description: "All time income",
      icon: ArrowUp,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      cardBg: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
      trend:
        monthlyIncome > 0
          ? `$${formatCurrency(monthlyIncome)} this month`
          : undefined,
    },

    {
      title: "Total Expenses",
      value: `$${formatCurrency(expense)}`,
      description: "All time expenses",
      icon: ArrowDown,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      cardBg: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200",
      trend:
        monthlyExpense > 0
          ? `$${formatCurrency(monthlyExpense)} this month`
          : undefined,
    },

    {
      title: "Net Balance",
      value: `$${formatCurrency(netBalance)}`,
      description: "Income minus expenses",
      icon: Wallet,
      iconColor: netBalance >= 0 ? "text-indigo-600" : "text-orange-600",
      iconBg: netBalance >= 0 ? "bg-indigo-100" : "bg-orange-100",
      cardBg:
        netBalance >= 0
          ? "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200"
          : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200",
      trend: netBalance >= 0 ? "Positive" : "Negative",
    },

    {
      title: "Total Transactions",
      value: totalTransactions.toString(),
      description: "All transactions",
      icon: Receipt,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      cardBg: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200",
    },

    {
      title: "Average Transaction",
      value: `$${formatCurrency(averageTransaction)}`,
      description: "Average transaction amount",
      icon: DollarSign,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      cardBg: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200",
    },

    {
      title: "Monthly Net",
      value: `$${formatCurrency(monthlyIncome - monthlyExpense)}`,
      description: "This month's balance",
      icon: TrendingUp,
      iconColor:
        monthlyIncome - monthlyExpense >= 0 ? "text-teal-600" : "text-pink-600",
      iconBg:
        monthlyIncome - monthlyExpense >= 0 ? "bg-teal-100" : "bg-pink-100",
      cardBg:
        monthlyIncome - monthlyExpense >= 0
          ? "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200"
          : "bg-gradient-to-br from-pink-50 to-fuchsia-50 border-pink-200",
      trend: `${new Date().toLocaleString("default", { month: "long" })}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpiCards.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <Card
            key={kpi.title}
            className={`hover:shadow-lg transition-all duration-200 ${kpi.cardBg}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">
                {kpi.title}
              </CardTitle>
              <div
                className={`${kpi.iconBg} rounded-full p-2 flex items-center justify-center`}
              >
                <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {kpi.value}
              </div>

              <CardDescription className="mt-1 text-xs text-slate-600">
                {kpi.description}
              </CardDescription>

              {kpi.trend && (
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {kpi.trend}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default IncomeExpense;
