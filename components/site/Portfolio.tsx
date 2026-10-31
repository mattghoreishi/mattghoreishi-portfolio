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
            <p className="case-role">{item.role}</p>
            <p className="case-decision">
              {item.decision}
            </p>
            <p className="case-result"><strong>{item.metric}</strong> {item.metricLabel}</p>
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
            <p className="career-detail">{compact ? item.shortDetail : item.detail}</p>
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
      <div className="portfolio-wrap contact-note">
        <div>
          <h2>Get in touch.</h2>
          <p>I’m based in Hamburg and exploring senior product roles.</p>
        </div>
        <div className="contact-note-links">
          <a
            href={`mailto:${profile.email}`}
            className="portfolio-text-link"
            data-analytics-event="click_contact"
            data-analytics-params={JSON.stringify({
              contact_method: "email",
              cta_location: "contact_strip",
            })}
          >
            {profile.email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <Link
            href="/resume"
            className="portfolio-text-link"
          >
            Read my CV
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
