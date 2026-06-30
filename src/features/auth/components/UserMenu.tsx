"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, User as UserIcon } from "lucide-react";
import signOut from "../actions/signOut";

interface Props {
  profile: { name: string | null; image_url: string | null; email: string };
}

export default function UserMenu({ profile }: Props) {
  const [open, setOpen] = useState(false);
  const initials = (profile.name ?? profile.email).slice(0, 1).toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-medium text-slate-700 hover:ring-2 hover:ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:ring-slate-700"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {profile.image_url ? (
          <Image src={profile.image_url} alt="" width={36} height={36} className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="border-b border-slate-100 px-3 py-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            {profile.email}
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
            role="menuitem"
          >
            <UserIcon className="h-4 w-4" />
            Profile
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              role="menuitem"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
