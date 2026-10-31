import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  CareerTimeline,
  CaseList,
  ContactStrip,
  pageMetadata,
} from "@/components/site/Portfolio";
import { getFeaturedArticle, profile, siteUrl } from "@/data/site";

export const metadata = pageMetadata(
  "Matt Ghoreishi · Senior Product Manager",
  "Senior Product Manager in Hamburg. The decisions behind my work in AI, payments, video, and industrial SaaS, from customer discovery to commercial results.",
  "",
);

export default function HomePage() {
  const article = getFeaturedArticle();
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <section className="portfolio-wrap portfolio-hero">
          <div className="hero-copy">
            <p className="portfolio-eyebrow">
              Senior Product Manager <span aria-hidden="true">/</span> Hamburg
            </p>
            <h1>
              I build products.
              <br />
              And know when
              <br />
              <em>to change course.</em>
            </h1>
            <p className="portfolio-lead">
              I’m Matt Ghoreishi. I’ve worked on AI, payments, video, and
              industrial SaaS. The most useful lessons came from deciding what
              to focus on, what to change, and what to stop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#selected-work"
                className="portfolio-button"
                data-analytics-event="click_primary_cta"
                data-analytics-params={JSON.stringify({
                  cta_location: "home_hero",
                  action: "view_work",
                })}
              >
                Explore my work
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/resume"
                className="portfolio-button portfolio-button-secondary"
              >
                Read my CV
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <figure className="hero-portrait">
            <Image
              src="/assets/profile/matt-ghoreishi-profile.webp"
              alt="Matt Ghoreishi"
              width={800}
              height={800}
              priority
              sizes="(min-width: 1024px) 410px, (min-width: 640px) 380px, 85vw"
            />
            <figcaption>
              <span>Matt Ghoreishi</span>
              <span>Based in Hamburg, Germany</span>
            </figcaption>
          </figure>
        </section>
        <div className="portfolio-wrap">
          <div className="career-signpost">
            <span>My work has taken me through</span>
            <p>
              Cafe Bazaar <span>→</span> Sotoon <span>→</span> Albatec{" "}
              <span>→</span> AI evaluation
            </p>
            <Link href="/experience">
              The full story
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <section id="selected-work" className="portfolio-paper scroll-mt-24">
          <div className="portfolio-wrap">
            <div className="section-heading">
              <div>
                <p className="portfolio-eyebrow">Selected work / 01–03</p>
                <h2>
                  Three products.
                  <br />
                  Three different calls to make.
                </h2>
              </div>
              <p>
                A closer look at the customer problems, trade-offs, and results
                behind my work.
              </p>
            </div>
            <CaseList source="home" />
            <p className="case-footnote">
              Historical results from my product work. Each case explains the
              scope and context; outcomes belong to the teams behind them.
            </p>
          </div>
        </section>
        <section className="portfolio-wrap portfolio-section">
          <div className="section-heading">
            <div>
              <p className="portfolio-eyebrow">The thread through my career</p>
              <h2>
                Different domains.
                <br />A growing set of responsibilities.
              </h2>
            </div>
            <Link href="/experience" className="portfolio-text-link">
              Experience in detail
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <CareerTimeline compact />
        </section>
        <section className="portfolio-lab">
          <div className="portfolio-wrap">
            <div className="section-heading">
              <div>
                <p className="portfolio-eyebrow">On my desk</p>
                <h2>Writing, building, and testing ideas.</h2>
              </div>
              <p>
                AI is a current focus. These are ways I make my thinking
                concrete and open to challenge.
              </p>
            </div>
            <div className="lab-grid">
              <article>
                <p className="lab-label">Essay / {article.readingTime}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <Link
                  href={`/writing/${article.slug}`}
                  className="portfolio-text-link"
                >
                  Read the essay
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
              <article>
                <p className="lab-label">Working tool / Free to use</p>
                <h3>Agentic Product Stack Mapper</h3>
                <p>
                  A tool I built to work through an AI product idea: the user’s
                  workflow, where autonomy belongs, how to evaluate it, and what
                  would make it worth shipping.
                </p>
                <Link
                  href="/tools/agentic-product-stack-mapper"
                  className="portfolio-text-link"
                >
                  Explore the tool
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>
        <section className="portfolio-wrap personal-note">
          <p className="portfolio-eyebrow">A little more about me</p>
          <p>
            I started in product marketing, moved into product development, and
            later led product teams. I still like being close to the work:
            talking to customers, questioning the numbers, and figuring things
            out with the people building the product.
          </p>
          <Link href="/about" className="portfolio-text-link">
            About me
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <ContactStrip />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url: siteUrl,
            jobTitle: "Senior Product Manager",
            image: `${siteUrl}/assets/profile/matt-ghoreishi-profile.webp`,
            sameAs: [profile.linkedinUrl, profile.githubUrl, profile.mediumUrl],
          }),
        }}
      />
    </>
  );
}
