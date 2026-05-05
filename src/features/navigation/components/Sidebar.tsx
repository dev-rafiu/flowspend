"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowLeftRight, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/transactions",
      icon: ArrowLeftRight,
      label: "Transactions",
    },
    {
      href: "/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
    {
      href: "/profile",
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-200 ease-out lg:flex dark:border-slate-800 dark:bg-slate-900",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-slate-200 dark:border-slate-800",
          isCollapsed ? "justify-center px-2" : "px-4"
        )}
      >
        <Logo href="/dashboard" showText={!isCollapsed} />
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-lg py-3 transition-colors",
                isCollapsed ? "justify-center px-2" : "px-4",
                isActive
                  ? "bg-slate-200 font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
              )}
            >
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-slate-900 dark:bg-slate-100"
                />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive
                    ? "text-slate-900 dark:text-slate-100"
                    : "text-slate-500 dark:text-slate-400"
                )}
              />
              <span
                className={cn(
                  "overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-200",
                  isCollapsed
                    ? "max-w-0 opacity-0"
                    : "max-w-[10rem] opacity-100"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800" />
    </aside>
  );
};

export default Sidebar;
