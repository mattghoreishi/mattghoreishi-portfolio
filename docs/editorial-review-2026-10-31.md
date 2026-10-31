# Editorial portfolio review, 31 October 2026

## Brief and decisions

The owner asked for an independent design, engineering, product, hiring, and personal-voice review, followed by implementation. Five reviewers examined the existing work separately and exchanged findings. Their common finding was that repeated positioning, large calls to action, and inconsistent older pages made the site feel more promotional than personal.

The final direction is a warm editorial site: a direct introduction, a smaller existing portrait, concrete project names, contextual outcomes, and ordinary prose. The approved MG geometry, existing portrait, public CV, original prototype, writing records, and useful tools remain. The employer signpost was removed because it duplicated the career timeline and mixed companies with a discipline.

A voice review removed an additional homepage reflection because it repeated the cases and About page. A hiring review retained visible commercial results and leadership scope, avoiding an excessively understated or empty portfolio. DCB is labelled a shorter project note. Article pages are explicitly notes and frameworks, with links to the original full essays. No private interview, restricted contractor, family, immigration, or health content was added.

## Engineering changes

- Shared responsive editorial styles across portfolio, writing, and tool descriptions; dark panels retained for interactive workspaces.
- Keyboard navigation, meaningful labels, selected/current states, and one page-level H1.
- Mapper exports no longer collect email or submit brief contents. Invalid or blocked draft storage recovers safely.
- Heuristic planning scores labelled honestly, empty-input recommendations corrected, consequence and control coverage separated, negative cost scenarios retained, percentages bounded, and calculation exclusions explicit.
- Markdown/JSON exports carry the same interpretation as the UI. Print styling uses dark text on white.
- Explicit analytics URLs/referrers strip query strings and fragments; private free-text fields are excluded. Article depth calculation corrected. External dashboard configuration was not inspected.
- `/projects` redirects permanently to `/work`; existing article alias retained. Sitemap no longer invents a new modification date on every build.
- No dependencies, credentials, hosting provider, or domain configuration changed.

## Verification

TypeScript, ESLint, analytics regressions, saved-draft recovery regressions, scoring/brief regressions, and the optimized Next.js build passed. Generated HTML validation covered 257 internal links across 19 pages with no missing destinations/fragments or duplicate IDs; content pages have one H1 and main landmark.

Browser checks covered every editorial route at a 320px frame, eight key layouts at a 768px frame, and desktop composition. Scrollbar-adjusted content widths were 305px and 753px. No document-level horizontal overflow was observed; the Mapper module strip scrolls intentionally. Mobile navigation opens and closes with Escape. The CCAI triage, transcript, score, note, call-reset, era, and autonomy interactions passed.

Principal text/link palette contrast is at least 5.06:1 on the new light surfaces. This is a scoped measurement, not a whole-site accessibility certification. The production build reports 113kB first-load JavaScript for Home, 123kB for CCAI, and 241kB for Mapper. These are build sizes, not Lighthouse scores or real-user performance results.

The development browser did not yield a file download event for a generated Markdown blob; verify the HTTPS-hosted export before reporting it as browser-verified. Print CSS was reviewed, but a full browser-generated printed document has not been visually audited in this revision. Private GA/Cloudflare reports were not accessed.

Reference thresholds: [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [target sizes](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Core Web Vitals](https://web.dev/articles/vitals). No fabricated Lighthouse score or field-performance claim is made.

## Version preservation

- Original identity version: `archive/pre-personal-revision-2026-10-31`, commit `62eff45a14f3c22abe4930e5d7405106b719acec`.
- First personal revision: `archive/pre-editorial-review-2026-10-31`, commit `231867464eeb9f5ad17e50e8bc55494d5fb0f909`.
- This work: `feat/editorial-portfolio-2026-10-31`, through a pull request and the existing Cloudflare Pages Git integration.

Use a revert PR for rollback. Do not rewrite or delete existing history.
