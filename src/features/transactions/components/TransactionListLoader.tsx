import getTransactions from "../actions/getTransactions";
import getCategories from "@/features/categories/actions/getCategories";
import TransactionList from "./TransactionList";

export default async function TransactionListLoader() {
  const [pageResult, categoriesResult] = await Promise.all([
    getTransactions(),
    getCategories(),
  ]);

  const initialTransactions = pageResult.page?.transactions ?? [];
  const initialCursor = pageResult.page?.nextCursor ?? null;
  const allCategories = categoriesResult.categories ?? [];

  return (
    <TransactionList
      initialTransactions={initialTransactions}
      initialCursor={initialCursor}
      allCategories={allCategories}
      error={pageResult.error}
    />
  );
}
