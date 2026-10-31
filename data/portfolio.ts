export const career = [
  {
    company: "Mercor & micro1",
    role: "AI evaluation & product-domain work",
    period: "2025–2026 · Contract projects",
    shortDetail: "Contract work in AI evaluation, expert review, and product-domain reasoning.",
    detail:
      "Hands-on evaluation of AI outputs, product reasoning, and quality. This work keeps my product thinking close to what models actually do, including where they fall short.",
    points: [
      "Product-domain evaluation and expert review for Mercor in 2026.",
      "AI evaluation and quality work for micro1 from December 2025.",
    ],
  },
  {
    company: "Albatec",
    role: "Product Development Manager",
    period: "Jan 2024–Jun 2025 · Hamburg",
    shortDetail: "Industrial gas-monitoring software, sensor dashboards, and customer pilots.",
    detail:
      "Brought product management to industrial gas monitoring: a cloud platform, sensor dashboards, alerts, reporting, and customer pilots.",
    points: [
      "Planned and developed a gas-monitoring SaaS platform, including alerting and CCTV integration.",
      "Worked on predictive maintenance and dashboards for sensor data.",
      "Partnered with sales and customers on pilots and rollouts.",
    ],
    href: "/work/industrial-gas-monitoring",
    linkLabel: "The industrial software project note",
  },
  {
    company: "Sotoon",
    role: "Senior Product Manager → Director of Product",
    period: "Oct 2020–Dec 2022 · Tehran",
    shortDetail: "Enterprise AI products; led six PMs in an AI organization of more than 40 people.",
    detail:
      "Moved from individual product ownership to leading product work across AI capabilities and customer solutions. Contact Center AI became a concrete way to put speech and language technology to work.",
    points: [
      "Senior Product Manager until September 2021, then Director of Product.",
      "Led a six-person PM team, including two PMs supporting operational teams, within an AI organization of more than 40 people.",
      "Owned discovery, product definition, cross-team roadmaps, and commercial work for AI solutions.",
    ],
    href: "/work/contact-center-ai",
    linkLabel: "The Contact Center AI story",
  },
  {
    company: "Cafe Bazaar",
    role: "Product Marketing → Product Development Manager",
    period: "Sep 2014–Oct 2020 · Tehran",
    shortDetail: "An Android app marketplace. Six years across advertising, payments, and video.",
    detail:
      "Six years across advertising, payments, distribution, and video in a large consumer app ecosystem. I learned how closely product choices, partnerships, and business models depend on one another.",
    points: [
      "Product Marketing Manager until October 2016, then Product Development Manager.",
      "Led Direct Carrier Billing work with two mobile operators, reaching 5M+ new paying users.",
      "Built Inline Apps and helped refocus the initiative on video; the VOD product reached 11M+ monthly active users.",
    ],
    href: "/work/inline-apps-to-video",
    linkLabel: "Why I narrowed the product",
  },
] as const;

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
