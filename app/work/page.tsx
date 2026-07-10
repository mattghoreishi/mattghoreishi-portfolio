import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hammer, History } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl, tools } from "@/data/site";

export const metadata: Metadata = {
  title: "Work | Matt Ghoreishi",
  description:
    "Selected case studies, product builds, and tools by Matt Ghoreishi across AI, SaaS, data platforms, and product workflows.",
  alternates: {
    canonical: `${siteUrl}/work`
  },
  openGraph: {
    title: "Work | Matt Ghoreishi",
    description: "Product evidence across historical case studies and current product builds.",
    url: `${siteUrl}/work`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Matt Ghoreishi",
    description: "Product evidence across historical case studies and current product builds.",
    images: ["/opengraph-image"]
  }
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Work</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            Product evidence, not a content archive.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Real product cases and current builds, with the decisions, workflows, and operating evidence behind them.
          </p>

          <section className="mt-14">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-amber-100" />
              <h2 className="text-3xl font-semibold text-white">Selected case studies</h2>
            </div>
            <div className="mt-6 grid gap-5">
              <Link
                href="/work/contact-center-ai"
                data-analytics-event="open_case_study"
                data-analytics-params={JSON.stringify({
                  case_study: "contact_center_ai_2020_today",
                  source_surface: "work",
                  destination_path: "/work/contact-center-ai"
                })}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
              >
                <BrandCard className="p-6 transition group-hover:border-cyan-300/30 group-hover:bg-white/[0.075] md:p-8">
                  <h3 className="text-3xl font-semibold text-white">Contact Center AI: 2020 → today</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-300">
                    How I helped turn ASR and NLP capabilities into a quality-review product, and what I would change with modern AI.
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {["18K+ daily ASR calls", "35% review/reporting throughput improvement", "2.15x scoring accuracy improvement"].map((signal) => (
                      <span key={signal} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
                        {signal}
                      </span>
                    ))}
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 group-hover:text-cyan-100">
                    Explore the case
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </BrandCard>
              </Link>
            </div>
          </section>

          <section className="mt-16">
            <div className="flex items-center gap-3">
              <Hammer className="h-5 w-5 text-cyan-200" />
              <h2 className="text-3xl font-semibold text-white">Product builds & tools</h2>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {tools.map((tool) => (
                <BrandCard key={tool.slug} className="p-6 md:p-8">
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    {tool.status}
                  </span>
                  <h3 className="mt-5 text-3xl font-semibold text-white">{tool.name}</h3>
                  <p className="mt-3 text-lg leading-8 text-slate-300">{tool.description}</p>
                  <Link
                    href={`/tools/${tool.slug}`}
                    data-analytics-event="open_case_study"
                    data-analytics-params={JSON.stringify({
                      case_study: tool.slug,
                      source_surface: "work",
                      destination_path: `/tools/${tool.slug}`
                    })}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
                  >
                    View build
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </BrandCard>
              ))}
            </div>
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
