"use client";

import { Plus } from "lucide-react";
import AddTransactionDrawer from "./AddTransactionDrawer";

const AddTransactionButton = () => {
  return (
    <AddTransactionDrawer>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        aria-label="Add Transaction"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Add Transaction</span>
        <span className="sm:hidden">Add</span>
      </button>
    </AddTransactionDrawer>
  );
};

export default AddTransactionButton;
