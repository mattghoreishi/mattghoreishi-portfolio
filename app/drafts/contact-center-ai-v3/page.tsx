import type { Metadata } from "next";
import { ContactCenterAICase } from "@/components/work/ContactCenterAICase";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Center AI: 2020 → today | Matt Ghoreishi",
  description:
    "A draft interactive reconstruction of Contact Center AI product work from 2020, with a current reflection on AI workflow, evidence, and action design.",
  alternates: {
    canonical: `${siteUrl}/drafts/contact-center-ai-v3`
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function ContactCenterAIV3Page() {
  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <SiteNav />
      <ContactCenterAICase />
      <SiteFooter />
    </main>
  );
}
