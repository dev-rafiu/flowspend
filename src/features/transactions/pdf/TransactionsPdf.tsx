import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

function formatCurrency(amount: number): string {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDate(value: Date): string {
  return value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface TransactionRow {
  id: string;
  note: string | null;
  amount: number;
  type: "income" | "expense";
  categoryLabel: string | null;
  transactionDate: Date;
}

export interface TransactionsPdfProps {
  userName: string;
  userEmail: string;
  generatedAt: Date;
  transactions: TransactionRow[];
}

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, fontFamily: "Helvetica", color: "#0f172a" },
  brand: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  subtitle: { fontSize: 11, color: "#475569", marginBottom: 16 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  metaLabel: { color: "#64748b" },
  metaValue: { fontFamily: "Helvetica-Bold" },
  divider: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 12 },
  summaryGrid: { flexDirection: "row", gap: 8, marginBottom: 16 },
  summaryTile: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 8,
  },
  summaryLabel: { fontSize: 9, color: "#64748b", marginBottom: 4 },
  summaryValue: { fontSize: 13, fontFamily: "Helvetica-Bold" },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#e2e8f0",
  },
  th: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#64748b",
    letterSpacing: 0.5,
  },
  td: { fontSize: 10 },
  cellDate: { width: "18%" },
  cellDesc: { width: "40%", paddingRight: 6 },
  cellCategory: { width: "20%" },
  cellAmount: { width: "22%", textAlign: "right" },
  amountIncome: { color: "#059669" },
  amountExpense: { color: "#dc2626" },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 36,
    right: 36,
    fontSize: 8,
    color: "#94a3b8",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function TransactionsPdf({
  userName,
  userEmail,
  generatedAt,
  transactions,
}: TransactionsPdfProps) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const net = totalIncome - totalExpense;

  return (
    <Document title="Claroo transactions" author="Claroo" creator="Claroo">
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>Claroo</Text>
        <Text style={styles.subtitle}>Transaction statement</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Account</Text>
          <Text style={styles.metaValue}>{userName || userEmail}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Email</Text>
          <Text style={styles.metaValue}>{userEmail}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Generated</Text>
          <Text style={styles.metaValue}>{formatDate(generatedAt)}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Transactions</Text>
          <Text style={styles.metaValue}>{transactions.length}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryGrid}>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={[styles.summaryValue, styles.amountIncome]}>
              ${formatCurrency(totalIncome)}
            </Text>
          </View>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={[styles.summaryValue, styles.amountExpense]}>
              ${formatCurrency(totalExpense)}
            </Text>
          </View>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryLabel}>Net</Text>
            <Text style={styles.summaryValue}>
              {net < 0 ? "-" : ""}${formatCurrency(Math.abs(net))}
            </Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.cellDate]}>Date</Text>
          <Text style={[styles.th, styles.cellDesc]}>Description</Text>
          <Text style={[styles.th, styles.cellCategory]}>Category</Text>
          <Text style={[styles.th, styles.cellAmount]}>Amount</Text>
        </View>

        {transactions.map((t) => {
          const isIncome = t.type === "income";
          return (
            <View key={t.id} style={styles.tableRow} wrap={false}>
              <Text style={[styles.td, styles.cellDate]}>
                {formatDate(t.transactionDate)}
              </Text>
              <Text style={[styles.td, styles.cellDesc]}>{t.note ?? ""}</Text>
              <Text style={[styles.td, styles.cellCategory]}>
                {t.categoryLabel ?? "—"}
              </Text>
              <Text
                style={[
                  styles.td,
                  styles.cellAmount,
                  isIncome ? styles.amountIncome : styles.amountExpense,
                ]}
              >
                {isIncome ? "+" : "-"}${formatCurrency(t.amount)}
              </Text>
            </View>
          );
        })}

        <View style={styles.footer} fixed>
          <Text>Generated by Claroo</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
