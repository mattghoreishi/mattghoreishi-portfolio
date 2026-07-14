import { ArrowDown, ArrowRight } from "lucide-react";

const readinessDimensions = [
  { label: "Behavior", note: "Expected paths" },
  { label: "Failure", note: "Known limits" },
  { label: "Evaluation", note: "Launch evidence" },
  { label: "Control", note: "Human authority" }
];

export function ReadinessGateVisual({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div aria-label="Readiness dimensions: behavior, failure, evaluation, and control" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {readinessDimensions.map((dimension, index) => (
          <div key={dimension.label} className="border-l border-cyan-200/30 pl-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">0{index + 1}</p>
            <p className="mt-1 text-sm font-semibold text-white">{dimension.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <figure aria-label="Product decision moving from demo to readiness to trust" className="relative overflow-hidden rounded-xl border border-cyan-200/20 bg-[#07111f] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-7">
      <div className="editorial-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          {[
            ["Demo", "Capability visible"],
            ["Readiness", "Decision evidence"],
            ["Trust", "Launch confidence"]
          ].map(([label, note], index) => (
            <div key={label} className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
              <div className="min-w-0 rounded-md border border-white/10 bg-[#050914]/80 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">{label}</p>
                <p className="mt-1 text-sm text-slate-400">{note}</p>
              </div>
              {index < 2 && (
                <>
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-cyan-200 sm:block" aria-hidden="true" />
                  <ArrowDown className="h-5 w-5 shrink-0 text-cyan-200 sm:hidden" aria-hidden="true" />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">Readiness gate</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {readinessDimensions.map((dimension, index) => (
              <div key={dimension.label} className="flex items-baseline gap-3 border-l border-cyan-200/30 pl-3">
                <span className="text-xs font-semibold text-cyan-100">0{index + 1}</span>
                <div>
                  <p className="font-semibold text-white">{dimension.label}</p>
                  <p className="text-sm text-slate-400">{dimension.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

export const readinessLayer = [
  {
    label: "Behavior",
    description: "What should the feature do across normal, ambiguous and edge cases?"
  },
  {
    label: "Failure",
    description: "How can it fail, who is affected and how reversible is the outcome?"
  },
  {
    label: "Evaluation",
    description: "What evidence supports launch, and what will be monitored after it?"
  },
  {
    label: "Control",
    description: "Who can review, override, pause or roll back the feature?"
  }
];
