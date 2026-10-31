import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CareerTimeline, CaseList, ContactStrip, pageMetadata } from "@/components/site/Portfolio";
import { writingArticles, profile, siteUrl } from "@/data/site";

export const metadata = pageMetadata(
  "Matt Ghoreishi · Senior Product Manager",
  "Product manager in Hamburg. Work in payments, video, enterprise AI, and industrial software, alongside essays and a tool for thinking through AI products.",
  "",
);

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="portfolio-page">
        <section className="portfolio-wrap portfolio-hero">
          <div className="hero-copy">
            <p className="portfolio-eyebrow">Product work & personal notes</p>
            <h1>Matt Ghoreishi.</h1>
            <p className="hero-role">Senior Product Manager · Hamburg</p>
            <p className="portfolio-lead">
              I like getting deep into a complicated user journey: how people use
              a product, where they get stuck, and what the data suggests we have missed.
            </p>
            <p className="portfolio-lead">
              My work has included payments and video at Cafe Bazaar, enterprise
              AI at Sotoon, and industrial software at Albatec. Here are some of
              those projects, what I learned from them, and the ideas I’m exploring now.
            </p>
            <div className="hero-links">
              <Link href="#selected-work" className="portfolio-text-link">Selected work <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link href="/about" className="portfolio-text-link">A little about me</Link>
            </div>
          </div>
          <figure className="hero-portrait">
            <Image src="/assets/profile/matt-ghoreishi-profile.webp"
              alt="Matt Ghoreishi smiling, wearing glasses and a winter hat"
              width={512} height={512} priority
              sizes="(min-width: 768px) 320px, 75vw" />
          </figure>
        </section>

        <section id="selected-work" className="portfolio-paper scroll-mt-24">
          <div className="portfolio-wrap">
            <div className="section-heading">
              <div><p className="portfolio-eyebrow">From my work</p><h2>Selected work.</h2></div>
              <p>The context, my role, and the choices behind each product.</p>
            </div>
            <CaseList source="home" />
          </div>
        </section>

        <section className="portfolio-wrap portfolio-section home-career">
          <div className="section-heading">
            <div><p className="portfolio-eyebrow">Background</p><h2>My path so far.</h2></div>
            <Link href="/experience" className="portfolio-text-link">Full experience <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <CareerTimeline compact />
        </section>

        <section className="portfolio-lab">
          <div className="portfolio-wrap">
            <div className="section-heading">
              <div><p className="portfolio-eyebrow">Independent work</p><h2>Writing & a working tool.</h2></div>
              <p>Questions about AI that I’ve been working through in public.</p>
            </div>
            <div className="lab-grid">
              <div className="home-writing-list">
                {writingArticles.map((article) => (
                  <article key={article.slug}>
                    <p className="lab-label">{article.displayDate} · Article notes</p>
                    <h3><Link href={`/writing/${article.slug}`}>{article.title}</Link></h3>
                    <p>{article.summary}</p>
                    <Link href={`/writing/${article.slug}`} className="portfolio-text-link">Notes & framework <ArrowRight size={16} aria-hidden="true" /></Link>
                  </article>
                ))}
              </div>
              <article className="home-tool-note">
                <p className="lab-label">Independent project · Interactive tool</p>
                <h3>Agentic Product Stack Mapper</h3>
                <p>I built this to make an AI product discussion more concrete. Start with a workflow, work through risk and human control, then leave with a brief you can edit.</p>
                <ol className="tool-outline" aria-label="What the tool helps you examine">
                  <li><span>01</span> Which part of the work needs help?</li>
                  <li><span>02</span> What can the system do on its own?</li>
                  <li><span>03</span> What evidence would justify a pilot?</li>
                </ol>
                <p className="tool-local-note">Runs in your browser. No account or email required to download your brief.</p>
                <div className="tool-entry-links">
                  <Link href="/mapper?sample=refund" className="portfolio-button">Try a worked example <ArrowRight size={17} aria-hidden="true" /></Link>
                  <Link href="/tools/agentic-product-stack-mapper" className="portfolio-text-link">About the tool</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <ContactStrip />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: profile.name,
        url: siteUrl, jobTitle: "Senior Product Manager",
        image: `${siteUrl}/assets/profile/matt-ghoreishi-profile.webp`,
        sameAs: [profile.linkedinUrl, profile.githubUrl, profile.mediumUrl],
      }) }} />
    </>
  );
}
