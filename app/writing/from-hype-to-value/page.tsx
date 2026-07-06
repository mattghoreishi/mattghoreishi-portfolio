import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ArticleEngagement } from "@/components/analytics/ArticleEngagement";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { articles, siteUrl } from "@/data/site";

const article = articles[1];
const related = articles[0];

export const metadata: Metadata = {
  title: `${article.title} | Matt Ghoreishi`,
  description: article.subtitle,
  alternates: {
    canonical: `${siteUrl}/writing/${article.slug}`
  },
  openGraph: {
    title: article.title,
    description: article.subtitle,
    url: `${siteUrl}/writing/${article.slug}`,
    type: "article",
    publishedTime: "2025-09-21",
    authors: ["Matt Ghoreishi"],
    tags: article.tags,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.subtitle,
    images: ["/opengraph-image"]
  }
};

export default function FromHypeToValuePage() {
  const takeaways = [
    "AI pilots need a business metric, not just a demo moment.",
    "Workflow integration matters more than novelty.",
    "Evaluation, cost, latency, and rollback planning should be part of the product spec.",
    "Governance is easier when it is designed early instead of bolted on after procurement asks."
  ];

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <article data-article-content className="px-5 py-16 md:px-8 md:py-24">
        <ArticleEngagement articleSlug={article.slug} />
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{article.date}</span>
            <span className="rounded-full bg-white/[0.07] px-3 py-1">{article.readingTime}</span>
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-normal md:text-7xl">{article.title}</h1>
          <p className="mt-5 text-2xl leading-9 text-slate-300">{article.subtitle}</p>
          <p className="mt-6 text-lg leading-8 text-slate-400">{article.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={article.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="click_primary_cta"
              data-analytics-params={JSON.stringify({ cta_name: "read_on_medium", cta_location: "article_hero", article_slug: article.slug, destination_domain: "medium.com" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
            >
              Read on Medium
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href={`/writing/${related.slug}`}
              data-analytics-event="open_case_study"
              data-analytics-params={JSON.stringify({ case_study_slug: related.slug, content_type: "article", cta_location: "article_hero_related" })}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              Read the agentic AI follow-up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <BrandCard className="p-6 md:p-8">
              <h2 className="text-3xl font-semibold">Why it matters</h2>
              <p className="mt-4 leading-8 text-slate-400">
                AI pilots often fail because they sit beside the workflow, lack a unique data advantage, skip rigorous
                evaluation, or reach governance too late. The article reframes AI work as product execution: data, workflow,
                metrics, rollout, risk, and adoption have to move together.
              </p>
            </BrandCard>
            <BrandCard className="p-6 md:p-8">
              <h2 className="text-3xl font-semibold">Key takeaways</h2>
              <ul className="mt-5 space-y-3 text-slate-400">
                {takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </BrandCard>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
