import type { SourceCard } from "@/types";

export const knowledgeBase: SourceCard[] = [
  {
    id: "openai-agent-tools-2025",
    title: "New tools for building agents",
    organization: "OpenAI",
    year: 2025,
    category: "Agent capability shift",
    type: "Product guidance",
    reliability: "Official documentation",
    url: "https://openai.com/index/new-tools-for-building-agents/",
    keyPoints: [
      "Frames agents as systems that independently accomplish tasks on behalf of users.",
      "Highlights the production gap between model capability and reliable orchestration, tools, tracing, and evaluation.",
      "Useful agents need visibility into tool use and behavior, not only stronger prompts."
    ],
    useInTool: ["Agent Idea", "Action Surface", "Evaluation Gates", "Runtime Health Signals"]
  },
  {
    id: "openai-agentkit-2025",
    title: "Introducing AgentKit",
    organization: "OpenAI",
    year: 2025,
    category: "Agent evaluation",
    type: "Product guidance",
    reliability: "Official documentation",
    url: "https://openai.com/index/introducing-agentkit/",
    keyPoints: [
      "Emphasizes workflow design, connector governance, versioning, deployment, and optimization.",
      "Positions evaluation and performance measurement as core parts of shipping agents.",
      "Supports the mapper emphasis on design artifacts before production implementation."
    ],
    useInTool: ["Evaluation Gates", "Governance Evidence", "Runtime Health Signals"]
  },
  {
    id: "anthropic-effective-agents-2024",
    title: "Building effective agents",
    organization: "Anthropic",
    year: 2024,
    category: "Workflow redesign",
    type: "Engineering guidance",
    reliability: "Official documentation",
    url: "https://www.anthropic.com/research/building-effective-agents",
    keyPoints: [
      "Separates simpler workflows from more autonomous agent patterns.",
      "Encourages choosing the simplest pattern that fits the task.",
      "Useful for deciding when deterministic automation is better than autonomy."
    ],
    useInTool: ["Workflow Fit", "Autonomy Boundaries", "Evaluation Gates"]
  },
  {
    id: "anthropic-evals-2024",
    title: "Building strong evals",
    organization: "Anthropic",
    year: 2024,
    category: "Agent evaluation",
    type: "Evaluation guidance",
    reliability: "Official documentation",
    url: "https://www.anthropic.com/news/building-strong-evals",
    keyPoints: [
      "Evaluation quality depends on representative tasks, clear grading criteria, and iteration.",
      "Edge cases and failure modes should be explicit before broad deployment.",
      "Human review remains important for subjective or high-impact outcomes."
    ],
    useInTool: ["Evaluation Gates", "Human Control Design"]
  },
  {
    id: "microsoft-agents-hub-2026",
    title: "Agents hub",
    organization: "Microsoft Learn",
    year: 2026,
    category: "Enterprise adoption",
    type: "Platform guidance",
    reliability: "Official documentation",
    url: "https://learn.microsoft.com/en-us/agents/",
    keyPoints: [
      "Groups agent work into planning for business value, implementation, adoption, management, and improvement.",
      "Highlights governance, observability, and the choice between no-code, low-code, and pro-code agents.",
      "Supports a product-stack view rather than a model-only view."
    ],
    useInTool: ["Business Value Loop", "Runtime Health Signals", "Governance Evidence"]
  },
  {
    id: "microsoft-secure-agents-2026",
    title: "The secure, open platform for AI and agents",
    organization: "Microsoft Developer",
    year: 2026,
    category: "Governance and risk",
    type: "Platform guidance",
    reliability: "Official documentation",
    url: "https://developer.microsoft.com/en-us/windows/agentic",
    keyPoints: [
      "Describes scoped authorization, isolated agent workspaces, agent identity, and audit trails.",
      "Reinforces the need to separate agent actions from user actions.",
      "Useful for permission maps and governance evidence design."
    ],
    useInTool: ["Action Surface", "Autonomy Boundaries", "Governance Evidence"]
  },
  {
    id: "aws-bedrock-agentcore-2026",
    title: "Amazon Bedrock AgentCore overview",
    organization: "Amazon Web Services",
    year: 2026,
    category: "Governance and risk",
    type: "Platform documentation",
    reliability: "Official documentation",
    url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html",
    keyPoints: [
      "Frames production agents around runtime, memory, gateway, policy, registry, evaluation, and observability services.",
      "Emphasizes permissions, governance, and production monitoring for agents that act across tools and data.",
      "Maps well to action surface, evaluation, and runtime health planning."
    ],
    useInTool: ["Action Surface", "Evaluation Gates", "Runtime Health Signals", "Governance Evidence"]
  },
  {
    id: "stanford-ai-index-2025",
    title: "2025 AI Index Report",
    organization: "Stanford HAI",
    year: 2025,
    category: "Agent capability shift",
    type: "Research report",
    reliability: "Research report",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    keyPoints: [
      "Reports rapid improvement on demanding benchmarks and agent performance in programming tasks under some conditions.",
      "Shows AI is moving from research settings into daily life and regulated domains.",
      "Supports the need to pair capability gains with product, risk, and governance design."
    ],
    useInTool: ["Landing", "Agent Idea", "Governance Evidence"]
  },
  {
    id: "deloitte-state-ai-2026",
    title: "The State of AI in the Enterprise 2026",
    organization: "Deloitte",
    year: 2026,
    category: "Enterprise adoption",
    type: "Survey report",
    reliability: "Research report",
    url: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html",
    keyPoints: [
      "Reports increased enterprise AI access and high expectations for moving projects into production.",
      "Finds productivity gains are common, while deeper business reimagination is less common.",
      "Highlights human oversight, role redesign, and governance as AI becomes structural to work."
    ],
    useInTool: ["Workflow Fit", "Human Control Design", "Business Value Loop"]
  },
  {
    id: "mckinsey-state-ai-2025",
    title: "The State of AI",
    organization: "McKinsey & Company",
    year: 2025,
    category: "ROI and scaling gap",
    type: "Survey report",
    reliability: "Research report",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    keyPoints: [
      "Focuses on value capture, organizational redesign, and operating model changes needed for AI at scale.",
      "Useful for grounding business-value claims in operational metrics instead of novelty.",
      "Supports measuring cost, quality, speed, and adoption outcomes."
    ],
    useInTool: ["Business Value Loop", "Runtime Health Signals"]
  },
  {
    id: "bcg-ai-radar-2026",
    title: "AI Radar",
    organization: "Boston Consulting Group",
    year: 2026,
    category: "Business-value measurement",
    type: "Research and executive guidance",
    reliability: "Research report",
    url: "https://www.bcg.com/publications/collections/ai-radar",
    keyPoints: [
      "Tracks enterprise AI adoption, investment priorities, and value realization patterns.",
      "Supports separating high-potential use cases from unfocused experimentation.",
      "Useful for adding a business-value loop to agent proposals."
    ],
    useInTool: ["Business Value Loop", "Landing"]
  },
  {
    id: "gartner-cancel-forecast-2025",
    title: "Gartner predicts over 40% of agentic AI projects will be canceled by end of 2027",
    organization: "Gartner",
    year: 2025,
    category: "ROI and scaling gap",
    type: "Analyst forecast",
    reliability: "Analyst forecast",
    url: "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",
    keyPoints: [
      "Forecasts cancellations driven by high costs, unclear business value, and inadequate risk controls.",
      "Warns that many use cases marketed as agentic may not require agentic implementations.",
      "Recommends focusing on clear ROI and the right use cases."
    ],
    useInTool: ["Workflow Fit", "Risk Shape", "Business Value Loop"]
  },
  {
    id: "nist-ai-rmf-2023",
    title: "AI Risk Management Framework 1.0",
    organization: "NIST",
    year: 2023,
    category: "Governance and risk",
    type: "Risk framework",
    reliability: "Regulatory guidance",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    keyPoints: [
      "Provides a voluntary framework to manage AI risks to individuals, organizations, and society.",
      "Uses govern, map, measure, and manage functions for trustworthy AI risk work.",
      "Supports evidence checklists, monitoring, and accountable ownership."
    ],
    useInTool: ["Risk Shape", "Governance Evidence", "Damage Control and Rollback"]
  },
  {
    id: "owasp-llm-top-10-2025",
    title: "OWASP Top 10 for LLM Applications 2025",
    organization: "OWASP Gen AI Security Project",
    year: 2025,
    category: "Security and prompt injection",
    type: "Security framework",
    reliability: "Security framework",
    url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
    keyPoints: [
      "Identifies prompt injection, sensitive information disclosure, improper output handling, excessive agency, and other LLM app risks.",
      "Defines excessive agency as a risk when an LLM-based system has too much access or autonomy.",
      "Supports tool permissions, autonomy boundaries, and security evals."
    ],
    useInTool: ["Action Surface", "Autonomy Boundaries", "Evaluation Gates", "Governance Evidence"]
  },
  {
    id: "eu-ai-act-2026",
    title: "AI Act",
    organization: "European Commission",
    year: 2026,
    category: "Governance and risk",
    type: "Regulatory guidance",
    reliability: "Regulatory guidance",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    keyPoints: [
      "Uses a risk-based legal framework for AI developers and deployers.",
      "Prioritizes safety, fundamental rights, human-centric AI, transparency, and obligations for high-risk uses.",
      "Useful for early governance screening, especially for customer-facing and high-impact domains."
    ],
    useInTool: ["Governance Evidence", "Human Control Design", "Risk Shape"]
  }
];

export function sourcesForStep(step: string) {
  return knowledgeBase.filter((source) =>
    source.useInTool.some((usage) => usage.toLowerCase().includes(step.toLowerCase()))
  );
}
