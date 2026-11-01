# Changelog

## 1.2.1 — 1 November 2026

- Keep one CV download action, improve mobile CV readability, and distinguish the current CV page from a navigation action.
- Correct internal-link arrows, remove decorative punctuation from section labels, and bring the readiness diagram into the shared color system.
- Simplify repeated Mapper actions, preserve existing text when adding suggestions, and distinguish starting a new brief from resuming a saved one.
- Support removing autonomy actions with keyboard focus recovery, and adding actions when `crypto.randomUUID` is unavailable.
- Improve mobile control sizes and wrapping, label percentage inputs, and clarify case-study review and transcript controls.
- Add a branded missing-page recovery route.

Validation: source review of all content routes, browser checks at 320px and 1280px frames, all 13 Mapper modules, draft/example/reset flows, suggestion preservation, action add/remove, case-study controls, and the existing automated checks. The CV PDF content is unchanged.

## 1.2.0 — 1 November 2026

- Refine the dark design with distinct caution, status, surface, and action treatments; preserve the portfolio's writing and original portrait.
- Clarify Mapper example status, make all modules reachable without a horizontal strip, expose brief downloads earlier, and put detailed heuristic checks behind an optional disclosure.
- Preserve spaces and newlines during list entry, include every selected monitoring signal in exports, and confirm before clearing a personal draft.
- Distinguish saved inputs from reviewed modules and clearly label prefilled example content.
- Align CV formats around shared source data and a reproducible PDF generation process.
- Retire unused submission endpoints, remove unused dependencies, patch the supported framework line, and add focused security-boundary checks.

Validation and remaining limitations are recorded in the release PR and `docs/craft-review-2026-11-01.md`.

## Prior portfolio revisions

- PR #12: dark portfolio, recent industrial project note, safer example drafts, corrected monitoring and completion displays.
- PR #11: personal editorial structure and deeper product evidence.
- PR #10: career evidence, product stories, public CV, and usable demonstrations.

Earlier `v1.0.0` and `v1.1.0` tags retain their original targets. The PR history is authoritative for changes made between tagged releases.
