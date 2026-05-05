"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export default function SidebarToggle() {
  const { isCollapsed, toggle } = useSidebar();
  const Icon = isCollapsed ? PanelLeftOpen : PanelLeftClose;
  const label = isCollapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={!isCollapsed}
      className="hidden h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:flex dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
