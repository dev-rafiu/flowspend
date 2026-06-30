import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import TransactionsPdf from "@/features/transactions/pdf/TransactionsPdf";

const MAX_TRANSACTIONS = 1000;

type Row = {
  id: string;
  note: string | null;
  amount: number | string;
  type: "income" | "expense";
  transaction_date: string;
  category: { label: string } | { label: string }[] | null;
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const [{ data: profile }, { data: transactions, error }] = await Promise.all([
    supabase
      .from("profiles")
      .select("name, email")
      .eq("id", user.id)
      .single<{ name: string | null; email: string }>(),
    supabase
      .from("transactions")
      .select(
        "id, note, amount, type, transaction_date, category:categories(label)"
      )
      .order("transaction_date", { ascending: false })
      .limit(MAX_TRANSACTIONS)
      .returns<Row[]>(),
  ]);

  if (error) return new Response(error.message, { status: 500 });

  const userName = profile?.name ?? "";
  const userEmail = profile?.email ?? user.email ?? "";

  const buffer = await renderToBuffer(
    TransactionsPdf({
      userName,
      userEmail,
      generatedAt: new Date(),
      transactions: (transactions ?? []).map((t) => {
        const cat = Array.isArray(t.category) ? t.category[0] : t.category;
        return {
          id: t.id,
          note: t.note,
          amount:
            typeof t.amount === "string" ? parseFloat(t.amount) : t.amount,
          type: t.type,
          categoryLabel: cat?.label ?? null,
          transactionDate: new Date(t.transaction_date),
        };
      }),
    })
  );

  const today = new Date().toISOString().split("T")[0];

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="claroo-transactions-${today}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
