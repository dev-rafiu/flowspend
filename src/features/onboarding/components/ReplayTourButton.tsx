"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import WelcomeModal from "./WelcomeModal";
import { useOnboarding } from "../hooks/useOnboarding";

export default function ReplayTourButton() {
  const [open, setOpen] = useState(false);
  const { markSeen } = useOnboarding();

  const handleClose = () => {
    setOpen(false);
    markSeen();
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <PlayCircle className="h-4 w-4" />
        Replay tour
      </Button>
      <WelcomeModal open={open} onClose={handleClose} />
    </>
  );
}
