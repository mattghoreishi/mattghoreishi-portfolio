# Release workflow

The production source is `main`; Cloudflare Pages deploys it through the existing GitHub integration. Feature branches and pull requests are the unit of review. Do not push unreviewed work directly to production or rewrite shared history.

## Version and provenance

- Use semantic versions in `package.json` and `package-lock.json`. Feature and design releases increment the minor version; corrections increment the patch version.
- Record behavior, verification, and limitations in `CHANGELOG.md`. A version number is not a security or accessibility certification.
- Preserve previous work through Git history and the named archive branches. Archive branches are checkpoints, not competing production branches.
- A release tag must point to the merged production commit after its deployment succeeds. Never move an existing published tag.
- GitHub records the PR, exact source commit, required quality check, and Cloudflare deployment check. Keep those references together in the PR.

## Before merging

1. Compare the feature branch with the latest `main`; resolve concurrent changes explicitly.
2. Run the documented quality checks and production build. Test the actual interaction affected by a fix. Run a dependency audit when dependency inputs change.
3. Inspect the preview on desktop and narrow screens; check keyboard operation and any download, draft, or consent boundary touched by the change.
4. Confirm CI and Cloudflare preview success for the exact proposed commit.
5. Squash-merge the reviewed PR, then confirm the production deployment. Treat browser review by the author as review evidence, not an independent human approval.

## Rollback

Revert the release commit through a new PR, run the relevant checks, and let the normal integration deploy it. Do not reset or force-push `main`. Keep dependency changes and data-boundary changes in mind when selecting a rollback: a visual regression does not justify restoring a known vulnerable dependency or retired ingestion endpoint.

## Current enforcement

On 1 November 2026, GitHub reports `main` protected with the `quality` check required for non-admins, and only squash merging enabled. The full protection configuration was not accessible through the integration. This is not evidence of mandatory independent reviews or enforcement against administrator bypass. The owner should keep using the PR/check workflow even where bypass is technically possible.
