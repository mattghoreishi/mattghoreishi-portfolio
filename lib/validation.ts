import type { ExportLead } from "@/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: Partial<ExportLead>) {
  const errors: Record<string, string> = {};

  if (!input.email || !emailPattern.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.consent) {
    errors.consent = "Consent is required before we store this submission.";
  }

  if (input.website && input.website.trim().length > 0) {
    errors.bot = "Submission blocked.";
  }

  if (!input.startedAt || Date.now() - Number(input.startedAt) < 2500) {
    errors.timing = "Please wait a moment before submitting.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
