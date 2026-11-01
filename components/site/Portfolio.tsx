import Link from "next/link";
import Image from "next/image";
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
        <article className={`case-row${item.slug === "contact-center-ai" ? " case-row-featured" : ""}`} key={item.slug}>
          <div className="case-number" aria-hidden="true">
            {item.number}
          </div>
          <div className="case-copy">
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
          </div>
          <div className="case-evidence">
            {item.slug === "contact-center-ai" && (
              <Link href={`/work/${item.slug}#prototype`} className="case-artifact" aria-label="See the original Contact Center AI prototype from 2020">
                <Image src="/assets/cases/contact-center-prototype-2020.png" alt="Original Figma canvas showing Contact Center AI overview and quality-monitoring screens" width={2940} height={1742} sizes="(min-width: 1024px) 280px, (min-width: 768px) 340px, 80vw" />
                <span>Prototype archive · 2020 <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            )}
            <p className="case-result"><strong>{item.metric}</strong> <span>{item.metricLabel}</span></p>
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
            {!compact && item.href && (
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
