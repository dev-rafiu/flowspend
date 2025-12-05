"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <span className="text-xl font-semibold text-slate-900">
              FlowSpend
            </span>
          </Link>

          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
