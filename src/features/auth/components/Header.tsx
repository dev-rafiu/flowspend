"use client";

import { UserButton } from "@clerk/nextjs";
import Logo from "@/components/Logo";
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
    <header className="dashboard-header sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-0">
        <Logo href="/dashboard" />

        {/* navigation links - visible on desktop, centered */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors",
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

        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
