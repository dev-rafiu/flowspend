"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="dashboard-header sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* logo - visible on mobile, hidden on desktop */}
        <div className="md:hidden">
          <Logo href="/dashboard" />
        </div>

        {/* menu icon - hidden on mobile, visible on desktop */}
        <button
          className="hidden md:block p-2 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <UserButton />
      </div>
    </header>
  );
};

export default Header;
