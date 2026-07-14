import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { ArticleEngagement } from "@/components/analytics/ArticleEngagement";
import { ReadinessGateVisual, readinessLayer } from "@/components/site/ReadinessGateVisual";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { getArticleBySlug, siteUrl } from "@/data/site";

const article = getArticleBySlug("before-i-trust-an-ai-feature");

export const metadata: Metadata = {
  title: "Before I Trust an AI Feature | Matt Ghoreishi",
  description:
    "Why AI feature readiness belongs in the PRD: expected behavior, failure modes, evaluation evidence and product controls before launch.",
  alternates: {
    canonical: `${siteUrl}/writing/${article.slug}`
  },
  openGraph: {
    title: article.title,
    description:
      "Why AI feature readiness belongs in the PRD: expected behavior, failure modes, evaluation evidence and product controls before launch.",
    url: `${siteUrl}/writing/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    authors: ["Matt Ghoreishi"],
    tags: article.tags,
    images: [{ url: "/writing/before-i-trust-an-ai-feature/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description:
      "Why AI feature readiness belongs in the PRD: expected behavior, failure modes, evaluation evidence and product controls before launch.",
    images: ["/writing/before-i-trust-an-ai-feature/opengraph-image"]
  }
};

export default function BeforeITrustAnAiFeaturePage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <article data-article-content>
        <ArticleEngagement articleSlug={article.slug} />

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">AI product readiness</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
                <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{article.displayDate}</span>
                <span className="rounded-full bg-white/[0.07] px-3 py-1">{article.readingTime}</span>
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-normal text-white md:text-7xl">{article.title}</h1>
              <p className="mt-5 max-w-3xl text-2xl leading-9 text-slate-300">{article.subtitle}</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                The demo works. That is not the same as the feature being ready.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                This piece argues for a readiness layer in the PRD that makes behavior, failure, evaluation, and control explicit before a promising AI capability becomes a launch decision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="click_primary_cta"
                  data-analytics-params={JSON.stringify({
                    cta_name: "read_on_medium",
                    article_slug: article.slug,
                    cta_location: "article_hero",
                    destination_domain: "medium.com"
                  })}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                >
                  Read the full article on Medium
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#related-thinking"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  Explore related thinking
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <ReadinessGateVisual />
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8">
          <div className="mx-auto max-w-7xl border-y border-white/10 py-12 md:py-16">
            <Quote className="h-7 w-7 text-cyan-200" aria-hidden="true" />
            <blockquote className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              A demo proves capability. Readiness earns trust.
            </blockquote>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">The readiness layer</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold text-white md:text-5xl">What I want the PRD to make explicit.</h2>
            <div className="mt-10 grid gap-x-0 gap-y-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
              {readinessLayer.map((dimension, index) => (
                <div
                  key={dimension.label}
                  className="border-l border-cyan-200/30 pl-5 md:pr-8 lg:min-h-44 lg:border-l-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{dimension.label}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{dimension.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">Why this belongs in the PRD</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">AI behavior is part of the product contract.</h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-300">
                The PRD should define more than the happy path. It should make expected behavior, failure modes, evaluation evidence and the control model reviewable before the team commits to launch.
              </p>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "The feature should be understandable before launch.",
                  "Failure should be discussable before it happens.",
                  "Evaluation should be tied to product decisions.",
                  "Control should be designed before users need it."
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="related-thinking" className="scroll-mt-24 px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Related thinking</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <BrandCard className="flex flex-col p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Article</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">The Agentic AI Product Gap</h2>
                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  What changes when AI moves from producing outputs to taking actions across systems.
                </p>
                <Link
                  href="/writing/the-agentic-ai-product-gap"
                  data-analytics-event="open_case_study"
                  data-analytics-params={JSON.stringify({
                    case_study_slug: "the-agentic-ai-product-gap",
                    content_type: "article",
                    source_surface: "related_thinking",
                    destination_path: "/writing/the-agentic-ai-product-gap"
                  })}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  Read the article
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </BrandCard>
              <BrandCard className="flex flex-col p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100">Case study</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Contact Center AI: 2020 → today</h2>
                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  A historical case showing how AI capability became a review workflow, an MVP and measurable operating value.
                </p>
                <Link
                  href="/work/contact-center-ai"
                  data-analytics-event="open_case_study"
                  data-analytics-params={JSON.stringify({
                    case_study_slug: "contact_center_ai_2020_today",
                    content_type: "case_study",
                    source_surface: "related_thinking",
                    destination_path: "/work/contact-center-ai"
                  })}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  Explore the case
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </BrandCard>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8">
          <div className="mx-auto max-w-7xl border-t border-white/10 pt-12 md:pt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Keep reading</p>
            <div className="mt-4 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-4xl font-semibold text-white">Trust starts before launch.</h2>
                <p className="mt-4 text-lg leading-8 text-slate-400">
                  The best time to define behavior, failure, evaluation and control is before a successful demo becomes a production dependency.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="click_primary_cta"
                  data-analytics-params={JSON.stringify({
                    cta_name: "read_on_medium",
                    article_slug: article.slug,
                    cta_location: "article_final_cta",
                    destination_domain: "medium.com"
                  })}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100"
                >
                  Read the full article on Medium
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/writing"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  View all writing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
