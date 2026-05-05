export type Facing = "Internal" | "Customer-facing" | "Both";

export type QualitativeRecommendation =
  | "Explore manually first"
  | "Better as deterministic workflow"
  | "Agent candidate with tight controls"
  | "Agent candidate with human approval"
  | "Low-risk autonomy candidate"
  | "Not ready until risk controls improve";

export type ConfidenceLevel =
  | "Drafted from quick inputs"
  | "Strengthened with user detail"
  | "Needs more evidence"
  | "Ready for team discussion";

export type AutonomyLevel =
  | "Agent can do alone"
  | "Agent can draft, human confirms"
  | "Agent can recommend, human approves"
  | "Agent must escalate"
  | "Agent must never do this";

export type KnowledgeCategory =
  | "Agent capability shift"
  | "Enterprise adoption"
  | "ROI and scaling gap"
  | "Workflow redesign"
  | "Agent evaluation"
  | "Autonomy and excessive agency"
  | "Governance and risk"
  | "Security and prompt injection"
  | "Human-in-the-loop"
  | "Business-value measurement";

export type SourceCard = {
  id: string;
  title: string;
  organization: string;
  year: number;
  category: KnowledgeCategory;
  type: string;
  reliability: "Official documentation" | "Research report" | "Analyst forecast" | "Security framework" | "Regulatory guidance";
  url: string;
  keyPoints: string[];
  useInTool: string[];
};

export type QuickStart = {
  agentName: string;
  workflowDomain: string;
  primaryUser: string;
  facing: Facing;
  mainJob: string;
  systemsTouched: string[];
  biggestRisk: string;
  desiredOutcome: string;
  shortDescription: string;
};

export type WorkflowFit = {
  currentSteps: string[];
  painPoints: string[];
  repetitiveSteps: string[];
  ambiguousSteps: string[];
  decisionPoints: string[];
  humanJudgmentPoints: string[];
  systemsInvolved: string[];
  costOfDelay: string;
  costOfError: string;
};

export type RiskShape = {
  customerImpact: string;
  financialImpact: string;
  operationalImpact: string;
  legalImpact: string;
  trustImpact: string;
  dataSensitivity: string;
  reversibility: string;
  detectionSpeed: string;
  failureOwner: string;
};

export type ActionSurface = {
  readSystems: string[];
  writeSystems: string[];
  tools: string[];
  externalCommunication: boolean;
  recordUpdates: boolean;
  financialActions: boolean;
  customerFacingActions: boolean;
};

export type AutonomyAction = {
  id: string;
  action: string;
  level: AutonomyLevel;
  rationale: string;
};

export type EvaluationGates = {
  goodOutcome: string;
  edgeCases: string[];
  unacceptableFailures: string[];
  testDataAvailability: string;
  reviewerRole: string;
  businessMetric: string;
};

export type HumanControl = {
  reviewPoints: string[];
  approvalOwners: string[];
  escalationTriggers: string[];
  overrideOptions: string[];
  disputeHandling: string;
};

export type HealthSignal = {
  id: string;
  label: string;
  selected: boolean;
  threshold: string;
};

export type DamageControl = {
  reversibilityMechanism: string;
  killSwitchOwner: string;
  pauseConditions: string[];
  customerNotificationPath: string;
  incidentReviewProcess: string;
  correctionPath: string;
};

export type GovernanceEvidence = {
  customerFacingStatus: string;
  personalData: boolean;
  highImpactDomain: boolean;
  versionTracking: boolean;
  evalStorage: boolean;
  approvalLogging: boolean;
  dataAccessLogging: boolean;
};

export type BusinessValueLoop = {
  monthlyTaskVolume: number;
  currentHandlingTime: number;
  currentCostPerTask: number;
  expectedAutomationRate: number;
  expectedHumanReviewRate: number;
  estimatedAiCost: number;
  estimatedFailureCost: number;
  cycleTimeReduction: number;
  qualityImprovement: number;
  valueImpact: string;
};

export type MapperState = {
  quickStart: QuickStart;
  workflowFit: WorkflowFit;
  riskShape: RiskShape;
  actionSurface: ActionSurface;
  autonomyBoundaries: AutonomyAction[];
  evaluationGates: EvaluationGates;
  humanControl: HumanControl;
  healthSignals: HealthSignal[];
  damageControl: DamageControl;
  governanceEvidence: GovernanceEvidence;
  businessValueLoop: BusinessValueLoop;
  completedModules: string[];
};

export type ScoreSet = {
  recommendation: QualitativeRecommendation;
  subScores: {
    workflowFit: number;
    riskShape: number;
    autonomyReadiness: number;
    evaluationMaturity: number;
    humanControlStrength: number;
    runtimeMonitoringReadiness: number;
    governanceEvidence: number;
    businessValueConfidence: number;
  };
  warnings: string[];
};

export type BriefSection = {
  title: string;
  body: string;
  bullets: string[];
  confidence: ConfidenceLevel;
};

export type AgentProductBrief = {
  title: string;
  generatedAt: string;
  recommendation: QualitativeRecommendation;
  scores: ScoreSet;
  sections: BriefSection[];
  sourceRecommendations: SourceCard[];
  nextSteps: string[];
};

export type ExportLead = {
  email: string;
  role?: string;
  companySize?: string;
  mainUseCase?: string;
  consent: boolean;
  contactConsent?: boolean;
  website?: string;
  startedAt: number;
};
