import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactStrip, pageMetadata } from "@/components/site/Portfolio";
export const metadata = pageMetadata(
  "About",
  "I’m Matt Ghoreishi, a product manager in Hamburg. My path from product marketing to product leadership, and the lessons that changed how I work.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <section className="portfolio-wrap about-intro">
          <div>
            <p className="portfolio-eyebrow">About me</p>
            <h1 className="portfolio-heading">
              I’m Matt.
              <br />A product person,
              <br />
              still learning.
            </h1>
            <p className="portfolio-lead mt-6">
              I live in Hamburg. My career started in Tehran, where I moved from
              product marketing into building products and leading product
              teams.
            </p>
            <p className="portfolio-lead mt-5">
              I’ve worked on advertising, payments, video, AI, and industrial
              monitoring. Changing domains has made me more willing to ask basic
              questions, and less willing to assume that a familiar answer fits
              a new problem.
            </p>
          </div>
          <figure>
            <Image
              src="/assets/profile/matt-ghoreishi-profile.webp"
              width={800}
              height={800}
              priority
              sizes="(min-width: 1024px) 360px, 85vw"
              alt="Matt Ghoreishi"
              className="w-full rounded-sm"
            />
            <figcaption className="mt-4 text-sm text-slate-400">
              Matt Ghoreishi · Hamburg, Germany
            </figcaption>
          </figure>
        </section>
        <section className="portfolio-paper">
          <div className="portfolio-wrap about-writing">
            <p className="portfolio-eyebrow">Things the work has taught me</p>
            <div>
              <h2>
                Being responsible for a product also means being willing to let
                part of it go.
              </h2>
              <p>
                Inline Apps had reached millions of users. That made narrowing
                its scope harder, but reach alone wasn’t a reason to keep
                investing in every category. Looking at how people used the
                product led me toward video.
              </p>
              <Link
                href="/work/inline-apps-to-video"
                className="portfolio-text-link"
              >
                Read that story
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <h2>A good model is only part of a useful AI product.</h2>
              <p>
                At Sotoon, working with quality managers made the next step
                clearer: help them find the calls that needed attention and give
                them evidence to review. The workflow mattered as much as the
                technology.
              </p>
              <h2>I want feedback I can do something with.</h2>
              <p>
                I value clear expectations, direct feedback, and room to
                question an assumption. I try to bring the same clarity to
                colleagues: what we’re deciding, why it matters, and what would
                change my mind.
              </p>
            </div>
          </div>
        </section>
        <section className="portfolio-wrap personal-note">
          <p className="portfolio-eyebrow">Outside the work</p>
          <p>
            Roller skating, films, and music are part of my life too. This site
            is mostly about products, but there’s a person on the other side of
            the email.
          </p>
          <Link href="/experience" className="portfolio-text-link">
            Explore my career
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <ContactStrip />
      </main>
      <SiteFooter />
    </>
  );
}
