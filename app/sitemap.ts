import type { MetadataRoute } from "next";
import { articles, siteUrl, tools } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/writing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75
    },
    ...articles
      .filter((article) => article.mediumUrl)
      .map((article) => ({
        url: `${siteUrl}/writing/${article.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75
      })),
    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...tools.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    {
      url: `${siteUrl}/mapper`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];
}
