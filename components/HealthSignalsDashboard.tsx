import type { HealthSignal } from "@/types";

export function HealthSignalsDashboard({ signals }: { signals: HealthSignal[] }) {
  const selectedSignals = signals.filter((signal) => signal.selected);

  if (!selectedSignals.length) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
        Select health signals to build your monitoring plan.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Monitoring plan</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {selectedSignals.length} {selectedSignals.length === 1 ? "signal" : "signals"} selected.
          These are your planned thresholds; no live measurements are connected.
        </p>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        {selectedSignals.map((signal) => (
          <div key={signal.id} className="min-w-0 rounded-md border border-border p-3">
            <dt className="break-words text-sm font-semibold">{signal.label}</dt>
            <dd className="mt-2 break-words text-sm leading-6 text-muted-foreground">
              <span className="block text-xs">Planned threshold</span>
              {signal.threshold.trim() || "Threshold not set"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
