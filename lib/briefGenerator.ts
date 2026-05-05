import { knowledgeBase } from "@/data/knowledgeBase";
import type { AgentProductBrief, BriefSection, ConfidenceLevel, MapperState } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { scoreMapperState } from "@/lib/scoring";

const hasModule = (state: MapperState, id: string) => state.completedModules.includes(id);

function confidence(state: MapperState, module: string, enough: boolean): ConfidenceLevel {
  if (hasModule(state, module) && enough) return "Strengthened with user detail";
  if (hasModule(state, module)) return "Needs more evidence";
  return "Drafted from quick inputs";
}

function join(items: string[], fallback: string) {
  return items.length ? items.join(", ") : fallback;
}

export function generateBrief(state: MapperState): AgentProductBrief {
  const scores = scoreMapperState(state);
  const quick = state.quickStart;
  const monthlyGross =
    state.businessValueLoop.monthlyTaskVolume *
    Math.max(0, state.businessValueLoop.currentCostPerTask - state.businessValueLoop.estimatedAiCost) *
    (state.businessValueLoop.expectedAutomationRate / 100);

  const sections: BriefSection[] = [
    {
      title: "Agent purpose",
      body:
        quick.shortDescription ||
        `${quick.agentName || "This agent"} should help ${quick.primaryUser || "the target user"} ${quick.mainJob || "complete the target workflow"} in ${quick.workflowDomain || "the selected domain"}.`,
      bullets: [
        `Primary user: ${quick.primaryUser || "Not defined yet"}`,
        `Facing: ${quick.facing}`,
        `Desired outcome: ${quick.desiredOutcome || "Not defined yet"}`,
        `Systems touched: ${join(quick.systemsTouched, "Not defined yet")}`
      ],
      confidence: quick.agentName && quick.mainJob ? "Ready for team discussion" : "Drafted from quick inputs"
    },
    {
      title: "Workflow summary",
      body: state.workflowFit.currentSteps.length
        ? `The current workflow moves through ${join(state.workflowFit.currentSteps, "several steps")}. Strong opportunity zones are ${join(state.workflowFit.repetitiveSteps, "repeatable lookup and drafting work")}.`
        : `Start with the smallest repeatable segment of the workflow. The first draft suggests focusing on ${quick.mainJob || "a narrow job"} rather than the whole operating process.`,
      bullets: [
        `Pain points: ${join(state.workflowFit.painPoints, quick.biggestRisk || "Need more discovery")}`,
        `Ambiguous steps: ${join(state.workflowFit.ambiguousSteps, "Not mapped yet")}`,
        `Human judgment points: ${join(state.workflowFit.humanJudgmentPoints, "Not mapped yet")}`,
        `Recommendation: ${scores.recommendation}`
      ],
      confidence: confidence(state, "workflow", state.workflowFit.currentSteps.length > 2)
    },
    {
      title: "Agent vs deterministic workflow decision",
      body:
        scores.recommendation === "Better as deterministic workflow"
          ? "This looks better suited to deterministic automation until the workflow has clearer decision points that need contextual judgment."
          : "The concept can be explored as an agentic workflow if tool permissions, reviews, and eval gates are designed before production.",
      bullets: [
        "Use deterministic automation for stable rules and predictable handoffs.",
        "Use agentic behavior for context gathering, judgment support, multi-step coordination, and exception handling.",
        "Keep irreversible actions behind approval until evidence improves."
      ],
      confidence: confidence(state, "workflow", hasModule(state, "workflow"))
    },
    {
      title: "Risk shape",
      body: `The risk profile is shaped by ${quick.biggestRisk || "the largest perceived failure mode"} with ${state.riskShape.reversibility.toLowerCase()} outcomes and ${state.riskShape.detectionSpeed.toLowerCase()} detection.`,
      bullets: [
        `Customer impact: ${state.riskShape.customerImpact}`,
        `Financial impact: ${state.riskShape.financialImpact}`,
        `Legal or compliance impact: ${state.riskShape.legalImpact}`,
        `Failure owner: ${state.riskShape.failureOwner || "Assign before launch"}`
      ],
      confidence: confidence(state, "risk", Boolean(state.riskShape.failureOwner))
    },
    {
      title: "Action surface",
      body: `The agent should start with read access to ${join(state.actionSurface.readSystems, join(quick.systemsTouched, "target systems"))} and tightly limited write access.`,
      bullets: [
        `Read systems: ${join(state.actionSurface.readSystems, "Use quick-start systems as candidates")}`,
        `Write systems: ${join(state.actionSurface.writeSystems, "None approved yet")}`,
        `Tools: ${join(state.actionSurface.tools, "Retrieval, checklisting, summarization, and draft generation")}`,
        state.actionSurface.financialActions ? "Financial action requested, require explicit approval." : "No direct financial action planned."
      ],
      confidence: confidence(state, "actions", state.actionSurface.readSystems.length > 0)
    },
    {
      title: "Autonomy boundary map",
      body: state.autonomyBoundaries.length
        ? "Autonomy is defined action by action, which makes approval design easier to review."
        : "Autonomy boundaries are not yet mapped. Start by listing the top five actions the agent might take.",
      bullets: state.autonomyBoundaries.length
        ? state.autonomyBoundaries.map((item) => `${item.action}: ${item.level}`)
        : [
            "Recommend safe low-impact actions only.",
            "Draft customer or financial actions for review.",
            "Escalate exceptions, policy conflicts, and high-risk cases."
          ],
      confidence: confidence(state, "autonomy", state.autonomyBoundaries.length > 2)
    },
    {
      title: "Evaluation gates",
      body: state.evaluationGates.goodOutcome
        ? state.evaluationGates.goodOutcome
        : "The next evidence step is to define what a good outcome means and turn known edge cases into a small golden test set.",
      bullets: [
        `Golden test categories: ${join(state.evaluationGates.edgeCases, "Common case, edge case, policy conflict, low-confidence case")}`,
        `Unacceptable failures: ${join(state.evaluationGates.unacceptableFailures, "Unauthorized action, leaked data, invented policy, missed escalation")}`,
        `Reviewer: ${state.evaluationGates.reviewerRole || "Assign a domain reviewer"}`,
        `Business check: ${state.evaluationGates.businessMetric || quick.desiredOutcome || "Define a measurable operating metric"}`
      ],
      confidence: confidence(state, "evals", Boolean(state.evaluationGates.goodOutcome && state.evaluationGates.reviewerRole))
    },
    {
      title: "Human control design",
      body: "Human control should be designed around approvals, escalation triggers, overrides, and dispute handling, not only a generic review queue.",
      bullets: [
        `Review points: ${join(state.humanControl.reviewPoints, "Before customer impact, before money movement, before record changes")}`,
        `Approval owners: ${join(state.humanControl.approvalOwners, "Name owners before pilot")}`,
        `Escalation triggers: ${join(state.humanControl.escalationTriggers, "High impact, low confidence, policy conflict")}`,
        `Disputes: ${state.humanControl.disputeHandling || "Define where contested outcomes go"}`
      ],
      confidence: confidence(state, "human", state.humanControl.reviewPoints.length > 0)
    },
    {
      title: "Runtime health signals",
      body: "The health dashboard should track task success, human intervention, wrong actions, cost, latency, policy failures, and rollback events.",
      bullets: state.healthSignals
        .filter((metric) => metric.selected)
        .slice(0, 8)
        .map((metric) => `${metric.label}: ${metric.threshold}`),
      confidence: confidence(state, "health", state.healthSignals.filter((metric) => metric.selected).length > 5)
    },
    {
      title: "Damage control plan",
      body: state.damageControl.reversibilityMechanism || "Define how harmful actions are paused, reversed, corrected, and reviewed before production.",
      bullets: [
        `Kill switch owner: ${state.damageControl.killSwitchOwner || "Assign one accountable owner"}`,
        `Pause conditions: ${join(state.damageControl.pauseConditions, "Wrong-action spike, tool outage, policy violation")}`,
        `Customer notification: ${state.damageControl.customerNotificationPath || "Define if customers can be affected"}`,
        `Correction path: ${state.damageControl.correctionPath || "Add root cause, eval case, owner signoff, and policy update"}`
      ],
      confidence: confidence(state, "rollback", Boolean(state.damageControl.killSwitchOwner))
    },
    {
      title: "Governance evidence checklist",
      body: "Governance evidence should make model, prompt, tool, approval, data access, and eval changes reviewable.",
      bullets: [
        state.governanceEvidence.versionTracking ? "Version tracking planned" : "Missing version tracking",
        state.governanceEvidence.evalStorage ? "Eval result storage planned" : "Missing eval result storage",
        state.governanceEvidence.approvalLogging ? "Approval logging planned" : "Missing approval logging",
        state.governanceEvidence.dataAccessLogging ? "Data access logging planned" : "Missing data access logging"
      ],
      confidence: confidence(state, "governance", state.governanceEvidence.versionTracking && state.governanceEvidence.evalStorage)
    },
    {
      title: "Business value loop",
      body:
        state.businessValueLoop.monthlyTaskVolume > 0
          ? `At the current assumptions, the rough monthly gross opportunity is ${formatCurrency(monthlyGross)} before platform, change management, QA, and risk costs.`
          : "The value loop needs task volume, handling time, current cost, automation rate, review rate, and rework assumptions before it can support investment decisions.",
      bullets: [
        `Monthly task volume: ${state.businessValueLoop.monthlyTaskVolume || "Not entered"}`,
        `Expected automation rate: ${state.businessValueLoop.expectedAutomationRate}%`,
        `Expected human review rate: ${state.businessValueLoop.expectedHumanReviewRate}%`,
        `Value narrative: ${state.businessValueLoop.valueImpact || quick.desiredOutcome || "Connect to cost, speed, quality, revenue, retention, or risk reduction"}`
      ],
      confidence: confidence(state, "value", state.businessValueLoop.monthlyTaskVolume > 0)
    }
  ];

  return {
    title: quick.agentName || "Untitled Agent Product Brief",
    generatedAt: new Date().toISOString(),
    recommendation: scores.recommendation,
    scores,
    sections,
    sourceRecommendations: knowledgeBase.filter((source) =>
      ["gartner-cancel-forecast-2025", "nist-ai-rmf-2023", "owasp-llm-top-10-2025", "deloitte-state-ai-2026", "aws-bedrock-agentcore-2026"].includes(source.id)
    ),
    nextSteps: [
      "Run a human-only workflow walkthrough with the target user.",
      "Convert the riskiest actions into explicit approval rules.",
      "Build a small golden test set from real historical cases.",
      "Pilot with read access and draft-only behavior before any write action.",
      "Review value assumptions after the first controlled pilot."
    ]
  };
}
