import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { credibilityAreas, experienceThemes, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience | Matt Ghoreishi",
  description:
    "Experience themes from Matt Ghoreishi across AI product strategy, SaaS and data platforms, monetization, dashboards, and product execution.",
  alternates: {
    canonical: `${siteUrl}/experience`
  },
  openGraph: {
    title: "Experience | Matt Ghoreishi",
    description: "A concise product leadership story across AI, SaaS, data platforms, monetization, and execution.",
    url: `${siteUrl}/experience`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Matt Ghoreishi",
    description: "Product leadership across AI, SaaS, data platforms, monetization, and execution.",
    images: ["/opengraph-image"]
  }
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Experience</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            Product leadership across AI, SaaS, data platforms, and commercial systems.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            A concise view of recurring product themes in my work: turning business problems, platform constraints,
            workflows, and quality requirements into shipped products and measurable outcomes.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {experienceThemes.map((theme) => (
              <BrandCard key={theme.title} className="p-6">
                <h2 className="text-2xl font-semibold">{theme.title}</h2>
                <ul className="mt-5 space-y-3 text-slate-400">
                  {theme.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </BrandCard>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-semibold">Areas of product depth</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {credibilityAreas.map(({ label, description, Icon }) => (
                <BrandCard key={label} className="p-5">
                  <Icon className="h-5 w-5 text-cyan-200" />
                  <h3 className="mt-4 font-semibold">{label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
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
