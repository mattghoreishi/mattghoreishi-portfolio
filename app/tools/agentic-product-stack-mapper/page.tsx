import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageIntro, pageMetadata } from "@/components/site/Portfolio";
import { ArticleNoteSection } from "@/components/site/ArticleNotes";

export const metadata = pageMetadata(
  "Agentic Product Stack Mapper",
  "A personal project by Matt Ghoreishi: work through an AI product idea, define permissions and evaluation, then export a draft product brief.",
  "/tools/agentic-product-stack-mapper",
);

const steps = [
  ["Describe the work", "Start with the user, the task, and the outcome you want to change. A support-refund example is included if you want to explore first."],
  ["Set the boundaries", "Decide what the system may read or change, which actions require approval, and when it should escalate."],
  ["Work through the evidence", "Specify evaluation gates, human review, monitoring, recovery, and a measure of business value."],
  ["Review and export", "Read the assembled brief, revise the assumptions, and export it as Markdown or JSON, or print it to PDF."],
];

export default function AgenticProductStackMapperPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <PageIntro label="Personal project" title="Agentic Product Stack Mapper">
          <p>
            A worksheet for the decisions around an AI agent: where it belongs
            in a workflow, how much authority it should have, and what would
            make it worth shipping.
          </p>
          <Link
            href="/mapper"
            className="portfolio-button mt-7"
            data-analytics-event="play_demo"
            data-analytics-params={JSON.stringify({
              demo_name: "agentic_product_stack_mapper",
              cta_location: "tool_detail_intro",
              destination_path: "/mapper",
            })}
          >
            Open the mapper
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </PageIntro>
        <div className="portfolio-wrap pb-16">
          <dl className="tool-facts">
            <div><dt>Format</dt><dd>Browser-based worksheet</dd></div>
            <div><dt>Output</dt><dd>A draft product brief</dd></div>
            <div><dt>Access</dt><dd>No account or email required</dd></div>
          </dl>
          <ArticleNoteSection label="Why I built it" title="Make the open decisions visible.">
            <p>
              The mapper is a companion to my essay, The Agentic AI Product Gap.
              I wanted a way to work through its questions in the context of a
              specific product, with an artifact a team could discuss.
            </p>
            <p>
              Take a support-refund agent. Reading an order, drafting a reply,
              and issuing a refund carry different consequences. The mapper
              gives each action its own boundary and brings those decisions
              together with evaluation, recovery, and value.
            </p>
          </ArticleNoteSection>
          <ArticleNoteSection label="Using it" title="From an idea to a first brief.">
            <ol className="article-question-list">
              {steps.map(([title, body]) => (
                <li key={title}><h3>{title}</h3><p>{body}</p></li>
              ))}
            </ol>
          </ArticleNoteSection>
          <ArticleNoteSection label="What to expect" title="A starting point for review.">
            <p>
              The brief is assembled from your answers and built-in guidance.
              The mapper does not run an AI agent or validate a product in the
              real world. Suggested answers need checking against the users,
              systems, and constraints of your own project.
            </p>
            <p>
              You can work through the sections in any order and return to the
              assumptions that need more evidence. The useful result is a
              clearer discussion about what to build and what still needs to
              be learned.
            </p>
          </ArticleNoteSection>
        </div>
        <aside className="portfolio-wrap article-related">
          <p className="portfolio-eyebrow">The thinking behind it</p>
          <Link href="/writing/the-agentic-ai-product-gap" className="portfolio-text-link mt-5">
            Notes &amp; framework: The Agentic AI Product Gap
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
