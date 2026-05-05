import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "@/features/transactions/constants/categories";

const VALID_CATEGORIES = new Set(
  [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map((c) => c.value)
);

const MAX_BYTES = 1_000_000; // 1MB

interface ImportError {
  row: number;
  reason: string;
}

interface ParsedRow {
  text: string;
  amount: number;
  category: string | null;
  transactionDate: Date;
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
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "File too large (max 1MB)" }, { status: 400 });
  }

  const text = await file.text();
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  if (lines.length < 2) {
    return Response.json(
      { error: "CSV must have a header row and at least one data row" },
      { status: 400 }
    );
  }

  const records: ParsedRow[] = [];
  const errors: ImportError[] = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    if (cells.length < 4) {
      errors.push({ row: i + 1, reason: "Not enough columns" });
      continue;
    }

    const [dateStr, descRaw, categoryRaw, amountStr] = cells;
    const description = descRaw.trim();
    const category = categoryRaw.trim();
    const amount = parseFloat(amountStr);

    if (!description) {
      errors.push({ row: i + 1, reason: "Empty description" });
      continue;
    }
    if (!Number.isFinite(amount) || amount === 0) {
      errors.push({ row: i + 1, reason: "Invalid amount" });
      continue;
    }
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      errors.push({ row: i + 1, reason: "Invalid date" });
      continue;
    }

    records.push({
      text: description.slice(0, 200),
      amount,
      category: VALID_CATEGORIES.has(category) ? category : null,
      transactionDate: date,
    });
  }

  if (records.length === 0) {
    return Response.json({
      imported: 0,
      skipped: errors.length,
      errors: errors.slice(0, 10),
    });
  }

  await db.transaction.createMany({
    data: records.map((r) => ({ ...r, userId })),
  });

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");

  return Response.json({
    imported: records.length,
    skipped: errors.length,
    errors: errors.slice(0, 10),
  });
}
