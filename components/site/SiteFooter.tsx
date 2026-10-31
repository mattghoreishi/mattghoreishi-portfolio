import Link from "next/link";
import { AnalyticsPreferencesButton } from "@/components/analytics/AnalyticsPreferencesButton";
import { profile } from "@/data/site";
export function SiteFooter() {
  return (
    <footer className="site-footer no-print">
      <div className="portfolio-wrap">
        <div>
          <p className="footer-name">Matt Ghoreishi</p>
          <p className="footer-location">Hamburg, Germany · © 2026</p>
        </div>
        <div className="footer-links">
          <Link href="/experience">Experience</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/resume">CV</Link>
          <Link href="/contact">Contact</Link>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <AnalyticsPreferencesButton />
        </div>
      </div>
    </footer>
  );
}
