export const analyticsEvents = {
  openCaseStudy: "open_case_study",
  expandRationale: "expand_rationale",
  switchDemoTab: "switch_demo_tab",
  playDemo: "play_demo",
  clickPrimaryCta: "click_primary_cta",
  clickContact: "click_contact",
  copyEmail: "copy_email",
  downloadResume: "download_resume",
  submitContactForm: "submit_contact_form",
  articleRead50: "article_read_50",
  articleRead90: "article_read_90",
  ccaiRunTriage: "ccai_run_triage",
  ccaiEraSwitch: "ccai_era_switch",
  ccaiAutonomyMode: "ccai_autonomy_mode",
  ccaiReviewAction: "ccai_review_action",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    mattAnalyticsConsentGranted?: boolean;
  }
}

export function readAnalyticsStorage(key: string) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeAnalyticsStorage(key: string, value: string) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// Never send a contact address or mail subject/body as analytics metadata.
export function safeLinkMetadata(
  href: string | undefined,
  text: string | undefined,
) {
  if (href && /^(mailto|tel):/i.test(href)) {
    return { link_text: undefined, destination_url: undefined };
  }
  const destination = href?.split(/[?#]/)[0];
  return {
    link_text: text?.trim().slice(0, 120),
    destination_url: destination,
  };
}

export function isAnalyticsDebugEnabled() {
  if (typeof window === "undefined") return false;

  return (
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true" ||
    new URLSearchParams(window.location.search).has("analytics_debug") ||
    readAnalyticsStorage("analytics_debug") === "true"
  );
}

function hasAnalyticsValue(value: AnalyticsParams[string]) {
  return (
    value !== undefined &&
    value !== null &&
    (typeof value !== "string" || value !== "")
  );
}

// Descriptive tool input belongs in the visitor's draft, never an analytics event.
const privateAnalyticsFields = new Set([
  "email", "phone", "agent_name", "main_use_case", "feedback", "comment", "brief", "inputs", "transcript",
]);

export function articleReadDepth(articleTop: number, articleHeight: number, viewportBottom: number) {
  if (articleHeight <= 0) return 0;
  return Math.min(100, Math.max(0, ((viewportBottom - articleTop) / articleHeight) * 100));
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {},
) {
  if (typeof window === "undefined") return false;
  const debugEnabled = isAnalyticsDebugEnabled();

  const cleanParams = Object.fromEntries(
    Object.entries({
      ...params,
      debug_mode: debugEnabled || undefined,
    }).filter(([key, value]) => !privateAnalyticsFields.has(key) && hasAnalyticsValue(value)),
  );

  if (window.mattAnalyticsConsentGranted !== true) {
    if (debugEnabled) {
      console.info("[analytics skipped: consent]", eventName, cleanParams);
    }
    return false;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanParams);
  } else {
    if (debugEnabled) {
      console.info("[analytics skipped]", eventName, cleanParams);
    }
    return false;
  }

  if (debugEnabled) {
    console.info("[analytics]", eventName, cleanParams);
  }

  return true;
}

export function trackPageView(path: string, title?: string) {
  if (
    typeof window === "undefined" ||
    window.mattAnalyticsConsentGranted !== true ||
    typeof window.gtag !== "function"
  ) {
    return false;
  }
  const debugEnabled = isAnalyticsDebugEnabled();
  const pagePath = path.split(/[?#]/)[0] || "/";

  window.gtag("event", "page_view", {
    page_location: window.location.href.split(/[?#]/)[0],
    page_path: pagePath,
    page_referrer: document.referrer?.split(/[?#]/)[0] || undefined,
    page_title: title ?? document.title,
    debug_mode: debugEnabled || undefined,
  });

  if (debugEnabled) {
    console.info("[analytics]", "page_view", {
      page_path: pagePath,
      page_title: title ?? document.title,
      debug_mode: true,
    });
  }

  return true;
}
