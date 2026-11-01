// Exercise the public API retirement boundary without sending visitor data.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(path, dependencies = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = {
    exports: {}, Response,
    require(name) {
      assert.ok(name in dependencies, `Unexpected runtime dependency: ${name}`);
      return dependencies[name];
    },
    fetch() { throw new Error("Retired endpoints must not make network requests"); },
  };
  vm.runInNewContext(compiled, context);
  return context.exports;
}

async function main() {
  const headers = loadModule("lib/securityHeaders.ts");
  const retired = loadModule("lib/retiredApi.ts", { "./securityHeaders": headers });
  const requestThatMustNotBeRead = new Proxy({}, {
    get() { throw new Error("Retired endpoints must not parse request data"); },
  });
  for (const endpoint of ["events", "feedback", "submissions"]) {
    const route = loadModule(`app/api/${endpoint}/route.ts`, { "@/lib/retiredApi": retired });
    const response = await route.POST(requestThatMustNotBeRead);
    assert.equal(response.status, 410);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const payload = await response.json();
    assert.equal(payload.stored, false);
    assert.match(payload.error, /retired/);
    for (const { key, value } of headers.securityHeaders) {
      assert.equal(response.headers.get(key), value);
    }
  }

  const config = loadModule("next.config.ts", { "./lib/securityHeaders": headers }).default;
  const rules = await config.headers();
  assert.equal(rules[0].source, "/:path*");
  const staticHeaders = fs.readFileSync("public/_headers", "utf8");
  for (const { key, value } of rules[0].headers) {
    assert.ok(staticHeaders.includes(`${key}: ${value}`), `Missing static header: ${key}`);
  }
  console.log("Security boundary checks passed: retired APIs reject without reading or storing data; response headers agree.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
