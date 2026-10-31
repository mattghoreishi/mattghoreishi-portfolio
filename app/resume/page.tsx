import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { pageMetadata } from "@/components/site/Portfolio";
import { PrintResume } from "@/components/site/PrintResume";
import { career } from "@/data/portfolio";
import { profile } from "@/data/site";
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
            <p>CV · Updated October 2026</p>
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
              <h1>Matt Ghoreishi</h1>
              <p className="resume-title">Senior Product Manager</p>
              <p>
                Hamburg, Germany ·{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p>
                <a href={profile.linkedinUrl}>linkedin.com/in/mattghoreishi</a>{" "}
                · <a href="https://mattghoreishi.com">mattghoreishi.com</a>
              </p>
              <p className="resume-summary">
                Product manager with experience since 2014 across consumer
                platforms, enterprise AI, payments, and industrial SaaS.
                Background in individual product ownership, product team
                leadership, customer discovery, commercialization, and delivery.
              </p>
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
              <h2>Selected product outcomes</h2>
              <ul>
                <li>
                  Contact Center AI: 35% improvement in review / reporting
                  throughput; supporting ASR workflow handled 18K+ daily calls.
                </li>
                <li>
                  Cafe Bazaar: Direct Carrier Billing expanded to two operators,
                  reaching 5M+ new paying users, with approximately 20%
                  associated revenue growth.
                </li>
                <li>
                  Cafe Bazaar: VOD product reached 11M+ monthly active users.
                </li>
              </ul>
              <p className="resume-context">
                Historical team outcomes from my product work. Case studies on
                my website describe their scope and context.
              </p>
            </section>
            <section>
              <h2>Education & languages</h2>
              <p>
                BSc, Electrical Engineering · Sharif University of Technology
              </p>
              <p>
                English: fluent · Persian: native · Arabic: intermediate ·
                German: A1, actively learning
              </p>
            </section>
            <section>
              <h2>Independent work</h2>
              <p>
                <Link href="/tools/agentic-product-stack-mapper">
                  Agentic Product Stack Mapper
                </Link>
                : an interactive tool for product briefs covering workflow fit,
                autonomy, evaluation, and business value.
              </p>
              <p>
                <Link href="/writing">Product writing</Link> on AI evaluation,
                readiness, and moving from pilots to useful products.
              </p>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
