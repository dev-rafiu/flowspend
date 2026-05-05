"use client";

import { useEffect, useState } from "react";
import WelcomeModal from "./WelcomeModal";
import { useOnboarding } from "../hooks/useOnboarding";

export default function WelcomeModalGate() {
  const { hasSeenWelcome, isReady, markSeen } = useOnboarding();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isReady && !hasSeenWelcome) setOpen(true);
  }, [isReady, hasSeenWelcome]);

  const handleClose = () => {
    setOpen(false);
    markSeen();
  };

  if (!isReady) return null;

  return <WelcomeModal open={open} onClose={handleClose} />;
}
