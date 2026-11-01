import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function NotFound() {
  return <>
    <SiteNav />
    <main id="main-content" tabIndex={-1} className="portfolio-page">
      <div className="portfolio-wrap portfolio-intro min-h-[60vh]">
        <p className="portfolio-eyebrow">404 · Page not found</p>
        <h1 className="portfolio-heading">That page isn’t here</h1>
        <p className="portfolio-lead mt-6">The link may be out of date. You can find my projects in selected work.</p>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <Link href="/work" className="portfolio-button">Browse selected work <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link href="/" className="portfolio-text-link">Back to the homepage</Link>
        </div>
      </div>
    </main>
    <SiteFooter />
  </>;
}
