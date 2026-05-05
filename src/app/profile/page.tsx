import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileCard from "@/features/profile/components/ProfileCard";
import StatsCardServer from "@/features/profile/components/StatsCardServer";
import StatsCardSkeleton from "@/features/profile/components/skeletons/StatsCardSkeleton";
import ThemeToggle from "@/features/profile/components/ThemeToggle";
import DeleteAccountDialog from "@/features/profile/components/DeleteAccountDialog";
import CategoriesCard from "@/features/categories/components/CategoriesCard";
import ReplayTourButton from "@/features/onboarding/components/ReplayTourButton";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || null;
  const email = user.emailAddresses[0]?.emailAddress ?? "";
  const memberSince = new Date(user.createdAt);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 pb-24 md:py-12 md:pb-12">
      <header>
        <h2 className="text-xl font-semibold text-slate-800 md:text-2xl dark:text-slate-100">
          Profile
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your account at a glance.
        </p>
      </header>

      <ProfileCard
        name={name}
        email={email}
        imageUrl={user.imageUrl ?? null}
        memberSince={memberSince}
      />

      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCardServer />
      </Suspense>

      <CategoriesCard />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>
            Choose how FlowSpend looks. System matches your OS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Getting started</CardTitle>
          <CardDescription>
            Replay the welcome tour to revisit FlowSpend basics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReplayTourButton />
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base text-red-700">Danger zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountDialog />
        </CardContent>
      </Card>
    </div>
  );
}
