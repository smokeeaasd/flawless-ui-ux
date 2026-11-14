import { test, spyOn } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { install } from '../src/install.js';
import { update, doctor } from '../src/maintenance.js';
import { parse } from '../src/options.js';
import { recordName } from '../src/installation-record.js';
import { VERSION } from '../src/shared.js';
import { temporaryWorkspace, snapshot, repository } from './helpers.js';

test('update recognizes exact 2.0.0 copies, previews without writing, and records the running version', async () => {
  const workspace = temporaryWorkspace();
  try {
    const installed = await install({ project: workspace.root, agent: 'codex' });
    const destination = installed.installations[0].path;
    await fs.unlink(path.join(destination, recordName)); // 2.0.0 and Bash/third-party installers have no record.
    const before = snapshot(workspace.root);
    const preview = await update({ project: workspace.root, agents: ['codex', 'cursor'], dryRun: true });
    assert.equal(preview.exitCode, 0);
    assert.equal(preview.installations.length, 1);
    assert.equal(preview.installations[0].version, '2.0.0');
    assert.deepEqual(snapshot(workspace.root), before);
    const result = await update({ project: workspace.root, agents: ['codex', 'cursor'] });
    assert.equal(result.exitCode, 0);
    assert.equal(result.installations[0].version, VERSION);
    assert.equal(JSON.parse(await fs.readFile(path.join(destination, recordName))).toolVersion, VERSION);
    assert.deepEqual((await fs.readdir(path.dirname(destination))).sort(), ['flawless-ui-ux']);
  } finally { workspace.cleanup(); }
});

test('update refuses all selected updates when any copy is modified, added to, or missing a tracked file', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const change of ['edit', 'add', 'delete']) {
      const root = path.join(workspace.root, change);
      await fs.mkdir(root);
      const installed = await install({ project: root, agents: ['codex', 'opencode'] });
      const destination = installed.installations[1].path;
      if (change === 'edit') await fs.appendFile(path.join(destination, 'SKILL.md'), '\nLocal guidance\n');
      if (change === 'add') await fs.writeFile(path.join(destination, 'my-notes.md'), 'Keep this');
      if (change === 'delete') await fs.unlink(path.join(destination, 'SKILL.md'));
      const before = snapshot(root);
      const result = await update({ project: root, agents: ['codex', 'opencode'] });
      assert.equal(result.exitCode, 2);
      assert.equal(result.installations[1].status, 'modified');
      assert.equal(result.installations[1].modified.length, 1);
      assert.deepEqual(snapshot(root), before);
    }
  } finally { workspace.cleanup(); }
});

test('update replaces a clean older tracked tree and reports file differences', async () => {
  const workspace = temporaryWorkspace();
  try {
    const installed = await install({ project: workspace.root, agent: 'codex' });
    const destination = installed.installations[0].path;
    const { installationRecord } = await import('../src/installation-record.js');
    await fs.writeFile(path.join(destination, 'SKILL.md'), 'An older installed revision\n');
    const previous = await installationRecord(destination, '2.0.0');
    await fs.writeFile(path.join(destination, recordName), JSON.stringify(previous));
    const result = await update({ project: workspace.root, agent: 'codex' });
    assert.equal(result.exitCode, 0);
    assert.equal(result.installations[0].status, 'updated');
    assert.ok(result.installations[0].changes.some(change => change.path === 'SKILL.md'));
    assert.equal(await fs.readFile(path.join(destination, 'SKILL.md'), 'utf8'), await fs.readFile(path.join(repository, 'skills/flawless-ui-ux/SKILL.md'), 'utf8'));
  } finally { workspace.cleanup(); }
});

test('update rolls back earlier replacements after a later swap fails', async () => {
  const workspace = temporaryWorkspace();
  let rename;
  try {
    await install({ project: workspace.root, agents: ['codex', 'opencode'] });
    const before = snapshot(workspace.root);
    const original = fs.rename.bind(fs);
    let swaps = 0;
    rename = spyOn(fs, 'rename').mockImplementation(async (from, to) => {
      if (path.basename(from) === 'next' && ++swaps === 2) throw new Error('Simulated swap failure');
      return original(from, to);
    });
    await assert.rejects(update({ project: workspace.root, agents: ['codex', 'opencode'] }), /Original installations preserved/);
    assert.deepEqual(snapshot(workspace.root), before);
  } finally { rename?.mockRestore(); workspace.cleanup(); }
});

