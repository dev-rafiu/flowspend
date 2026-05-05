"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createCategory from "../actions/createCategory";
import { CategoryType } from "../types";

export default function AddCategoryForm() {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [type, setType] = useState<CategoryType>("expense");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = label.trim();
    if (!trimmed) return;

    startTransition(async () => {
      const { ok, error } = await createCategory({ label: trimmed, type });
      if (error) {
        toast.error(error);
        return;
      }
      if (ok) {
        toast.success(`Added "${trimmed}"`);
        setLabel("");
        router.refresh();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
    >
      <Input
        type="text"
        placeholder="e.g. Pets"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        maxLength={40}
        disabled={isPending}
        className="flex-1"
        aria-label="Category name"
      />
      <div
        role="radiogroup"
        aria-label="Category type"
        className="inline-flex rounded-md border border-slate-200 dark:border-slate-800"
      >
        {(["expense", "income"] as const).map((value) => {
          const isActive = type === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setType(value)}
              disabled={isPending}
              className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                isActive
                  ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
      <Button type="submit" size="sm" disabled={!label.trim() || isPending}>
        <Plus className="h-4 w-4" />
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
