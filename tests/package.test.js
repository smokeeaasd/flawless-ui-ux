import { describe, test } from "bun:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { parseDocument } from "yaml";
import { packageRoot } from "./helpers.js";

function readYaml(text) {
  const document = parseDocument(text, { strict: true, uniqueKeys: true });
  if (document.errors.length) throw new Error(document.errors.map((error) => error.message).join("\n"));
  return document.toJS();
}

function files(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function links(path) {
  const text = readFileSync(path, "utf8").replace(/^```[^\n]*\n.*?^```[^\n]*$/gms, "");
  return [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
}

function headingIds(path) {
  const ids = new Set();
  for (const match of readFileSync(path, "utf8").matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const slug = match[1].trim().toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, "").replaceAll(" ", "-");
    let id = slug;
    for (let suffix = 1; ids.has(id); suffix++) id = `${slug}-${suffix}`;
    ids.add(id);
  }
  return ids;
}

describe("skill package", () => {
  test("discovery metadata names the package and provides a usable description", () => {
    const block = readFileSync(join(packageRoot, "SKILL.md"), "utf8").match(/^---\r?\n(.*?)\r?\n---(?:\r?\n|$)/s);
    assert.ok(block, "SKILL.md must start with YAML frontmatter");
    const metadata = readYaml(block[1]);
    assert.equal(typeof metadata.name, "string");
    assert.match(metadata.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(metadata.name.length <= 64);
    assert.equal(metadata.name, basename(packageRoot));
    assert.equal(typeof metadata.description, "string");
    assert.ok(metadata.description.trim() && metadata.description.length <= 1024);
  });

  test("YAML parsing rejects duplicate metadata keys", () => {
    assert.throws(() => readYaml("name: first\nname: second\n"), /unique/i);
  });

  test("Codex presentation is complete and preserves normal discovery", () => {
    const metadata = readYaml(readFileSync(join(packageRoot, "agents", "openai.yaml"), "utf8"));
    for (const field of ["display_name", "short_description", "default_prompt"]) {
      assert.equal(typeof metadata.interface[field], "string", field);
      assert.ok(metadata.interface[field].trim(), field);
    }
    const { short_description, default_prompt } = metadata.interface;
    assert.ok(short_description.length >= 25 && short_description.length <= 64);
    assert.ok(default_prompt.includes(`$${basename(packageRoot)}`));
    assert.equal(metadata.policy?.allow_implicit_invocation ?? true, true);
  });

  test("package text is valid UTF-8 without a byte-order mark", () => {
    for (const path of files(packageRoot).filter((path) => /\.(md|ya?ml|json)$/.test(path))) {
      const bytes = readFileSync(path);
      assert.notDeepEqual([...bytes.subarray(0, 3)], [0xef, 0xbb, 0xbf], path);
      new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    }
  });

  test("local links resolve inside the installed package and expose all references", () => {
    const root = realpathSync(packageRoot);
    const documents = files(root).filter((path) => path.endsWith(".md"));
    const graph = new Map();
    for (const document of documents) {
      const edges = new Set();
      graph.set(realpathSync(document), edges);
      for (const target of links(document)) {
        if (/^(https?:|mailto:)/i.test(target)) continue;
        assert.ok(!/^[a-z][a-z\d+.-]*:/i.test(target) && !target.startsWith("//"), `Use relative links: ${target}`);
        const [rawPath, rawAnchor] = target.split("#", 2);
        const path = decodeURIComponent(rawPath);
        assert.ok(!isAbsolute(path), `Use relative links: ${target}`);
        const destination = realpathSync(path ? resolve(dirname(document), path) : document);
        const within = relative(root, destination);
        assert.ok(!isAbsolute(within) && within !== ".." && !within.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`), `Reference escapes package: ${target}`);
        assert.ok(statSync(destination).isFile(), `Reference is not a file: ${target}`);
        if (rawAnchor) assert.ok(headingIds(destination).has(decodeURIComponent(rawAnchor)), `Missing section: ${target}`);
        edges.add(destination);
      }
    }
    const pending = [realpathSync(join(root, "SKILL.md"))];
    const visited = new Set();
    while (pending.length) {
      const current = pending.pop();
      if (!visited.has(current)) {
        visited.add(current);
        pending.push(...(graph.get(current) ?? []));
      }
    }
    for (const reference of files(join(root, "references")).filter((path) => path.endsWith(".md"))) {
      assert.ok(visited.has(realpathSync(reference)), `Unreachable reference: ${reference}`);
    }
  });
});
