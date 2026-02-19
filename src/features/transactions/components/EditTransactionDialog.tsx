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
import EditTransactionForm from "./EditTransactionForm";
import { Transaction } from "../types";

interface EditTransactionDialogProps {
  transaction: Transaction;
  children: React.ReactNode;
  onSuccess?: () => void;
}

const EditTransactionDialog = ({
  transaction,
  children,
  onSuccess,
}: EditTransactionDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>Update your transaction details</DialogDescription>
        </DialogHeader>

        <EditTransactionForm
          transaction={transaction}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionDialog;
