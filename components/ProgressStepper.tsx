"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
};

export function ProgressStepper({
  steps,
  current,
  completed,
  onSelect
}: {
  steps: Step[];
  current: string;
  completed: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Brief modules" className="no-print flex gap-2 overflow-x-auto rounded-lg border border-border bg-card p-2 shadow-subtle">
      {steps.map((step) => {
        const isCurrent = step.id === current;
        const isDone = completed.includes(step.id);
        return (
          <button
            key={step.id}
            type="button"
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`${steps.indexOf(step) + 1}. ${step.label}${isDone ? ", completed" : ""}`}
            onClick={() => onSelect(step.id)}
            className={cn(
              "flex min-w-[136px] items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold transition",
              isCurrent ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                isDone ? "border-transparent bg-accent text-accent-foreground" : "border-current"
              )}
            >
              {isDone ? <Check className="h-3 w-3" /> : steps.indexOf(step) + 1}
            </span>
            <span className="leading-tight">{step.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
