const EmptyFilteredState = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center sm:p-12">
      <p className="mb-2 text-sm text-slate-600 sm:text-base">
        No transactions found
      </p>
      <p className="text-xs text-slate-500 sm:text-sm">
        Try adjusting your search or filters
      </p>
    </div>
  );
};

export default EmptyFilteredState;
