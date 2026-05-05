"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "flowspend-welcome-seen";

interface UseOnboardingReturn {
  hasSeenWelcome: boolean;
  isReady: boolean;
  markSeen: () => void;
  reset: () => void;
}

export function useOnboarding(): UseOnboardingReturn {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      setHasSeenWelcome(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setIsReady(true);
  }, []);

  const markSeen = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setHasSeenWelcome(true);
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setHasSeenWelcome(false);
  }, []);

  return { hasSeenWelcome, isReady, markSeen, reset };
}
