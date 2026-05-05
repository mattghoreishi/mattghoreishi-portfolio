import type { Metadata } from "next";
import { siteUrl } from "@/data/site";
import "./globals.css";

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
  publisher: "Matt Ghoreishi"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
