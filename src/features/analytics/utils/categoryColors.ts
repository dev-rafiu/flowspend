export const CATEGORY_HEX: Record<string, string> = {
  food: "#ea580c",
  grocery: "#2563eb",
  bills: "#9333ea",
  subscriptions: "#4f46e5",
  transport: "#475569",
  shopping: "#db2777",
  entertainment: "#dc2626",
  health: "#e11d48",
  education: "#059669",
  other: "#64748b",
  salary: "#16a34a",
  freelance: "#059669",
  investment: "#2563eb",
  gift: "#db2777",
  refund: "#9333ea",
};

export const FALLBACK_COLOR = "#94a3b8";

export function getCategoryColor(category: string | null | undefined): string {
  if (!category) return FALLBACK_COLOR;
  return CATEGORY_HEX[category] ?? FALLBACK_COLOR;
}
