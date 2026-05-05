import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
}

export default function ExportPdfButton({ disabled = false }: Props) {
  if (disabled) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled
        title="Add a transaction to enable export"
      >
        <FileText className="h-4 w-4" />
        Export PDF
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="sm">
      <a href="/api/export/transactions/pdf" download>
        <FileText className="h-4 w-4" />
        Export PDF
      </a>
    </Button>
  );
}
