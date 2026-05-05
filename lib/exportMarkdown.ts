import type { AgentProductBrief } from "@/types";

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

## Sub-scores

- Workflow Fit: ${brief.scores.subScores.workflowFit}
- Risk Shape: ${brief.scores.subScores.riskShape}
- Autonomy Readiness: ${brief.scores.subScores.autonomyReadiness}
- Evaluation Maturity: ${brief.scores.subScores.evaluationMaturity}
- Human Control Strength: ${brief.scores.subScores.humanControlStrength}
- Runtime Monitoring Readiness: ${brief.scores.subScores.runtimeMonitoringReadiness}
- Governance Evidence: ${brief.scores.subScores.governanceEvidence}
- Business Value Confidence: ${brief.scores.subScores.businessValueConfidence}

${sections}

## Source-backed recommendations

${sources}

## Next steps

${brief.nextSteps.map((step) => `- ${step}`).join("\n")}
`;
}
