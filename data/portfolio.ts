import careerRecords from "./career.json";

export const career = careerRecords;

export const selectedCases = [
  {
    number: "01",
    slug: "contact-center-ai",
    company: "Sotoon",
    category: "Case study · Enterprise AI",
    role: "My role: discovery, product definition, pricing, and cross-team delivery.",
    title: "Contact Center AI",
    summary:
      "Which calls should a quality manager review next? Two weeks with two quality managers helped turn speech and language capabilities into a review workflow.",
    decision: "Includes an original 2020 prototype and a working reconstruction with synthetic calls.",
    metric: "35% improvement",
    metricLabel: "in review and reporting throughput, a historical team result.",
    linkLabel: "Read the case",
  },
  {
    number: "02",
    slug: "industrial-gas-monitoring",
    company: "Albatec",
    category: "Project note · Industrial software",
    role: "My role: product planning and development, working with sales and customers on pilots.",
    title: "Industrial gas monitoring",
    summary:
      "Bringing sensor readings, dashboards, alerts, and reporting into a cloud software product for industrial gas monitoring.",
    decision: "A recent project record covering the software workflow and the connection to physical equipment.",
    metric: "2024–2025",
    metricLabel: "Product development at Albatec, from platform planning to customer pilots.",
    linkLabel: "Read the project note",
  },
  {
    number: "03",
    slug: "inline-apps-to-video",
    company: "Cafe Bazaar",
    category: "Case study · Consumer products",
    role: "My role: built Inline Apps and led the decision to focus on video.",
    title: "From Inline Apps to video",
    summary:
      "The platform had reached five million monthly users. Looking at retention by category raised a harder question: which parts deserved more investment?",
    decision: "The choice to narrow a broad platform to one use case, and what that meant giving up.",
    metric: "11M+",
    metricLabel: "monthly active users reached by the later video product.",
    linkLabel: "Read the case",
  },
  {
    number: "04",
    slug: "direct-carrier-billing",
    company: "Cafe Bazaar",
    category: "Project note · Payments",
    role: "My role: led the initiative across product, operator partnerships, and delivery.",
    title: "Direct Carrier Billing",
    summary:
      "Letting customers charge app purchases to their mobile account, with a billing channel spanning the marketplace and two mobile operators.",
    decision: "A short account of the initiative’s scope and results.",
    metric: "5M+",
    metricLabel: "new paying users reached through the initiative.",
    linkLabel: "Read the project note",
  },
] as const;
