"use client";

import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "category";

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  allCategories: string[];
  getCategoryLabel: (category: string) => string;
}

const TransactionFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  allCategories,
  getCategoryLabel,
}: TransactionFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* search */}
      <div data-testid="search-input" className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 rounded-full! pr-10! pl-10! text-sm lg:rounded-md!"
        />

        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* filters row - better mobile layout */}
      <div className="grid grid-cols-2 gap-4 sm:flex-row">
        {/* category filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger
            data-testid="category-select"
            className="h-10 w-full cursor-pointer rounded-full! text-sm lg:rounded-md!"
          >
            <div className="flex items-center gap-4">
              <Filter className="hidden h-3.5 w-3.5 text-slate-500 sm:block" />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {allCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {getCategoryLabel(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* sort option */}
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger
            data-testid="sort-select"
            className="h-10 w-full cursor-pointer rounded-full! text-sm lg:rounded-md!"
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="amount-desc">Amount: High to Low</SelectItem>
            <SelectItem value="amount-asc">Amount: Low to High</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TransactionFilters;
