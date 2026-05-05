"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImportCsvButton() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleClick = () => fileRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please select a CSV file");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/import/transactions", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Import failed");
        return;
      }

      const { imported, skipped } = data as {
        imported: number;
        skipped: number;
      };

      if (imported === 0) {
        toast.error(`No rows imported (${skipped} skipped)`);
      } else {
        const skippedNote =
          skipped > 0
            ? ` · ${skipped} row${skipped === 1 ? "" : "s"} skipped`
            : "";
        toast.success(
          `Imported ${imported} transaction${imported === 1 ? "" : "s"}${skippedNote}`
        );
        router.refresh();
      }
    } catch {
      toast.error("Import failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={busy}
      >
        <Upload className="h-4 w-4" />
        {busy ? "Importing..." : "Import CSV"}
      </Button>
    </>
  );
}
