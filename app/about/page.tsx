import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactStrip, pageMetadata } from "@/components/site/Portfolio";

export const metadata = pageMetadata(
  "About",
  "Matt Ghoreishi on product work, getting into the details, thinking with AI, and his path from Tehran to Hamburg.",
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
            <h1 className="portfolio-heading">I’m Matt.</h1>
            <p className="portfolio-lead mt-6">
              I’m a product manager in Hamburg. My career started in Tehran,
              in product marketing at Cafe Bazaar. I moved into product
              development there, then led product teams at Sotoon.
            </p>
            <p className="portfolio-lead mt-5">
              My background is in electrical engineering. Since moving into
              product, I’ve worked as an individual PM and led PMs, across
              consumer businesses and enterprise software.
            </p>
          </div>
          <figure>
            <Image
              src="/assets/profile/matt-ghoreishi-profile.webp"
              width={512}
              height={512}
              priority
              sizes="(min-width: 768px) 320px, 85vw"
              alt="Matt Ghoreishi"
              className="w-full rounded-sm"
            />
          </figure>
        </section>

        <section className="portfolio-paper">
          <div className="portfolio-wrap about-writing">
            <p className="portfolio-eyebrow">How I approach the work</p>
            <div>
              <h2>The part I enjoy most</h2>
              <p>
                I like getting into a complicated journey: following what
                people do, examining the data, and working through the details
                until the problem starts to make sense. There is a particular
                satisfaction in the moment when something that looked confusing
                becomes clear enough to act on.
              </p>
              <p>
                At Cafe Bazaar, the total number of Inline Apps users did not
                explain what was happening inside each category. Looking more
                closely at that behavior helped us focus on video. At Sotoon,
                time with quality managers helped us understand what they needed
                to do after a call had been transcribed. In both cases, getting
                closer to the work changed the product direction.
              </p>
              <Link href="/work" className="portfolio-text-link">
                Read the project accounts
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <h2>Working with other people</h2>
              <p>
                I value clear expectations and direct feedback. I want to know
                where my reasoning is weak while there is still time to do
                something about it. With colleagues, I try to make the decision
                clear, explain the trade-off, and leave room for someone to
                change my mind.
              </p>
              <p>
                I still want to be close enough to the details to
                understand what I am asking a team to build and why.
              </p>

              <h2>Thinking with AI</h2>
              <p>
                I use AI a lot. One thing that concerns me is how easily a
                fluent answer can make an idea sound better examined than it is.
                I ask for weak assumptions and counterexamples, but asking for
                criticism does not automatically make the answer reliable. I
                still have to check it.
              </p>
              <p>
                My writing and tools explore related questions: what evidence
                makes an AI feature ready, which actions a system should be
                allowed to take, and how people can review or correct it.
              </p>
              <Link href="/writing" className="portfolio-text-link">
                Writing on AI products
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="portfolio-wrap personal-note">
          <p className="portfolio-eyebrow">Outside work</p>
          <p>
            I love roller skating, films, and music. I can happily spend hours
            talking about any of them.
          </p>
          <Link href="/experience" className="portfolio-text-link">
            Roles and experience
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <ContactStrip />
      </main>
      <SiteFooter />
    </>
  );
}
