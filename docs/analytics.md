# Analytics Setup

This site uses a small, privacy-aware analytics layer for `mattghoreishi.com`.

Deployment note: Cloudflare Pages production builds run from `main` with `pnpm run build`.

## Providers

- Cloudflare Web Analytics: injected natively by Cloudflare Pages after it is enabled in the project's Metrics settings. It is independent of the GA4 consent control and must not be added through application code.
- Google Analytics 4: loaded through `gtag.js` after consent. The production default is `G-XWVT59N0JV`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID` can override it.
- Google Search Console: verification meta tag reads from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

GA4 is configured with `send_page_view: false` so the site can send exactly one consent-time initial `page_view`. SPA route-change pageviews are handled by GA4 Enhanced Measurement browser-history tracking in the GA4 web stream; do not add a second manual App Router pageview emitter unless Enhanced Measurement is disabled in GA4.

Add these production environment variables:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XWVT59N0JV"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-search-console-token"
NEXT_PUBLIC_ANALYTICS_DEBUG="false"
```

For local debugging, add `?analytics_debug=1` to any URL or set `localStorage.analytics_debug = "true"`. To retest consent locally, remove `localStorage.matt_analytics_consent`.

## Event Map

| Event | Recommended parameters | Fires from | Test |
| --- | --- | --- | --- |
| `open_case_study` | `case_study`, `case_study_slug`, `content_type`, `source_surface`, `destination_path`, `cta_location` | Work and Home Contact Center AI cards, featured writing/tool cards, project theme links, article related links | Click the card/link and confirm event params in GA4 DebugView. Contact Center AI should send `case_study: "contact_center_ai_2020_today"`, `source_surface: "home"` or `"work"`, and `destination_path: "/work/contact-center-ai"`. |
| `expand_rationale` | `rationale_slug`, `demo_name`, `source`, `workflow_domain` | Mapper suggestions, deepen-brief flow, framework rationale link | Click suggestion/deepen controls and confirm one event per click. |
| `switch_demo_tab` | `demo_name`, `tab_id`, `tab_label`, `previous_tab_id`, `source` | Mapper progress stepper, next/back buttons, module picker | Move between mapper modules and confirm tab IDs are correct. |
| `play_demo` | `demo_name`, `sample_name`, `source`, `destination_path` | Start mapper CTAs, sample-load buttons, `?sample=refund` | Start the mapper or load sample and confirm source value. |
| `click_primary_cta` | `cta_name`, `cta_location`, `destination_path`, `destination_domain`, `article_slug` | Hero CTAs, Medium article CTAs, mapper downloads | Click each primary action and confirm destination/context. |
| `click_contact` | `contact_method`, `cta_location`, `destination_url` | LinkedIn CTAs in nav, footer, home, contact page | Click LinkedIn CTAs and confirm location differentiates them. |
| `copy_email` | `email_location`, `page_path` | Reserved for a future email-copy button | Add `trackEvent(analyticsEvents.copyEmail, ...)` to the copy handler. |
| `download_resume` | `asset_name`, `asset_format`, `cta_location` | Reserved for a future resume download link | Add `data-analytics-event="download_resume"` to the resume link. |
| `submit_contact_form` | `form_name`, `role`, `company_size`, `main_use_case`, `contact_consent` | Mapper export gate submission | Submit the export form and confirm no email address is sent to GA4. |
| `article_read_50` | `article_slug`, `page_path`, `scroll_depth` | Article pages at 50% read depth | Scroll halfway through an article and confirm it fires once. |
| `article_read_90` | `article_slug`, `page_path`, `scroll_depth` | Article pages at 90% read depth | Scroll near the end and confirm it fires once. |
| `ccai_run_triage` | `synthetic_result`, `calls_processed`, `calls_surfaced` | Contact Center AI V3 triage transformation | Click “Process all 100 and prioritize review” and confirm synthetic-only parameters. These values describe the demo state, not historical operating metrics. |
| `ccai_review_action` | `synthetic_call_id`, `action`, `demo` | Contact Center AI V3 QA workflow action buttons | Click a QA action and confirm no transcript or free text is sent. |
| `ccai_era_switch` | `era` | Contact Center AI V3 2020 / today product logic comparison | Switch between 2020 and today. |
| `ccai_autonomy_mode` | `mode` | Contact Center AI V3 Observe / Recommend / Act control | Switch modes and confirm no PII is sent. |

## What This Teaches

- Recruiter-quality interest: compare `click_contact`, deep article reads, and mapper export submissions by landing page.
- Case-study attention: compare `open_case_study`, `article_read_50`, `article_read_90`, and downstream CTAs by slug.
- CTA effectiveness: compare `click_primary_cta` and `click_contact` by `cta_location`.
- Article discovery: compare GA4 landing pages, Search Console queries, and article read-depth events by `article_slug`.
- Mapper drop-off: inspect `play_demo`, `switch_demo_tab`, `expand_rationale`, and export-gate completion.
- Contact Center AI proof-page drop-off: inspect `ccai_run_triage`, `switch_demo_tab`, `ccai_review_action`, `ccai_era_switch`, `ccai_autonomy_mode`, article CTA, and contact CTA events.

## Validation Checklist

1. Deploy and open `mattghoreishi.com/?analytics_debug=1`.
2. Accept analytics consent, then in GA4 Realtime confirm a `page_view` appears for the current page.
3. Navigate between internal routes and confirm exactly one `page_view` per route change.
4. In DebugView, click home hero CTAs and confirm `click_primary_cta` params.
5. Open a featured article/tool and confirm `open_case_study`.
6. Scroll both article pages to 50% and 90%; confirm each read-depth event fires once.
7. Start the mapper, switch several modules, and confirm `play_demo` plus `switch_demo_tab`.
8. Use mapper suggestions and confirm `expand_rationale`.
9. Submit the export gate and confirm `submit_contact_form` without email or free-text content in GA4.
10. Confirm the production DOM contains exactly one Cloudflare Pages Web Analytics beacon. It is independent of GA4 consent and should not have an application-managed duplicate.
