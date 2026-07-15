import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/site/BrandMark";
import { profile } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050914]/82 backdrop-blur-xl">
      <nav aria-label="Primary navigation" className="mx-auto max-w-7xl px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Matt Ghoreishi home" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
              <BrandMark />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">{profile.name}</span>
              <span className="hidden text-xs text-slate-400 sm:block">AI, SaaS, and Data Platforms</span>
            </span>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="click_contact"
            data-analytics-params={JSON.stringify({ contact_method: "linkedin", cta_location: "site_nav" })}
            className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-1 lg:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-sm font-medium text-slate-300">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
