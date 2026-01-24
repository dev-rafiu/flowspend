"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import addTransaction from "../actions/addTransaction";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
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

interface AddTransactionFormProps {
  onSuccess?: () => void;
  isDialog?: boolean;
}

const AddTransactionForm = ({
  onSuccess,
  isDialog = false,
}: AddTransactionFormProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get("text") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const date = formData.get("date") as string;

    if (!text || !amount || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    // Adjust amount based on transaction type
    const finalAmount =
      transactionType === "expense" ? -Math.abs(amount) : Math.abs(amount);

    const formDataToSend = new FormData();
    formDataToSend.append("text", text);
    formDataToSend.append("amount", finalAmount.toString());
    formDataToSend.append("date", date);

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

  const handleTransactionTypeChange = (type: "income" | "expense") => {
    setTransactionType(type);
    setSelectedCategory("");
  };

  return (
    <form
      action={handleSubmit}
      className={isDialog ? "space-y-4" : "space-y-4 px-4"}
    >
      {/* transaction type toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleTransactionTypeChange("expense")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 transition-all ${
            transactionType === "expense"
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <ArrowDown className="h-4 w-4" />
          <span className="font-medium">Expense</span>
        </button>

        <button
          type="button"
          onClick={() => handleTransactionTypeChange("income")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 transition-all ${
            transactionType === "income"
              ? "border-green-300 bg-green-50 text-green-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <ArrowUp className="h-4 w-4" />
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
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:outline-none"
        />
      </div>

      {/* category selector - for both income and expenses */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Category</label>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-12 w-full">
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
                      <Icon className={`h-5 w-5 ${selected.color}`} />
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
                    <Icon className={`h-5 w-5 ${category.color}`} />
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
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:outline-none"
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
          className="w-full rounded-lg border border-slate-300 py-3 pr-4 pl-8 focus:border-transparent focus:ring-2 focus:ring-slate-800 focus:outline-none"
        />
      </div>

      {isDialog ? (
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onSuccess}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:text-slate-900 sm:flex-1"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-900 hover:shadow-lg sm:flex-1"
          >
            Add Transaction
          </button>
        </DialogFooter>
      ) : (
        <DrawerFooter>
          <DrawerClose asChild>
            <button
              type="button"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
          </DrawerClose>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-900 hover:shadow-lg"
          >
            Add Transaction
          </button>
        </DrawerFooter>
      )}
    </form>
  );
};

export default AddTransactionForm;
