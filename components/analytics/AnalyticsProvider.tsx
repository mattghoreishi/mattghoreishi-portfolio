"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { type AnalyticsEventName, trackEvent, trackPageView } from "@/lib/analytics";

const productionGaMeasurementId = "G-XWVT59N0JV";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || productionGaMeasurementId;
const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
const consentStorageKey = "matt_analytics_consent";

type AnalyticsConsent = "granted" | "denied" | "unset";

function RouteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trackedInitialPageView = useRef(false);

  useEffect(() => {
    if (!gaMeasurementId || !pathname || trackedInitialPageView.current) return;

    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
    trackedInitialPageView.current = true;
  }, [pathname, searchParams]);

  return null;
}

function DelegatedEventTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest<HTMLElement>("[data-analytics-event]");
      const eventName = trigger?.dataset.analyticsEvent as AnalyticsEventName | undefined;

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
        link_text: trigger.textContent?.trim().slice(0, 120),
        destination_url: trigger instanceof HTMLAnchorElement ? trigger.href : undefined,
        page_path: window.location.pathname,
        ...params
      });
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

function AnalyticsConsentBanner({ onConsentChange }: { onConsentChange: (consent: AnalyticsConsent) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(consentStorageKey);
    if (storedConsent === "granted" || storedConsent === "denied") {
      onConsentChange(storedConsent);
      return;
    }

    setVisible(true);
    onConsentChange("unset");
  }, [onConsentChange]);

  function saveConsent(consent: Exclude<AnalyticsConsent, "unset">) {
    window.localStorage.setItem(consentStorageKey, consent);
    onConsentChange(consent);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#050914]/95 px-5 py-4 text-white shadow-2xl shadow-black/40 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-slate-300">
          I use privacy-conscious analytics to understand which writing, case studies, and tools are useful. Google
          Analytics runs only if you accept; Cloudflare Web Analytics remains cookie-free.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => saveConsent("denied")}
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => saveConsent("granted")}
            className="inline-flex h-10 items-center justify-center rounded-md bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsProvider() {
  const [consent, setConsent] = useState<AnalyticsConsent>("unset");
  const shouldLoadGa = gaMeasurementId && consent === "granted";

  return (
    <>
      {shouldLoadGa && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga4-base" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      {cloudflareAnalyticsToken && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token: cloudflareAnalyticsToken })}
        />
      )}

      {shouldLoadGa && (
        <Suspense fallback={null}>
          <RouteAnalytics />
        </Suspense>
      )}
      <DelegatedEventTracking />
      <AnalyticsConsentBanner onConsentChange={setConsent} />
    </>
  );
}
