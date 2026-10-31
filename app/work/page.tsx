import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  CaseList,
  ContactStrip,
  PageIntro,
  pageMetadata,
} from "@/components/site/Portfolio";
export const metadata = pageMetadata(
  "Selected work",
  "The decisions behind Matt Ghoreishi’s work in Contact Center AI, video, payments, and current AI product tools.",
  "/work",
);
export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <PageIntro
          label="Selected work"
          title="What I built. What I changed. Why."
        >
          <p>
            Three pieces of product work that show different sides of my
            experience: AI workflows, choosing a narrower strategy, and opening
            up a payment channel.
          </p>
        </PageIntro>
        <section className="portfolio-paper">
          <div className="portfolio-wrap">
            <h2 className="sr-only">Product case studies</h2>
            <CaseList source="work" />
            <p className="case-footnote">
              Historical results from my product work. The cases distinguish
              reported outcomes, reconstructed interfaces, and my reflections
              today.
            </p>
          </div>
        </section>
        <section className="portfolio-wrap portfolio-section">
          <p className="portfolio-eyebrow">Independent build</p>
          <h2 className="mt-5 text-3xl font-semibold md:text-4xl">
            Agentic Product Stack Mapper
          </h2>
          <p className="portfolio-lead mt-5 max-w-3xl">
            A practical tool for thinking through an AI product before
            committing to it. Work through the customer workflow, risk,
            autonomy, evaluation, and business value, then export a product
            brief.
          </p>
          <Link
            href="/tools/agentic-product-stack-mapper"
            className="portfolio-text-link mt-7"
          >
            Explore the tool
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <ContactStrip />
      </main>
      <SiteFooter />
    </>
  );
}
