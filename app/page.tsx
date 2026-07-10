import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BrandCard } from "@/components/site/BrandCard";
import { LeadershipSnapshot } from "@/components/site/LeadershipSnapshot";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { articles, credibilityAreas, experienceThemes, profile, projectThemes, siteUrl, tools } from "@/data/site";

export const metadata: Metadata = {
  title: "Matt Ghoreishi | Senior Product Manager for AI, SaaS, and Data Platforms",
  description:
    "Matt Ghoreishi is a Senior Product Manager in Hamburg focused on AI, SaaS, and data platforms, building products where AI, data, and business outcomes meet.",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Matt Ghoreishi | AI, SaaS, and Data Product Leader",
    description:
      "Personal brand hub for Matt Ghoreishi, focused on AI product strategy, SaaS platforms, data products, writing, and product tools.",
    url: siteUrl,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Ghoreishi | AI, SaaS, and Data Product Leader",
    description: "I build products where AI, data, and business outcomes meet.",
    images: ["/opengraph-image"]
  }
};

const featuredArticle = articles[0];
const featuredTool = tools[0];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.28),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(34,211,238,0.16),transparent_26%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {profile.title}
            </p>
            <h1 className="mt-4 text-2xl font-semibold tracking-normal text-white md:text-3xl">
              Matt Ghoreishi
            </h1>
            <h2 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal text-white md:text-7xl">
              I build products where AI, data, and business outcomes meet.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Senior Product Manager based in Hamburg, working across AI-enabled workflows, SaaS and data platforms,
              monetization, dashboards, and evaluation systems, with a focus on turning product bets into shipped outcomes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/work"
                data-analytics-event="click_primary_cta"
                data-analytics-params={JSON.stringify({ cta_name: "view_my_work", cta_location: "home_hero", destination_path: "/work" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                View my work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/writing/the-agentic-ai-product-gap"
                data-analytics-event="click_primary_cta"
                data-analytics-params={JSON.stringify({ cta_name: "read_latest_article", cta_location: "home_hero", destination_path: "/writing/the-agentic-ai-product-gap" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-cyan-300/25 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
              >
                Read latest article
              </Link>
              <Link
                href="/mapper"
                data-analytics-event="play_demo"
                data-analytics-params={JSON.stringify({ demo_name: "agentic_product_stack_mapper", cta_location: "home_hero", destination_path: "/mapper" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-cyan-300/10"
              >
                Try the Agentic Product Stack Mapper
              </Link>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="click_contact"
                data-analytics-params={JSON.stringify({ contact_method: "linkedin", cta_location: "home_hero" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-cyan-300/10"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <LeadershipSnapshot />
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/work/contact-center-ai"
            data-analytics-event="open_case_study"
            data-analytics-params={JSON.stringify({
              case_study: "contact_center_ai_2020_today",
              source_surface: "home",
              destination_path: "/work/contact-center-ai"
            })}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
          >
            <BrandCard className="grid gap-6 p-6 transition group-hover:border-cyan-300/30 group-hover:bg-white/[0.075] md:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100">Selected work</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Contact Center AI: 2020 → today</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  How I helped turn ASR and NLP capabilities into a quality-review product, and what I would change with modern AI.
                </p>
              </div>
              <div>
                <div className="grid gap-3 md:grid-cols-3">
                  {["18K+ daily ASR calls", "35% review/reporting throughput improvement", "2.15x scoring accuracy improvement"].map((signal) => (
                    <span key={signal} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
                      {signal}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 group-hover:text-cyan-100">
                  Explore the case
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </BrandCard>
          </Link>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <BrandCard className="p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Featured writing</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">{featuredArticle.title}</h2>
                <p className="mt-2 text-lg text-slate-300">{featuredArticle.subtitle}</p>
              </div>
              <span className="w-fit rounded-full border border-cyan-300/25 px-3 py-1 text-xs font-semibold text-cyan-100">
                {featuredArticle.readingTime}
              </span>
            </div>
            <p className="mt-5 leading-7 text-slate-400">{featuredArticle.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredArticle.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/writing/the-agentic-ai-product-gap"
              data-analytics-event="open_case_study"
              data-analytics-params={JSON.stringify({ case_study_slug: featuredArticle.slug, content_type: "article", cta_location: "home_featured_writing" })}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
            >
              Open article page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </BrandCard>

          <BrandCard className="p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Featured tool</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">{featuredTool.name}</h2>
                <p className="mt-2 text-lg text-slate-300">{featuredTool.description}</p>
              </div>
              <span className="w-fit rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {featuredTool.status}
              </span>
            </div>
            <p className="mt-5 leading-7 text-slate-400">
              A lightweight workspace for turning an AI agent idea into a structured Agent Product Brief with workflow fit,
              risk shape, autonomy boundaries, evaluation gates, human control, monitoring, governance, and value.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredTool.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/tools/agentic-product-stack-mapper"
              data-analytics-event="open_case_study"
              data-analytics-params={JSON.stringify({ case_study_slug: featuredTool.slug, content_type: "tool", cta_location: "home_featured_tool" })}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
            >
              View tool details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </BrandCard>
        </div>
      </section>

      <section id="experience" className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Where I create value</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Product leadership built through execution.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              My work sits between business goals, platform constraints, user workflows, and the evidence needed to ship.
              I focus on products that can be adopted, measured, operated, and improved after launch.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {credibilityAreas.map(({ label, description, Icon }) => (
              <BrandCard key={label} className="p-5">
                <Icon className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-4 text-lg font-semibold text-white">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              </BrandCard>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-white/10 bg-white/[0.025] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">From strategy to shipped systems</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Selected product themes.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              A few examples of the product work, tools, and writing I use to make product judgment concrete.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {projectThemes.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                data-analytics-event="open_case_study"
                data-analytics-params={JSON.stringify({ case_study_slug: item.title.toLowerCase().replaceAll(" ", "_"), content_type: "project_theme", cta_location: "home_project_themes" })}
                className="rounded-xl border border-white/10 bg-[#07111f] p-5 transition hover:border-cyan-300/30 hover:bg-white/[0.055]"
              >
                <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Experience across AI, SaaS, and data platforms</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">A concise product leadership story.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {experienceThemes.map((theme) => (
              <BrandCard key={theme.title} className="p-5">
                <h3 className="text-xl font-semibold text-white">{theme.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                  {theme.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </BrandCard>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">About</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Practical product leadership for AI-shaped work.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-400">
            <p>
              I care about the space where strategy becomes shipped product: the workflow, the operating model, the quality bar,
              the business case, and the details that make a product credible after the demo.
            </p>
            <p>
              My current focus is AI, SaaS, and data platforms, especially where teams need to connect new technical capability
              with measurable outcomes, human control, and clear product judgment.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100">
              More about how I work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <BrandCard className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Contact</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Contact</h2>
                <p className="mt-3 max-w-2xl text-slate-400">
                  Based in Hamburg. LinkedIn is the best place to reach me for product conversations and collaboration.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="click_contact"
                  data-analytics-params={JSON.stringify({ contact_method: "linkedin", cta_location: "home_contact_band" })}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={profile.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-4 text-sm font-semibold text-white hover:border-cyan-200 hover:bg-cyan-300/10"
                >
                  Read on Medium
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
