"use client";

import type { AgentProductBrief, MapperState } from "@/types";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { DownloadButtons } from "@/components/DownloadButtons";
import { analyticsEvents, trackEvent } from "@/lib/analytics";

// The existing component name preserves the mapper flow; exports are now local.
export function ExportGate({ state, brief }: { state: MapperState; brief: AgentProductBrief }) {
  return (
    <Card className="no-print border-primary/25 bg-primary/5">
      <CardHeader>
        <h2 className="text-xl font-semibold">Take the brief with you</h2>
        <CardDescription>
          Download a copy to discuss with your team. No email or account needed.
          Your answers stay in this browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DownloadButtons
          brief={brief}
          state={state}
          onDownload={(kind) => trackEvent(analyticsEvents.clickPrimaryCta, {
            cta_name: `download_mapper_${kind}`,
            cta_location: "mapper_export",
            content_type: kind,
          })}
        />
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          PDF opens your browser’s print dialog. Markdown is an editable document;
          JSON includes the brief and your inputs.
        </p>
      </CardContent>
    </Card>
  );
}
