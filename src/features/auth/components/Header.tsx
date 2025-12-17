"use client";

import { UserButton } from "@clerk/nextjs";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
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
    <header className="dashboard-header sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-0 gap-4 max-w-7xl mx-auto">
        <Logo href="/dashboard" />

        {/* navigation links - visible on desktop, centered */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-slate-900" : "text-slate-500"
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
