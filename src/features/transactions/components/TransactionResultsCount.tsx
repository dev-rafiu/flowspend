interface TransactionResultsCountProps {
  filteredCount: number;
  totalCount: number;
  hasFilters: boolean;
}

const TransactionResultsCount = ({
  filteredCount,
  totalCount,
  hasFilters,
}: TransactionResultsCountProps) => {
  if (!hasFilters) return null;

  return (
    <p className="px-1 text-xs text-slate-600 sm:px-0 sm:text-sm">
      Showing {filteredCount} of {totalCount} transactions
    </p>
  );
};

export default TransactionResultsCount;
