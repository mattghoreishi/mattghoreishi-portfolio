import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-8">
          <header className="lg:col-start-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">About</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-normal md:text-6xl">{profile.name}</h1>
            <p className="mt-5 text-2xl leading-9 text-slate-300">{profile.title}</p>
          </header>

          <figure className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <Image
              src="/assets/profile/matt-ghoreishi-profile.webp"
              alt="Portrait of Matt Ghoreishi."
              width={800}
              height={800}
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 42vw, 100vw"
              className="aspect-square w-full max-w-[380px] rounded-[22px] border border-cyan-100/30 object-cover shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
            />
          </figure>

          <div className="lg:col-start-2">
            <p className="max-w-3xl text-lg leading-8 text-slate-400">
              I am based in {profile.location}. My work focuses on AI-enabled workflows, SaaS and data platforms,
              monetization, dashboards, evaluation systems, and product execution.
            </p>
          </div>

          <BrandCard className="lg:col-span-2 p-6 md:p-8">
            <h2 className="text-3xl font-semibold">How I work</h2>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <p className="leading-8 text-slate-400">
                I like the part of product work where strategy meets constraints: what users actually do, what the system can
                support, what leadership needs to measure, and what has to be true for a product to keep working after launch.
              </p>
              <ul className="space-y-3 text-slate-400">
                {principles.map((principle) => (
                  <li key={principle} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              Connect on LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </BrandCard>

          <BrandCard className="lg:col-span-2 p-6 md:p-8">
            <h2 className="text-3xl font-semibold">Career background</h2>
            <p className="mt-4 max-w-4xl leading-8 text-slate-400">
              My product work has moved through ads monetization, payments and large-scale content products, ASR/NLP and
              Contact Center AI workflows, data-heavy industrial monitoring, and current AI evaluation and workflow design.
            </p>
            <Link
              href="/experience"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              View experience themes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </BrandCard>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
