import type { AutonomyAction } from "@/types";
import { Badge } from "@/components/ui/badge";

export function AutonomyBoundaryMap({ actions }: { actions: AutonomyAction[] }) {
  if (!actions.length) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
        Add a few actions to see the autonomy boundary map. Start with the riskiest action first.
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-lg border border-border bg-card p-4">
      {actions.map((action) => (
        <div key={action.id} className="grid gap-2 rounded-md border border-border p-3 md:grid-cols-[1fr_220px]">
          <div>
            <p className="text-sm font-semibold">{action.action}</p>
            <p className="mt-1 text-xs text-muted-foreground">{action.rationale || "No rationale added yet"}</p>
          </div>
          <Badge className="w-fit self-start">{action.level}</Badge>
        </div>
      ))}
    </div>
  );
}
