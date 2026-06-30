import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const MAX_BYTES = 1_000_000; // 1MB

interface ImportError {
  row: number;
  reason: string;
}

interface ParsedRow {
  note: string;
  amount: number;
  type: "income" | "expense";
  category_label: string | null;
  transaction_date: string;
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      cells.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells;
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File))
    return Response.json({ error: "No file uploaded" }, { status: 400 });

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "File too large (max 1MB)" },
      { status: 400 }
    );
  }

  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return Response.json(
      { error: "CSV must have a header row and at least one data row" },
      { status: 400 }
    );
  }

  const records: ParsedRow[] = [];
  const errors: ImportError[] = [];

  // Expected columns: Date, Description, Category, Type, Amount
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    if (cells.length < 5) {
      errors.push({
        row: i + 1,
        reason:
          "Not enough columns (expected Date, Description, Category, Type, Amount)",
      });
      continue;
    }

    const [dateStr, descRaw, categoryRaw, typeRaw, amountStr] = cells;
    const description = descRaw.trim();
    const category = categoryRaw.trim();
    const type = typeRaw.trim().toLowerCase();
    const amount = Math.abs(parseFloat(amountStr));

    if (!description) {
      errors.push({ row: i + 1, reason: "Empty description" });
      continue;
    }

    if (type !== "income" && type !== "expense") {
      errors.push({ row: i + 1, reason: "Type must be income or expense" });
      continue;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      errors.push({ row: i + 1, reason: "Invalid amount" });
      continue;
    }

    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      errors.push({ row: i + 1, reason: "Invalid date" });
      continue;
    }

    records.push({
      note: description.slice(0, 200),
      amount,
      type: type as "income" | "expense",
      category_label: category || null,
      transaction_date: date.toISOString(),
    });
  }

  if (records.length === 0) {
    return Response.json({
      imported: 0,
      skipped: errors.length,
      errors: errors.slice(0, 10),
    });
  }

  // Resolve category labels to IDs in one query
  const labels = Array.from(
    new Set(
      records
        .map((r) => r.category_label)
        .filter((l): l is string => Boolean(l))
    )
  );

  const labelToId = new Map<string, string>();
  if (labels.length > 0) {
    const { data: cats } = await supabase
      .from("categories")
      .select("id, label, type")
      .in("label", labels)
      .returns<{ id: string; label: string; type: "income" | "expense" }[]>();

    for (const c of cats ?? []) {
      labelToId.set(`${c.type}:${c.label.toLowerCase()}`, c.id);
    }
  }

  const { error: insertError } = await supabase.from("transactions").insert(
    records.map((r) => ({
      user_id: user.id,
      note: r.note,
      amount: r.amount,
      type: r.type,
      category_id: r.category_label
        ? (labelToId.get(`${r.type}:${r.category_label.toLowerCase()}`) ?? null)
        : null,
      transaction_date: r.transaction_date,
    }))
  );

  if (insertError)
    return Response.json({ error: insertError.message }, { status: 500 });

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");

  return Response.json({
    imported: records.length,
    skipped: errors.length,
    errors: errors.slice(0, 10),
  });
}
