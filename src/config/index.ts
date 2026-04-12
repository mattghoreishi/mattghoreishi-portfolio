import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Matt Ghoreishi | Senior Product Manager in AI, SaaS, and Data Platforms",
  author: "Matt Ghoreishi",
  description:
    "Senior Product Manager based in Hamburg, Germany, with 10+ years of experience across AI, SaaS, platforms, and data-driven products. I build and scale products that connect strategy, execution, and measurable business impact.",
  lang: "en",
  siteLogo: "/matt-small.jpg",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://www.linkedin.com/in/mattghoreishi/" },
    { text: "Medium", href: "https://medium.com/@ghoreishi" },
    { text: "GitHub", href: "https://github.com/mattghoreishi" },
    { text: "X", href: "https://x.com/mahdighoreish" },
  ],
  socialImage: "/matt-big.jpg",
  canonicalURL: "https://mattghoreishi.com",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Matt Ghoreishi",
    specialty: "Senior Product Manager | AI, SaaS, and Data Platforms",
    summary:
      "I build products where AI, data, and business outcomes meet. Over the past 10+ years, I have worked across SaaS, platforms, AI-driven systems, and large-scale digital products, turning ambiguity into execution and helping teams ship products that improve revenue, efficiency, and adoption.",
    email: "sedmgh [at] gmail [dot] com",
  },
  experience: [
    {
      company: "micro1",
      position: "AI Evaluation and Quality Specialist",
      startDate: "Dec 2025",
      endDate: "Present",
      summary: [
        "Work on multimodal evaluation and review workflows for advanced AI systems, with a strong focus on quality, consistency, and edge-case handling.",
        "Contribute to structured QA processes and human-in-the-loop operations in quality-critical AI environments.",
      ],
    },
    {
      company: "Albatec GmbH",
      position: "Product Development Manager",
      startDate: "Jan 2024",
      endDate: "Jun 2025",
      summary: [
        "Owned product direction for industrial monitoring and gas safety solutions, bridging technical execution with commercial goals.",
        "Shipped dashboard and SaaS-oriented product work around monitoring, incident visibility, and predictive maintenance use cases.",
      ],
    },
    {
      company: "Sotoon",
      position: "Director of Product Management",
      startDate: "Sep 2021",
      endDate: "Jan 2023",
      summary: [
        "Led AI product strategy and multi-product roadmaps across cloud and AI services.",
        "Scaled contact center AI and NLP-based solutions for enterprise clients, connecting technical capability to measurable customer and business impact.",
      ],
    },
    {
      company: "Sotoon",
      position: "Senior Product Manager",
      startDate: "Oct 2020",
      endDate: "Sep 2021",
      summary: [
        "Shipped the Contact Center AI MVP and helped turn strong technical capability into a clearer, more repeatable product offering.",
      ],
    },
    {
      company: "Cafe Bazaar",
      position: "Product Development Manager, Payments and VOD",
      startDate: "Oct 2016",
      endDate: "Oct 2020",
      summary: [
        "Led product initiatives across payments and content on one of the region’s largest digital platforms.",
        "Integrated Direct Carrier Billing, contributing to major revenue growth and millions of new paying users.",
      ],
    },
    {
      company: "Cafe Bazaar",
      position: "Product Marketing Manager, Ads Monetization",
      startDate: "Sep 2014",
      endDate: "Oct 2016",
      summary: [
        "Scaled ad monetization and growth initiatives across a high-volume digital ad network.",
      ],
    },
  ],
  projects: [
    {
      name: "Writing on AI Product Execution",
      summary:
        "Practical writing on AI pilots, product strategy, and how to move from hype to measurable business value.",
      linkPreview: "https://medium.com/@ghoreishi",
      linkSource: "https://medium.com/@ghoreishi",
      image: "/matt-big.jpg",
    },
  ],
  about: {
    description: `
      Hi, I’m Matt Ghoreishi, a product leader based in Hamburg, Germany.

      I have spent the past 10+ years building and scaling products across AI, SaaS, platforms, and data-driven systems. My background spans consumer platforms, enterprise AI, monetization, and operational products, with a strong focus on turning complex ideas into practical execution.

      I care about clear thinking, measurable outcomes, strong product storytelling, and products that create real value. Alongside my core work in product, I am also exploring new ideas at the intersection of AI, decision systems, and genomics.

      This site is my base on the internet: part portfolio, part writing hub, and part lab for the next set of tools and experiments I want to bring to life.
    `,
    image: "/matt-big.jpg",
  },
};
