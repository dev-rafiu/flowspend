"use client";

import { useRouter } from "next/navigation";
import { Transaction } from "../types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getCategoryDisplay } from "@/features/categories/utils/categoryDisplay";
import { Pencil, Trash2 } from "lucide-react";
import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import { Button } from "@/components/ui/button";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";
  const router = useRouter();

  const categoryInfo = getCategoryDisplay(transaction.categoryLabel);

  const handleDeleteSuccess = () => router.refresh();
  const handleEditSuccess = () => router.refresh();

  return (
    <li
      className={cn(
        "group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 hover:border-slate-300 hover:shadow-md"
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
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {categoryInfo.label}
              </p>
            )}

            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {transaction.note ?? ""}
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
            {isIncome ? "+" : "-"}${formatCurrency(transaction.amount)}
          </span>

          <div className="flex items-center gap-1 transition-opacity duration-200">
            <EditTransactionDialog
              transaction={transaction}
              onSuccess={handleEditSuccess}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100"
                aria-label="Edit transaction"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </EditTransactionDialog>

            <DeleteTransactionDialog
              transactionId={transaction.id}
              transactionNote={transaction.note ?? ""}
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
