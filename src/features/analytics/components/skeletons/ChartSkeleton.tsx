import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  withLegend?: boolean;
}

export default function ChartSkeleton({ className, withLegend }: Props) {
  if (withLegend) {
    return (
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-64 w-full items-center justify-center sm:w-1/2">
          <Skeleton className="h-44 w-44 rounded-full" />
        </div>
        <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2 sm:w-1/2 sm:grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-3 flex-1" />
              <Skeleton className="h-3 w-8" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <Skeleton className={cn("h-64 w-full", className)} />;
}
