export const siteUrl = "https://mattghoreishi.com";

export const profile = {
  name: "Matt Ghoreishi",
  title: "Senior Product Manager | AI, SaaS, and Data Platforms",
  location: "Hamburg, Germany",
  message: "Product work, writing, and independent projects.",
  email: "sedmgh@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/mattghoreishi/",
  mediumUrl: "https://medium.com/@ghoreishi",
  githubUrl: "https://github.com/mattghoreishi"
};

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
      "What I want a product team to specify before an AI feature ships: expected behavior, failure modes, evaluation, and control.",
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
      "What changes when an AI system can take action, and ten questions for working through autonomy, risk, evaluation, and human control.",
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
      "An essay on the work between an AI pilot and a useful product: data, workflow integration, evaluation, and a reason to keep investing.",
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
