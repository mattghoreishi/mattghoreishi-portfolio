import { CheckCircle2 } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";

const signals = [
  "AI product strategy",
  "SaaS and data platforms",
  "Monetization and growth",
  "Evaluation and quality systems",
  "Dashboards and operational visibility",
  "Product execution across teams"
];

export function LeadershipSnapshot() {
  return (
    <BrandCard className="p-6 md:p-7">
      <div className="rounded-xl border border-cyan-300/20 bg-[#07111f] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Product leadership profile</p>
        <h2 className="mt-4 text-2xl font-semibold text-white">Strategy that survives the handoff to execution.</h2>
        <p className="mt-4 leading-7 text-slate-400">
          I work where product bets need to become usable systems: scoped workflows, clear metrics, quality bars,
          stakeholder alignment, and the operating details that make a launch hold up after the demo.
        </p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {signals.map((signal) => (
          <div key={signal} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
            <span className="text-sm font-medium text-slate-200">{signal}</span>
          </div>
        ))}
      </div>
    </BrandCard>
  );
}
