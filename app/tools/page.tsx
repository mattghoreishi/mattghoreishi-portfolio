import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl, tools } from "@/data/site";

export const metadata: Metadata = {
  title: "Tools | Matt Ghoreishi",
  description:
    "Product tools by Matt Ghoreishi for AI PMs, SaaS teams, founders, and product leaders working on AI strategy and execution.",
  alternates: {
    canonical: `${siteUrl}/tools`
  },
  openGraph: {
    title: "Tools | Matt Ghoreishi",
    description: "Practical product strategy tools for AI, SaaS, and data product teams.",
    url: `${siteUrl}/tools`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools | Matt Ghoreishi",
    description: "Practical product strategy tools for AI, SaaS, and data product teams.",
    images: ["/opengraph-image"]
  }
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Tools</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            Practical tools for AI product work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Lightweight tools for turning AI product ideas into artifacts teams can review, test, and improve.
          </p>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {tools.map((tool) => (
              <BrandCard key={tool.slug} className="p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                      {tool.status}
                    </span>
                    <h2 className="mt-5 text-3xl font-semibold text-white">{tool.name}</h2>
                    <p className="mt-3 text-lg leading-8 text-slate-300">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/tools/${tool.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                  View tool page
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
