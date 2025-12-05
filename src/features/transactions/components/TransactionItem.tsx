"use client";

import { Transaction } from "../types/Transaction";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isIncome = transaction.amount > 0;
  const amount = Math.abs(transaction.amount);

  // const handleDeleteTransaction = async (id: string) => {
  //   setIsDeleting(true);
  //   const { error, message } = await deleteTransaction(id);
  //   if (error) {
  //     toast.error(error);
  //     setIsDeleting(false);
  //   } else {
  //     toast.success(message);
  //   }
  // };

  const getCategoryInfo = (category: string | null | undefined) => {
    if (!category) return null;

    return (
      EXPENSE_CATEGORIES.find((cat) => cat.value === category) ||
      INCOME_CATEGORIES.find((cat) => cat.value === category)
    );
  };

  const categoryInfo = getCategoryInfo(transaction.category);

  return (
    <li
      className={cn(
        "group relative bg-white rounded-lg  border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden",
        isDeleting && "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between gap-4 p-2">
        <div className="flex items-center gap-4">
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

          <div className="">
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

        <div className="">
          <span
            className={cn(
              "font-semibold text-sm whitespace-nowrap",
              isIncome ? "text-green-600" : "text-red-600"
            )}
          >
            {isIncome ? "+" : "-"}${formatCurrency(amount)}
          </span>

          {/* <button
            onClick={() => handleDeleteTransaction(transaction.id)}
            disabled={isDeleting}
            className="opacity-1 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 disabled:opacity-50"
            aria-label="Delete transaction"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </li>
  );
}

export default TransactionItem;
