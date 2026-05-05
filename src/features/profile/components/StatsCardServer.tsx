import { Card, CardContent } from "@/components/ui/card";
import getProfileStats from "../actions/getProfileStats";
import StatsCard from "./StatsCard";

export default async function StatsCardServer() {
  const { stats, error } = await getProfileStats();

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error ?? "Failed to load stats"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return <StatsCard stats={stats} />;
}
