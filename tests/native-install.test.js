import { test, spyOn } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { install } from '../src/install.js';
import { parse } from '../src/options.js';
import { temporaryWorkspace, repository, packageRoot, snapshot } from './helpers.js';

const skill = 'flawless-ui-ux';
const localPaths = root => [path.join(root, '.agents/skills', skill), path.join(root, '.opencode/skills', skill)];

test('native installation copies the complete skill for every agent and scope selection', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const scope of ['project', 'global']) for (const agent of ['codex', 'opencode', 'all']) {
      const root = path.join(workspace.root, `${scope}-${agent}`);
      await fs.mkdir(root);
      const report = await install({ agent, ...(scope === 'project' ? { project: root } : {}) }, { home: root, env: {} });
      assert.equal(report.exitCode, 0);
      assert.deepEqual(report.installations.map(i => i.agent), agent === 'all' ? ['codex', 'opencode'] : [agent]);
      for (const target of report.installations) {
        assert.equal(target.scope, scope);
        const expected = scope === 'project' ? localPaths(root)[target.agent === 'codex' ? 0 : 1] : target.agent === 'codex' ? path.join(root, '.codex/skills', skill) : path.join(root, '.config/opencode/skills', skill);
        assert.equal(target.path, expected);
        assert.deepEqual(snapshot(target.path), snapshot(packageRoot));
      }
    }
  } finally { workspace.cleanup(); }
});

test('global CLI installation honors environment overrides under Node and Bun', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const root = path.join(workspace.root, runtime);
      await fs.mkdir(root);
      const codex = path.join(root, 'codex config');
      const config = path.join(root, 'xdg config');
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--global', '--format', 'json'], {
        cwd: root, env: { ...process.env, CODEX_HOME: codex, XDG_CONFIG_HOME: config }, encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.equal(report.operation, 'install');
      assert.deepEqual(report.installations.map(i => i.path), [path.join(codex, 'skills', skill), path.join(config, 'opencode/skills', skill)]);
      assert.deepEqual(snapshot(report.installations[0].path), snapshot(packageRoot));
      const before = snapshot(root);
      const repeat = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--format', 'json'], {
        cwd: root, env: { ...process.env, CODEX_HOME: codex, XDG_CONFIG_HOME: config }, encoding: 'utf8',
      });
      assert.equal(repeat.status, 2);
      assert.equal(JSON.parse(repeat.stdout).completion, 'partial');
      assert.deepEqual(snapshot(root), before);
    }
  } finally { workspace.cleanup(); }
});

test('all-agent preflight preserves files, directories and local edits before writing either target', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const kind of ['file', 'directory']) {
      const root = path.join(workspace.root, kind);
      const [, conflict] = localPaths(root);
      await fs.mkdir(path.dirname(conflict), { recursive: true });
      if (kind === 'file') await fs.writeFile(conflict, 'Preserve this file');
      else { await fs.mkdir(conflict); await fs.writeFile(path.join(conflict, 'custom.md'), 'Preserve local changes'); }
      const before = snapshot(root);
      await assert.rejects(install({ project: root }), /already exists/);
      assert.deepEqual(snapshot(root), before);
    }
  } finally { workspace.cleanup(); }
});

test('existing target links, broken links and parents escaping the project are preserved', async () => {
  const workspace = temporaryWorkspace();
  const links = [];
  try {
    const outside = path.join(workspace.root, 'outside');
    await fs.mkdir(outside);
    await fs.writeFile(path.join(outside, 'sentinel.txt'), 'Do not modify');
    const outsideBefore = snapshot(outside);
    for (const kind of ['target', 'broken', 'parent']) {
      const root = path.join(workspace.root, kind);
      await fs.mkdir(root);
      const link = kind === 'parent' ? path.join(root, '.agents') : localPaths(root)[0];
      await fs.mkdir(path.dirname(link), { recursive: true });
      await fs.symlink(kind === 'broken' ? path.join(workspace.root, 'missing') : outside, link, process.platform === 'win32' ? 'junction' : 'dir');
      links.push(link);
      const before = snapshot(root);
      await assert.rejects(install({ project: root, agent: 'codex' }), /already exists|escapes/);
      assert.deepEqual(snapshot(root), before);
      assert.deepEqual(snapshot(outside), outsideBefore);
    }
  } finally {
    for (const link of links) await fs.unlink(link);
    workspace.cleanup();
  }
});

test('copy failures remove only directories allocated by the current installation', async () => {
  const workspace = temporaryWorkspace();
  const copy = fs.cp;
  const failure = spyOn(fs, 'cp').mockImplementation(async (...args) => {
    if (args[1].includes(`${path.sep}.opencode${path.sep}`)) throw new Error('Simulated filesystem failure');
    return copy(...args);
  });
  try {
    await fs.writeFile(path.join(workspace.root, 'sentinel.txt'), 'Preserve');
    await assert.rejects(install({ project: workspace.root }), /Simulated filesystem failure/);
    for (const destination of localPaths(workspace.root)) await assert.rejects(fs.lstat(destination), { code: 'ENOENT' });
    assert.equal(await fs.readFile(path.join(workspace.root, 'sentinel.txt'), 'utf8'), 'Preserve');
  } finally { failure.mockRestore(); workspace.cleanup(); }
});

test('concurrent installs preserve the winning complete installation', async () => {
  const workspace = temporaryWorkspace();
  try {
    const results = await Promise.allSettled([install({ project: workspace.root, agent: 'codex' }), install({ project: workspace.root, agent: 'codex' })]);
    assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
    assert.equal(results.filter(r => r.status === 'rejected').length, 1);
    assert.deepEqual(snapshot(localPaths(workspace.root)[0]), snapshot(packageRoot));
  } finally { workspace.cleanup(); }
});

test('invalid selections, unavailable project roots, and overlapping global paths do not install', async () => {
  for (const args of [
    ['install', '--codex', '--opencode'], ['install', '--all-agents', '--codex'],
    ['install', '--global', '--project', '.'], ['install', '--project'],
    ['install', '--codex', '--codex'], ['install', '--url', 'http://localhost'],
  ]) assert.throws(() => parse(args));
  assert.equal(parse(['install']).options.agent, 'all');
  assert.equal(parse(['install', '--help']).operation, 'help');
  const workspace = temporaryWorkspace();
  try {
    await assert.rejects(install({ project: path.join(workspace.root, 'missing') }), { code: 'ENOENT' });
    await assert.rejects(install({}, { env: { CODEX_HOME: path.join(workspace.root, 'opencode'), XDG_CONFIG_HOME: workspace.root }, home: workspace.root }), /overlap/);
    assert.deepEqual(await fs.readdir(workspace.root), []);
  } finally { workspace.cleanup(); }
});
