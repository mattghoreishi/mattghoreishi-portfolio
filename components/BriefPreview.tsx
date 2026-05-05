import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { AgentProductBrief } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BriefPreview({ brief }: { brief: AgentProductBrief }) {
  const scoreEntries = Object.entries(brief.scores.subScores).map(([key, value]) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase()),
    value
  }));

  return (
    <section className="brief-print space-y-5">
      <div className="rounded-lg border border-border bg-card p-6 shadow-editorial print-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Agent Product Brief</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-4xl">{brief.title}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A source-backed strategy artifact for deciding where autonomy belongs, where humans stay in control, and how the product proves value.
            </p>
          </div>
          <Badge className="w-fit bg-primary/10 text-primary">{brief.recommendation}</Badge>
        </div>
        {brief.scores.warnings.length > 0 && (
          <div className="mt-5 rounded-md border border-accent/40 bg-accent/15 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <AlertTriangle className="h-4 w-4" />
              Watch points
            </div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {brief.scores.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {scoreEntries.map((score) => (
          <Card key={score.key} className="print-card shadow-none">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-muted-foreground">{score.label}</p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-2xl font-semibold">{score.value}</span>
                <span className="mb-1 text-xs text-muted-foreground">/ 100</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${score.value}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
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
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
          <CardTitle>Source-backed recommendations</CardTitle>
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
