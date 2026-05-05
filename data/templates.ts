import type { HealthSignal, MapperState } from "@/types";

export const domainTemplates = {
  support: {
    label: "Support",
    systems: ["Zendesk", "Stripe", "Order management", "CRM"],
    jobs: ["Resolve refund requests", "Triage support cases", "Draft customer replies"],
    risks: ["Wrong refund decision", "Incorrect customer promise", "Sensitive data exposure"]
  },
  sales: {
    label: "Sales",
    systems: ["CRM", "Email", "Calendar", "Sales enablement"],
    jobs: ["Qualify inbound leads", "Prepare account briefs", "Draft follow-ups"],
    risks: ["Incorrect customer segmentation", "Off-brand outreach", "Data leakage"]
  },
  finance: {
    label: "Finance",
    systems: ["ERP", "Billing", "Procurement", "Data warehouse"],
    jobs: ["Reconcile invoice exceptions", "Prepare variance explanations", "Flag anomalies"],
    risks: ["Incorrect financial record", "Compliance issue", "Unapproved payment"]
  },
  operations: {
    label: "Operations",
    systems: ["Ticketing", "Inventory", "Scheduling", "ERP"],
    jobs: ["Coordinate exception handling", "Prioritize work queues", "Trigger follow-up tasks"],
    risks: ["Operational disruption", "Wrong priority", "Missed escalation"]
  },
  product: {
    label: "Product",
    systems: ["Analytics", "Feedback tools", "Roadmap", "CRM"],
    jobs: ["Cluster customer feedback", "Draft opportunity briefs", "Detect release risks"],
    risks: ["Misread signal", "Biased prioritization", "Poor traceability"]
  },
  engineering: {
    label: "Engineering",
    systems: ["GitHub", "CI", "Incident tools", "Docs"],
    jobs: ["Triage bugs", "Draft runbooks", "Summarize incidents"],
    risks: ["Unsafe code change", "Misdiagnosis", "Credential exposure"]
  },
  hr: {
    label: "HR",
    systems: ["HRIS", "ATS", "Knowledge base", "Email"],
    jobs: ["Answer policy questions", "Prepare onboarding tasks", "Route candidate queries"],
    risks: ["Employment law issue", "Bias", "Personal data exposure"]
  },
  legal: {
    label: "Legal",
    systems: ["CLM", "Document store", "Matter management", "Email"],
    jobs: ["Draft contract issue list", "Route legal requests", "Track obligation follow-up"],
    risks: ["Unauthorized legal advice", "Privilege exposure", "Missed obligation"]
  },
  procurement: {
    label: "Procurement",
    systems: ["Vendor management", "ERP", "Contract repository", "Email"],
    jobs: ["Review intake requests", "Collect supplier evidence", "Draft sourcing briefs"],
    risks: ["Unapproved vendor action", "Compliance miss", "Budget error"]
  },
  productivity: {
    label: "Internal productivity",
    systems: ["Calendar", "Docs", "Chat", "Task tracker"],
    jobs: ["Coordinate follow-ups", "Summarize decisions", "Prepare weekly updates"],
    risks: ["Private information leak", "Wrong commitment", "No audit trail"]
  },
  other: {
    label: "Other",
    systems: ["Knowledge base", "Workflow system", "Communication channel"],
    jobs: ["Coordinate repeat work", "Draft recommendations", "Escalate exceptions"],
    risks: ["Wrong action", "Weak ownership", "Low measurable value"]
  }
};

export const defaultHealthSignals: HealthSignal[] = [
  { id: "task_completion", label: "Task completion rate", selected: true, threshold: "85% weekly" },
  { id: "escalation", label: "Escalation rate", selected: true, threshold: "15% to 35%" },
  { id: "override", label: "Human override rate", selected: true, threshold: "Under 8%" },
  { id: "wrong_action", label: "Wrong-action rate", selected: true, threshold: "Under 1%" },
  { id: "rework", label: "Rework rate", selected: true, threshold: "Under 5%" },
  { id: "repeat_contact", label: "Repeat contact rate", selected: false, threshold: "No increase" },
  { id: "cost", label: "Cost per task", selected: true, threshold: "Below baseline" },
  { id: "latency", label: "Latency", selected: false, threshold: "P95 under target" },
  { id: "complaints", label: "User complaint rate", selected: true, threshold: "Under baseline" },
  { id: "policy", label: "Policy violation rate", selected: true, threshold: "Zero severe" },
  { id: "tool_failure", label: "Tool-call failure rate", selected: true, threshold: "Under 2%" },
  { id: "drift", label: "Drift indicators", selected: false, threshold: "Review weekly" },
  { id: "confidence", label: "Confidence distribution", selected: false, threshold: "No sudden shift" },
  { id: "rollback", label: "Rollback events", selected: true, threshold: "Review every event" }
];

