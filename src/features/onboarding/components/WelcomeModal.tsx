"use client";

import { useEffect, useState } from "react";
import { BarChart3, SlidersHorizontal, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Step {
  Icon: typeof Wallet;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    Icon: Wallet,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "Welcome to FlowSpend",
    description:
      "Track every dollar in seconds. Add income and expenses as they happen.",
  },
  {
    Icon: BarChart3,
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
    iconColor: "text-orange-600 dark:text-orange-400",
    title: "See where your money goes",
    description:
      "Get clear breakdowns by category and period so you can spot patterns at a glance.",
  },
  {
    Icon: SlidersHorizontal,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    title: "Make it your own",
    description:
      "Customize categories, switch themes, and import or export your data anytime.",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);

  // Reset back to first step whenever the modal is reopened.
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const Icon = current.Icon;

  const handleNext = () => {
    if (isLast) {
      onClose();
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{current.title}</DialogTitle>
          <DialogDescription>{current.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full",
              current.iconBg
            )}
          >
            <Icon className={cn("h-8 w-8", current.iconColor)} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {current.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {current.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === step
                  ? "w-6 bg-slate-800 dark:bg-slate-200"
                  : "w-1.5 bg-slate-300 dark:bg-slate-700"
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Skip
          </Button>
          <Button type="button" size="sm" onClick={handleNext}>
            {isLast ? "Get started" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
