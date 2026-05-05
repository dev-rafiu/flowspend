import getTransactions from "../actions/getTransactions";
import getUserCategories from "../actions/getUserCategories";
import TransactionList from "./TransactionList";

export default async function TransactionListLoader() {
  const [pageResult, categoriesResult] = await Promise.all([
    getTransactions(),
    getUserCategories(),
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
