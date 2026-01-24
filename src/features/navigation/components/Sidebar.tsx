"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/transactions",
      icon: Receipt,
      label: "Transactions",
    },
  ];

  return (
    <aside className="dashboard-sidebar sticky top-0 hidden max-h-screen w-64 flex-col border-r">
      <div className="border-b border-slate-200 p-4">
        <Logo href="/dashboard" />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors",
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-white" : "text-slate-500"
                )}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4" />
    </aside>
  );
};

export default Sidebar;
