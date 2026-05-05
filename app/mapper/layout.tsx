import type { Metadata } from "next";
import { siteUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Agentic Product Stack Mapper | Matt Ghoreishi",
  description:
    "A local product strategy workspace for turning an AI agent idea into an Agent Product Brief across workflow fit, risk, autonomy, evaluation, governance, and business value.",
  alternates: {
    canonical: `${siteUrl}/mapper`
  },
  openGraph: {
    title: "Agentic Product Stack Mapper",
    description:
      "Turn an AI agent idea into a structured Agent Product Brief across workflow fit, risk, autonomy, evaluation, governance, and business value.",
    url: `${siteUrl}/mapper`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Product Stack Mapper",
    description: "A practical product strategy workspace for AI agent ideas.",
    images: ["/opengraph-image"]
  }
};

export default function MapperLayout({ children }: { children: React.ReactNode }) {
  return children;
}
