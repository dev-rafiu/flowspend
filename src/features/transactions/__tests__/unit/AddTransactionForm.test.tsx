import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddTransactionForm from "../../components/AddTransactionForm";
import { Dialog } from "@/components/ui/dialog";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

vi.mock("../../actions/addTransaction", () => ({
  default: vi.fn(),
}));

describe("AddTransactionForm", () => {
  beforeEach(() => {
    render(
      <Dialog>
        <AddTransactionForm />
      </Dialog>
    );
  });

  it("renders correctly the transaction type toggle", () => {
    const expenseTransactionTypeToggle = screen.getByText("Expense");
    const incomeTransactionTypeToggle = screen.getByText("Income");

    expect(expenseTransactionTypeToggle).toBeInTheDocument();
    expect(incomeTransactionTypeToggle).toBeInTheDocument();
  });
});
