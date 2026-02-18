"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Home",
    },
    {
      href: "/transactions",
      icon: Receipt,
      label: "Transactions",
    },
  ];

  return (
    <nav className="safe-area-inset-bottom fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <div className="flex h-16 items-end justify-around px-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex h-full flex-1 flex-col items-center justify-center transition-colors",
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon
                className={cn("mb-1 h-5 w-5", isActive && "text-slate-900")}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-slate-900" : "text-slate-400"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