test('update skips missing copies and preserves unrecognized installations', async () => {
  const workspace = temporaryWorkspace();
  try {
    assert.equal((await update({ project: workspace.root, agent: 'codex' })).installations[0].status, 'missing');
    const destination = path.join(workspace.root, '.agents/skills/flawless-ui-ux');
    await fs.mkdir(destination, { recursive: true });
    await fs.writeFile(path.join(destination, 'SKILL.md'), 'Unknown custom skill');
    const before = snapshot(workspace.root);
    const result = await update({ project: workspace.root, agent: 'codex' });
    assert.equal(result.exitCode, 2);
    assert.equal(result.installations[0].status, 'unmanaged');
    assert.deepEqual(snapshot(workspace.root), before);
  } finally { workspace.cleanup(); }
});

test('update will not downgrade a newer recorded installation', async () => {
  const workspace = temporaryWorkspace();
  try {
    const installed = await install({ project: workspace.root, agent: 'codex' });
    const file = path.join(installed.installations[0].path, recordName);
    const record = JSON.parse(await fs.readFile(file));
    record.toolVersion = '3.0.0';
    await fs.writeFile(file, JSON.stringify(record));
    const before = snapshot(workspace.root);
    const result = await update({ project: workspace.root, agent: 'codex' });
    assert.equal(result.exitCode, 2);
    assert.equal(result.installations[0].status, 'newer');
    assert.deepEqual(snapshot(workspace.root), before);
  } finally { workspace.cleanup(); }
});

test('update refuses linked paths and invalid metadata without touching outside files', async () => {
  const workspace = temporaryWorkspace();
  try {
    const outside = path.join(workspace.root, 'outside'), project = path.join(workspace.root, 'project');
    await fs.mkdir(outside); await fs.mkdir(project);
    await fs.writeFile(path.join(outside, 'SKILL.md'), 'Protected');
    await fs.mkdir(path.join(project, '.agents/skills'), { recursive: true });
    const destination = path.join(project, '.agents/skills/flawless-ui-ux');
    await fs.symlink(outside, destination, process.platform === 'win32' ? 'junction' : 'dir');
    const before = snapshot(workspace.root);
    assert.equal((await update({ project, agent: 'codex' })).exitCode, 2);
    assert.deepEqual(snapshot(workspace.root), before);
    await fs.unlink(destination);
    await install({ project, agent: 'codex' });
    await fs.writeFile(path.join(destination, recordName), '{"schemaVersion":999}');
    assert.equal((await update({ project, agent: 'codex' })).exitCode, 2);
  } finally { workspace.cleanup(); }
});

test('doctor inventories local/global divergence without writes or a required browser', async () => {
  const workspace = temporaryWorkspace();
  try {
    const project = path.join(workspace.root, 'project'), home = path.join(workspace.root, 'profile');
    await fs.mkdir(project); await fs.mkdir(home);
    const runtime = { home, env: {} };
    await install({ project, agent: 'codex' }, runtime);
    const global = await install({ global: true, agent: 'codex' }, runtime);
    await fs.appendFile(path.join(global.installations[0].path, 'SKILL.md'), '\nLocal edits');
    const before = snapshot(workspace.root);
    const result = await doctor({ project, agent: 'codex', browserExecutable: path.join(workspace.root, 'absent-browser') }, runtime);
    assert.equal(result.installations.length, 2);
    assert.equal(result.divergent, true);
    assert.equal(result.browser.status, 'unavailable');
    assert.equal(result.exitCode, 2);
    assert.ok(result.runtime.dependencies.playwright);
    assert.deepEqual(snapshot(workspace.root), before);
  } finally { workspace.cleanup(); }
});

for (const runtime of ['node', 'bun']) test(`maintenance CLI flags and machine output work under ${runtime}`, async () => {
  const workspace = temporaryWorkspace();
  try {
    const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'update', '--project', workspace.root, '--codex', '--dry-run', '--format', 'json'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).dryRun, true);
    for (const args of [['update', '--yes'], ['doctor', '--dry-run'], ['update', '--global', '--project', '.'], ['update', '--codex', '--all-agents'], ['inspect', '--source', 'x.css', '--html']]) assert.throws(() => parse(args));
  } finally { workspace.cleanup(); }
});
