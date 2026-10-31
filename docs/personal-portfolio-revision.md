# Personal portfolio revision, October 2026

## Intent

Make the site useful to someone assessing Matt's actual product work: the problems, decisions, responsibilities, and results. Retain the MG Architect identity, existing writing, historical artifacts, and interactive tools.

## Content model and sources

- `data/portfolio.ts` holds the shared career timeline and selected-case summaries.
- Career dates and responsibilities were compared with the supplied CVs and employment reference letters. Sotoon's employment end date follows the reference letter (December 2022). The public site does not reproduce private source documents.
- The Inline Apps case uses Matt's account of category-level churn and the decision to focus on video. MAU figures refer to different products and periods, not an experimental before/after lift.
- Direct Carrier Billing is a concise project overview. The approximately 20% revenue result remains labelled associated growth.
- CCAI results distinguish daily ASR volume, review throughput, and scoring of low-rated calls. Synthetic demo numbers are not historical product results.
- Contract AI work uses bounded years rather than implying that a particular assignment is still active.
- The public CV excludes private identifiers, home address, phone, immigration claims, and reference-letter signatures. Update both `/resume` and `public/assets/Matt-Ghoreishi-CV.pdf` when revising career content.

## Experience and implementation

- Editorial dark/cream layout, existing portrait, visible experience and CV links, responsive disclosure navigation, keyboard focus indicators, and skip links.
- New Inline Apps / video and Direct Carrier Billing pages alongside the existing CCAI reconstruction.
- CCAI transcript walkthrough and review controls now provide visible local feedback. Demo notes never leave component state and reset when changing calls.
- CV available as accessible HTML, print view, and a two-page PDF.
- Existing article, tool, and Mapper URLs retained. No new dependencies or hosting services.

## Analytics

The initial page view waits for GA's inline base script readiness and is marked sent only after it is successfully queued. Restricted browser storage no longer breaks consent handling. Email and phone links omit their text and destination from custom click events; other destination URLs omit queries and fragments. Consent remains required for GA. Cloudflare's native analytics integration is unchanged.

`npm run check:analytics` covers SSR safety, blocked storage, pre-consent behavior, queue readiness, contact-address exclusion, and withdrawal. CI includes it in the existing quality job. GA dashboard reporting and Enhanced Measurement configuration still require authenticated dashboard access; a successful local event queue is not proof of remote reporting.

## Validation and deployment

Use Node 22 and npm. Run:

```sh
npm ci
npm run typecheck
npm run lint
npm run check:analytics
npm run next:build
npm run build
```

Browser checks cover desktop and narrow mobile layouts, navigation, CV links, CCAI triage and review actions, consent before/after acceptance, and the Mapper entry flow. PDF pages were rendered and visually inspected. Temporary QA routes and preview launch helpers must not be committed.

## Rollback

Before changes, the full baseline was preserved at:

- Branch: `archive/pre-personal-revision-2026-10-31`
- Commit: `62eff45a14f3c22abe4930e5d7405106b719acec`

Preserve protected `main`. If rollback is needed, revert the revision through a pull request and let the existing Cloudflare Pages integration deploy it. The archived branch remains available for inspection or recovery. Do not force-push or delete previous history.

### Release verification

Cloudflare Pages built and deployed the revision successfully from the feature branch. The local adapter run reported an export-status failure after successful compilation; this did not reproduce in Cloudflare’s build environment. No build dependency or hosting migration was needed. Link validation covered 218 internal links across 19 generated HTML pages. The cream-section decision label was adjusted to a measured 5.12:1 contrast ratio.
