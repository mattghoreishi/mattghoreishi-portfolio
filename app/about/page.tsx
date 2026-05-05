import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { profile, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "About | Matt Ghoreishi",
  description:
    "About Matt Ghoreishi, a Senior Product Manager in Hamburg focused on AI, SaaS, data platforms, and product execution.",
  alternates: {
    canonical: `${siteUrl}/about`
  },
  openGraph: {
    title: "About | Matt Ghoreishi",
    description: "Senior Product Manager focused on AI, SaaS, data platforms, and execution.",
    url: `${siteUrl}/about`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Matt Ghoreishi",
    description: "Senior Product Manager focused on AI, SaaS, data platforms, and execution.",
    images: ["/opengraph-image"]
  }
};

export default function AboutPage() {
  const principles = [
    "Start with the workflow, not the model.",
    "Connect product decisions to clear business value.",
    "Make quality, evaluation, and governance part of the product, not an afterthought.",
    "Ship in a way that teams can operate, explain, and improve."
  ];

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">About</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-normal md:text-6xl">{profile.name}</h1>
            <p className="mt-5 text-2xl leading-9 text-slate-300">{profile.title}</p>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              I am based in {profile.location}. My work focuses on AI-enabled workflows, SaaS and data platforms,
              monetization, dashboards, evaluation systems, and product execution.
            </p>
          </div>
          <BrandCard className="p-6 md:p-8">
            <h2 className="text-3xl font-semibold">How I work</h2>
            <p className="mt-4 leading-8 text-slate-400">
              I like the part of product work where strategy meets constraints: what users actually do, what the system can
              support, what leadership needs to measure, and what has to be true for a product to keep working after launch.
            </p>
            <ul className="mt-6 space-y-3 text-slate-400">
              {principles.map((principle) => (
                <li key={principle} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
            >
              Connect on LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </BrandCard>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
