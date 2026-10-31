import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  { id: "workflow", label: "Workflow Fit" },
  { id: "risk", label: "Risk Shape" },
  { id: "actions", label: "Action Surface" },
  { id: "autonomy", label: "Autonomy Boundaries" },
  { id: "evals", label: "Evaluation Gates" },
  { id: "human", label: "Human Control Design" },
  { id: "health", label: "Runtime Health Signals" },
  { id: "rollback", label: "Damage Control and Rollback" },
  { id: "governance", label: "Governance Evidence" },
  { id: "value", label: "Business Value Loop" }
];

export function StackDiagram({ completed = [] }: { completed?: string[] }) {
  return (
    <ol className="grid gap-2" aria-label="Module completion">
      {layers.map((layer) => {
        const active = completed.includes(layer.id);
        return (
          <li
            key={layer.id}
            className={cn(
              "flex items-center justify-between rounded-md border px-3 py-2 text-sm transition",
              active ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"
            )}
          >
            <span className="font-semibold">{layer.label}</span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs">
              {active && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
              {active ? "Saved" : "Not saved"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
