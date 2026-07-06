import Link from "next/link";
import { profile } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050914] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">{profile.name}</p>
          <p className="mt-1">© 2026 Matt Ghoreishi. Built in Hamburg.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/experience" className="hover:text-white">Experience</Link>
          <Link href="/projects" className="hover:text-white">Projects</Link>
          <Link href="/writing" className="hover:text-white">Writing</Link>
          <Link href="/tools" className="hover:text-white">Tools</Link>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="click_contact"
            data-analytics-params={JSON.stringify({ contact_method: "linkedin", cta_location: "site_footer" })}
            className="hover:text-white"
          >
            LinkedIn
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
          <a href={profile.mediumUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Medium</a>
        </div>
      </div>
    </footer>
  );
}
