"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { SortOption, TransactionsPage } from "../types";

interface GetTransactionsParams {
  cursor?: string;
  limit?: number;
  search?: string;
  category?: string;
  sort?: SortOption;
}

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;

type OrderByEntry = Record<string, "asc" | "desc">;

const ORDER_BY: Record<SortOption, OrderByEntry[]> = {
  "date-desc": [{ transactionDate: "desc" }, { id: "desc" }],
  "date-asc": [{ transactionDate: "asc" }, { id: "asc" }],
  "amount-desc": [{ amount: "desc" }, { id: "desc" }],
  "amount-asc": [{ amount: "asc" }, { id: "asc" }],
  category: [{ category: "asc" }, { id: "asc" }],
};

export default async function getTransactions(
  params: GetTransactionsParams = {}
): Promise<{ page?: TransactionsPage; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "User not found" };

  const limit = Math.min(
    Math.max(params.limit ?? DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );
  const sort = params.sort ?? "date-desc";
  const orderBy = ORDER_BY[sort] ?? ORDER_BY["date-desc"];

  const search = params.search?.trim();
  const category =
    params.category && params.category !== "all" ? params.category : undefined;

  try {
    const items = await db.transaction.findMany({
      where: {
        userId,
        ...(category ? { category } : {}),
        ...(search
          ? { text: { contains: search, mode: "insensitive" } }
          : {}),
      },
      orderBy,
      take: limit + 1,
      ...(params.cursor
        ? { cursor: { id: params.cursor }, skip: 1 }
        : {}),
    });

    const hasMore = items.length > limit;
    const trimmed = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? trimmed[trimmed.length - 1].id : null;

    return { page: { transactions: trimmed, nextCursor } };
  } catch {
    return { error: "Failed to load transactions" };
  }
}
