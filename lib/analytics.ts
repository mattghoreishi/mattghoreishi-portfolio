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
  articleRead90: "article_read_90"
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsDebugEnabled() {
  if (typeof window === "undefined") return false;

  return (
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true" ||
    new URLSearchParams(window.location.search).has("analytics_debug") ||
    window.localStorage.getItem("analytics_debug") === "true"
  );
}

function hasAnalyticsValue(value: AnalyticsParams[string]) {
  return value !== undefined && value !== null && (typeof value !== "string" || value !== "");
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return false;
  const debugEnabled = isAnalyticsDebugEnabled();

  const cleanParams = Object.fromEntries(
    Object.entries({
      ...params,
      debug_mode: debugEnabled || undefined
    }).filter(([, value]) => hasAnalyticsValue(value))
  );

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

export function trackPageView(path: string, title = document.title) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
  const debugEnabled = isAnalyticsDebugEnabled();

  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: title,
    debug_mode: debugEnabled || undefined
  });

  if (debugEnabled) {
    console.info("[analytics]", "page_view", { page_path: path, page_title: title, debug_mode: true });
  }

  return true;
}
