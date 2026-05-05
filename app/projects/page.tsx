import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { projectThemes, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects | Matt Ghoreishi",
  description:
    "Selected product themes and projects by Matt Ghoreishi across AI workflows, product strategy tools, data products, and product execution.",
  alternates: {
    canonical: `${siteUrl}/projects`
  },
  openGraph: {
    title: "Projects | Matt Ghoreishi",
    description: "Selected product themes across AI workflows, SaaS platforms, data products, and product execution.",
    url: `${siteUrl}/projects`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Matt Ghoreishi",
    description: "Selected product themes across AI workflows, SaaS platforms, data products, and execution.",
    images: ["/opengraph-image"]
  }
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Projects</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            Product thinking made concrete.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            A focused set of product work, tools, and frameworks that show how I approach AI, data, platforms,
            workflows, and business outcomes.
          </p>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projectThemes.map((project) => (
              <BrandCard key={project.title} className="p-6">
                <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                <h2 className="mt-5 text-2xl font-semibold">{project.title}</h2>
                <p className="mt-4 leading-7 text-slate-400">{project.description}</p>
                <Link href={project.href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                  Open
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
