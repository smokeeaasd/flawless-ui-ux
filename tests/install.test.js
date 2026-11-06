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
      CLAUDE_CONFIG_DIR: join(root, "claude config with spaces").replaceAll("\\", "/"),
      PI_CODING_AGENT_DIR: join(root, "pi config with spaces").replaceAll("\\", "/"),
      GROK_HOME: join(root, "grok config with spaces").replaceAll("\\", "/"),
      DSH_HOME: join(root, "dsh config with spaces").replaceAll("\\", "/"),
      APPDATA: join(root, "application data with spaces"),
      HOME: join(root, "user home with spaces").replaceAll("\\", "/"),
    };
    return {
      cwd, env,
      destinations: {
        codex: project ? join(cwd, ".agents", "skills", skillName) : join(env.CODEX_HOME, "skills", skillName),
        opencode: project ? join(cwd, ".opencode", "skills", skillName) : join(env.XDG_CONFIG_HOME, "opencode", "skills", skillName),
        antigravity: project ? join(cwd, ".agents", "skills", skillName) : join(env.HOME, ".gemini", "config", "skills", skillName),
        kiro: project ? join(cwd, ".kiro", "skills", skillName) : join(env.HOME, ".kiro", "skills", skillName),
        cursor: project ? join(cwd, ".agents", "skills", skillName) : join(env.HOME, ".cursor", "skills", skillName),
        kilo: project ? join(cwd, ".agents", "skills", skillName) : join(env.HOME, ".kilo", "skills", skillName),
        copilot: project ? join(cwd, ".agents", "skills", skillName) : join(env.HOME, ".copilot", "skills", skillName),
        "claude-code": project ? join(cwd, ".claude", "skills", skillName) : join(env.CLAUDE_CONFIG_DIR, "skills", skillName),
        pi: project ? join(cwd, ".agents", "skills", skillName) : join(env.PI_CODING_AGENT_DIR, "skills", skillName),
        "grok-build": project ? join(cwd, ".grok", "skills", skillName) : join(env.GROK_HOME, "skills", skillName),
        devin: project ? join(cwd, ".agents", "skills", skillName) : join(process.platform === "win32" ? env.APPDATA : env.XDG_CONFIG_HOME, "devin", "skills", skillName),
        "deepseek-harness": project ? join(cwd, ".agents", "skills", skillName) : join(env.DSH_HOME, "skills", skillName),
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

  for (const project of [false, true]) test(`${project ? "project" : "global"} mode respects all agent selections`, () => {
    const agents = ["codex", "opencode", "antigravity", "kiro", "cursor", "kilo", "copilot", "claude-code", "pi", "grok-build", "devin", "deepseek-harness"];
    const selections = [[[], agents], [["--all-agents"], agents], ...agents.map(agent => [[`--${agent}`], [agent]])];
    const expected = snapshot(source);
    for (const [index, [flags, selected]] of selections.entries()) {
      const target = paths(`matrix-${project}-${index}`, project);
      const result = install([...flags, ...(project ? ["--project"] : [])], target);
      assert.equal(result.status, 0, result.stderr);
      const selectedPaths = new Set(selected.map(agent => target.destinations[agent]));
      for (const destination of Object.values(target.destinations)) {
        if (selectedPaths.has(destination)) assert.deepEqual(snapshot(destination), expected);
        else assert.equal(existsSync(destination), false);
      }
      for (const forbidden of project ? [target.env.CODEX_HOME, target.env.XDG_CONFIG_HOME, target.env.CLAUDE_CONFIG_DIR, target.env.PI_CODING_AGENT_DIR, target.env.GROK_HOME, target.env.DSH_HOME, target.env.APPDATA, target.env.HOME] : [join(target.cwd, ".agents"), join(target.cwd, ".opencode"), join(target.cwd, ".kiro"), join(target.cwd, ".claude"), join(target.cwd, ".grok")]) {
        assert.equal(existsSync(forbidden), false, `Unexpected destination: ${forbidden}`);
      }
    }
  }, 30000);

  test("copies include hidden files and nested resources", () => {
    mkdirSync(join(source, "assets"), { recursive: true });
    writeFileSync(join(source, "assets", "example.txt"), "Resource fixture\n");
    writeFileSync(join(source, ".resource"), "Hidden fixture\n");
    const target = paths("copy", true);
    const result = install(["--project"], target);
    assert.equal(result.status, 0, result.stderr);
    for (const destination of Object.values(target.destinations)) assert.deepEqual(snapshot(destination), snapshot(source));
  }, 30000);

  test("agent configuration overrides expand the isolated home", () => {
    for (const [agent, variable] of [["claude-code", "CLAUDE_CONFIG_DIR"], ["pi", "PI_CODING_AGENT_DIR"], ["deepseek-harness", "DSH_HOME"]]) {
      for (const nested of [false, true]) {
        const target = paths(`home-override-${agent}-${nested}`);
        target.env[variable] = nested ? "~/custom config" : "~";
        const before = snapshot(target.cwd);
        const result = install([`--${agent}`], target);
        assert.equal(result.status, 0, result.stderr);
        const destination = join(target.env.HOME, ...(nested ? ["custom config"] : []), "skills", skillName);
        assert.deepEqual(snapshot(destination), snapshot(source));
        assert.deepEqual(snapshot(target.cwd), before);
      }
    }
  }, 30000);

  test("Grok preserves literal overrides and DeepSeek ignores blank overrides", () => {
    for (const agent of ["grok-build", "deepseek-harness"]) {
      const target = paths(`literal-override-${agent}`);
      if (agent === "grok-build") target.env.GROK_HOME = "~/literal config";
      else target.env.DSH_HOME = " \t ";
      const result = install([`--${agent}`], target);
      assert.equal(result.status, 0, result.stderr);
      const destination = agent === "grok-build" ? join(target.cwd, "~", "literal config", "skills", skillName) : join(target.env.HOME, ".dsh", "skills", skillName);
      assert.deepEqual(snapshot(destination), snapshot(source));
    }
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
      for (const agent of project ? ["opencode", "kiro", "claude-code", "grok-build"] : ["opencode", "antigravity", "kiro", "cursor", "kilo", "copilot", "claude-code", "pi", "grok-build", "devin", "deepseek-harness"]) {
        for (const kind of ["file", "directory", "empty-directory"]) {
          const target = paths(`existing-${project}-${agent}-${kind}`, project);
          const occupied = target.destinations[agent];
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
