import { ArrowDown, ArrowUp, Wallet, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ProfileStats } from "../actions/getProfileStats";

interface Props {
  stats: ProfileStats;
}

export default function StatsCard({ stats }: Props) {
  const balanceSign = stats.balance < 0 ? "-" : "";

  const tiles = [
    {
      label: "Transactions",
      value: stats.totalTransactions.toLocaleString(),
      Icon: Receipt,
      tone: "text-slate-600 dark:text-slate-400",
    },
    {
      label: "Lifetime income",
      value: `$${formatCurrency(stats.lifetimeIncome)}`,
      Icon: ArrowUp,
      tone: "text-emerald-600",
    },
    {
      label: "Lifetime expenses",
      value: `$${formatCurrency(stats.lifetimeExpense)}`,
      Icon: ArrowDown,
      tone: "text-orange-600",
    },
    {
      label: "Balance",
      value: `${balanceSign}$${formatCurrency(Math.abs(stats.balance))}`,
      Icon: Wallet,
      tone: stats.balance >= 0 ? "text-indigo-600" : "text-red-600",
    },
  ];

  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
        {tiles.map((tile) => {
          const Icon = tile.Icon;
          return (
            <div key={tile.label} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Icon className={`h-4 w-4 ${tile.tone}`} />
                {tile.label}
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {tile.value}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
