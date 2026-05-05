import { ExternalLink } from "lucide-react";
import { sourcesForStep } from "@/data/knowledgeBase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EvidencePanel({ step }: { step: string }) {
  const sources = sourcesForStep(step).slice(0, 4);

  return (
    <aside className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Evidence cards</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Curated sources, not live AI search. Use them as prompts for sharper product judgment.
        </p>
      </div>
      {sources.map((source) => (
        <Card key={source.id} className="shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-sm">{source.title}</CardTitle>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-primary"
                aria-label={`Open ${source.title}`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{source.organization}</Badge>
              <Badge>{source.year}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {source.keyPoints.slice(0, 2).map((point) => (
                <li key={point} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </aside>
  );
}
