# Agentic Product Stack Mapper

A free public web tool for turning a rough AI-agent idea into an exportable, source-backed Agent Product Brief.

The MVP is built to run without login, paid AI APIs, or paid infrastructure. Users can create a quick first draft in 3 to 5 minutes, then optionally deepen the brief with workflow fit, risk, autonomy, evals, human control, monitoring, rollback, governance, and value modules.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local shadcn-style UI primitives
- Recharts
- Supabase for consented submissions, events, and feedback
- Client-side Markdown and JSON export
- Print stylesheet PDF fallback through the browser Save as PDF flow

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add Supabase values to `.env.local`.

The app still unlocks downloads if Supabase is not configured, but submissions will not be stored.

4. Run the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Add these environment variables in Vercel or `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service role key is used only in server route handlers. It is never imported into client components.

## Privacy and Security Notes

- No login is required.
- Progress is saved in `localStorage`.
- Export submission requires explicit consent.
- UI warns users not to enter confidential, regulated, or customer-identifying data.
- Submission endpoint validates email and consent.
- Basic bot protection includes a honeypot field and minimum timing check.
- Simple in-memory rate limiting is applied to the submission endpoint.
- Supabase RLS is enabled, with service-role-only policies for stored data.

## Analytics

Analytics are documented in [`docs/analytics.md`](docs/analytics.md). The site supports Cloudflare Web Analytics, GA4 pageviews and custom events, Search Console verification, route-change tracking, debug mode, and a small custom event utility.

## Vercel Deployment

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Set the framework preset to Next.js.
4. Add Supabase environment variables.
5. Deploy on Vercel Hobby.

No paid runtime AI API is required.

## Product Flow

1. Landing page
2. Quick Start Mode
3. First Agent Product Brief preview
4. Optional Deep Brief modules
5. Export gate
6. PDF, Markdown, and JSON downloads
7. Feedback capture

## Knowledge Base

Curated source cards live in `data/knowledgeBase.ts`. They are not live search results and should be reviewed periodically. Initial categories include agent capability shift, enterprise adoption, ROI and scaling gap, workflow redesign, agent evaluation, autonomy and excessive agency, governance and risk, security and prompt injection, human-in-the-loop, and business-value measurement.

## Future Improvements

- Add richer PDF generation with a dedicated renderer.
- Add shareable read-only brief links with expiration.
- Add more domain-specific templates and eval case libraries.
- Add source freshness checks and admin review workflow.
- Add CSV export for health signals and permission matrices.
- Add optional anonymous benchmarking across submitted briefs.
- Add stronger distributed rate limiting for high traffic.
- Add Supabase Edge Function support for teams that prefer serverless isolation.
