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

describe("TransactionList", () => {
  it("renders the empty state when there are no transactions", () => {
    render(
      <TransactionList
        initialTransactions={[]}
        initialCursor={null}
        allCategories={[]}
        error={undefined}
      />
    );
    expect(screen.getByText("No transactions yet")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Start tracking your expenses and income by adding your first transaction"
      )
    ).toBeInTheDocument();
  });

  it("renders the filters and list when transactions exist", () => {
    render(
      <TransactionList
        initialTransactions={[mockTransaction]}
        initialCursor={null}
        allCategories={["food"]}
        error={undefined}
      />
    );
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });
});
