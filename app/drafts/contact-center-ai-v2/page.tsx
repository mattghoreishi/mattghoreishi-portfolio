import type { Metadata } from "next";
import { ContactCenterAIV2Draft } from "@/components/drafts/ContactCenterAIV2Draft";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Center AI: 2020 → 2026 | Matt Ghoreishi",
  description:
    "An interactive reconstruction of Contact Center AI product work I began in 2020, and how I would rethink the same workflow with modern AI in 2026.",
  alternates: { canonical: `${siteUrl}/drafts/contact-center-ai-v2` },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Contact Center AI: 2020 → 2026 | Matt Ghoreishi",
    description:
      "An interactive reconstruction of Contact Center AI product work I began in 2020, and how I would rethink the same workflow with modern AI in 2026.",
    url: `${siteUrl}/drafts/contact-center-ai-v2`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Center AI: 2020 → 2026 | Matt Ghoreishi",
    description: "A modern reconstruction of Contact Center AI product work from 2020, with a 2026 product reflection.",
    images: ["/opengraph-image"]
  }
};

export default function ContactCenterAIV2Page() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <ContactCenterAIV2Draft />
      <SiteFooter />
    </main>
  );
}
