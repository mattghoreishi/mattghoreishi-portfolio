import { AlertTriangle, ChevronDown } from "lucide-react";
import type { AgentProductBrief } from "@/types";
import { scoreLabels } from "@/lib/scoring";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BriefPreview({ brief }: { brief: AgentProductBrief }) {
  const scoreEntries = Object.entries(brief.scores.subScores).map(([key, value]) => ({
    key,
    label: scoreLabels[key as keyof typeof scoreLabels],
    value
  }));
  const scoreContext = "Scores are heuristic checks based on these inputs, not measurements of product readiness or safety. The consequence profile runs in the opposite direction to risk: a higher score means lower modeled consequence.";

  return (
    <section className="brief-print space-y-5">
      <div className="rounded-lg border border-border bg-card p-6 shadow-editorial print-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Agent Product Brief</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal md:text-4xl">{brief.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A working product brief assembled from your answers and built-in guidance.
            </p>
          </div>
          <Badge className="w-fit bg-primary/10 text-primary">{brief.recommendation}</Badge>
        </div>
        {brief.scores.warnings.length > 0 && (
          <div className="mt-5 rounded-md border border-warning-border bg-warning-surface p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-warning">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Watch points
            </h3>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-warning-foreground">
              {brief.scores.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <details className="brief-planning-checks no-print rounded-lg border border-border bg-card">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-4 text-sm hover:bg-muted">
          <span className="font-semibold">Planning checks <span className="ml-2 font-normal text-muted-foreground">{scoreEntries.length} heuristics</span></span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </summary>
        <div className="space-y-4 px-4 pb-4">
          <p className="text-sm leading-6 text-muted-foreground">{scoreContext}</p>
          <div className="brief-score-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {scoreEntries.map((score) => (
              <Card key={score.key} className="border-0 bg-background shadow-none">
                <CardContent className="p-4">
                  <p className="min-h-10 text-xs font-semibold leading-5 text-muted-foreground">{score.label}</p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-2xl font-semibold tabular-nums">{score.value}</span>
                    <span className="mb-1 text-xs text-muted-foreground">/ 100</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-muted" aria-hidden="true">
                    <div className="h-2 rounded-full bg-foreground/45" style={{ width: `${score.value}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </details>

      {/* A print-only list preserves every check when the disclosure is closed. */}
      <div className="brief-planning-print">
        <h3>Planning checks</h3>
        <p>{scoreContext}</p>
        <dl>
          {scoreEntries.map((score) => (
            <div key={score.key}>
              <dt>{score.label}</dt>
              <dd>{score.value} / 100</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="space-y-4">
        {brief.sections.map((section) => (
          <Card key={section.title} className="print-card shadow-none">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge>{section.confidence}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
              <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 rounded-md bg-muted/55 p-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="print-card shadow-none">
        <CardHeader>
          <CardTitle>Related reading</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {brief.sourceRecommendations.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border p-4 transition hover:border-primary"
            >
              <p className="text-sm font-semibold">{source.organization}</p>
              <p className="mt-1 text-sm text-muted-foreground">{source.title}</p>
            </a>
          ))}
        </CardContent>
      </Card>

      <Card className="print-card shadow-none">
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-2 text-sm md:grid-cols-2">
            {brief.nextSteps.map((step, index) => (
              <li key={step} className="rounded-md bg-muted/55 p-3">
                <span className="font-semibold">{index + 1}. </span>
                {step}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}
