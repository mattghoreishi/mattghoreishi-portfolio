import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageIntro, pageMetadata } from "@/components/site/Portfolio";
import { profile } from "@/data/site";
export const metadata = pageMetadata(
  "Contact",
  "Email Matt Ghoreishi or connect on LinkedIn to discuss senior product roles, AI products, payments, and SaaS. Based in Hamburg.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page">
        <PageIntro label="Contact" title="Let’s start with a conversation.">
          <p>
            I’m based in Hamburg and interested in senior product roles. If my
            experience connects with a problem your team is working on, I’d like
            to hear about it.
          </p>
        </PageIntro>
        <section className="portfolio-wrap contact-options">
          <a
            href={`mailto:${profile.email}`}
            data-analytics-event="click_contact"
            data-analytics-params={JSON.stringify({
              contact_method: "email",
              cta_location: "contact_page",
            })}
          >
            <span>Email</span>
            <strong>{profile.email}</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="click_contact"
            data-analytics-params={JSON.stringify({
              contact_method: "linkedin",
              cta_location: "contact_page",
            })}
          >
            <span>LinkedIn</span>
            <strong>Connect with me</strong>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <Link href="/resume">
            <span>Background</span>
            <strong>Read my CV</strong>
            <ArrowRight aria-hidden="true" />
          </Link>
          <div className="flex flex-wrap gap-6 py-8 text-sm text-slate-300">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-text-link"
            >
              Code on GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-text-link"
            >
              Writing on Medium
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
