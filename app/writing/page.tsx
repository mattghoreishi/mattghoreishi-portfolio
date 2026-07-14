import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReadinessGateVisual } from "@/components/site/ReadinessGateVisual";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { getFeaturedArticle, siteUrl, writingArticles } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing | Matt Ghoreishi",
  description:
    "Writing by Matt Ghoreishi on AI product strategy, feature readiness, agentic systems, evaluation, workflow integration, and measurable business value.",
  alternates: {
    canonical: `${siteUrl}/writing`
  },
  openGraph: {
    title: "Writing | Matt Ghoreishi",
    description: "Essays on AI product strategy, feature readiness, agentic AI, SaaS, data platforms, and measurable value.",
    url: `${siteUrl}/writing`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Matt Ghoreishi",
    description: "Essays on AI product strategy, feature readiness, agentic AI, SaaS, data platforms, and measurable value.",
    images: ["/opengraph-image"]
  }
};

const featuredArticle = getFeaturedArticle();
const moreWriting = writingArticles.filter((article) => !article.featured);

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Writing</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            Product essays on AI, platforms and the work required to make ambitious products credible.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Writing on AI product strategy, feature readiness, agentic systems, evaluation, workflow integration and measurable business value.
          </p>

          <div className="mt-14">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">Latest / featured article</p>
            <Link
              href={`/writing/${featuredArticle.slug}`}
              data-analytics-event="open_case_study"
              data-analytics-params={JSON.stringify({
                case_study_slug: featuredArticle.slug,
                content_type: "article",
                source_surface: "writing",
                destination_path: `/writing/${featuredArticle.slug}`
              })}
              className="group mt-5 block rounded-xl border border-cyan-200/20 bg-[#07111f] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition hover:border-cyan-200/45 hover:bg-[#0a1728] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{featuredArticle.displayDate}</span>
                    <span className="rounded-full bg-white/[0.07] px-3 py-1">{featuredArticle.readingTime}</span>
                  </div>
                  <h2 className="mt-5 max-w-3xl text-4xl font-semibold text-white md:text-5xl">{featuredArticle.title}</h2>
                  <p className="mt-4 max-w-3xl text-xl leading-8 text-slate-300">{featuredArticle.subtitle}</p>
                  <p className="mt-5 max-w-3xl leading-7 text-slate-400">{featuredArticle.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 group-hover:text-cyan-100">
                    Open article page
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <ReadinessGateVisual compact />
              </div>
            </Link>
          </div>

          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">More writing</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {moreWriting.map((article) => (
                <BrandCard key={article.slug} className="flex flex-col p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{article.displayDate}</span>
                    <span className="rounded-full bg-white/[0.07] px-3 py-1">{article.readingTime}</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold text-white">{article.title}</h2>
                  <p className="mt-3 text-lg text-slate-300">{article.subtitle}</p>
                  <p className="mt-5 flex-1 leading-7 text-slate-400">{article.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/writing/${article.slug}`}
                    data-analytics-event="open_case_study"
                    data-analytics-params={JSON.stringify({
                      case_study_slug: article.slug,
                      content_type: "article",
                      source_surface: "writing",
                      destination_path: `/writing/${article.slug}`
                    })}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  >
                    Open article page
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </BrandCard>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
