"use client";

import { useState, useMemo } from "react";
import TransactionTable from "./TransactionTable";
import TransactionMobileList from "./TransactionMobileList";
import TransactionFilters from "./TransactionFilters";
import CategoryFilterChips from "./CategoryFilterChips";
import TransactionResultsCount from "./TransactionResultsCount";
import EmptyTransactionState from "./EmptyTransactionState";
import EmptyFilteredState from "./EmptyFilteredState";
import { Transaction } from "../types/Transaction";
import {
  filterAndSortTransactions,
  groupTransactionsByDate,
  formatGroupDate,
  getCategoryLabel,
  SortOption,
} from "../utils/transactionUtils";

interface TransactionListProps {
  transactions: Transaction[];
  error?: string;
}

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
  const filteredAndSortedTransactions = useMemo(
    () =>
      filterAndSortTransactions(
        transactions,
        searchQuery,
        selectedCategory,
        sortBy
      ),
    [transactions, searchQuery, selectedCategory, sortBy]
  );

  // group transactions by date
  const groupedTransactions = useMemo(
    () => groupTransactionsByDate(filteredAndSortedTransactions),
    [filteredAndSortedTransactions]
  );

  const hasFilters = searchQuery !== "" || selectedCategory !== "all";

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return <EmptyTransactionState />;
  }

  return (
    <div className="space-y-4 px-4 md:space-y-6 lg:px-0">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Transactions
        </h2>
      </header>

      <div className="space-y-10">
        {/* filters */}
        <div className="space-y-6">
          <TransactionFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            allCategories={allCategories}
            getCategoryLabel={getCategoryLabel}
          />

          <CategoryFilterChips
            allCategories={allCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            getCategoryLabel={getCategoryLabel}
          />
        </div>

        {/* results count */}
        <TransactionResultsCount
          filteredCount={filteredAndSortedTransactions.length}
          totalCount={transactions.length}
          hasFilters={hasFilters}
        />

        {/* transactions List */}
        {filteredAndSortedTransactions.length === 0 ? (
          <EmptyFilteredState />
        ) : (
          <>
            <TransactionMobileList
              groupedTransactions={groupedTransactions}
              formatGroupDate={formatGroupDate}
            />

            <TransactionTable transactions={filteredAndSortedTransactions} />
          </>
        )}
      </div>
    </div>
  );
}

export default TransactionList;
