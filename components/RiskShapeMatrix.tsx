import type { MapperState } from "@/types";

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
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Risk profile</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Your selected impact levels, from Low through Critical. These are
          planning assumptions, not a measured risk assessment.
        </p>
      </div>
      <dl className="divide-y divide-border text-sm">
        {rows.map((row, index) => (
          <div className="flex items-baseline justify-between gap-4 py-3" key={row}>
            <dt className="text-muted-foreground">{row} impact</dt>
            <dd className="font-semibold text-foreground">{values[index]}</dd>
          </div>
        ))}
        <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
          <dt className="text-muted-foreground">Reversibility</dt>
          <dd className="font-semibold text-foreground">{state.riskShape.reversibility}</dd>
        </div>
      </dl>
    </div>
  );
}
