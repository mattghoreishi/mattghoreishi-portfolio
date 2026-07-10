import type { Metadata } from "next";
import { ContactCenterAICase } from "@/components/work/ContactCenterAICase";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl } from "@/data/site";

const title = "Contact Center AI: 2020 → today | Matt Ghoreishi";
const description =
  "An interactive reconstruction of Contact Center AI product work I started in 2020, showing how ASR and NLP capabilities became a quality-review workflow and how I would approach the same product problem with modern AI.";
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
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <ContactCenterAICase />
      <SiteFooter />
    </main>
  );
}
