"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import deleteCategory from "../actions/deleteCategory";
import { UserCategory } from "../types";

interface Props {
  category: UserCategory;
}

export default function CategoryRow({ category }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const { ok, error } = await deleteCategory(category.id);
      if (error) {
        toast.error(error);
        return;
      }
      if (ok) {
        toast.success(`Removed "${category.label}"`);
        router.refresh();
      }
    });
  };

  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Tag className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {category.label}
          </p>
          <p className="text-xs text-slate-500 capitalize dark:text-slate-400">
            {category.type}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        aria-label={`Delete ${category.label}`}
        className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
