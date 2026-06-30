"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface SidebarContextValue {
  isCollapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

const STORAGE_KEY = "claroo-sidebar-collapsed";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") setIsCollapsed(true);
    } catch {
      // ignore (private mode, etc.)
    }
  }, []);

  const toggle = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}
