import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageIntro, pageMetadata } from "@/components/site/Portfolio";

export const metadata = pageMetadata(
  "Tools",
  "A personal product experiment by Matt Ghoreishi: the Agentic Product Stack Mapper, a browser-based worksheet for AI product decisions.",
  "/tools",
);

export default function ToolsPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <PageIntro label="Tools" title="Putting an idea to work.">
          <p>
            Sometimes I want to take an argument further than an essay. This
            is a small tool I built to make my thinking easier to use, inspect,
            and question.
          </p>
        </PageIntro>
        <section className="portfolio-wrap writing-index pb-16" aria-label="Personal tools">
          <article className="writing-row">
            <p className="portfolio-eyebrow">Personal project</p>
            <div className="article-note-copy">
              <h2>
                <Link href="/tools/agentic-product-stack-mapper">
                  Agentic Product Stack Mapper
                </Link>
              </h2>
              <p>
                A browser-based worksheet for an AI product idea. It asks
                where an agent fits into a workflow, which actions it can take,
                what needs human approval, and how the team would evaluate the
                result.
              </p>
              <p>
                Start with a support-refund example or your own idea. The
                output is a draft product brief to review and improve.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                <Link href="/tools/agentic-product-stack-mapper" className="portfolio-text-link">
                  How it works
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/mapper" className="portfolio-text-link">
                  Open the mapper
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
