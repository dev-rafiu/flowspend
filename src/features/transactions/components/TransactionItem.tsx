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
        "group relative overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-between gap-4 p-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {categoryInfo &&
            (() => {
              const Icon = categoryInfo.icon;

              return (
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    categoryInfo.bgColor
                  )}
                  title={categoryInfo.label}
                >
                  <Icon className={cn("h-5 w-5", categoryInfo.color)} />
                </div>
              );
            })()}

          <div className="min-w-0 flex-1">
            {categoryInfo && (
              <p
                id="category-name"
                className="text-sm font-semibold text-slate-900"
              >
                {categoryInfo.label}
              </p>
            )}

            <p
              id="transaction-text"
              className="truncate text-xs text-slate-500"
            >
              {transaction.text}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span
            className={cn(
              "text-sm font-semibold whitespace-nowrap",
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
                <Pencil className="h-4 w-4" />
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
                className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                aria-label="Delete transaction"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </DeleteTransactionDialog>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TransactionItem;
