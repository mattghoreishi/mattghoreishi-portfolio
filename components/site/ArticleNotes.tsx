import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ArticleEngagement } from "@/components/analytics/ArticleEngagement";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { type Article, siteUrl } from "@/data/site";

export function articleNotesMetadata(article: Article): Metadata {
  const title = `${article.title} | Matt Ghoreishi`;
  const description = `Notes and framework from my essay: ${article.subtitle}. The full essay is published on Medium.`;
  const url = `${siteUrl}/writing/${article.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Matt Ghoreishi"],
      tags: article.tags,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export function ArticleNotes({
  article,
  introduction,
  children,
  related,
}: {
  article: Article;
  introduction: string;
  children: ReactNode;
  related: { href: string; label: string }[];
}) {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="portfolio-page">
        <article data-article-content>
          <ArticleEngagement articleSlug={article.slug} />
          <header className="portfolio-wrap portfolio-intro article-notes-header">
            <Link href="/writing" className="portfolio-text-link mb-8">
              <ArrowLeft size={16} aria-hidden="true" />
              All writing
            </Link>
            <p className="portfolio-eyebrow">Article notes</p>
            <h1 className="portfolio-heading">{article.title}</h1>
            <div className="article-meta mt-6">
              <span>Published <time dateTime={article.publishedAt}>{article.displayDate}</time></span>
              <span>Full essay: {article.readingTime}</span>
            </div>
            <p className="portfolio-lead mt-6 max-w-3xl">{introduction}</p>
            <p className="article-meta mt-4 max-w-2xl">
              A summary and working framework from the essay. The full text is on Medium.
            </p>
            <a
              href={article.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-text-link mt-6"
              data-analytics-event="click_primary_cta"
              data-analytics-params={JSON.stringify({
                cta_name: "read_on_medium",
                article_slug: article.slug,
                cta_location: "article_notes_header",
                destination_domain: "medium.com",
              })}
            >
              Read full essay on Medium
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </header>
          <div className="portfolio-wrap pb-16">{children}</div>
        </article>
        <nav aria-label="Related reading" className="portfolio-wrap article-related">
          <p className="portfolio-eyebrow">Continue reading</p>
          <div className="mt-5 flex flex-col items-start gap-4">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="portfolio-text-link">
                {item.label}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}

export function ArticleNoteSection({
  label,
  title,
  children,
  id,
}: {
  label: string;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="article-note-section scroll-mt-24">
      <p className="portfolio-eyebrow">{label}</p>
      <div className="article-note-copy">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
