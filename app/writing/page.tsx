import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { articles, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing | Matt Ghoreishi",
  description:
    "Writing by Matt Ghoreishi on AI product strategy, SaaS platforms, data products, AI agents, evaluation, and product execution.",
  alternates: {
    canonical: `${siteUrl}/writing`
  },
  openGraph: {
    title: "Writing | Matt Ghoreishi",
    description: "Essays on AI product strategy, agentic AI, SaaS, data platforms, and shipping measurable value.",
    url: `${siteUrl}/writing`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing | Matt Ghoreishi",
    description: "Essays on AI product strategy, agentic AI, SaaS, data platforms, and measurable value.",
    images: ["/opengraph-image"]
  }
};

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Writing</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            Product essays on AI, platforms, and credible launches.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Writing on AI product strategy, agentic systems, evaluation, workflow integration, business value, and the operating work behind production-ready products.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {articles.map((article) => (
              <BrandCard key={article.slug} className="flex flex-col p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">{article.date}</span>
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
                <Link href={`/writing/${article.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                  Open article page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </BrandCard>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
