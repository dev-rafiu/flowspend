"use client";

import { useRouter } from "next/navigation";
import { Transaction } from "../types/Transaction";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import { Pencil, Trash2 } from "lucide-react";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import { Button } from "@/components/ui/button";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.amount > 0;
  const amount = Math.abs(transaction.amount);
  const router = useRouter();

  const getCategoryInfo = (category: string | null | undefined) => {
    if (!category) return null;

    return (
      EXPENSE_CATEGORIES.find((cat) => cat.value === category) ||
      INCOME_CATEGORIES.find((cat) => cat.value === category)
    );
  };

  const categoryInfo = getCategoryInfo(transaction.category);

  const handleDeleteSuccess = () => {
    router.refresh();
  };

  const handleEditSuccess = () => {
    router.refresh();
  };

  return (
    <li
      className={cn(
        "group relative bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between gap-4 p-3">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {categoryInfo &&
            (() => {
              const Icon = categoryInfo.icon;

              return (
                <div
                  className={cn(
                    "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    categoryInfo.bgColor
                  )}
                  title={categoryInfo.label}
                >
                  <Icon className={cn("w-5 h-5", categoryInfo.color)} />
                </div>
              );
            })()}

          <div className="flex-1 min-w-0">
            {categoryInfo && (
              <p className="text-sm text-slate-900 font-semibold">
                {categoryInfo.label}
              </p>
            )}

            <p className="text-slate-500 truncate text-xs">
              {transaction.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span
            className={cn(
              "font-semibold text-sm whitespace-nowrap",
              isIncome ? "text-green-600" : "text-red-600"
            )}
          >
            {isIncome ? "+" : "-"}${formatCurrency(amount)}
          </span>

          <div className="flex items-center gap-1 transition-opacity duration-200">
            <EditTransactionDialog
              transaction={transaction}
              onSuccess={handleEditSuccess}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-600 hover:text-slate-900"
                aria-label="Edit transaction"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </EditTransactionDialog>

            <DeleteTransactionDialog
              transactionId={transaction.id}
              transactionText={transaction.text}
              onSuccess={handleDeleteSuccess}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </DeleteTransactionDialog>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TransactionItem;
