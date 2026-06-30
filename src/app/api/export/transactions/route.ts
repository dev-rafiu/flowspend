import { createClient } from "@/lib/supabase/server";

const escapeCell = (value: string) =>
  /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

type Row = {
  transaction_date: string;
  note: string | null;
  amount: number | string;
  type: "income" | "expense";
  category: { label: string } | { label: string }[] | null;
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("transactions")
    .select("transaction_date, note, amount, type, category:categories(label)")
    .order("transaction_date", { ascending: false })
    .returns<Row[]>();

  if (error) return new Response(error.message, { status: 500 });

  const header = ["Date", "Description", "Category", "Type", "Amount"].join(
    ","
  );
  const rows = (data ?? []).map((t) => {
    const date = new Date(t.transaction_date).toISOString().split("T")[0];
    const cat = Array.isArray(t.category) ? t.category[0] : t.category;
    const amount =
      typeof t.amount === "string" ? parseFloat(t.amount) : t.amount;
    return [
      date,
      escapeCell(t.note ?? ""),
      escapeCell(cat?.label ?? ""),
      t.type,
      amount.toFixed(2),
    ].join(",");
  });

  const csv = [header, ...rows].join("\n");
  const today = new Date().toISOString().split("T")[0];

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="claroo-transactions-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