export const emptyState: MapperState = {
  quickStart: {
    agentName: "",
    workflowDomain: "support",
    primaryUser: "",
    facing: "Internal",
    mainJob: "",
    systemsTouched: [],
    biggestRisk: "",
    desiredOutcome: "",
    shortDescription: ""
  },
  workflowFit: {
    currentSteps: [],
    painPoints: [],
    repetitiveSteps: [],
    ambiguousSteps: [],
    decisionPoints: [],
    humanJudgmentPoints: [],
    systemsInvolved: [],
    costOfDelay: "",
    costOfError: ""
  },
  riskShape: {
    customerImpact: "Medium",
    financialImpact: "Medium",
    operationalImpact: "Medium",
    legalImpact: "Low",
    trustImpact: "Medium",
    dataSensitivity: "Internal business data",
    reversibility: "Partially reversible",
    detectionSpeed: "Same day",
    failureOwner: ""
  },
  actionSurface: {
    readSystems: [],
    writeSystems: [],
    tools: [],
    externalCommunication: false,
    recordUpdates: false,
    financialActions: false,
    customerFacingActions: false
  },
  autonomyBoundaries: [],
  evaluationGates: {
    goodOutcome: "",
    edgeCases: [],
    unacceptableFailures: [],
    testDataAvailability: "",
    reviewerRole: "",
    businessMetric: ""
  },
  humanControl: {
    reviewPoints: [],
    approvalOwners: [],
    escalationTriggers: [],
    overrideOptions: [],
    disputeHandling: ""
  },
  healthSignals: defaultHealthSignals,
  damageControl: {
    reversibilityMechanism: "",
    killSwitchOwner: "",
    pauseConditions: [],
    customerNotificationPath: "",
    incidentReviewProcess: "",
    correctionPath: ""
  },
  governanceEvidence: {
    customerFacingStatus: "Not customer-facing",
    personalData: false,
    highImpactDomain: false,
    versionTracking: false,
    evalStorage: false,
    approvalLogging: false,
    dataAccessLogging: false
  },
  businessValueLoop: {
    monthlyTaskVolume: 0,
    currentHandlingTime: 0,
    currentCostPerTask: 0,
    expectedAutomationRate: 30,
    expectedHumanReviewRate: 50,
    estimatedAiCost: 0.05,
    estimatedFailureCost: 0,
    cycleTimeReduction: 20,
    qualityImprovement: 10,
    valueImpact: ""
  },
  completedModules: []
};

