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

function TransactionTableRow({ transaction }: { transaction: Transaction }) {
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

  const formatDate = (date: Date) => {
    const transactionDate =
      (transaction as Transaction).transactionDate || date;
    return new Date(transactionDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {categoryInfo && (
            <div
              className={cn(
                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                categoryInfo.bgColor
              )}
              title={categoryInfo.label}
            >
              {(() => {
                const Icon = categoryInfo.icon;
                return <Icon className={cn("w-4 h-4", categoryInfo.color)} />;
              })()}
            </div>
          )}
          <div className="min-w-0">
            {categoryInfo && (
              <p className="text-sm font-medium text-slate-900">
                {categoryInfo.label}
              </p>
            )}
            <p className="text-sm text-slate-500 truncate">
              {transaction.text}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-slate-600">
        {formatDate(transaction.createdAt)}
      </td>

      <td className="px-4 py-3">
        <span
          className={cn(
            "font-semibold text-sm whitespace-nowrap",
            isIncome ? "text-green-600" : "text-red-600"
          )}
        >
          {isIncome ? "+" : "-"}${formatCurrency(amount)}
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
      </td>
    </tr>
  );
}

export default TransactionTableRow;
