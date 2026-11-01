# Security

## Reporting a concern

Please report security concerns privately to the contact email linked at
[mattghoreishi.com/contact](https://mattghoreishi.com/contact). Include the affected
URL or file, steps to reproduce, and potential impact. Do not include credentials,
customer data, or personal information in a public issue.

## Data boundaries

- The Mapper keeps drafts in the visitor's browser. Exports are generated locally.
- Historical submission, event, and feedback endpoints return HTTP 410 without
  reading the request body, connecting to a database, or storing data.
- The Supabase schema remains as a historical implementation artifact. It is not
  used by the current application. Deployment settings and any historical database
  data are separate from this repository and are not managed by a code release.
- Google Analytics loads after opt-in. Custom events exclude private tool inputs.
  Cloudflare's native analytics is configured separately in the hosting account.
- Public case studies use synthetic or sanitized examples. Credentials,
  employer source code, private customer data, and unredacted internal documents
  do not belong here.

## Maintenance and checks

Use Node 22 and the committed npm lockfile. Run the documented checks before
merging, including the retired-API checks and a dependency audit. An audit result
identifies known dependency advisories; it is not proof that a site is exploitable
or that a site is secure.

The current Cloudflare Pages adapter, `@cloudflare/next-on-pages`, is deprecated.
It is retained for deployment compatibility, with a separately tested migration
required before the framework's maintenance window ends. See the
[adapter repository](https://github.com/cloudflare/next-on-pages) and
[Next.js support policy](https://nextjs.org/support-policy).

## Browser protections

Next responses, retired API responses, and static Pages assets configure content
type, framing, referrer, and browser-permission protections. The Content Security
Policy currently restricts base URLs, object embedding, and framing only. It is
not a strict script-execution policy. A strict policy needs separate validation
against Next.js hydration, local exports, and consented analytics.

Production response headers and hosting account settings must be verified after
deployment. Source configuration alone does not prove the host applied it.
