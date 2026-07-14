import { BrainCircuit, BriefcaseBusiness, ChartNoAxesCombined, Database, LineChart, MessageSquareText, Rocket, ShieldCheck } from "lucide-react";

export const siteUrl = "https://mattghoreishi.com";

export const profile = {
  name: "Matt Ghoreishi",
  title: "Senior Product Manager | AI, SaaS, and Data Platforms",
  location: "Hamburg, Germany",
  message: "I build products where AI, data, and business outcomes meet.",
  linkedinUrl: "https://www.linkedin.com/in/mattghoreishi/",
  mediumUrl: "https://medium.com/@ghoreishi",
  githubUrl: "https://github.com/mattghoreishi"
};

export const credibilityAreas = [
  {
    label: "AI product strategy",
    description: "Turning ambiguous AI opportunities into scoped product bets, evaluation plans, and launch paths.",
    Icon: BrainCircuit
  },
  {
    label: "SaaS and data platforms",
    description: "Designing durable product systems with clear workflows, roles, metrics, and operating models.",
    Icon: BriefcaseBusiness
  },
  {
    label: "Dashboards and visibility",
    description: "Building dashboards, decision layers, and operating views that make product and business health legible.",
    Icon: Database
  },
  {
    label: "Monetization and growth",
    description: "Connecting product strategy to pricing, packaging, adoption, retention, and commercial outcomes.",
    Icon: ChartNoAxesCombined
  },
  {
    label: "AI-enabled workflows",
    description: "Applying AI where workflows, users, risk, quality, and operational value have to work together.",
    Icon: MessageSquareText
  },
  {
    label: "AI evaluation",
    description: "Treating quality, safety, edge cases, human review, and runtime signals as product requirements.",
    Icon: ShieldCheck
  },
  {
    label: "Enterprise AI delivery",
    description: "Bringing strategy, stakeholders, quality, governance, and rollout planning into production delivery.",
    Icon: LineChart
  },
  {
    label: "Execution",
    description: "Moving from strategy to shipped product through prioritization, alignment, and measurable delivery.",
    Icon: Rocket
  }
];

export const experienceThemes = [
  {
    title: "AI and workflow products",
    points: [
      "AI product strategy, roadmap shaping, and MVP planning for workflow-heavy products.",
      "Contact Center AI delivery as one example of applying AI inside real operational processes.",
      "Evaluation, quality, human review, and runtime monitoring treated as product requirements."
    ]
  },
  {
    title: "SaaS and data platforms",
    points: [
      "Gas monitoring SaaS and dashboard work focused on operational visibility and decision support.",
      "Data-heavy product experiences where adoption depends on clarity, trust, and repeatable workflows.",
      "Platform thinking across users, permissions, metrics, and long-term maintainability."
    ]
  },
  {
    title: "Monetization and marketplace growth",
    points: [
      "Direct Carrier Billing product work with revenue impact and cross-functional execution.",
      "VOD, platform, and product growth work across customer experience, distribution, and commercial goals.",
      "Ads monetization growth with attention to product mechanics, measurement, and business outcomes."
    ]
  },
  {
    title: "Product execution and alignment",
    points: [
      "Turning ambiguous business problems into shipped product increments and measurable outcomes.",
      "Working across engineering, design, commercial, operations, and leadership stakeholders.",
      "Balancing strategy, delivery, quality, and adoption instead of optimizing only for demos."
    ]
  }
];

export const projectThemes = [
  {
    title: "Agentic Product Stack Mapper",
    description:
      "A product strategy workspace for turning an AI agent idea into an Agent Product Brief across workflow fit, risk, autonomy, evaluation, governance, and value.",
    href: "/tools/agentic-product-stack-mapper"
  },
  {
    title: "AI pilot to value framework",
    description:
      "A practical lens for deciding which AI pilots deserve production investment based on unique data, workflow integration, evaluation, governance, and business metrics.",
    href: "/writing/from-hype-to-value"
  },
  {
    title: "Operational dashboards and data products",
    description:
      "Product patterns for making complex operational systems easier to monitor, explain, and improve through clear dashboards and decision support.",
    href: "/projects"
  }
];

export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  displayDate: string;
  readingTime: string;
  tags: string[];
  mediumUrl: string;
  summary: string;
  featured: boolean;
};

export const articles: Article[] = [
  {
    slug: "before-i-trust-an-ai-feature",
    title: "Before I Trust an AI Feature",
    subtitle: "Why the PRD needs a readiness layer for behavior, failure, evaluation, and control",
    publishedAt: "2026-06-01",
    displayDate: "June 1, 2026",
    readingTime: "8 min read",
    tags: ["AI Product Management", "AI Evaluation", "Product Readiness", "PRDs"],
    mediumUrl: "https://medium.com/@ghoreishi/before-i-trust-an-ai-feature-863acda2f3f2",
    summary:
      "AI features are not ready when the demo works. They are ready when teams can define expected behavior, understand failure, evaluate quality, and control what happens after launch.",
    featured: true
  },
  {
    slug: "the-agentic-ai-product-gap",
    title: "The Agentic AI Product Gap",
    subtitle: "Why the hard part starts after an agent gets the first task right",
    publishedAt: "2026-05-04",
    displayDate: "May 4, 2026",
    readingTime: "13 min read",
    tags: ["Agentic AI", "Product Management", "AI Products", "Workflows"],
    mediumUrl: "https://medium.com/@ghoreishi/the-agentic-ai-product-gap-c919311393ea",
    summary:
      "A practical argument that agentic AI becomes product work when systems move from answering to acting. The article introduces the Agentic Product Stack as a way to reason about workflow fit, risk, autonomy, evals, monitoring, governance, and value.",
    featured: false
  },
  {
    slug: "from-hype-to-value",
    title: "From Hype to Value: Why Most AI Pilots Fail and How to Ship Real ROI",
    subtitle:
      "Most AI pilots stall before production. The teams that get value tend to connect unique data, workflow integration, rigorous evaluation, and early governance.",
    publishedAt: "2025-09-21",
    displayDate: "Sep 21, 2025",
    readingTime: "7 min read",
    tags: ["AI Strategy", "AI Pilots", "ROI", "Product Execution"],
    mediumUrl:
      "https://medium.com/@ghoreishi/from-hype-to-value-why-most-ai-pilots-fail-and-how-to-ship-real-roi-04d3b8c0a357",
    summary:
      "A pragmatic playbook for moving AI pilots from impressive demos to production systems that affect workflows, metrics, governance, and business outcomes.",
    featured: false
  }
];

export const writingArticles = [...articles].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export function getFeaturedArticle() {
  const featured = articles.filter((article) => article.featured);

  if (featured.length !== 1) {
    throw new Error("Exactly one featured article is required.");
  }

  return featured[0];
}

export function getArticleBySlug(slug: string) {
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    throw new Error(`Unknown article: ${slug}`);
  }

  return article;
}

export const tools = [
  {
    slug: "agentic-product-stack-mapper",
    name: "Agentic Product Stack Mapper",
    description:
      "Turn an AI agent idea into a structured Agent Product Brief across workflow fit, risk, autonomy boundaries, evaluation, governance, and business value.",
    status: "Live",
    href: "/mapper",
    tags: ["AI agents", "Product brief", "Evaluation", "Governance", "Business value"]
  }
];

export const stackLayers = [
  "Workflow Fit",
  "Risk Shape",
  "Action Surface",
  "Autonomy Boundaries",
  "Evaluation Gates",
  "Human Control Design",
  "Runtime Health Signals",
  "Damage Control and Rollback",
  "Governance Evidence",
  "Business Value Loop"
];
