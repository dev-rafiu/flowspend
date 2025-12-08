"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import updateTransaction from "../actions/updateTransaction";
import { Transaction } from "../types/Transaction";
import { DialogFooter } from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

interface EditTransactionFormProps {
  transaction: Transaction;
  onSuccess?: () => void;
}

const EditTransactionForm = ({
  transaction,
  onSuccess,
}: EditTransactionFormProps) => {
  const isIncome = transaction.amount > 0;
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    isIncome ? "income" : "expense"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    transaction.category || ""
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const date = transaction.transactionDate || transaction.createdAt;
    return new Date(date).toISOString().split("T")[0];
  });
  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(Math.abs(transaction.amount).toString());
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text || !amount || !selectedDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const finalAmount =
      transactionType === "expense"
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

    const formData = new FormData();
    formData.append("text", text);
    formData.append("amount", finalAmount.toString());
    formData.append("date", selectedDate);

    if (selectedCategory) {
      formData.append("category", selectedCategory);
    }

    const { error } = await updateTransaction(transaction.id, formData);

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
            if (!EXPENSE_CATEGORIES.find((c) => c.value === selectedCategory)) {
              setSelectedCategory("");
            }
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
            transactionType === "expense"
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <ArrowDown className="w-4 h-4" />
          <span className="font-medium">Expense</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setTransactionType("income");
            if (!INCOME_CATEGORIES.find((c) => c.value === selectedCategory)) {
              setSelectedCategory("");
            }
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
            transactionType === "income"
              ? "border-green-300 bg-green-50 text-green-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <ArrowUp className="w-4 h-4" />
          <span className="font-medium">Income</span>
        </button>
      </div>

      {/* date picker */}
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-slate-700">
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
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
      </div>

      {/* category selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select a category">
              {selectedCategory &&
                (() => {
                  const categories =
                    transactionType === "expense"
                      ? EXPENSE_CATEGORIES
                      : INCOME_CATEGORIES;
                  const selected = categories.find(
                    (cat) => cat.value === selectedCategory
                  );
                  if (!selected) return null;
                  const Icon = selected.icon;
                  return (
                    <span className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${selected.color}`} />
                      <span>{selected.label}</span>
                    </span>
                  );
                })()}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {(transactionType === "expense"
              ? EXPENSE_CATEGORIES
              : INCOME_CATEGORIES
            ).map((category) => {
              const Icon = category.icon;
              return (
                <SelectItem key={category.value} value={category.value}>
                  <span className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    <span>{category.label}</span>
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* description field */}
      <div className="space-y-2">
        <label htmlFor="text" className="text-sm font-medium text-slate-700">
          Description
        </label>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., groceries, salary, etc."
          required
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
      </div>

      {/* amount field */}
      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-slate-700">
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
          className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
      </div>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <button
          type="submit"
          className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Update Transaction
        </button>

        <button
          type="button"
          onClick={onSuccess}
          className="w-full sm:w-auto bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-4 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Cancel
        </button>
      </DialogFooter>
    </form>
  );
};

export default EditTransactionForm;
