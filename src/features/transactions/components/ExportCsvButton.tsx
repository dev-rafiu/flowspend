import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
}

export default function ExportCsvButton({ disabled = false }: Props) {
  if (disabled) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled
        title="Add a transaction to enable export"
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="sm">
      <a href="/api/export/transactions" download>
        <Download className="h-4 w-4" />
        Export CSV
      </a>
    </Button>
  );
}
