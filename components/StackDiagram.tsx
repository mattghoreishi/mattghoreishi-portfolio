import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  "Workflow Fit",
  "Risk Shape",
  "Action Surface",
  "Autonomy Boundaries",
  "Evaluation Gates",
  "Human Control Design",
  "Runtime Health Signals",
  "Damage Control and Rollback",
  "Governance Evidence",
  "Business Value Loop"
];

export function StackDiagram({ completed = [] }: { completed?: string[] }) {
  return (
    <div className="grid gap-2">
      {layers.map((layer, index) => {
        const active = completed.length > index;
        return (
          <div
            key={layer}
            className={cn(
              "flex items-center justify-between rounded-md border px-3 py-2 text-sm transition",
              active ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"
            )}
          >
            <span className="font-semibold">{layer}</span>
            <span className="flex items-center gap-2 text-xs">
              {active ? <CheckCircle2 className="h-4 w-4" /> : `Layer ${index + 1}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
