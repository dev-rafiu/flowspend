"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import updateTransaction from "../actions/updateTransaction";
import { Transaction } from "../types";
import { DialogFooter } from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useUserCategories } from "@/features/categories/hooks/useUserCategories";
import {
  buildPickerOptions,
  findPickerOption,
} from "@/features/categories/utils/pickerOptions";

interface EditTransactionFormProps {
  transaction: Transaction;
  onSuccess?: () => void;
}

const EditTransactionForm = ({
  transaction,
  onSuccess,
}: EditTransactionFormProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    transaction.type
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    transaction.categoryId ?? ""
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const date = transaction.transactionDate || transaction.createdAt;
    return new Date(date).toISOString().split("T")[0];
  });
  const [note, setNote] = useState(transaction.note ?? "");
  const [amount, setAmount] = useState(transaction.amount.toString());
  const router = useRouter();
  const userCategories = useUserCategories();
  const pickerOptions = buildPickerOptions(transactionType, userCategories);
  const selectedOption = selectedCategoryId
    ? findPickerOption(selectedCategoryId, transactionType, userCategories)
    : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!note.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0 || !selectedDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const { error } = await updateTransaction(transaction.id, {
      note: note.trim(),
      amount: parsedAmount,
      type: transactionType,
      categoryId: selectedCategoryId || null,
      transactionDate: new Date(selectedDate).toISOString(),
    });

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction updated successfully");
      router.refresh();
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* transaction type toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setTransactionType("expense");
            if (!findPickerOption(selectedCategoryId, "expense", userCategories)) {
              setSelectedCategoryId("");
            }
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 transition-all ${
            transactionType === "expense"
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
          }`}
        >
          <ArrowDown className="h-4 w-4" />
          <span className="font-medium">Expense</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setTransactionType("income");
            if (!findPickerOption(selectedCategoryId, "income", userCategories)) {
              setSelectedCategoryId("");
            }
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 transition-all ${
            transactionType === "income"
              ? "border-green-300 bg-green-50 text-green-700"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
          }`}
        >
          <ArrowUp className="h-4 w-4" />
          <span className="font-medium">Income</span>
        </button>
      </div>

      {/* date */}
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
          max={new Date().toISOString().split("T")[0]}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:outline-none"
        />
      </div>

      {/* category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Select a category">
              {selectedOption ? (
                <span className="flex items-center gap-2">
                  <selectedOption.Icon
                    className={`h-5 w-5 ${selectedOption.iconClass}`}
                  />
                  <span>{selectedOption.label}</span>
                </span>
              ) : null}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {pickerOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center gap-2">
                  <option.Icon className={`h-5 w-5 ${option.iconClass}`} />
                  <span>{option.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* description */}
      <div className="space-y-2">
        <label htmlFor="text" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <input
          type="text"
          name="text"
          id="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g., groceries, salary, etc."
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:outline-none"
        />
      </div>

      {/* amount */}
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0"
          placeholder="0.00"
          required
          className="w-full rounded-lg border border-slate-300 py-3 pr-4 pl-8 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:outline-none"
        />
      </div>

      <DialogFooter className="flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="w-full rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-900 hover:shadow-lg sm:w-auto"
        >
          Update Transaction
        </button>

        <button
          type="button"
          onClick={onSuccess}
          className="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-900 px-4 py-3 font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 hover:border-slate-400 hover:text-slate-900 sm:w-auto"
        >
          Cancel
        </button>
      </DialogFooter>
    </form>
  );
};

export default EditTransactionForm;
