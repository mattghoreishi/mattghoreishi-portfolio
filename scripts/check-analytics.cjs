// Regression checks for consent, storage restrictions, and contact metadata.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const source = fs.readFileSync("lib/analytics.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const events = [];
const context = { exports: {}, process: { env: {} }, URLSearchParams, console };
vm.createContext(context);
vm.runInContext(compiled, context);
const api = context.exports;
assert.equal(
  api.trackPageView("/"),
  false,
  "SSR page-view check must not access document",
);
assert.equal(api.trackEvent("click_contact"), false);
context.window = {
  location: { search: "", href: "https://mattghoreishi.com/contact" },
  localStorage: {
    getItem() {
      throw new Error("Storage blocked");
    },
    setItem() {
      throw new Error("Storage blocked");
    },
  },
  gtag: (...args) => events.push(args),
};
context.document = { title: "Contact" };
assert.equal(api.isAnalyticsDebugEnabled(), false);
assert.equal(api.writeAnalyticsStorage("consent", "denied"), false);
assert.equal(api.trackPageView("/contact"), false);
assert.equal(api.trackEvent("click_contact"), false);
assert.equal(events.length, 0, "No events before consent");
context.window.mattAnalyticsConsentGranted = true;
const gtag = context.window.gtag;
delete context.window.gtag;
assert.equal(
  api.trackPageView("/contact"),
  false,
  "No success before the GA queue exists",
);
context.window.gtag = gtag;
assert.equal(api.trackPageView("/contact"), true);
assert.equal(events.length, 1);
assert.equal(events[0][2].page_title, "Contact");
for (const href of [
  "mailto:private@example.com?subject=Secret",
  "tel:+491234567",
  "MAILTO:private@example.com",
]) {
  const meta = api.safeLinkMetadata(href, "private@example.com");
  assert.equal(meta.link_text, undefined);
  assert.equal(meta.destination_url, undefined);
}
const meta = api.safeLinkMetadata(
  "https://example.com/work?email=private@example.com#private",
  " Read the case ",
);
assert.equal(meta.destination_url, "https://example.com/work");
assert.equal(meta.link_text, "Read the case");
context.window.mattAnalyticsConsentGranted = false;
assert.equal(
  api.trackEvent("click_contact"),
  false,
  "Withdrawal stops custom events",
);
assert.equal(events.length, 1);
const provider = fs.readFileSync(
  "components/analytics/AnalyticsProvider.tsx",
  "utf8",
);
assert.match(
  provider,
  /shouldLoadGa && gaReady/,
  "First page view must wait for script readiness",
);
assert.match(
  provider,
  /hasTrackedInitialPage.current = trackPageView/,
  "Only record a successful queue operation",
);
console.log("Analytics regression checks passed.");
