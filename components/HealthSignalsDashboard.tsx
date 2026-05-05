"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HealthSignal } from "@/types";

export function HealthSignalsDashboard({ signals }: { signals: HealthSignal[] }) {
  const data = signals
    .filter((signal) => signal.selected)
    .slice(0, 8)
    .map((signal, index) => ({
      name: signal.label.replace(" rate", ""),
      readiness: 78 - index * 4
    }));

  if (!data.length) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
        Select health signals to see the monitoring preview.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">Health Dashboard Preview</h3>
        <p className="text-xs text-muted-foreground">Illustrative readiness view based on selected metrics.</p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(21,35,48,0.12)" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-18} textAnchor="end" height={70} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="readiness" fill="#287b75" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
