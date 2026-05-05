import { auth, currentUser } from "@clerk/nextjs/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "@/lib/db";
import TransactionsPdf from "@/features/transactions/pdf/TransactionsPdf";

const MAX_TRANSACTIONS = 1000;

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const [user, transactions] = await Promise.all([
    currentUser(),
    db.transaction.findMany({
      where: { userId },
      orderBy: { transactionDate: "desc" },
      take: MAX_TRANSACTIONS,
      select: {
        id: true,
        text: true,
        amount: true,
        category: true,
        transactionDate: true,
      },
    }),
  ]);

  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ?? "";
  const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";

  const buffer = await renderToBuffer(
    TransactionsPdf({
      userName,
      userEmail,
      generatedAt: new Date(),
      transactions,
    })
  );

  const today = new Date().toISOString().split("T")[0];

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="flowspend-transactions-${today}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
