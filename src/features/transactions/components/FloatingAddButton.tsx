"use client";

import { Plus } from "lucide-react";
import AddTransactionDrawer from "./AddTransactionDrawer";

const FloatingAddButton = () => {
  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40">
      <AddTransactionDrawer>
        <button
          className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Add Transaction"
        >
          <Plus className="w-6 h-6" />
        </button>
      </AddTransactionDrawer>
    </div>
  );
};

export default FloatingAddButton;
