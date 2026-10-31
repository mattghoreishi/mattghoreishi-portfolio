import type { AgentProductBrief } from "@/types";
import { scoreLabels } from "@/lib/scoring";

export function exportBriefMarkdown(brief: AgentProductBrief) {
  const sections = brief.sections
    .map(
      (section) => `## ${section.title}

Confidence: ${section.confidence}

${section.body}

${section.bullets.map((bullet) => `- ${bullet}`).join("\n")}
`
    )
    .join("\n");

  const sources = brief.sourceRecommendations
    .map((source) => `- ${source.organization}, ${source.title} (${source.year}): ${source.url}`)
    .join("\n");

  return `# ${brief.title}

Generated: ${new Date(brief.generatedAt).toLocaleString()}

Recommendation: ${brief.recommendation}

## Planning checks

These scores are heuristics from the supplied inputs, not measurements of readiness or safety. A higher consequence-profile score means lower modeled consequence.

${Object.entries(brief.scores.subScores).map(([key, value]) => `- ${scoreLabels[key as keyof typeof scoreLabels]}: ${value} / 100`).join("\n")}

${brief.scores.warnings.length ? `Watch points:\n${brief.scores.warnings.map((warning) => `- ${warning}`).join("\n")}\n` : ""}

${sections}

## Related reading

${sources}

## Next steps

${brief.nextSteps.map((step) => `- ${step}`).join("\n")}
`;
}
