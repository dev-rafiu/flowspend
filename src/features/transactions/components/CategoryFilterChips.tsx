"use client";

import { Button } from "@/components/ui/button";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import { cn } from "@/lib/utils";

interface CategoryFilterChipsProps {
  allCategories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  getCategoryLabel: (category: string) => string;
}

const CategoryFilterChips = ({
  allCategories,
  selectedCategory,
  onCategoryChange,
  getCategoryLabel,
}: CategoryFilterChipsProps) => {
  if (allCategories.length === 0) return null;

  return (
    <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      <Button
        data-testid="category-filter-chip"
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="h-8 shrink-0 rounded-full! px-3 text-xs whitespace-nowrap sm:shrink lg:rounded-md!"
      >
        All
      </Button>

      {allCategories.map((category) => {
        const isSelected = selectedCategory === category;
        const categoryInfo =
          EXPENSE_CATEGORIES.find((c) => c.value === category) ||
          INCOME_CATEGORIES.find((c) => c.value === category);

        return (
          <Button
            data-testid="category-filter-chip"
            key={category}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "h-8 shrink-0 rounded-full! px-3 text-xs whitespace-nowrap sm:shrink lg:rounded-md!",
              isSelected && categoryInfo?.bgColor,
              isSelected && categoryInfo?.color
            )}
          >
            {categoryInfo && (
              <>
                <categoryInfo.icon className="mr-1.5 h-3 w-3" />
                <span>{categoryInfo.label}</span>
              </>
            )}
            {!categoryInfo && <span>{getCategoryLabel(category)}</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilterChips;
