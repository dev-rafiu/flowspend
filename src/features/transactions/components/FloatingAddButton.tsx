"use client";

import { Plus } from "lucide-react";
import AddTransactionDrawer from "./AddTransactionDrawer";

const FloatingAddButton = () => {
  return (
    <div className="fixed right-4 bottom-20 z-40 md:right-8 md:bottom-8">
      <AddTransactionDrawer>
        <button
          className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl"
          aria-label="Add Transaction"
        >
          <Plus className="h-6 w-6" />
        </button>
      </AddTransactionDrawer>
    </div>
  );
};

export default FloatingAddButton;
