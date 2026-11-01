"use client";

import { useId } from "react";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
};

export function ProgressStepper({
  steps,
  current,
  completed,
  exampleMode = false,
  onSelect
}: {
  steps: Step[];
  current: string;
  completed: string[];
  exampleMode?: boolean;
  onSelect: (id: string, focusModule?: boolean) => void;
}) {
  const moduleSelectId = useId();
  const detailSteps = steps.filter((step) => !["quick", "brief", "export"].includes(step.id));
  const reviewedCount = detailSteps.filter((step) => completed.includes(step.id)).length;

  return (
    <nav aria-label="Brief modules" className="no-print rounded-lg border border-border bg-card p-3 shadow-subtle">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-1 px-1">
        <p className="text-xs font-semibold text-foreground">Brief modules</p>
        <p className="text-xs text-muted-foreground">
          {reviewedCount} of {detailSteps.length} {exampleMode ? "included in this example" : "marked reviewed"}
        </p>
      </div>
      <div className="lg:hidden">
        <Label htmlFor={moduleSelectId} className="sr-only">Jump to a module</Label>
        <Select id={moduleSelectId} value={current} onChange={(event) => onSelect(event.target.value, false)}>
          {steps.map((step, index) => (
            <option key={step.id} value={step.id}>
              {index + 1}. {step.label}{completed.includes(step.id) ? exampleMode ? " (example included)" : " (reviewed)" : ""}
            </option>
          ))}
        </Select>
      </div>
      <div className="hidden grid-cols-7 gap-1.5 lg:grid">
      {steps.map((step, index) => {
        const isCurrent = step.id === current;
        const isDone = completed.includes(step.id);
        return (
          <button
            key={step.id}
            type="button"
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`${index + 1}. ${step.label}${isDone ? exampleMode ? ", included in example" : ", reviewed" : ""}`}
            onClick={() => onSelect(step.id)}
            className={cn(
              "flex min-h-12 min-w-0 items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors",
              isCurrent ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                isDone ? "border-current" : "border-current opacity-75"
              )}
            >
              {isDone ? <Check className="h-3 w-3" /> : index + 1}
            </span>
            <span className="leading-tight">{step.label}</span>
          </button>
        );
      })}
      </div>
    </nav>
  );
}
