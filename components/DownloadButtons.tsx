"use client";

import { Download, FileJson, FileText, Printer } from "lucide-react";
import type { AgentProductBrief, MapperState } from "@/types";
import { Button } from "@/components/ui/button";
import { exportBriefMarkdown } from "@/lib/exportMarkdown";
import { exportBriefJson } from "@/lib/exportJson";
import { printBriefAsPdf } from "@/lib/exportPdf";

function downloadFile(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function DownloadButtons({
  brief,
  state,
  onDownload
}: {
  brief: AgentProductBrief;
  state: MapperState;
  onDownload?: (kind: string) => void;
}) {
  const safeName = (brief.title || "agent-product-brief").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="no-print flex flex-wrap gap-2">
      <Button
        type="button"
        onClick={() => {
          printBriefAsPdf();
          onDownload?.("pdf");
        }}
      >
        <Printer className="h-4 w-4" />
        Save as PDF
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          downloadFile(`${safeName}.md`, exportBriefMarkdown(brief), "text/markdown");
          onDownload?.("markdown");
        }}
      >
        <FileText className="h-4 w-4" />
        Markdown
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          downloadFile(`${safeName}.json`, exportBriefJson(brief, state), "application/json");
          onDownload?.("json");
        }}
      >
        <FileJson className="h-4 w-4" />
        JSON
      </Button>
      <Button type="button" variant="ghost" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <Download className="h-4 w-4" />
        Back to top
      </Button>
    </div>
  );
}
