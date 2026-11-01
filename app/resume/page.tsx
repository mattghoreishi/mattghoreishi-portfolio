import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { pageMetadata } from "@/components/site/Portfolio";
import { PrintResume } from "@/components/site/PrintResume";
import { career } from "@/data/portfolio";
import resume from "@/data/resume.json";
export const metadata = pageMetadata(
  "CV",
  "Matt Ghoreishi’s CV: senior product management across AI, payments, video, and industrial SaaS. View or print a concise career summary.",
  "/resume",
);
export default function ResumePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="resume-page">
        <div className="portfolio-wrap">
          <div className="resume-tools no-print">
            <p>CV · Updated {resume.updated}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/assets/Matt-Ghoreishi-CV.pdf"
                download
                className="portfolio-button"
                data-analytics-event="download_resume"
                data-analytics-params={JSON.stringify({
                  asset_name: "Matt-Ghoreishi-CV",
                  asset_format: "pdf",
                  cta_location: "resume_page",
                })}
              >
                Download CV (PDF)
              </a>
              <PrintResume />
            </div>
          </div>
          <article className="resume-sheet">
            <header>
              <h1>{resume.name}</h1>
              <p className="resume-title">{resume.title}</p>
              <p>
                {resume.location} ·{" "}
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </p>
              <p>
                <a href={resume.linkedinUrl}>linkedin.com/in/mattghoreishi</a>{" "}
                · <a href={resume.siteUrl}>mattghoreishi.com</a>
              </p>
              <p className="resume-summary">{resume.summary}</p>
            </header>
            <section>
              <h2>Experience</h2>
              {career.map((item) => (
                <section className="resume-role" key={item.company}>
                  <div>
                    <h3>{item.company}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p className="font-semibold">{item.role}</p>
                  <p>{item.detail}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </section>
            <section>
              <h2>Selected product work</h2>
              {resume.selectedWork.map((item) => (
                <p key={item.href} className="mb-3">
                  <Link href={item.href}>{item.title}</Link>: {item.description}
                </p>
              ))}
            </section>
            <section>
              <h2>Education & languages</h2>
              <p>{resume.education}</p>
              <p>{resume.languages.join(" · ")}</p>
            </section>
            <section>
              <h2>Independent work</h2>
              {resume.independentWork.map((item) => (
                <p key={item.href}>
                  <Link href={item.href}>{item.title}</Link>: {item.description}
                </p>
              ))}
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
