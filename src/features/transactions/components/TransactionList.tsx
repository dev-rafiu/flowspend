"use client";

import { useState, useMemo } from "react";
import TransactionItem from "./TransactionItem";
import TransactionTableRow from "./TransactionTableRow";
import { Transaction } from "../types/Transaction";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  error?: string;
}

type SortOption =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "category";

function TransactionList({ transactions, error }: TransactionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  // get all unique categories from transactions
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    transactions.forEach((t) => {
      if (t.category) categories.add(t.category);
    });
    return Array.from(categories);
  }, [transactions]);

  // filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    // filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.text.toLowerCase().includes(query) ||
          t.category?.toLowerCase().includes(query) ||
          Math.abs(t.amount).toString().includes(query)
      );
    }

    // filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // sort transactions
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          const bDate = b.transactionDate
            ? new Date(b.transactionDate)
            : new Date(b.createdAt);
          const aDate = a.transactionDate
            ? new Date(a.transactionDate)
            : new Date(a.createdAt);
          return bDate.getTime() - aDate.getTime();
        case "date-asc":
          const aDateAsc = a.transactionDate
            ? new Date(a.transactionDate)
            : new Date(a.createdAt);
          const bDateAsc = b.transactionDate
            ? new Date(b.transactionDate)
            : new Date(b.createdAt);
          return aDateAsc.getTime() - bDateAsc.getTime();
        case "amount-desc":
          return Math.abs(b.amount) - Math.abs(a.amount);
        case "amount-asc":
          return Math.abs(a.amount) - Math.abs(b.amount);
        case "category":
          const aCategory = a.category || "zzz";
          const bCategory = b.category || "zzz";
          return aCategory.localeCompare(bCategory);
        default:
          return 0;
      }
    });

    return sorted;
  }, [transactions, searchQuery, selectedCategory, sortBy]);

  // group transactions by date
  const groupedTransactions = useMemo(() => {
    const grouped = filteredAndSortedTransactions.reduce((acc, transaction) => {
      // use transactionDate if available, otherwise createdAt
      const date = transaction.transactionDate
        ? new Date(transaction.transactionDate)
        : new Date(transaction.createdAt);
      const dateKey = date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);

    return grouped;
  }, [filteredAndSortedTransactions]);

  const formatGroupDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dateToCompare = new Date(date);
    dateToCompare.setHours(0, 0, 0, 0);

    if (dateToCompare.getTime() === today.getTime()) {
      return "Today";
    } else if (dateToCompare.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    const expenseCat = EXPENSE_CATEGORIES.find(
      (c) => c.value === categoryValue
    );
    const incomeCat = INCOME_CATEGORIES.find((c) => c.value === categoryValue);
    return expenseCat?.label || incomeCat?.label || categoryValue;
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-slate-900 text-lg font-semibold mb-2">
            No transactions yet
          </p>
          <p className="text-slate-600 text-sm mb-4">
            Start tracking your expenses and income by adding your first
            transaction
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          Transactions
        </h2>
      </header>

      {/* filters */}
      <div className="space-y-6">
        {/* search and filters */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10! pr-10! h-10 text-sm rounded-full! lg:rounded-md!"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* filters row - better mobile layout */}
          <div className="grid grid-cols-2 gap-2 sm:flex-row sm:gap-3">
            {/* category filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full h-10 text-sm rounded-full! lg:rounded-md! cursor-pointer">
                <div className="flex items-center gap-4">
                  <Filter className="w-3.5 h-3.5 text-slate-500 sm:block hidden" />
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
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-full h-10 text-sm rounded-full! lg:rounded-md! cursor-pointer">
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

        {/* category filter chips - scrollable on mobile */}
        {allCategories.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-600 px-1 sm:px-0 hidden">
              Quick Filters
            </p>

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="h-8 px-3 text-xs shrink-0 sm:shrink whitespace-nowrap rounded-full! lg:rounded-md!"
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
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "h-8 px-3 text-xs shrink-0 sm:shrink whitespace-nowrap rounded-full! lg:rounded-md!",
                      isSelected && categoryInfo?.bgColor,
                      isSelected && categoryInfo?.color
                    )}
                  >
                    {categoryInfo && (
                      <>
                        <categoryInfo.icon className="w-3 h-3 mr-1.5" />
                        <span>{categoryInfo.label}</span>
                      </>
                    )}
                    {!categoryInfo && <span>{getCategoryLabel(category)}</span>}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* results count */}
      {searchQuery || selectedCategory !== "all" ? (
        <p className="text-xs sm:text-sm text-slate-600 px-1 sm:px-0">
          Showing {filteredAndSortedTransactions.length} of{" "}
          {transactions.length} transactions
        </p>
      ) : null}

      {/* transactions List */}
      {filteredAndSortedTransactions.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 sm:p-12 text-center">
          <p className="text-slate-600 text-sm sm:text-base mb-2">
            No transactions found
          </p>
          <p className="text-slate-500 text-xs sm:text-sm">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          {/* mobile cards with date grouping */}
          <div className="md:hidden space-y-4 sm:space-y-6">
            {Object.entries(groupedTransactions)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([dateKey, dateTransactions]) => (
                <div key={dateKey} className="flex flex-col gap-2">
                  <h4 className="text-xs font-medium text-slate-600 uppercase tracking-wide px-1 sm:px-0">
                    {formatGroupDate(dateKey)}
                  </h4>

                  <ul className="space-y-2">
                    {dateTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          {/* desktop table */}
          <div className="hidden md:block border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-slate-200">
                {filteredAndSortedTransactions.map((transaction) => (
                  <TransactionTableRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionList;
