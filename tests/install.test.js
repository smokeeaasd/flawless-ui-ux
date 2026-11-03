import { afterEach, beforeEach, describe, test } from "bun:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readlinkSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { findBash, repository, skillName, snapshot, temporaryWorkspace } from "./helpers.js";

describe("Bash installer", () => {
  const bash = findBash();
  let workspace;
  let checkout;
  let source;

  beforeEach(() => {
    workspace = temporaryWorkspace();
    checkout = join(workspace.root, "checkout with spaces");
    mkdirSync(checkout);
    copyFileSync(join(repository, "install.sh"), join(checkout, "install.sh"));
    cpSync(join(repository, "skills"), join(checkout, "skills"), { recursive: true });
    source = join(checkout, "skills", skillName);
  });

  afterEach(() => workspace?.cleanup());

  function paths(name = "default", project = false) {
    const root = join(workspace.root, name);
    const cwd = join(root, "project with spaces");
    mkdirSync(cwd, { recursive: true });
    const env = {
      ...process.env,
      CODEX_HOME: join(root, "codex config with spaces").replaceAll("\\", "/"),
      XDG_CONFIG_HOME: join(root, "xdg config with spaces").replaceAll("\\", "/"),
    };
    return {
      cwd, env,
      destinations: {
        codex: project ? join(cwd, ".agents", "skills", skillName) : join(env.CODEX_HOME, "skills", skillName),
        opencode: project ? join(cwd, ".opencode", "skills", skillName) : join(env.XDG_CONFIG_HOME, "opencode", "skills", skillName),
      },
    };
  }

  function install(args = [], target = paths(), from = checkout) {
    const result = spawnSync(bash, [join(from, "install.sh").replaceAll("\\", "/"), ...args], {
      cwd: target.cwd, env: target.env, encoding: "utf8", timeout: 30000,
    });
    if (result.error) throw result.error;
    return result;
  }

  test("Bash syntax is valid", () => {
    const result = spawnSync(bash, ["-n", join(checkout, "install.sh").replaceAll("\\", "/")], { encoding: "utf8", timeout: 30000 });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, result.stderr);
  }, 30000);

  test("project and global modes respect all agent selections", () => {
    const selections = [[[], ["codex", "opencode"]], [["--all-agents"], ["codex", "opencode"]], [["--codex"], ["codex"]], [["--opencode"], ["opencode"]]];
    const expected = snapshot(source);
    for (const project of [false, true]) {
      for (const [index, [flags, selected]] of selections.entries()) {
        const target = paths(`matrix-${project}-${index}`, project);
        const result = install([...flags, ...(project ? ["--project"] : [])], target);
        assert.equal(result.status, 0, result.stderr);
        for (const [agent, destination] of Object.entries(target.destinations)) {
          if (selected.includes(agent)) assert.deepEqual(snapshot(destination), expected);
          else assert.equal(existsSync(destination), false);
        }
        for (const forbidden of project ? [target.env.CODEX_HOME, target.env.XDG_CONFIG_HOME] : [join(target.cwd, ".agents"), join(target.cwd, ".opencode")]) {
          assert.equal(existsSync(forbidden), false, `Unexpected destination: ${forbidden}`);
        }
      }
    }
  }, 30000);

  test("copies include hidden files and nested resources", () => {
    mkdirSync(join(source, "assets"));
    writeFileSync(join(source, "assets", "example.txt"), "Resource fixture\n");
    writeFileSync(join(source, ".resource"), "Hidden fixture\n");
    const target = paths("copy", true);
    const result = install(["--project"], target);
    assert.equal(result.status, 0, result.stderr);
    for (const destination of Object.values(target.destinations)) assert.deepEqual(snapshot(destination), snapshot(source));
  }, 30000);

  test("help and invalid options do not write files or directories", () => {
    const target = paths();
    const before = snapshot(workspace.root);
    const help = install(["--help"], target);
    assert.equal(help.status, 0, help.stderr);
    assert.match(help.stdout, /Usage:/);
    const invalid = install(["--unknown-option"], target);
    assert.equal(invalid.status, 2);
    assert.ok(invalid.stderr.trim());
    assert.deepEqual(snapshot(workspace.root), before);
  }, 30000);

  test("a missing source package does not create installation destinations", () => {
    const empty = join(workspace.root, "empty checkout");
    mkdirSync(empty);
    copyFileSync(join(checkout, "install.sh"), join(empty, "install.sh"));
    const target = paths();
    const result = install([], target, empty);
    assert.equal(result.status, 1);
    assert.ok(result.stderr.trim());
    for (const destination of Object.values(target.destinations)) assert.equal(existsSync(destination), false);
  }, 30000);

  test("a missing entry point does not create installation destinations", () => {
    unlinkSync(join(source, "SKILL.md"));
    const target = paths();
    assert.equal(install([], target).status, 1);
    for (const destination of Object.values(target.destinations)) assert.equal(existsSync(destination), false);
  }, 30000);

  test("reinstallation preserves local changes", () => {
    const target = paths("reinstall", true);
    const first = install(["--project"], target);
    assert.equal(first.status, 0, first.stderr);
    for (const destination of Object.values(target.destinations)) writeFileSync(join(destination, "SKILL.md"), "Local changes must survive\n");
    const before = snapshot(workspace.root);
    assert.equal(install(["--project"], target).status, 1);
    assert.deepEqual(snapshot(workspace.root), before);
  }, 30000);

  test("all-agent preflight preserves files and directories before writing any target", () => {
    for (const project of [false, true]) {
      for (const kind of ["file", "directory", "empty-directory"]) {
        const target = paths(`existing-${project}-${kind}`, project);
        const occupied = target.destinations.opencode;
        mkdirSync(join(occupied, ".."), { recursive: true });
        if (kind === "file") writeFileSync(occupied, "Existing file\n");
        else {
          mkdirSync(occupied);
          if (kind === "directory") writeFileSync(join(occupied, "keep.txt"), "Existing installation\n");
        }
        const before = snapshot(workspace.root);
        assert.equal(install(project ? ["--project"] : [], target).status, 1);
        assert.deepEqual(snapshot(workspace.root), before);
        assert.equal(existsSync(target.destinations.codex), false);
      }
    }
  }, 30000);

  for (const broken of [false, true]) {
    test(`existing ${broken ? "broken" : "directory"} symlinks are preserved`, () => {
      const target = paths("symlink", true);
      const linkTarget = join(workspace.root, "symlink target");
      if (!broken) {
        mkdirSync(linkTarget);
        writeFileSync(join(linkTarget, "keep.txt"), "Symlink target\n");
      }
      const occupied = target.destinations.opencode;
      mkdirSync(join(occupied, ".."), { recursive: true });
      // Bun creates directory junctions on Windows without requiring symlink privileges.
      symlinkSync(linkTarget, occupied, process.platform === "win32" ? "junction" : "dir");
      const original = readlinkSync(occupied);
      assert.equal(install(["--project"], target).status, 1);
      assert.equal(lstatSync(occupied).isSymbolicLink(), true);
      assert.equal(readlinkSync(occupied), original);
      assert.equal(existsSync(target.destinations.codex), false);
      if (!broken) assert.equal(readFileSync(join(linkTarget, "keep.txt"), "utf8"), "Symlink target\n");
    }, 30000);
  }
});
