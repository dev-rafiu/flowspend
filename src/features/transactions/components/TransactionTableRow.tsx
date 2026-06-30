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

function TransactionTableRow({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";
  const router = useRouter();

  const categoryInfo = getCategoryDisplay(transaction.categoryLabel);

  const handleDeleteSuccess = () => router.refresh();
  const handleEditSuccess = () => router.refresh();

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <tr className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:bg-slate-900">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {categoryInfo && (
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                categoryInfo.bgColor
              )}
              title={categoryInfo.label}
            >
              {(() => {
                const Icon = categoryInfo.icon;
                return <Icon className={cn("h-4 w-4", categoryInfo.color)} />;
              })()}
            </div>
          )}

          <div className="min-w-0">
            {categoryInfo && (
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {categoryInfo.label}
              </p>
            )}
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {transaction.note ?? ""}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
        {formatDate(transaction.transactionDate)}
      </td>

      <td className="px-4 py-3">
        <span
          className={cn(
            "text-sm font-semibold whitespace-nowrap",
            isIncome ? "text-green-600" : "text-red-600"
          )}
        >
          {isIncome ? "+" : "-"}${formatCurrency(transaction.amount)}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <EditTransactionDialog
            transaction={transaction}
            onSuccess={handleEditSuccess}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900"
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
      </td>
    </tr>
  );
}

export default TransactionTableRow;
