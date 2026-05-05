import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PeriodSummarySkeleton() {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:divide-x sm:divide-slate-100 dark:sm:divide-slate-800">
        {[0, 1, 2].map((i) => (
          <div key={i} className={i > 0 ? "sm:pl-6" : undefined}>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="mt-2 h-7 w-32" />
            <Skeleton className="mt-2 h-3 w-28" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
