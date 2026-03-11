import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Matt Ghoreishi | Product Leader in AI, Data, and Genomics",
  author: "Matt Ghoreishi",
  description:
    "Product leader based in Hamburg, Germany, with 10+ years of experience across AI, SaaS, platforms, and data-driven products. I build and scale products that connect strategy, execution, and measurable business impact.",
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
  socialImage: "/og-matt.png",
  canonicalURL: "https://mattghoreishi.com",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Matt Ghoreishi",
    specialty: "Senior Product Manager | AI, Data, SaaS, and Genomics",
    summary:
      "I build products at the intersection of AI, data, and business strategy. With 10+ years of experience across product management, platform thinking, and digital innovation, I focus on turning ambiguity into execution, aligning teams around measurable outcomes, and shipping products that create real value.",
    email: "sedmgh [at] gmail [dot] com",
  },
  experience: [
    {
      company: "micro1",
      position: "AI Annotation and Quality Operations",
      startDate: "Recent",
      endDate: "Present",
      summary: [
        "Worked in quality-critical AI annotation and review workflows, contributing to structured evaluation processes and human-in-the-loop systems.",
        "Built strong intuition around model behavior, ambiguity handling, consistency standards, and scalable quality operations.",
        "Deepened hands-on understanding of how AI systems succeed or fail in real operational environments.",
      ],
    },
    {
      company: "Albatec GmbH",
      position: "Product Development Manager",
      startDate: "Hamburg",
      endDate: "Germany",
      summary: [
        "Contributed to product and platform strategy in industrial safety and IoT-related environments, connecting business priorities with practical execution.",
        "Worked on digital product direction, reporting, and solution structuring for industrial monitoring and safety-focused products.",
        "Helped shape product narratives around usability, operational visibility, and business value.",
      ],
    },
    {
      company: "Sotoon",
      position: "Product Manager",
      startDate: "Earlier",
      endDate: "Role",
      summary: [
        "Played a key role in shifting the business from services toward a more scalable AI product direction.",
        "Helped transform the offering into a Contact Center AI product with clearer value, stronger repeatability, and lower operational effort.",
        "Aligned technical work with business outcomes, ensuring the product delivered measurable customer and commercial impact.",
      ],
    },
    {
      company: "Cafe Bazaar",
      position: "Product Manager",
      startDate: "Earlier",
      endDate: "Role",
      summary: [
        "Worked on large-scale digital product initiatives for one of the region’s major consumer platforms.",
        "Contributed to monetization and platform improvements, including Direct Carrier Billing initiatives that drove significant revenue growth.",
        "Balanced growth, stakeholder alignment, and execution discipline in a complex, high-scale product environment.",
      ],
    },
  ],
  projects: [
    {
      name: "AI Product Strategy Writing",
      summary:
        "Long-form writing on AI adoption, product strategy, and how to move from hype to measurable business value.",
      linkPreview: "https://medium.com/@ghoreishi",
      linkSource: "https://medium.com/@ghoreishi",
      image: "/project-ai-writing.png",
    },
    {
      name: "Raitec Guardian App",
      summary:
        "A digital industrial safety and gas monitoring platform concept focused on real-time visibility, reporting, and operational usability.",
      linkPreview: "/",
      linkSource: "https://github.com/mattghoreishi",
      image: "/project-raitec-guardian.png",
    },
    {
      name: "Personal Labs",
      summary:
        "A growing collection of experiments around dashboards, AI utilities, product thinking, lightweight tools, and genomics-related ideas.",
      linkPreview: "/",
      linkSource: "https://github.com/mattghoreishi",
      image: "/project-personal-labs.png",
    },
  ],
  about: {
    description: `
      Hi, I’m Matt Ghoreishi, a product leader based in Hamburg, Germany.

      My background sits at a rare intersection: over a decade of product work across platforms, AI, SaaS, and digital products, combined with a strong interest in genomics, data science, and emerging technology. I enjoy working where strategy meets execution, especially in environments where teams need clarity, prioritization, and a strong product voice.

      I have worked across high-scale consumer platforms, AI-driven products, operational systems, and industrial product environments. Over time, I have developed a product style that is analytical, business-aware, and deeply execution-focused. I care about clear thinking, measurable outcomes, strong product storytelling, and building things that are genuinely useful.

      Right now, I am especially interested in AI product management, data-heavy systems, B2B SaaS, health and genomics-related opportunities, and practical tools that create leverage for both companies and end users.

      This site is my base on the internet: part portfolio, part lab, and part long-term playground for ideas, writing, tools, and experiments.
    `,
    image: "/matt-big.jpg",
  },
};
