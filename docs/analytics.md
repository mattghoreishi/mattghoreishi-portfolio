# Analytics

Cloudflare Pages deploys `main` through the existing Git integration. Cloudflare Web Analytics is injected by Pages, not by application code. Google Analytics loads only after consent; preferences can be changed in the footer.

The production GA measurement ID defaults to `G-XWVT59N0JV`. Environment overrides remain supported. Search Console verification reads `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. No credentials belong in the repository.

## Event behavior

The app sends one initial page view after the GA base script is ready. `send_page_view` is disabled in the base configuration. Subsequent SPA views rely on the existing GA Enhanced Measurement history setting; dashboard access is needed to verify that setting. Do not add a second route emitter without coordinating it.

The explicit page view strips query strings and fragments from location, path, and referrer. Link metadata strips destination query strings/fragments and excludes email/telephone destinations and text. Mapper free text, email, brief title, transcripts, and review notes are excluded from custom event parameters. These safeguards do not verify settings or automatic events controlled in the GA dashboard.

| Event | Meaning | Main parameters |
| --- | --- | --- |
| `open_case_study` | Open a selected project | `case_study`, `source_surface` |
| `click_contact` | Follow a contact link | `contact_method`, `cta_location` |
| `download_resume` | Download the public PDF CV | `asset_name`, `asset_format`, `cta_location` |
| `click_primary_cta` | Open the full Medium essay or export a Mapper brief | fixed action name, location, article slug or format |
| `article_read_50`, `article_read_90` | Content has crossed the viewport depth threshold | `article_slug`, `page_path`, `scroll_depth` |
| `play_demo`, `switch_demo_tab`, `expand_rationale` | Use an example, switch a module/call, or inspect guidance | fixed identifiers and preset domain |
| `ccai_run_triage` | Run the fictional 100-call illustration | explicitly synthetic counts |
| `ccai_review_action` | Use a local fictional QA action | synthetic call ID, action, demo ID |
| `ccai_era_switch`, `ccai_autonomy_mode` | Change the explanatory comparison | era or mode |

Reading depth measures content exposure, not comprehension or time spent reading. Events cannot identify a particular recruiter or establish hiring intent.

## Local tool data

Mapper drafts stay in browser local storage when available. Invalid drafts recover safely, and blocked storage does not prevent use. Export produces local files or opens the browser print dialog. The previous email gate and client-side submission/feedback requests have been removed. Historical submission, event, and feedback POST endpoints return HTTP 410 without reading request bodies or storing data.

CCAI notes and review actions stay in component state. They reset when a different synthetic call is selected.

## Verification

Run `npm run check:analytics` and `npm run check:mapper`. The regression checks cover consent, unavailable storage, script readiness, private field exclusion, URL sanitization, content depth, invalid drafts, and safe recovery.

In a browser, verify zero GA scripts before consent, one base initialization after consent, and the initial page view. Use `?analytics_debug=1` for local event diagnostics. Checking GA Realtime, Enhanced Measurement, Cloudflare visitor reports, and remote event delivery requires authenticated dashboard access; local queues do not prove remote reporting.
