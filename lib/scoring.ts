import type { MapperState, QualitativeRecommendation, ScoreSet } from "@/types";

const filled = (value?: string) => Boolean(value && value.trim().length > 0);
const count = (items?: unknown[]) => items?.length ?? 0;

function normalize(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function impactValue(value: string) {
  if (/critical|high/i.test(value)) return 3;
  if (/medium/i.test(value)) return 2;
  if (/low/i.test(value)) return 1;
  return 1.5;
}

export function scoreMapperState(state: MapperState): ScoreSet {
  const workflowFit = normalize(
    20 +
      count(state.workflowFit.repetitiveSteps) * 12 +
      count(state.workflowFit.painPoints) * 8 +
      count(state.workflowFit.systemsInvolved) * 5 -
      count(state.workflowFit.ambiguousSteps) * 5
  );

  const riskLoad =
    impactValue(state.riskShape.customerImpact) +
    impactValue(state.riskShape.financialImpact) +
    impactValue(state.riskShape.operationalImpact) +
    impactValue(state.riskShape.legalImpact) +
    impactValue(state.riskShape.trustImpact);

  const reversibilityBonus = /fully/i.test(state.riskShape.reversibility)
    ? 18
    : /partially/i.test(state.riskShape.reversibility)
      ? 8
      : -12;

  const riskShape = normalize(100 - riskLoad * 9 + reversibilityBonus);

  const riskySurface =
    Number(state.actionSurface.externalCommunication) * 12 +
    Number(state.actionSurface.recordUpdates) * 10 +
    Number(state.actionSurface.financialActions) * 20 +
    Number(state.actionSurface.customerFacingActions) * 18 +
    count(state.actionSurface.writeSystems) * 6;

  const approvals = state.autonomyBoundaries.filter((item) =>
    /human|approve|escalate|never/i.test(item.level)
  ).length;
  const solo = state.autonomyBoundaries.filter((item) => /alone/i.test(item.level)).length;

  const autonomyReadiness = normalize(55 + approvals * 8 - solo * 6 - riskySurface * 0.7);

  const evaluationMaturity = normalize(
    12 +
      Number(filled(state.evaluationGates.goodOutcome)) * 18 +
      count(state.evaluationGates.edgeCases) * 8 +
      count(state.evaluationGates.unacceptableFailures) * 10 +
      Number(filled(state.evaluationGates.testDataAvailability)) * 15 +
      Number(filled(state.evaluationGates.reviewerRole)) * 12 +
      Number(filled(state.evaluationGates.businessMetric)) * 10
  );

  const humanControlStrength = normalize(
    18 +
      count(state.humanControl.reviewPoints) * 12 +
      count(state.humanControl.approvalOwners) * 10 +
      count(state.humanControl.escalationTriggers) * 9 +
      count(state.humanControl.overrideOptions) * 8 +
      Number(filled(state.humanControl.disputeHandling)) * 12
  );

  const runtimeMonitoringReadiness = normalize(
    10 + state.healthSignals.filter((metric) => metric.selected).length * 7
  );

  const governanceEvidence = normalize(
    18 +
      Number(state.governanceEvidence.versionTracking) * 15 +
      Number(state.governanceEvidence.evalStorage) * 15 +
      Number(state.governanceEvidence.approvalLogging) * 15 +
      Number(state.governanceEvidence.dataAccessLogging) * 15 -
      Number(state.governanceEvidence.personalData) * 8 -
      Number(state.governanceEvidence.highImpactDomain) * 12
  );

  const monthlyGross =
    state.businessValueLoop.monthlyTaskVolume *
    Math.max(0, state.businessValueLoop.currentCostPerTask - state.businessValueLoop.estimatedAiCost) *
    (state.businessValueLoop.expectedAutomationRate / 100);

  const businessValueConfidence = normalize(
    15 +
      Number(state.businessValueLoop.monthlyTaskVolume > 0) * 18 +
      Number(state.businessValueLoop.currentHandlingTime > 0) * 12 +
      Number(state.businessValueLoop.currentCostPerTask > 0) * 15 +
      Number(state.businessValueLoop.expectedAutomationRate > 0) * 12 +
      Number(filled(state.businessValueLoop.valueImpact)) * 12 +
      Math.min(monthlyGross / 250, 16)
  );

  const warnings: string[] = [];
  if (riskySurface > 30 && approvals < 2) {
    warnings.push("The action surface is broad, but approval boundaries are still thin.");
  }
  if (evaluationMaturity < 45) {
    warnings.push("Evaluation gates need more evidence before production autonomy.");
  }
  if (state.governanceEvidence.personalData && !state.governanceEvidence.dataAccessLogging) {
    warnings.push("Personal data is involved, but data access logging is not yet planned.");
  }
  if (state.actionSurface.financialActions && !state.governanceEvidence.approvalLogging) {
    warnings.push("Financial actions need approval logging before launch.");
  }
  if (businessValueConfidence < 45) {
    warnings.push("The value case is still too thin for investment review.");
  }

  const average =
    (workflowFit +
      riskShape +
      autonomyReadiness +
      evaluationMaturity +
      humanControlStrength +
      runtimeMonitoringReadiness +
      governanceEvidence +
      businessValueConfidence) /
    8;

  let recommendation: QualitativeRecommendation = "Explore manually first";
  if (workflowFit < 35) recommendation = "Better as deterministic workflow";
  else if (riskShape < 35 || governanceEvidence < 35) recommendation = "Not ready until risk controls improve";
  else if (autonomyReadiness < 50 || humanControlStrength < 55) recommendation = "Agent candidate with human approval";
  else if (average > 72 && riskShape > 65 && riskySurface < 18) recommendation = "Low-risk autonomy candidate";
  else if (average > 58) recommendation = "Agent candidate with tight controls";

  return {
    recommendation,
    subScores: {
      workflowFit,
      riskShape,
      autonomyReadiness,
      evaluationMaturity,
      humanControlStrength,
      runtimeMonitoringReadiness,
      governanceEvidence,
      businessValueConfidence
    },
    warnings
  };
}
