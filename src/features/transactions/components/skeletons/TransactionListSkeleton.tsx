import { Skeleton } from "@/components/ui/skeleton";

const ROW_COUNT = 6;

export default function TransactionListSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 lg:px-0">
      <div className="space-y-10">
        {/* filters bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-10 w-full rounded-full lg:w-72 lg:rounded-md" />
          <div className="grid grid-cols-2 gap-4 lg:flex">
            <Skeleton className="h-10 w-full rounded-full lg:w-44 lg:rounded-md" />
            <Skeleton className="h-10 w-full rounded-full lg:w-44 lg:rounded-md" />
          </div>
        </div>

        {/* mobile rows */}
        <ul className="space-y-2 md:hidden">
          {Array.from({ length: ROW_COUNT }).map((_, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
            </li>
          ))}
        </ul>

        {/* desktop table */}
        <div className="hidden overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 md:block">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <tr>
                {["Description", "Date", "Category", "Amount", "Actions"].map(
                  (label) => (
                    <th
                      key={label}
                      className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-400"
                    >
                      {label}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
              {Array.from({ length: ROW_COUNT }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-12" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
