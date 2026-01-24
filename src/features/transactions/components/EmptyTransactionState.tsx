const EmptyTransactionState = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center px-4 lg:px-0">
      <div className="w-full max-w-sm space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-10 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-200">
          <svg
            className="h-9 w-9 text-slate-400"
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
        </span>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-900">
            No transactions yet
          </p>

          <p className="text-sm text-slate-600">
            Start tracking your expenses and income by adding your first
            transaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyTransactionState;
