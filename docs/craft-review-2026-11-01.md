# Craft and public-source review, 1 November 2026

## Review scope

The owner requested a further review of the dark design, the Mapper's example affordance, interaction finish, public code, GitHub versioning, and CV accuracy. Eight independent agents covered art direction and color, interaction design and accessibility, an additional editorial design critique, motion and detail, hiring and portfolio strategy, CV evidence, frontend correctness, and security and release engineering. These are review perspectives, not claims of affiliation with a design company or external certification.

## Design decision

Keep the current charcoal and mint identity. The alternative directions considered were near-black with ice blue, and espresso with sage/brass. The existing direction fits the original portrait, readable long-form work, and the owner's preference. The choice is design judgment, not measured audience preference.

The issue was repeated visual treatment: status, caution, action, and heuristic scores looked alike. Added a raised neutral surface and restrained amber caution tokens. Mint continues to identify actions/current selection. Added directional arrow and pressed-button feedback only when reduced motion is not requested. Utility icons remain still. Retained the homepage voice, real portrait, and case-study depth.

## User-facing changes

- Example mode is a status pill rather than a disabled action. Real actions remain buttons.
- Module navigation wraps on desktop and uses a labelled native selector on narrow screens. Duplicate sidebar navigation is hidden on narrow screens.
- A download action appears above the brief. Eight detailed heuristics sit in an optional native disclosure; the brief itself is more prominent. A compact print-only list preserves all checks in printed output.
- Warnings use amber and generated bullets use neutral dots, including bullets about missing controls. These are not validation badges.
- Saved inputs and reviewed modules are distinct. Prefilled sample modules are labelled as included in the example.
- Resetting a personal draft requires a deliberate inline choice with cancel/Escape focus restoration.
- List inputs preserve typing spaces and newlines. All selected monitoring signals reach generated briefs and exports, including signals beyond the eighth.
- CCAI controls now follow the shared palette; its synthetic illustrative categories remain distinct. Tool pages offer a direct worked-example link.

## CV and evidence

The CV reviewer checked employer reference documents and the degree translation. Verified dates and titles were preserved, including Sotoon's December 2022 end date, German A1, and cautious contract-project framing. Repeated metrics were replaced by linked product decisions; the concise CV avoids confusing supporting ASR volume with CCAI usage.

The career timeline, web CV, and PDF share versioned content records. A tracked generator and source/PDF consistency check prevent silent drift. Both PDF pages were rendered and inspected, and link annotations checked. Private source documents are not committed. See `docs/public-cv.md`.

## Public code and release discipline

The repository is already public. The read-only review found no credentials using targeted patterns across the inspected historical text blobs; this is not a comprehensive secret audit. No private hosting account settings or historical database contents were inspected.

Unused submission APIs now return 410 without reading request bodies or connecting to storage. Removed their unused client, validation, types, and dependencies. Added modest response protections and regression checks. Framework and compatible dependencies receive security patches; the release PR records the final audit and build result. A dependency audit is not a penetration test or a security guarantee.

The deprecated Pages adapter remains a documented migration item. No domain, hosting provider, account access, or repository visibility change is included. npm is the single supported package manager. The stale alternative lockfile is removed through ordinary version history.

Main is protected with the `quality` check enforced for non-admins; only squash merging is enabled. Full branch-protection configuration is not accessible through the integration. This release uses a feature branch, PR, checks, preview, and the existing production integration. See `docs/releases.md` and `CHANGELOG.md`.

## Verification record

Targeted review checks cover list editing reconciliation, draft isolation, all monitoring signals in exports, retired API behavior without request-body reads, shared response header configuration, and CV source/PDF consistency. Integrated TypeScript, ESLint, analytics, Mapper, scoring, security, and CV checks passed. The actual Cloudflare Pages build passed with Next 15.5.28. Generated HTML: 260 internal links, no missing targets/fragments or duplicate IDs, and 17 content pages with one H1 and one main landmark. Build-reported initial JavaScript is 113 kB for Home and 141 kB for Mapper; no field-performance claim is made.

Browser checks passed for character-by-character spaces/newlines, example reset, saved-draft recovery, reset cancellation/Escape and explicit deletion, responsive layouts at 320/390/768px, CCAI triage and selected state, and optional planning-check presentation. Keyboard review found and fixed the narrow module selector moving focus after every arrow press; focus now remains on the select. The release PR records hosted download, header, and deployment checks for the exact commit.

Production dependency audit: zero known findings. Full development tree: 61 findings (2 low, 28 moderate, 31 high, zero critical), in the legacy development/deployment toolchain. These remain a documented migration priority. Scoped patch overrides were used only with a passing Pages build; no forced breaking audit fix was applied.

New palette contrast checks: amber heading 8.19:1; notice body 10.55:1; notice boundary 3.29:1. Muted text on the raised surface 6.19:1; control boundary 3.08:1. These are scoped measurements, not a whole-site accessibility certification.

## Preservation

The preceding version is preserved at `archive/pre-craft-review-2026-11-01`, commit `0569e5cc4edb740ae42a021136dd66b6dba8f1cd`. Earlier archive branches and release tags remain. Roll back with a reviewed revert rather than rewriting main; retain security fixes if rolling back presentation.
