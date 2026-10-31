import type { MetadataRoute } from "next";
import { articles, siteUrl, tools } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/writing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/experience`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/work/contact-center-ai`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...[
      "/work/inline-apps-to-video",
      "/work/industrial-gas-monitoring",
      "/work/direct-carrier-billing",
      "/resume",
    ].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles
      .filter((article) => article.mediumUrl)
      .map((article) => ({
        url: `${siteUrl}/writing/${article.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
    {
      url: `${siteUrl}/tools`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...tools.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${siteUrl}/mapper`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
