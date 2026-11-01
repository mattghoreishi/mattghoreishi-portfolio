// Behavioral checks for incomplete plans, inherent consequences, and cost math.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const cache = new Map();
function load(relativePath) {
  const filename = path.resolve(relativePath);
  if (cache.has(filename)) return cache.get(filename);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require(specifier) {
      return specifier.startsWith("@/") ? load(`${specifier.slice(2)}.ts`) : require(specifier);
    }
  };
  vm.runInNewContext(compiled, context, { filename });
  cache.set(filename, module.exports);
  return module.exports;
}

const { emptyState, sampleSupportRefundAgent } = load("data/templates.ts");
const { scoreMapperState, automatedTaskCostDifference, scoreLabels } = load("lib/scoring.ts");
const { generateBrief } = load("lib/briefGenerator.ts");
const clone = value => JSON.parse(JSON.stringify(value));

const empty = scoreMapperState(emptyState);
assert.equal(empty.recommendation, "Explore manually first", "No workflow evidence cannot select an automation architecture");
assert.equal(empty.subScores.runtimeMonitoringReadiness, 0, "Preselected example metrics are not a confirmed monitoring plan");
assert.equal(Object.keys(scoreLabels).length, Object.keys(empty.subScores).length);

const sample = scoreMapperState(sampleSupportRefundAgent);
assert.equal(sample.recommendation, "Agent candidate with human approval", "Declared controls must not be ignored by the recommendation");
assert.ok(sample.warnings.some(warning => warning.includes("High-consequence")), "Consequential work needs an explicit warning");

const controlsMissing = clone(sampleSupportRefundAgent);
controlsMissing.humanControl = clone(emptyState.humanControl);
controlsMissing.governanceEvidence = clone(emptyState.governanceEvidence);
const blocked = scoreMapperState(controlsMissing);
assert.equal(blocked.recommendation, "Not ready until risk controls improve");
assert.equal(blocked.subScores.riskShape, sample.subScores.riskShape, "Inherent consequences must stay distinct from control coverage");
const blockedDecision = generateBrief(controlsMissing).sections.find(section => section.title === "Agent vs deterministic workflow decision");
assert.match(blockedDecision.body, /gaps in governance, evaluation, or human control/);
assert.match(generateBrief(emptyState).sections.find(section => section.title === "Agent vs deterministic workflow decision").body, /do not yet support a choice/);

const expensive = clone(sampleSupportRefundAgent);
expensive.businessValueLoop.monthlyTaskVolume = 100;
expensive.businessValueLoop.currentCostPerTask = 1;
expensive.businessValueLoop.estimatedAiCost = 3;
expensive.businessValueLoop.expectedAutomationRate = 50;
assert.equal(automatedTaskCostDifference(expensive), -100, "A cost increase must remain visible");
const valueSection = generateBrief(expensive).sections.find(section => section.title === "Business value loop");
assert.match(valueSection.body, /-\$100/);
assert.match(valueSection.body, /not net savings or ROI/);
assert.ok(valueSection.bullets.some(bullet => bullet.includes("not costed")));
assert.ok(valueSection.bullets.some(bullet => bullet.includes("excluded; define its unit")));

expensive.businessValueLoop.expectedAutomationRate = 150;
assert.equal(automatedTaskCostDifference(expensive), -200, "Automation cannot exceed all tasks");
expensive.businessValueLoop.expectedAutomationRate = -50;
assert.equal(automatedTaskCostDifference(expensive), 0, "Negative rates cannot create a fictional saving");
expensive.businessValueLoop.expectedAutomationRate = Number.NaN;
assert.equal(automatedTaskCostDifference(expensive), 0, "Invalid rates cannot propagate NaN into a brief");

const larger = clone(sampleSupportRefundAgent);
larger.businessValueLoop.monthlyTaskVolume *= 100;
assert.equal(scoreMapperState(larger).subScores.businessValueConfidence, sample.subScores.businessValueConfidence, "Claiming a larger market does not improve evidence coverage");

const manySignals = clone(sampleSupportRefundAgent);
manySignals.healthSignals = Array.from({ length: 10 }, (_, index) => ({
  id: `metric-${index}`,
  label: `Monitoring metric ${index + 1}`,
  selected: true,
  threshold: index === 9 ? "  " : `Threshold ${index + 1}`,
}));
manySignals.healthSignals.push({ id: "unselected", label: "Unselected", selected: false, threshold: "Hidden" });
const healthSection = generateBrief(manySignals).sections.find(section => section.title === "Runtime health signals");
assert.equal(healthSection.bullets.length, 10, "Brief and exports must include all selected monitoring metrics");
assert.equal(healthSection.bullets[9], "Monitoring metric 10: Threshold not set");
assert.ok(!healthSection.bullets.some(bullet => bullet.includes("Unselected")));
console.log("Scoring and brief regression checks passed.");
