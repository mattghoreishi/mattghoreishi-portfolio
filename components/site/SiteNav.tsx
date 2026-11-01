"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/site/BrandMark";

const links = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header className="site-header no-print">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav aria-label="Primary navigation" className="portfolio-wrap site-nav">
        <Link
          href="/"
          aria-label="Matt Ghoreishi home"
          className="site-brand"
          onClick={() => setOpen(false)}
        >
          <span className="brand-frame">
            <BrandMark />
          </span>
          <span>Matt Ghoreishi</span>
        </Link>
        <div className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {pathname === "/resume" ? (
            <span className="nav-cv" aria-current="page">CV</span>
          ) : <Link
            href="/resume"
            className="nav-cv"
          >
            CV
            <ArrowRight size={16} aria-hidden="true" />
          </Link>}
          <button
            ref={menuButton}
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-navigation portfolio-wrap"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
