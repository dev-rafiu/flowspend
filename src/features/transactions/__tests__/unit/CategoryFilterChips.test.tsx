import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import CategoryFilterChips from "../../components/CategoryFilterChips";

const defaultProps = {
  allCategories: ["food"],
  selectedCategory: "all",
  onCategoryChange: vi.fn(),
  getCategoryLabel: (c: string) => c,
};

describe("CategoryFilterChips", () => {
  beforeEach(() => {
    render(<CategoryFilterChips {...defaultProps} />);
  });

  it("renders the All chip and category chips when there is at least one transaction", () => {
    const chips = screen.getAllByTestId("category-filter-chip");
    expect(chips.length).toBeGreaterThan(0);
  });
});
