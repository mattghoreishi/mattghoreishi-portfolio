// Boundary checks for drafts saved by older versions or restricted browsers.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(path, dependencies = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const context = { exports: {}, require: (name) => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
  } };
  vm.createContext(context);
  vm.runInContext(compiled, context);
  return context;
}

const templates = loadModule("data/templates.ts").exports;
const context = loadModule("lib/mapperStorage.ts", { "@/data/templates": templates });
const api = context.exports;
const raw = JSON.stringify(templates.sampleSupportRefundAgent);
assert.equal(JSON.stringify(api.parseMapperDraft(raw)), raw, "A valid saved draft survives intact");
assert.ok(api.parseMapperDraft(JSON.stringify(templates.emptyState)));
for (const invalid of [null, "", "not json", "null", "[]", "{}", '{"quickStart":null}']) {
  assert.equal(api.parseMapperDraft(invalid), null);
}
for (const mutate of [
  (draft) => { draft.quickStart.systemsTouched = [42]; },
  (draft) => { draft.quickStart.facing = "Wrong enum"; },
  (draft) => { draft.quickStart.workflowDomain = "constructor"; },
  (draft) => { draft.businessValueLoop.monthlyTaskVolume = "a lot"; },
  (draft) => { draft.autonomyBoundaries = [{ id: "x", action: "x", level: "invalid", rationale: "x" }]; },
  (draft) => { draft.healthSignals[0].selected = "yes"; },
  (draft) => { delete draft.evaluationGates; },
]) {
  const draft = JSON.parse(raw);
  mutate(draft);
  assert.equal(api.parseMapperDraft(JSON.stringify(draft)), null, "Wrong shapes must never reach the generator");
}

const values = new Map();
context.window = { localStorage: {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
  removeItem: (key) => values.delete(key),
} };
assert.equal(api.readMapperDraft().recovered, false);
assert.equal(api.saveMapperDraft(templates.sampleSupportRefundAgent), true);
assert.equal(api.readMapperDraft().state.quickStart.agentName, "Refund Resolution Copilot");
const personal = JSON.parse(JSON.stringify(templates.emptyState));
personal.quickStart.agentName = "My existing draft";
assert.equal(api.persistMapperSession(personal, "draft"), "saved");
const beforeExample = values.get(api.mapperStorageKey);
const editedExample = JSON.parse(raw);
editedExample.quickStart.agentName = "An edited example";
for (const example of [templates.sampleSupportRefundAgent, editedExample, templates.emptyState]) {
  assert.equal(api.persistMapperSession(example, "sample"), "sample");
  assert.equal(values.get(api.mapperStorageKey), beforeExample, "Opening, editing, or resetting an example must not replace a saved draft");
}
assert.equal(api.readMapperDraft().state.quickStart.agentName, "My existing draft");
values.set(api.mapperStorageKey, '{"quickStart":null}');
assert.equal(api.readMapperDraft().recovered, true);
assert.equal(api.readMapperDraft().state.quickStart.agentName, "");
assert.equal(api.clearMapperDraft(), true);
assert.equal(values.size, 0);
context.window.localStorage = {
  getItem() { throw new Error("Storage blocked"); },
  setItem() { throw new Error("Quota exceeded"); },
  removeItem() { throw new Error("Storage blocked"); },
};
assert.equal(api.readMapperDraft().available, false);
assert.equal(api.saveMapperDraft(templates.emptyState), false);
assert.equal(api.clearMapperDraft(), false);
assert.equal(api.persistMapperSession(templates.sampleSupportRefundAgent, "sample"), "sample", "Examples remain usable with blocked storage");
assert.equal(api.persistMapperSession(templates.emptyState, "draft"), "unavailable");

// Modules can be saved in any order; quick-start completion is not workflow completion.
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const jsxRuntime = require("react/jsx-runtime");
const utils = loadModule("lib/utils.ts", {
  clsx: require("clsx"),
  "tailwind-merge": require("tailwind-merge"),
}).exports;

// Parent updates must not erase separators while someone is still typing.
const { reconcileListText } = loadModule("lib/listInput.ts", { "@/lib/utils": utils }).exports;
for (const separator of ["\n", ", "]) {
  let buffer = "";
  const typed = separator === "\n" ? "Check invoice\nAsk owner\n" : "Customer support, Billing team, ";
  for (const character of typed) {
    buffer += character;
    buffer = reconcileListText(buffer, utils.asList(buffer), separator);
  }
  assert.equal(buffer, typed, "Every typed space, comma, and newline must survive a parent round trip");
  assert.equal(reconcileListText(buffer, ["Suggested answer", "Another answer"], separator),
    ["Suggested answer", "Another answer"].join(separator), "External suggestions must replace an old buffer");
  assert.equal(reconcileListText(buffer, [], separator), "", "Reset must clear populated list inputs");
}
const { StackDiagram } = loadModule("components/StackDiagram.tsx", {
  "react/jsx-runtime": jsxRuntime,
  "lucide-react": require("lucide-react"),
  "@/lib/utils": utils,
}).exports;
const progress = renderToStaticMarkup(React.createElement(StackDiagram, {
  completed: ["quick", "value", "health"],
}));
const rows = [...progress.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)]
  .map((match) => match[1].replace(/<[^>]+>/g, ""));
assert.equal(rows.length, 10);
assert.ok(rows.includes("Workflow FitNot reviewed"), "Quick Start must not mark Workflow Fit as reviewed");
assert.ok(rows.includes("Runtime Health SignalsReviewed"), "An out-of-order health module must show its actual reviewed state");
assert.ok(rows.includes("Business Value LoopReviewed"), "An out-of-order value module must show its actual reviewed state");
assert.equal(rows.filter((row) => !row.includes("Not reviewed")).length, 2);
const exampleProgress = renderToStaticMarkup(React.createElement(StackDiagram, {
  completed: ["health"], exampleMode: true,
}));
assert.ok(exampleProgress.includes("Included in example"));
assert.ok(exampleProgress.includes("Not included"));
assert.ok(!exampleProgress.includes("Reviewed"), "Prefilled examples must not imply that a visitor reviewed them");

// Monitoring shows entered thresholds, including unconfigured ones, without a made-up score.
const { HealthSignalsDashboard } = loadModule("components/HealthSignalsDashboard.tsx", {
  "react/jsx-runtime": jsxRuntime,
}).exports;
const signals = Array.from({ length: 9 }, (_, index) => ({
  id: `metric-${index}`,
  label: `Selected metric ${index + 1}`,
  selected: true,
  threshold: index === 8 ? "  " : `Threshold ${index + 1}`,
}));
signals.push({ id: "hidden", label: "Unselected metric", selected: false, threshold: "Do not show" });
const monitoring = renderToStaticMarkup(React.createElement(HealthSignalsDashboard, { signals }));
assert.equal((monitoring.match(/<dt\b/g) || []).length, 9, "Every selected signal must be represented");
assert.ok(monitoring.includes("Threshold 1"));
assert.ok(monitoring.includes("Threshold not set"));
assert.ok(monitoring.includes("no live measurements are connected"));
assert.ok(!monitoring.includes("Unselected metric"));
assert.ok(!monitoring.includes("readiness"));
const noSignals = renderToStaticMarkup(React.createElement(HealthSignalsDashboard, { signals: [] }));
assert.ok(noSignals.includes("Select health signals"));
console.log("Mapper saved-draft and monitoring/progress checks passed.");
