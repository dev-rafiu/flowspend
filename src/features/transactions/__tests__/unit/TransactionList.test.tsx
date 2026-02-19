import { describe, it, expect, vi } from "vitest";
import TransactionList from "../../components/TransactionList";
import { render, screen } from "@testing-library/react";
import { Transaction } from "../../types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

const mockTransaction: Transaction = {
  id: "1",
  text: "Test Transaction",
  amount: 100,
  category: "food",
  userId: "user-1",
  createdAt: new Date(),
  transactionDate: new Date(),
};

const defaultProps = {
  transactions: [mockTransaction],
  error: undefined,
};

describe("TransactionList", () => {
  it("renders correctly the header title when there is at least one transaction", () => {
    render(<TransactionList {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Transactions");
  });

  it("renders the empty state when there are no transactions", () => {
    render(<TransactionList transactions={[]} error={undefined} />);
    expect(screen.getByText("No transactions yet")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Start tracking your expenses and income by adding your first transaction"
      )
    ).toBeInTheDocument();
  });
});
