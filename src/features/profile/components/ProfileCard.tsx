import Image from "next/image";
import { Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  name: string | null;
  email: string;
  imageUrl: string | null;
  memberSince: Date;
}

export default function ProfileCard({
  name,
  email,
  imageUrl,
  memberSince,
}: Props) {
  const memberSinceLabel = memberSince.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  const initials = (name ?? email)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <Card>
      <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name ?? "Profile"}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-600 dark:text-slate-400">
              {initials || "FS"}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
            {name?.trim() || "FlowSpend user"}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              <span className="truncate">{email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Member since {memberSinceLabel}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
