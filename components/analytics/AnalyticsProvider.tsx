"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  isAnalyticsDebugEnabled,
  readAnalyticsStorage,
  writeAnalyticsStorage,
  safeLinkMetadata,
  type AnalyticsEventName,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

const productionGaMeasurementId = "G-XWVT59N0JV";
const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || productionGaMeasurementId;
const consentStorageKey = "matt_analytics_consent";
const preferencesEventName = "analytics-preferences:open";

type AnalyticsConsent = "granted" | "denied" | "unset";

function applyAnalyticsConsent(consent: AnalyticsConsent) {
  if (typeof window === "undefined") return;

  const granted = consent === "granted";
  window.mattAnalyticsConsentGranted = granted;
  (window as unknown as Record<string, boolean>)[
    `ga-disable-${gaMeasurementId}`
  ] = !granted;

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
  }
}

function InitialPageViewTracking() {
  const pathname = usePathname();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (!gaMeasurementId || !pathname) return;
    if (hasTrackedInitialPage.current) return;

    hasTrackedInitialPage.current = trackPageView(pathname);
  }, [pathname]);

  return null;
}

function DelegatedEventTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest<HTMLElement>("[data-analytics-event]");
      const eventName = trigger?.dataset.analyticsEvent as
        | AnalyticsEventName
        | undefined;

      if (!trigger || !eventName) return;

      let params = {};
      const rawParams = trigger.dataset.analyticsParams;

      if (rawParams) {
        try {
          params = JSON.parse(rawParams);
        } catch {
          params = { analytics_params_parse_error: true };
        }
      }

      trackEvent(eventName, {
        ...safeLinkMetadata(
          trigger instanceof HTMLAnchorElement ? trigger.href : undefined,
          trigger.textContent ?? undefined,
        ),
        page_path: window.location.pathname,
        ...params,
      });
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

function AnalyticsConsentBanner({
  onConsentChange,
}: {
  onConsentChange: (consent: AnalyticsConsent) => void;
}) {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const focusOnOpenRef = useRef(false);
  const closeBanner = useCallback(() => {
    const focusWasInside = bannerRef.current?.contains(document.activeElement);
    const returnTarget = returnFocusRef.current?.isConnected
      ? returnFocusRef.current
      : document.getElementById("main-content");
    setVisible(false);
    returnFocusRef.current = null;
    if (focusWasInside) returnTarget?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    function readConsent() {
      const storedConsent = readAnalyticsStorage(consentStorageKey);
      if (storedConsent === "granted" || storedConsent === "denied") {
        applyAnalyticsConsent(storedConsent);
        onConsentChange(storedConsent);
        setVisible(false);
        if (isAnalyticsDebugEnabled()) {
          console.info("[analytics] consent state:", storedConsent);
        }
        return;
      }

      setVisible(true);
      applyAnalyticsConsent("unset");
      onConsentChange("unset");
      if (isAnalyticsDebugEnabled()) {
        console.info("[analytics] consent state: unset");
        console.info("[analytics] GA blocked pending consent");
      }
    }

    function openPreferences() {
      returnFocusRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      focusOnOpenRef.current = !bannerRef.current;
      setVisible(true);
      bannerRef.current?.focus({ preventScroll: true });
      if (isAnalyticsDebugEnabled()) {
        console.info("[analytics] preferences opened");
      }
    }

    readConsent();
    window.addEventListener(preferencesEventName, openPreferences);

    return () =>
      window.removeEventListener(preferencesEventName, openPreferences);
  }, [onConsentChange]);

  useEffect(() => {
    if (!visible || !bannerRef.current) return;

    const banner = bannerRef.current;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeBanner();
      }
    };
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--consent-banner-height",
        `${Math.ceil(banner.getBoundingClientRect().height)}px`,
      );
    };
    updateHeight();
    const observer = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(updateHeight);
    observer?.observe(banner);
    window.addEventListener("resize", updateHeight);
    banner.addEventListener("keydown", closeOnEscape);

    // Opening preferences is an explicit action. Initial consent remains
    // non-modal and never takes focus away from the page.
    if (focusOnOpenRef.current) {
      banner.focus({ preventScroll: true });
      focusOnOpenRef.current = false;
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeight);
      banner.removeEventListener("keydown", closeOnEscape);
      document.documentElement.style.removeProperty("--consent-banner-height");
    };
  }, [visible, closeBanner]);

  function saveConsent(consent: Exclude<AnalyticsConsent, "unset">) {
    writeAnalyticsStorage(consentStorageKey, consent);
    applyAnalyticsConsent(consent);
    onConsentChange(consent);
    closeBanner();
    if (isAnalyticsDebugEnabled()) {
      console.info(
        `[analytics] consent ${consent === "granted" ? "accepted" : "declined"}`,
      );
      if (consent === "granted") {
        console.info("[analytics] GA loading", gaMeasurementId);
      } else {
        console.info("[analytics] GA blocked by declined consent");
      }
    }
  }

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-label="Analytics preferences"
      aria-describedby="analytics-consent-description"
      data-analytics-banner="true"
      className="no-print fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-card px-5 py-4 text-foreground shadow-2xl shadow-black/30 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p id="analytics-consent-description" className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Analytics help me understand which portfolio work is useful and
          improve the site. Google Analytics only loads if you accept.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveConsent("denied")}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-input px-4 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveConsent("granted")}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export function openAnalyticsPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(preferencesEventName));
}

function AnalyticsPreferenceEventBridge() {
  useEffect(() => {
    window.openAnalyticsPreferences = openAnalyticsPreferences;
    return () => {
      delete window.openAnalyticsPreferences;
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    openAnalyticsPreferences?: () => void;
  }
}

export function AnalyticsProvider() {
  const [consent, setConsent] = useState<AnalyticsConsent>("unset");
  const [gaReady, setGaReady] = useState(false);
  const shouldLoadGa = gaMeasurementId && consent === "granted";

  return (
    <>
      {shouldLoadGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-base"
            strategy="afterInteractive"
            onReady={() => setGaReady(true)}
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                send_page_view: false,
                page_location: window.location.origin + window.location.pathname,
                page_referrer: document.referrer.split(/[?#]/)[0]
              });
            `}
          </Script>
        </>
      )}
      {shouldLoadGa && gaReady && (
        <Suspense fallback={null}>
          <InitialPageViewTracking />
        </Suspense>
      )}
      <DelegatedEventTracking />
      <AnalyticsPreferenceEventBridge />
      <AnalyticsConsentBanner onConsentChange={setConsent} />
    </>
  );
}
