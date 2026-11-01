# Architecture

## Routes and content

The Next.js App Router in `app/` owns public routes, metadata, sitemap output, and route-level composition. Shared portfolio content, including the article catalog and featured-article selection, lives in `data/site.ts`. This keeps Home, Writing, article pages, Work, and navigation aligned without coupling featured content to array position.

Editorial and case-study pages are server-rendered by default. Shared site chrome and presentational components live in `components/site/`; product-specific interactive components remain grouped by domain, such as `components/work/` and the Mapper components.

## Interactive boundaries

Client components are limited to interactions that need browser state: Contact Center AI workflow controls, the Agentic Product Stack Mapper, article engagement depth, and analytics consent/event handling. Content pages, metadata, and static visual structure remain on the server where possible.

## Analytics and consent

GA4 is implemented through the centralized analytics helper and is loaded only after a visitor grants analytics consent. The provider sends a single initial page view after consent and relies on the configured GA4 browser-history behavior for SPA route changes. Custom events use approved, structured parameters only; they must not include article text, names, email addresses, form input, transcripts, or other PII.

Cloudflare Web Analytics is injected natively by Cloudflare Pages. It is intentionally independent of GA4 consent and must not be duplicated by application code. See [analytics.md](analytics.md) for the event inventory and verification steps.

## Local data and retired endpoints

Mapper drafts and exports stay in the browser. The old `/api/submissions`, `/api/events`, and `/api/feedback` POST routes return HTTP 410 without reading request bodies or initializing storage. Keeping explicit retirement responses gives older clients a clear failure instead of silently accepting submissions. The Supabase client and unused chart library are removed; the database schema remains a historical artifact, not a live dependency.

## Deployment

Cloudflare Pages is the production deployment system. Its GitHub integration builds the production branch with `npm run build`, which generates the static Pages output configured in `wrangler.toml`. GitHub Actions CI validates changes only; it does not deploy and receives no production secrets.

The `next-on-pages` adapter is deprecated. This release preserves the working deployment while applying framework security patches; a hosting adapter migration is a separate change that needs its own preview and rollback. npm and `package-lock.json` are the supported dependency workflow.

## Response headers

`lib/securityHeaders.ts` defines the response protections used by Next configuration and retired API responses. `public/_headers` supplies the equivalent static-asset policy for Cloudflare Pages. The regression check keeps these aligned. Cloudflare does not apply `_headers` to Pages Function responses, so API responses attach their own headers. The limited CSP permits existing scripts while restricting base URLs, objects, and framing; it is not claimed as full XSS protection.

## Privacy constraints

Portfolio case studies reconstruct historical workflows with synthetic or sanitized data. Do not add client-sensitive implementation details, credentials, proprietary datasets, or past-employer source code. Analytics and documentation must preserve that boundary.

## Test strategy

The repository does not yet include an end-to-end runner. A focused Playwright smoke suite is deliberately deferred to a separate change because it needs a stable browser-install and local-server harness for the Contact Center AI triage interaction and GA4 consent boundary. The first suite should cover Home, Work-to-Contact-Center-AI navigation, Writing order, portrait rendering, triage completion, and GA4 absence before consent.
