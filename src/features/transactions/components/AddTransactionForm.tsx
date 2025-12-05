"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import addTransaction from "../actions/addTransaction";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";

interface AddTransactionFormProps {
  onSuccess?: () => void;
}

const AddTransactionForm = ({ onSuccess }: AddTransactionFormProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get("text") as string;
    const amount = parseFloat(formData.get("amount") as string);

    if (!text || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    // Adjust amount based on transaction type
    const finalAmount =
      transactionType === "expense" ? -Math.abs(amount) : Math.abs(amount);

    const formDataToSend = new FormData();
    formDataToSend.append("text", text);
    formDataToSend.append("amount", finalAmount.toString());

    // Add category for both income and expenses
    if (selectedCategory) {
      formDataToSend.append("category", selectedCategory);
    }

    const { error } = await addTransaction(formDataToSend);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added successfully");
      setSelectedCategory("");
      router.refresh();
      onSuccess?.();
    }
  };

  return (
    <form action={handleSubmit} className="px-4 space-y-4">
      {/* transaction type toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setTransactionType("expense");
            setSelectedCategory("");
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
            setSelectedCategory("");
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

      {/* category selector - for both income and expenses */}
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
        <input type="hidden" name="category" value={selectedCategory} />
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
          step="0.01"
          min="0"
          placeholder="0.00"
          required
          className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
        />
      </div>

      <DrawerFooter>
        <button
          type="submit"
          className="w-full bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Add Transaction
        </button>

        <DrawerClose asChild>
          <button
            type="button"
            className="w-full bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-4 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Cancel
          </button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
};

export default AddTransactionForm;
