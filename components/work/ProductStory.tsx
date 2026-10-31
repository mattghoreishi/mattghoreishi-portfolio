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
  sections: {
    label: string;
    title: string;
    paragraphs: string[];
    observations?: { observation: string; implication: string }[];
  }[];
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
      <main id="main-content" className="portfolio-page case-study-page">
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
          aria-label="Project scale and historical results"
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
                  {section.observations && (
                    <dl className="mt-8 border-t border-[#183137]/20">
                      {section.observations.map((item) => (
                        <div key={item.observation} className="grid gap-2 border-b border-[#183137]/15 py-5 sm:grid-cols-[0.45fr_0.55fr] sm:gap-6">
                          <dt className="font-semibold leading-7">{item.observation}</dt>
                          <dd className="leading-7 text-[#526562]">{item.implication}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </section>
            ))}
            <aside className="story-evidence">
              <h2>Scope of this account</h2>
              <p>{note}</p>
            </aside>
          </div>
        </div>
        <section className="portfolio-wrap portfolio-section">
          <p className="portfolio-eyebrow">Another project</p>
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
