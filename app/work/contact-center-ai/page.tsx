import type { Metadata } from "next";
import { ContactCenterAICase } from "@/components/work/ContactCenterAICase";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl } from "@/data/site";

const title = "Contact Center AI | Matt Ghoreishi";
const description =
  "Matt Ghoreishi’s Contact Center AI work at Sotoon: discovery with quality managers, the original 2020 prototype, product scope, and a synthetic review-workflow reconstruction.";
const url = `${siteUrl}/work/contact-center-ai`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url
  },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"]
  }
};

export default function ContactCenterAIPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="portfolio-page case-study-page">
        <ContactCenterAICase />
      </main>
      <SiteFooter />
    </>
  );
}
