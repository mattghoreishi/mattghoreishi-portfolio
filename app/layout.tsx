import type { Metadata } from "next";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { siteUrl } from "@/data/site";
import "./globals.css";

// Set these in production:
// NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XWVT59N0JV"
// NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-search-console-token"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Matt Ghoreishi | Senior Product Manager",
    template: "%s"
  },
  description:
    "Matt Ghoreishi is a Senior Product Manager in Hamburg focused on AI, SaaS, and data platforms, building products where AI, data, and business outcomes meet.",
  applicationName: "Matt Ghoreishi",
  authors: [{ name: "Matt Ghoreishi" }],
  creator: "Matt Ghoreishi",
  publisher: "Matt Ghoreishi",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