export const sampleSupportRefundAgent: MapperState = {
  ...emptyState,
  quickStart: {
    agentName: "Refund Resolution Copilot",
    workflowDomain: "support",
    primaryUser: "Tier 2 support specialists",
    facing: "Both",
    mainJob: "Review refund requests, gather order context, draft a decision, and prepare the customer response.",
    systemsTouched: ["Zendesk", "Stripe", "Shopify", "CRM", "Policy knowledge base"],
    biggestRisk: "Approving refunds that violate policy or denying valid refunds in a way that damages trust.",
    desiredOutcome: "Cut refund resolution time by 35% while keeping wrong refund decisions below 1%.",
    shortDescription:
      "An agent that reads support tickets and order history, recommends refund outcomes, drafts customer replies, and asks for approval before money moves."
  },
  workflowFit: {
    currentSteps: ["Read ticket", "Check order", "Review policy", "Decide refund path", "Update Stripe", "Reply to customer"],
    painPoints: ["Context switching", "Policy ambiguity", "Slow approvals"],
    repetitiveSteps: ["Order lookup", "Eligibility checklist", "Reply drafting"],
    ambiguousSteps: ["Goodwill exceptions", "Missing delivery evidence"],
    decisionPoints: ["Refund amount", "Policy exception", "Escalate to manager"],
    humanJudgmentPoints: ["Customer tone", "Fraud suspicion", "VIP account handling"],
    systemsInvolved: ["Zendesk", "Stripe", "Shopify", "CRM"],
    costOfDelay: "Customers contact support again and satisfaction drops.",
    costOfError: "Incorrect refunds create margin loss or customer trust issues."
  },
  riskShape: {
    customerImpact: "Medium",
    financialImpact: "Medium",
    operationalImpact: "Low",
    legalImpact: "Low",
    trustImpact: "High",
    dataSensitivity: "Customer personal data and purchase history",
    reversibility: "Partially reversible",
    detectionSpeed: "Same day",
    failureOwner: "Support operations manager"
  },
  actionSurface: {
    readSystems: ["Zendesk", "Shopify", "CRM", "Policy knowledge base"],
    writeSystems: ["Zendesk"],
    tools: ["Ticket summarization", "Policy retrieval", "Refund calculator", "Draft response generator"],
    externalCommunication: false,
    recordUpdates: true,
    financialActions: false,
    customerFacingActions: false
  },
  autonomyBoundaries: [
    {
      id: "draft-refund",
      action: "Draft refund recommendation",
      level: "Agent can do alone",
      rationale: "Recommendation only, no customer or financial action."
    },
    {
      id: "customer-reply",
      action: "Send customer reply",
      level: "Agent can draft, human confirms",
      rationale: "Customer trust impact requires human tone review."
    },
    {
      id: "issue-refund",
      action: "Issue refund in Stripe",
      level: "Agent can recommend, human approves",
      rationale: "Financial action should require explicit approval."
    },
    {
      id: "policy-exception",
      action: "Override refund policy",
      level: "Agent must escalate",
      rationale: "Policy exceptions need manager ownership."
    }
  ],
  evaluationGates: {
    goodOutcome: "Correct eligibility decision, clear rationale, accurate draft response, and no unauthorized financial action.",
    edgeCases: ["Missing tracking data", "VIP customer", "Partial shipment", "Suspected abuse", "Policy changed recently"],
    unacceptableFailures: ["Refund issued without approval", "Personal data leaked", "Policy invented", "Rude or misleading customer response"],
    testDataAvailability: "Past resolved refund tickets with manager-approved outcomes.",
    reviewerRole: "Support QA lead",
    businessMetric: "Refund resolution time and wrong-action rate"
  },
  humanControl: {
    reviewPoints: ["Before customer reply", "Before financial action", "When confidence is low"],
    approvalOwners: ["Tier 2 support specialist", "Support manager for exceptions"],
    escalationTriggers: ["High refund amount", "Legal threat", "Fraud signal", "VIP account"],
    overrideOptions: ["Edit response", "Change decision", "Escalate", "Pause agent for ticket"],
    disputeHandling: "Route disputed outcomes to support QA with ticket, rationale, and tool logs."
  },
  damageControl: {
    reversibilityMechanism: "Void or reverse refund where possible, reopen ticket, and annotate corrected decision.",
    killSwitchOwner: "Support operations manager",
    pauseConditions: ["Wrong-action rate above 1%", "Policy retrieval outage", "Spike in complaints"],
    customerNotificationPath: "Support manager approves corrected message for affected customers.",
    incidentReviewProcess: "Weekly QA review plus immediate review for severe failures.",
    correctionPath: "Update policy source, add eval case, retrain reviewer guidance, and document owner signoff."
  },
  governanceEvidence: {
    customerFacingStatus: "Customer-impacting, human mediated",
    personalData: true,
    highImpactDomain: false,
    versionTracking: true,
    evalStorage: true,
    approvalLogging: true,
    dataAccessLogging: true
  },
  businessValueLoop: {
    monthlyTaskVolume: 2500,
    currentHandlingTime: 14,
    currentCostPerTask: 7.5,
    expectedAutomationRate: 45,
    expectedHumanReviewRate: 65,
    estimatedAiCost: 0.12,
    estimatedFailureCost: 0.35,
    cycleTimeReduction: 35,
    qualityImprovement: 12,
    valueImpact: "Lower support cost, faster refunds, and fewer repeat contacts."
  },
  completedModules: [
    "workflow",
    "risk",
    "actions",
    "autonomy",
    "evals",
    "human",
    "health",
    "rollback",
    "governance",
    "value"
  ]
};
