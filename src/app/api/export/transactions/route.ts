import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const escapeCell = (value: string) =>
  /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { transactionDate: "desc" },
    select: {
      transactionDate: true,
      text: true,
      category: true,
      amount: true,
    },
  });

  const header = ["Date", "Description", "Category", "Amount"].join(",");
  const rows = transactions.map((t) => {
    const date = new Date(t.transactionDate).toISOString().split("T")[0];
    return [
      date,
      escapeCell(t.text),
      escapeCell(t.category ?? ""),
      t.amount.toString(),
    ].join(",");
  });

  const csv = [header, ...rows].join("\n");
  const today = new Date().toISOString().split("T")[0];

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="flowspend-transactions-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
