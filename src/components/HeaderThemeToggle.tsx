"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const ORDER = ["light", "dark", "system"] as const;
type ThemeKey = (typeof ORDER)[number];

const ICONS: Record<ThemeKey, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const NEXT_LABEL: Record<ThemeKey, string> = {
  light: "Switch to dark theme",
  dark: "Switch to system theme",
  system: "Switch to light theme",
};

export default function HeaderThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current: ThemeKey = mounted
    ? ORDER.includes(theme as ThemeKey)
      ? (theme as ThemeKey)
      : "light"
    : "light";

  const Icon = ICONS[current];

  const cycle = () => {
    const idx = ORDER.indexOf(current);
    setTheme(ORDER[(idx + 1) % ORDER.length]);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={NEXT_LABEL[current]}
      title={NEXT_LABEL[current]}
      className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
