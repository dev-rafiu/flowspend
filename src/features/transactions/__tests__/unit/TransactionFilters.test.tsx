import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionFilters from "../../components/TransactionFilters";
import { render, screen } from "@testing-library/react";
import { SortOption } from "../../types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

const defaultProps = {
  searchQuery: "",
  onSearchChange: vi.fn(),
  selectedCategory: "all",
  onCategoryChange: vi.fn(),
  sortBy: "date-desc" as SortOption,
  onSortChange: vi.fn(),
  allCategories: [
    "food",
    "housing",
    "transportation",
    "utilities",
    "entertainment",
    "other",
  ],
  getCategoryLabel: (c: string) => c,
};

describe("TransactionFilters", () => {
  beforeEach(() => {
    render(<TransactionFilters {...defaultProps} />);
  });

  it("renders correctly the search input", () => {
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders correctly the category select", () => {
    const categorySelect = screen.getByTestId("category-select");
    expect(categorySelect).toBeInTheDocument();
  });

  it("renders correctly the sort select", () => {
    const sortSelect = screen.getByTestId("sort-select");
    expect(sortSelect).toBeInTheDocument();
  });
});
