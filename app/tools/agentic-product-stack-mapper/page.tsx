import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AgenticStackVisual } from "@/components/site/AgenticStackVisual";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl, tools } from "@/data/site";

const tool = tools[0];

export const metadata: Metadata = {
  title: `${tool.name} | Matt Ghoreishi`,
  description: tool.description,
  alternates: {
    canonical: `${siteUrl}/tools/${tool.slug}`
  },
  openGraph: {
    title: tool.name,
    description: tool.description,
    url: `${siteUrl}/tools/${tool.slug}`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: tool.name,
    description: tool.description,
    images: ["/opengraph-image"]
  }
};

export default function AgenticProductStackMapperPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              {tool.status}
            </span>
            <h1 className="mt-6 text-5xl font-semibold tracking-normal text-white md:text-7xl">{tool.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-300">{tool.description}</p>
            <p className="mt-5 max-w-2xl leading-8 text-slate-400">
              The mapper helps product managers, founders, and AI teams evaluate whether an agent idea belongs in a real workflow,
              where autonomy should be limited, and what evidence is needed before launch.
            </p>
            <p className="mt-4 max-w-2xl leading-8 text-slate-400">
              It is the practical companion to The Agentic AI Product Gap: the article frames the product problem,
              and the mapper turns that thinking into a reviewable brief.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/mapper"
                data-analytics-event="play_demo"
                data-analytics-params={JSON.stringify({ demo_name: "agentic_product_stack_mapper", cta_location: "tool_detail_hero", destination_path: "/mapper" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
              >
                Start the mapper
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/writing/the-agentic-ai-product-gap"
                data-analytics-event="expand_rationale"
                data-analytics-params={JSON.stringify({ rationale_slug: "agentic_product_stack_framework", cta_location: "tool_detail_hero", destination_path: "/writing/the-agentic-ai-product-gap" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
              >
                Read the framework
              </Link>
            </div>
          </div>
          <AgenticStackVisual />
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["What it does", "Turns rough agent ideas into a structured Agent Product Brief."],
            ["Who it is for", "Product managers, AI teams, founders, and teams evaluating agentic workflows."],
            ["What it creates", "A brief with workflow fit, risk, permissions, evaluation gates, human control, monitoring, governance, and value."],
            ["Why it exists", "Agentic AI creates value when autonomy is designed as part of the product."]
          ].map(([title, body]) => (
            <BrandCard key={title} className="p-5">
              <CheckCircle2 className="h-5 w-5 text-cyan-200" />
              <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </BrandCard>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
