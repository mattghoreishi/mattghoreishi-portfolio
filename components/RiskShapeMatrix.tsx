import type { MapperState } from "@/types";
import { cn } from "@/lib/utils";

const rows = ["Customer", "Financial", "Operational", "Legal", "Trust"];

export function RiskShapeMatrix({ state }: { state: MapperState }) {
  const values = [
    state.riskShape.customerImpact,
    state.riskShape.financialImpact,
    state.riskShape.operationalImpact,
    state.riskShape.legalImpact,
    state.riskShape.trustImpact
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Risk Shape Matrix</h3>
        <span className="text-xs text-muted-foreground">{state.riskShape.reversibility}</span>
      </div>
      <div className="grid grid-cols-[110px_1fr_1fr_1fr] gap-2 text-xs">
        <span />
        {["Low", "Medium", "High"].map((label) => (
          <span key={label} className="text-center font-semibold text-muted-foreground">
            {label}
          </span>
        ))}
        {rows.map((row, index) => (
          <div className="contents" key={row}>
            <span className="py-2 font-semibold">{row}</span>
            {["Low", "Medium", "High"].map((level) => (
              <span
                key={level}
                className={cn(
                  "h-8 rounded-md border border-border",
                  values[index] === level && level === "Low" && "border-primary bg-primary/20",
                  values[index] === level && level === "Medium" && "border-accent bg-accent/25",
                  values[index] === level && level === "High" && "border-destructive bg-destructive/20"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
