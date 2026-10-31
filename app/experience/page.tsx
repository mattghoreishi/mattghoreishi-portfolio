import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  CareerTimeline,
  ContactStrip,
  PageIntro,
  pageMetadata,
} from "@/components/site/Portfolio";
export const metadata = pageMetadata(
  "Experience",
  "Matt Ghoreishi’s career across Cafe Bazaar, Sotoon, Albatec, and AI evaluation, with roles, dates, responsibilities, and selected outcomes.",
  "/experience",
);
export default function ExperiencePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="portfolio-page">
        <PageIntro
          label="Experience"
          title="Experience."
        >
          <p>
            I started in product marketing in 2014. Since then, I’ve owned
            products, led product teams, and worked across consumer platforms,
            enterprise AI, and industrial software.
          </p>
          <Link href="/resume" className="portfolio-text-link mt-7">
            Read my CV
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </PageIntro>
        <section className="portfolio-wrap pb-20">
          <h2 className="sr-only">Career timeline</h2>
          <CareerTimeline />
        </section>
        <section className="portfolio-paper">
          <div className="portfolio-wrap grid gap-12 md:grid-cols-2">
            <div>
              <p className="portfolio-eyebrow">Education</p>
              <h2 className="mt-5 text-2xl font-semibold">
                Sharif University of Technology
              </h2>
              <p className="mt-3 leading-7">BSc, Electrical Engineering</p>
              <p className="mt-3 leading-7 text-[var(--portfolio-secondary)]">
                An engineering foundation that helps me work through technical
                constraints with the teams building the product.
              </p>
            </div>
            <div>
              <p className="portfolio-eyebrow">How that experience connects</p>
              <p className="mt-5 text-xl leading-8">
                Consumer products taught me about distribution and retention. AI
                taught me to connect model quality to a useful workflow.
                Industrial SaaS brought that work closer to sensors, operators,
                and the physical world.
              </p>
            </div>
          </div>
        </section>
        <ContactStrip />
      </main>
      <SiteFooter />
    </>
  );
}
