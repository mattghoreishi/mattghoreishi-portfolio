const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data/resume-pdf.json"), "utf8"));
const hash = (relativePath) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relativePath))).digest("hex");
const expectedSources = ["data/career.json", "data/resume.json", "scripts/build-resume.py"];

assert.deepEqual(Object.keys(manifest.sources).sort(), [...expectedSources].sort(), "CV manifest must cover every content source and its generator.");
for (const source of expectedSources) {
  assert.equal(hash(source), manifest.sources[source], `${source} changed. Run python3 scripts/build-resume.py, then inspect the PDF.`);
}
assert.equal(hash("public/assets/Matt-Ghoreishi-CV.pdf"), manifest.pdfSha256, "The public PDF differs from the reviewed source manifest. Regenerate and inspect it.");
assert.equal(manifest.pages, 2, "The public CV must remain two pages.");
console.log("Public CV content, generator, and PDF are in sync.");
