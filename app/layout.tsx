import type { Metadata, Viewport } from "next";
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
    "Matt Ghoreishi is a Senior Product Manager in Hamburg. Explore the decisions behind his work in AI, payments, video, and industrial SaaS.",
  applicationName: "Matt Ghoreishi",
  authors: [{ name: "Matt Ghoreishi" }],
  creator: "Matt Ghoreishi",
  publisher: "Matt Ghoreishi",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16" }
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }]
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined
  }
};

export const viewport: Viewport = {
  themeColor: "#101719",
  colorScheme: "dark",
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
