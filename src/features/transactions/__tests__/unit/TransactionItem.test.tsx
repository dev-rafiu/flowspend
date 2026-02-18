import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TransactionItem from "../../components/TransactionItem";
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

describe("TransactionItem", () => {
  const MOCK_TRANSACTION: Transaction = {
    id: "1",
    text: "Test Transaction",
    amount: 100,
    category: "food",
    userId: "1",
    createdAt: new Date(),
  };

  beforeEach(() => {
    render(<TransactionItem transaction={MOCK_TRANSACTION} />);
  });

  it("renders correctly the transaction category name", () => {
    const categoryName = screen.getByText("Food");
    expect(categoryName).toBeInTheDocument();
  });
});
