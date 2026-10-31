import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageIntro, pageMetadata } from "@/components/site/Portfolio";
import { writingArticles } from "@/data/site";

export const metadata = pageMetadata(
  "Writing",
  "Essays and article notes by Matt Ghoreishi on AI product decisions, evaluation, workflows, and the work between a pilot and a useful product.",
  "/writing",
);

export default function WritingPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <PageIntro label="Writing" title="Questions I keep coming back to.">
          <p>
            Much of my recent writing is about AI: what a working demo leaves
            unanswered, how much authority a system should have, and what makes
            it useful in someone’s day-to-day work.
          </p>
        </PageIntro>
        <section className="portfolio-wrap writing-index pb-16" aria-label="Essays">
          {writingArticles.map((article) => (
            <article key={article.slug} className="writing-row">
              <div className="article-meta">
                <time dateTime={article.publishedAt}>{article.displayDate}</time>
                <p className="mt-2">{article.readingTime}</p>
              </div>
              <div className="article-note-copy">
                <h2>
                  <Link href={`/writing/${article.slug}`}>{article.title}</Link>
                </h2>
                <p>{article.summary}</p>
                <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                  <Link
                    href={`/writing/${article.slug}`}
                    className="portfolio-text-link"
                    data-analytics-event="open_case_study"
                    data-analytics-params={JSON.stringify({
                      case_study_slug: article.slug,
                      content_type: "article_notes",
                      source_surface: "writing",
                    })}
                  >
                    Notes &amp; framework
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  <a
                    href={article.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-text-link"
                  >
                    Full essay on Medium
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
        <aside className="portfolio-wrap article-related">
          <p className="portfolio-eyebrow">A companion to the writing</p>
          <div className="article-note-copy mt-5">
            <p>
              The Agentic Product Stack Mapper turns the questions in my agentic
              AI essay into a brief you can work through and export.
            </p>
            <Link href="/tools/agentic-product-stack-mapper" className="portfolio-text-link mt-5">
              About the mapper
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
