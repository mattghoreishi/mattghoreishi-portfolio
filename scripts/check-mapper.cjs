// Boundary checks for drafts saved by older versions or restricted browsers.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(path, dependencies = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
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
console.log("Mapper saved-draft boundary checks passed.");
