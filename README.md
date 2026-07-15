# Matt Ghoreishi Portfolio

A product portfolio and proof hub covering AI product case studies, current product builds, writing, and the operating decisions behind them.

Live site: [mattghoreishi.com](https://mattghoreishi.com)

## What is included

- Contact Center AI: 2020 → today
- Before I Trust an AI Feature
- The Agentic AI Product Gap
- From Hype to Value
- Agentic Product Stack Mapper
- Supporting experience, Work, About, and Contact pages

## Architecture

- Next.js App Router and TypeScript
- Tailwind CSS
- Shared content and data model
- Server-rendered editorial and case-study pages
- Client components only where browser interactions are required
- Supabase-backed optional Mapper submissions
- GA4 consent-aware analytics
- Native Cloudflare Web Analytics
- Cloudflare Pages deployment

See [docs/architecture.md](docs/architecture.md) for the route, analytics, privacy, and deployment boundaries.

## Repository structure

- `app/`: routes, metadata, API handlers, sitemap, and robots rules
- `components/`: shared site UI, case-study interactions, analytics, and Mapper UI
- `data/`: portfolio content, article records, and curated Mapper knowledge
- `lib/`: analytics, Supabase, validation, and shared utilities
- `public/`: owned portfolio assets and static files
- `docs/`: architecture, analytics, and durable product decisions
- `supabase/`: optional submission storage schema

## Local development

Use Node 22 and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Supabase variables are optional for local portfolio browsing; without them, optional Mapper submissions are not stored. Use placeholders in `.env.example` and keep real values only in local or Cloudflare-managed environment settings.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run next:build
```

An end-to-end test script is not implemented yet. The planned focused browser smoke suite is documented in [docs/architecture.md](docs/architecture.md#test-strategy).

## Analytics and privacy

- GA4 loads only after a visitor accepts analytics consent.
- Cloudflare Web Analytics is the native Cloudflare Pages integration.
- Custom GA4 events use structured, non-PII parameters.
- Optional Mapper submissions require explicit consent.

See [docs/analytics.md](docs/analytics.md) for the event inventory, consent flow, and verification steps.

## Deployment

Cloudflare Pages is the production deployment system. The established GitHub integration builds the production branch with `npm run build`; `wrangler.toml` configures the generated Pages output. GitHub Actions CI validates pull requests and `main`, but does not deploy or receive production secrets.

## Product decisions

Durable product and portfolio decisions are captured in [docs/product-decisions.md](docs/product-decisions.md).

## Content and asset rights

Application code is reusable only if an applicable license or explicit permission grants it. Matt Ghoreishi's personal writing, case-study materials, portrait, brand elements, and historical artifacts are not granted for reuse by any code permission. Historical work is reconstructed with sanitized or synthetic material and must not be treated as source material for other projects.
