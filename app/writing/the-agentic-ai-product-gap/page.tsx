import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Copy, Quote } from "lucide-react";
import { ArticleEngagement } from "@/components/analytics/ArticleEngagement";
import { AgenticStackVisual } from "@/components/site/AgenticStackVisual";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { getArticleBySlug, siteUrl, stackLayers } from "@/data/site";

const article = getArticleBySlug("the-agentic-ai-product-gap");

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
    publishedTime: article.publishedAt,
    authors: ["Matt Ghoreishi"],
    tags: article.tags,
    images: [{ url: "/writing/the-agentic-ai-product-gap/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.subtitle,
    images: ["/writing/the-agentic-ai-product-gap/opengraph-image"]
  }
};

export default function AgenticAiProductGapPage() {
  const shareText =
    "Matt Ghoreishi, The Agentic AI Product Gap: Why the hard part starts after an agent gets the first task right, May 4, 2026.";

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <article data-article-content>
        <ArticleEngagement articleSlug={article.slug} />
        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{article.displayDate}</span>
                <span className="rounded-full bg-white/[0.07] px-3 py-1">{article.readingTime}</span>
              </div>
              <h1 className="mt-6 text-5xl font-semibold tracking-normal text-white md:text-7xl">{article.title}</h1>
              <p className="mt-5 text-2xl leading-9 text-slate-300">{article.subtitle}</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">{article.summary}</p>
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
                  href="/mapper"
                  data-analytics-event="play_demo"
                  data-analytics-params={JSON.stringify({ demo_name: "agentic_product_stack_mapper", cta_location: "article_hero", article_slug: article.slug, destination_path: "/mapper" })}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
                >
                  Try the tool
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <AgenticStackVisual />
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <BrandCard className="p-6 md:p-8">
              <Quote className="h-7 w-7 text-cyan-200" />
              <h2 className="mt-5 text-3xl font-semibold text-white">Short summary</h2>
              <p className="mt-4 leading-8 text-slate-400">
                Agentic AI changes the product question from whether a model produced a good answer to whether a system took
                the right action, touched the right systems, protected users, recovered from errors, and created measurable value.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                The gap is the distance between an impressive demo and a workflow-ready product. Closing it requires product
                judgment around autonomy, evaluation, monitoring, governance, rollback, and business value.
              </p>
            </BrandCard>

            <BrandCard className="p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-white">Key framework: The Agentic Product Stack</h2>
              <div className="mt-6 grid gap-2 md:grid-cols-2">
                {stackLayers.map((layer, index) => (
                  <div key={layer} className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
                    <p className="text-xs font-semibold text-cyan-200">Layer {index + 1}</p>
                    <p className="mt-1 font-semibold text-white">{layer}</p>
                  </div>
                ))}
              </div>
            </BrandCard>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <BrandCard className="p-6 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <div>
                  <h2 className="text-3xl font-semibold text-white">Share or reference this piece</h2>
                  <p className="mt-4 rounded-lg border border-white/10 bg-[#07111f] p-4 text-sm leading-7 text-slate-300">
                    {shareText}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <a
                    href={article.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="click_primary_cta"
                    data-analytics-params={JSON.stringify({ cta_name: "read_full_article_on_medium", cta_location: "article_reference_card", article_slug: article.slug, destination_domain: "medium.com" })}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
                  >
                    Read full article on Medium
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/tools/agentic-product-stack-mapper"
                    data-analytics-event="open_case_study"
                    data-analytics-params={JSON.stringify({ case_study_slug: "agentic-product-stack-mapper", content_type: "tool", cta_location: "article_reference_card" })}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
                  >
                    Learn about the mapper
                    <Copy className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </BrandCard>
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
