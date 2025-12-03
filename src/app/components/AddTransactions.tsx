"use client";

import { toast } from "sonner";
import addTransaction from "../actions/addTransaction";
import { useRef } from "react";

const AddTransactions = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added successfully");
      formRef.current?.reset();
    }
  };

  return (
    <div className="">
      <h3>Add Transaction</h3>

      <form action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Enter text..."
          />
        </div>

        <div className="form-control">
          <label htmlFor="amount">
            Amount (negative - expense, positive - income)
          </label>

          <input
            type="number"
            name="amount"
            id="amount"
            step="0.01"
            placeholder="Enter text..."
          />
        </div>

        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransactions;
