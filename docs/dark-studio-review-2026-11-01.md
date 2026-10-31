# Dark portfolio review, 1 November 2026

## Direction and review

The owner requested another independent committee review, with a preference for a modern dark website and authority to implement the selected direction. Six reviewers covered art direction, accessibility and usability, frontend engineering and performance, product and interaction design, hiring, and personal voice and editing.

The decision was a warm dark portfolio: charcoal surfaces, off-white text, restrained mint accents, and a modern sans-serif hierarchy. Keep the plain name and role, real portrait, MG geometry, specific project titles, and the depth of the previous editorial revision. Retain a white CV sheet and print output. Avoid promotional slogans, decorative score charts, added animation libraries, or fabricated personal anecdotes.

## Content and structure

- Featured CCAI entry includes the real prototype archive, accurately labelled as a canvas overview rather than a readable product screenshot.
- Added a short Albatec industrial gas-monitoring note, based on the employment reference and existing CVs. The 16-channel figure describes dashboard/alert scope; no new revenue, deployment-count, or customer-outcome claim was introduced.
- Moved compact career and leadership context before writing. Kept the cases, article notes and original essay links, interactive tools, CV, and direct contact routes.
- Added a direct worked-example entry to the Mapper after making example exploration independent of the visitor's personal draft.
- Preserved existing URLs and redirects. Added the new project to the work index, career links, and sitemap. Updated social image colors to the same design direction.

## Functional improvements

- Replaced monitoring bars whose values were generated from display order with the actual selected signals and entered thresholds. Explicitly states that no live measurements are connected.
- Stack completion follows actual module IDs instead of marking the first N layers complete. Visible saved/not-saved labels accompany the indicators.
- Risk profile exposes all selected levels, including Critical, as text in a semantic definition list.
- Example edits, resets, and refreshes cannot write over the personal draft. Resume restores it. Blocked-storage notices explain the limit on retaining unsaved personal edits.
- Skip links have focusable main targets. Preferences reopening, Escape, and consent choices restore focus appropriately. The nonmodal consent banner reserves measured space so it does not cover the bottom of the page.
- Native forms use the dark color scheme. Focus, input boundaries, reduced motion, narrow layouts, and light print surfaces remain explicit.

## Verification

- TypeScript, full ESLint, analytics checks, scoring checks, and Mapper storage/rendered-component regressions passed.
- Optimized Next.js production build passed. Mapper first-load JavaScript decreased from the previous recorded 241 kB to 139 kB, about 42%. Home is 112 kB and CCAI is 122 kB. These are build-reported sizes, not network timing or Lighthouse scores.
- Generated HTML checks: 279 internal links, no missing route/fragment targets or duplicate IDs. All 17 content pages have one H1 and one main landmark; redirect and not-found documents were excluded from that landmark count.
- Browser layout checks: all 17 content routes at a 320px frame; eight representative routes at 768px; home also viewed at 390px and desktop. No document-level horizontal overflow observed. The Mapper module strip intentionally scrolls horizontally.
- Browser interactions: mobile menu closes with Escape; skip link focuses main; preferences opening, Escape, and declining restore focus; Critical appears in the risk profile; monitoring displays entered thresholds.
- Browser draft test: name a personal draft, open the example, edit it, reset it, refresh it, then resume. The original personal name was restored.
- Measured palette minimum contrast across the three dark surfaces: main text 14.21:1; secondary 8.81:1; muted 6.92:1; mint links 10.49:1. Control boundaries 3.44:1. Decorative dividers are not used as input or focus boundaries. This is a scoped audit, not a whole-site accessibility certification.
- No field performance, Lighthouse score, private analytics report, or new print-PDF visual audit is claimed. Hosted preview and production status are recorded on the release PR.

## Preservation and release

The immediately preceding light editorial version is preserved at `archive/pre-dark-review-2026-11-01`, commit `04ccbe37547953070d3a5bd9598241ddb59e6ba3`. Both earlier archive branches remain. Changes use the existing GitHub pull-request and Cloudflare Pages integration. No dependencies, credentials, domain settings, or hosting provider changed.

Revert the release PR to restore the previous version without rewriting history.
