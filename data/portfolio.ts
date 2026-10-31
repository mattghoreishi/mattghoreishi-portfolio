export const career = [
  {
    company: "Mercor & micro1",
    role: "AI evaluation & product-domain work",
    period: "2025–2026 · Contract projects",
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
    detail:
      "Brought product management to industrial gas monitoring: a cloud platform, sensor dashboards, alerts, reporting, and customer pilots.",
    points: [
      "Planned and developed a gas-monitoring SaaS platform, including alerting and CCTV integration.",
      "Worked on predictive maintenance and dashboards for sensor data.",
      "Partnered with sales and customers on pilots and rollouts.",
    ],
  },
  {
    company: "Sotoon",
    role: "Senior Product Manager → Director of Product",
    period: "Oct 2020–Dec 2022 · Tehran",
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
    category: "AI · Customer discovery · Workflow design",
    title: "Turning speech models into a useful review queue.",
    summary:
      "Speech and language technology was the starting point. Working with quality managers changed the product into a prioritized review queue, with evidence a person could act on.",
    decision: "Focus the product on the reviewer's next decision.",
    metric: "+35%",
    metricLabel: "Historical review / reporting throughput improvement",
    linkLabel: "Read the case & try the reconstruction",
  },
  {
    number: "02",
    slug: "inline-apps-to-video",
    company: "Cafe Bazaar",
    category: "Strategy · Retention · Video",
    title: "Five million users. Still a reason to change course.",
    summary:
      "Inline Apps had reach, but the category-level behavior told a more complicated story. I chose to narrow the bet and focus on video.",
    decision: "Give up breadth to invest in a stronger use case.",
    metric: "11M+",
    metricLabel: "Monthly active users reached by the VOD product",
    linkLabel: "Read the decision story",
  },
  {
    number: "03",
    slug: "direct-carrier-billing",
    company: "Cafe Bazaar",
    category: "Payments · Partnerships · Monetization",
    title: "A payment method that opened up the market.",
    summary:
      "Direct Carrier Billing connected mobile operators with the app marketplace. The work brought product, commercial partnerships, and payment delivery together.",
    decision: "Make paying possible for more customers.",
    metric: "5M+",
    metricLabel: "New paying users reached through the initiative",
    linkLabel: "Read the project overview",
  },
] as const;
