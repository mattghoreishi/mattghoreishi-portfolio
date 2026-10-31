import Link from "next/link";
import { AnalyticsPreferencesButton } from "@/components/analytics/AnalyticsPreferencesButton";
import { profile } from "@/data/site";
export function SiteFooter() {
  return (
    <footer className="site-footer no-print">
      <div className="portfolio-wrap">
        <div>
          <p className="font-semibold text-white">Matt Ghoreishi</p>
          <p className="mt-2">
            Product work, writing, and a few things I’ve learned.
          </p>
          <p className="mt-2 text-xs">© 2026 · Hamburg</p>
        </div>
        <div className="footer-links">
          <Link href="/experience">Experience</Link>
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
