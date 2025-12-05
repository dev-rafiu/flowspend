"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, BarChart3 } from "lucide-react";
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
      icon: List,
      label: "Transactions",
    },
    {
      href: "/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 md:hidden safe-area-inset-bottom">
      <div className="flex items-end justify-around h-16 px-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon
                className={cn("w-5 h-5 mb-1", isActive && "text-slate-900")}
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
