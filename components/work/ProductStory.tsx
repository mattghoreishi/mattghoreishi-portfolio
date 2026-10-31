import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactStrip } from "@/components/site/Portfolio";

type StoryProps = {
  label: string;
  title: string;
  introduction: string;
  ownership: string;
  facts: { value: string; label: string }[];
  sections: { label: string; title: string; paragraphs: string[] }[];
  note: string;
  nextHref: string;
  nextTitle: string;
};
export function ProductStory({
  label,
  title,
  introduction,
  ownership,
  facts,
  sections,
  note,
  nextHref,
  nextTitle,
}: StoryProps) {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <header className="portfolio-wrap story-hero">
          <Link href="/work" className="portfolio-text-link mb-10">
            <ArrowLeft size={17} aria-hidden="true" />
            All work
          </Link>
          <p className="portfolio-eyebrow">{label}</p>
          <h1 className="portfolio-heading">{title}</h1>
          <p className="portfolio-lead mt-6 max-w-3xl">{introduction}</p>
          <p className="story-role">
            <span>My role</span>
            {ownership}
          </p>
        </header>
        <section
          className="story-facts portfolio-wrap"
          aria-label="Historical project outcomes"
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <p>{fact.value}</p>
              <span>{fact.label}</span>
            </div>
          ))}
        </section>
        <div className="portfolio-paper">
          <div className="portfolio-wrap">
            {sections.map((section, index) => (
              <section key={section.label} className="story-section">
                <p className="portfolio-eyebrow">
                  0{index + 1} / {section.label}
                </p>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <aside className="story-evidence">
              <h2>About the evidence</h2>
              <p>{note}</p>
            </aside>
          </div>
        </div>
        <section className="portfolio-wrap portfolio-section">
          <p className="portfolio-eyebrow">Another side of my work</p>
          <Link href={nextHref} className="next-story">
            {nextTitle}
            <ArrowRight size={28} aria-hidden="true" />
          </Link>
        </section>
        <ContactStrip />
      </main>
      <SiteFooter />
    </>
  );
}
