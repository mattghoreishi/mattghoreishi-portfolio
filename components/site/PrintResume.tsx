"use client";
import { Printer } from "lucide-react";
export function PrintResume() {
  return (
    <button
      type="button"
      className="portfolio-button no-print"
      onClick={() => window.print()}
    >
      <Printer size={17} aria-hidden="true" />
      Print / save as PDF
    </button>
  );
}
