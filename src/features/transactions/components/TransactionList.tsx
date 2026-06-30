"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import TransactionTable from "./TransactionTable";
import TransactionMobileList from "./TransactionMobileList";
import TransactionFilters from "./TransactionFilters";
import EmptyTransactionState from "./EmptyTransactionState";
import EmptyFilteredState from "./EmptyFilteredState";
import getTransactions from "../actions/getTransactions";
import { Transaction, SortOption } from "../types";
import {
  groupTransactionsByDate,
  formatGroupDate,
} from "../utils/transactionUtils";
import { UserCategory } from "@/features/categories/types";

interface TransactionListProps {
  initialTransactions: Transaction[];
  initialCursor: string | null;
  allCategories: UserCategory[];
  error?: string;
}

const DEFAULT_SORT: SortOption = "date-desc";
const DEFAULT_CATEGORY = "all";

export default function TransactionList({
  initialTransactions,
  initialCursor,
  allCategories,
  error,
}: TransactionListProps) {
  const [items, setItems] = useState<Transaction[]>(initialTransactions);
  const [cursor, setCursor] = useState<string | null>(initialCursor);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(DEFAULT_CATEGORY);
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT);

  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isInitialMount = useRef(true);
  const seedRef = useRef(initialTransactions);

  // Re-seed when the server-side props change (e.g., after revalidatePath).
  useEffect(() => {
    if (seedRef.current === initialTransactions) return;
    seedRef.current = initialTransactions;
    setItems(initialTransactions);
    setCursor(initialCursor);
  }, [initialTransactions, initialCursor]);

  // Refetch first page when any filter changes; skip the very first mount.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    let cancelled = false;
    setIsLoadingPage(true);
    setFetchError(null);

    getTransactions({
      search: debouncedSearch,
      category: selectedCategory,
      sort: sortBy,
    })
      .then((res) => {
        if (cancelled) return;
        if (res.error) {
          setFetchError(res.error);
        } else if (res.page) {
          setItems(res.page.transactions);
          setCursor(res.page.nextCursor);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingPage(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, selectedCategory, sortBy]);

  const handleLoadMore = async () => {
    if (!cursor || isLoadingMore) return;
    setIsLoadingMore(true);
    setFetchError(null);

    const res = await getTransactions({
      cursor,
      search: debouncedSearch,
      category: selectedCategory,
      sort: sortBy,
    });

    if (res.page) {
      setItems((prev) => [...prev, ...res.page!.transactions]);
      setCursor(res.page.nextCursor);
    } else if (res.error) {
      setFetchError(res.error);
    }

    setIsLoadingMore(false);
  };

  const groupedTransactions = useMemo(
    () => groupTransactionsByDate(items),
    [items]
  );

  const hasFilters =
    debouncedSearch.trim() !== "" ||
    selectedCategory !== DEFAULT_CATEGORY ||
    sortBy !== DEFAULT_SORT;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/40">
        <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (initialTransactions.length === 0 && !hasFilters) {
    return <EmptyTransactionState />;
  }

  return (
    <div className="space-y-4 md:space-y-6 lg:px-0">
      <div className="space-y-10">
        <TransactionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          allCategories={allCategories}
        />

        {hasFilters && (
          <p className="px-1 text-xs text-slate-600 dark:text-slate-400 sm:px-0 sm:text-sm">
            Showing {items.length} transaction{items.length === 1 ? "" : "s"}
            {cursor ? "+" : ""}
          </p>
        )}

        {fetchError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {fetchError}
          </div>
        )}

        {items.length === 0 && !isLoadingPage ? (
          <EmptyFilteredState />
        ) : (
          <div
            className={
              isLoadingPage
                ? "opacity-60 transition-opacity"
                : "transition-opacity"
            }
          >
            <TransactionMobileList
              groupedTransactions={groupedTransactions}
              formatGroupDate={formatGroupDate}
            />
            <TransactionTable transactions={items} />
          </div>
        )}

        {cursor && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load more"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
