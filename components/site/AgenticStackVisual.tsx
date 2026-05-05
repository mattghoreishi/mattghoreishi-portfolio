import { stackLayers } from "@/data/site";

export function AgenticStackVisual() {
  return (
    <div
      role="img"
      aria-label="Diagram of the Agentic Product Stack layers"
      className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#07111f] p-5 shadow-[0_28px_90px_rgba(6,182,212,0.11)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(34,211,238,0.16),transparent_30%)]" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Product system</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Designed autonomy stack</h3>
          </div>
          <span className="rounded-full border border-blue-300/20 px-3 py-1 text-xs font-semibold text-blue-100">
            10 layers
          </span>
        </div>
        <div className="grid gap-2">
          {stackLayers.map((layer, index) => (
            <div
              key={layer}
              className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-slate-100">{layer}</span>
              <span className="h-2 w-16 rounded-full bg-slate-800">
                <span className="block h-2 rounded-full bg-cyan-300" style={{ width: `${92 - index * 5}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
