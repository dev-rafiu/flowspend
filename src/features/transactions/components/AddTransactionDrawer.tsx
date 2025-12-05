"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddTransactionForm from "./AddTransactionForm";

interface AddTransactionDrawerProps {
  children: React.ReactNode;
}

const AddTransactionDrawer = ({ children }: AddTransactionDrawerProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Transaction</DrawerTitle>
          <DrawerDescription>
            Record your income or expense transaction
          </DrawerDescription>
        </DrawerHeader>

        <AddTransactionForm onSuccess={handleSuccess} />
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;
