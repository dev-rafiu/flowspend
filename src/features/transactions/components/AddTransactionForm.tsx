"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import addTransaction from "../actions/addTransaction";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserCategories } from "@/features/categories/hooks/useUserCategories";
import {
  buildPickerOptions,
  findPickerOption,
} from "@/features/categories/utils/pickerOptions";

interface AddTransactionFormProps {
  onSuccess?: () => void;
  isDialog?: boolean;
}

const AddTransactionForm = ({
  onSuccess,
  isDialog = false,
}: AddTransactionFormProps) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userCategories = useUserCategories();
  const pickerOptions = buildPickerOptions(transactionType, userCategories);
  const selectedOption = selectedCategoryId
    ? findPickerOption(selectedCategoryId, transactionType, userCategories)
    : undefined;
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (formData: FormData) => {
    const note = (formData.get("text") as string)?.trim();
    const amount = parseFloat(formData.get("amount") as string);
    const date = formData.get("date") as string;

    if (!note || !Number.isFinite(amount) || amount <= 0 || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const { error } = await addTransaction({
      note,
      amount,
      type: transactionType,
      categoryId: selectedCategoryId || null,
      transactionDate: new Date(date).toISOString(),
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Transaction added");
    setSelectedCategoryId("");
    router.refresh();
    onSuccess?.();
  };

  const handleTypeChange = (type: "income" | "expense") => {
    setTransactionType(type);
    setSelectedCategoryId("");
  };

  return (
    <form action={handleSubmit} className={cn("space-y-4", !isDialog && "px-4")}>
      {/* type toggle */}
      <div
        role="radiogroup"
        aria-label="Transaction type"
        className="inline-flex w-full rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900"
      >
        {(
          [
            {
              value: "expense" as const,
              label: "Expense",
              Icon: ArrowDown,
              activeText: "text-red-600 dark:text-red-400",
            },
            {
              value: "income" as const,
              label: "Income",
              Icon: ArrowUp,
              activeText: "text-emerald-600 dark:text-emerald-400",
            },
          ]
        ).map(({ value, label, Icon, activeText }) => {
          const isActive = transactionType === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => handleTypeChange(value)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? cn("bg-white shadow-sm dark:bg-slate-800", activeText)
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {/* amount */}
      <div className="space-y-1.5">
        <label
          htmlFor="amount"
          className="text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          Amount
        </label>
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">
            $
          </span>
          <Input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            min="0"
            placeholder="0.00"
            inputMode="decimal"
            required
            className="pl-7"
          />
        </div>
      </div>

      {/* description */}
      <div className="space-y-1.5">
        <label
          htmlFor="text"
          className="text-xs font-medium text-slate-600 dark:text-slate-400"
        >
          Description
        </label>
        <Input
          type="text"
          name="text"
          id="text"
          placeholder="e.g. Groceries"
          maxLength={80}
          required
        />
      </div>

      {/* category + date */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Category
          </label>
          <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Select">
                {selectedOption ? (
                  <span className="flex items-center gap-2">
                    <selectedOption.Icon
                      className={cn("h-4 w-4", selectedOption.iconClass)}
                    />
                    <span className="truncate">{selectedOption.label}</span>
                  </span>
                ) : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {pickerOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="flex items-center gap-2">
                    <option.Icon className={cn("h-4 w-4", option.iconClass)} />
                    <span>{option.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="date"
            className="text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Date
          </label>
          <Input
            type="date"
            name="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
            required
          />
        </div>
      </div>

      {isDialog ? (
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSuccess}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add transaction"}
          </Button>
        </DialogFooter>
      ) : (
        <DrawerFooter className="flex-row justify-end gap-2 px-0">
          <DrawerClose asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </DrawerClose>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add transaction"}
          </Button>
        </DrawerFooter>
      )}
    </form>
  );
};

export default AddTransactionForm;
