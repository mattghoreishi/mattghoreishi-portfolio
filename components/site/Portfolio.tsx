import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, siteUrl } from "@/data/site";
import { career, selectedCases } from "@/data/portfolio";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = title.startsWith("Matt Ghoreishi")
    ? title
    : `${title} | Matt Ghoreishi`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: fullTitle,
      description,
      url: `${siteUrl}${path}`,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="portfolio-wrap portfolio-intro">
      <p className="portfolio-eyebrow">{label}</p>
      <h1 className="portfolio-heading">{title}</h1>
      <div className="portfolio-lead mt-6 max-w-3xl">{children}</div>
    </header>
  );
}

export function CaseList({ source }: { source: string }) {
  return (
    <div className="case-list">
      {selectedCases.map((item) => (
        <article className="case-row" key={item.slug}>
          <div className="case-number" aria-hidden="true">
            {item.number}
          </div>
          <div>
            <p className="case-kicker">
              {item.company} <span aria-hidden="true">/</span> {item.category}
            </p>
            <h3>
              <Link
                href={`/work/${item.slug}`}
                data-analytics-event="open_case_study"
                data-analytics-params={JSON.stringify({
                  case_study: item.slug,
                  source_surface: source,
                })}
              >
                {item.title}
              </Link>
            </h3>
            <p className="case-summary">{item.summary}</p>
            <p className="case-decision">
              <span>The decision</span> {item.decision}
            </p>
            <Link
              href={`/work/${item.slug}`}
              className="portfolio-text-link"
              data-analytics-event="open_case_study"
              data-analytics-params={JSON.stringify({
                case_study: item.slug,
                source_surface: source,
              })}
            >
              {item.linkLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="case-result">
            <p>{item.metric}</p>
            <span>{item.metricLabel}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CareerTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`career-timeline ${compact ? "career-compact" : ""}`}>
      {career.map((item) => (
        <li key={item.company}>
          <div>
            <p className="career-period">{item.period}</p>
            <h3>{item.company}</h3>
            <p className="career-role">{item.role}</p>
          </div>
          <div>
            <p className="career-detail">{item.detail}</p>
            {!compact && (
              <ul className="career-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {!compact && "href" in item && (
              <Link href={item.href} className="portfolio-text-link mt-5">
                {item.linkLabel}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ContactStrip() {
  return (
    <section className="portfolio-contact-strip">
      <div className="portfolio-wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="portfolio-eyebrow">Let’s talk</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Have a product problem worth working on?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            I’m interested in senior product roles where I can work closely with
            customers, make difficult choices, and see the results.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:flex-col">
          <a
            href={`mailto:${profile.email}`}
            className="portfolio-button"
            data-analytics-event="click_contact"
            data-analytics-params={JSON.stringify({
              contact_method: "email",
              cta_location: "contact_strip",
            })}
          >
            Email me
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <Link
            href="/resume"
            className="portfolio-button portfolio-button-secondary"
          >
            Read my CV
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
