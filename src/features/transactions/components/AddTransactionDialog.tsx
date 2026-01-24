"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTransactionForm from "./AddTransactionForm";
interface AddTransactionDialogProps {
  children: React.ReactNode;
}

const AddTransactionDialog = ({ children }: AddTransactionDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Record your income or expense transaction
          </DialogDescription>
        </DialogHeader>

        <AddTransactionForm onSuccess={handleSuccess} isDialog />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
