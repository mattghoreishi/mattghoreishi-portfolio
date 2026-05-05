import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { profile, siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | Matt Ghoreishi",
  description:
    "Contact Matt Ghoreishi for product conversations and collaboration around AI, SaaS, and data platforms.",
  alternates: {
    canonical: `${siteUrl}/contact`
  },
  openGraph: {
    title: "Contact | Matt Ghoreishi",
    description: "Connect with Matt Ghoreishi about AI, SaaS, data platforms, and product leadership.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Matt Ghoreishi",
    description: "Connect about AI, SaaS, data platforms, and product leadership.",
    images: ["/opengraph-image"]
  }
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Contact</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-normal md:text-6xl">Contact</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Based in Hamburg. LinkedIn is the best place to reach me for product conversations and collaboration.
          </p>
          <BrandCard className="mt-10 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="h-4 w-4 text-cyan-200" />
                  {profile.location}
                </div>
                <p className="mt-4 max-w-2xl text-slate-400">
                  Product strategy, AI products, SaaS, data platforms, writing, and tools.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
                >
                  GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={profile.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
                >
                  Medium
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </BrandCard>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
