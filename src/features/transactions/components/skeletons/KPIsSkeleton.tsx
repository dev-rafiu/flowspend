import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function KPIsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-28" />
            <Skeleton className="mt-2 h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
