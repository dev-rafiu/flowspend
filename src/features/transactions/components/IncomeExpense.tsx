import { formatCurrency } from "@/lib/utils";
import getIncomeExpense from "../actions/getIncomeExpense";
import { ArrowUp, ArrowDown } from "lucide-react";

async function IncomeExpense() {
  const { expense, income } = await getIncomeExpense();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* income Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <ArrowUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">Income</p>
            <p className="text-2xl font-bold text-green-600 truncate">
              ${formatCurrency(income ?? 0)}
            </p>
          </div>
        </div>
      </div>

      {/* expense Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <ArrowDown className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-600 mb-1">Expense</p>
            <p className="text-2xl font-bold text-red-600 truncate">
              ${formatCurrency(expense ?? 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeExpense;
