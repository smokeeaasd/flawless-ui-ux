import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse } from '../src/options.js';
import { context } from '../src/context.js';
import { repository, temporaryWorkspace, snapshot } from './helpers.js';

for (const runtime of ['node', 'bun']) test(`${runtime} redirects removed CLI init to the agent without any writes`, async () => {
  const workspace = temporaryWorkspace();
  try {
    const root = workspace.root;
    await fs.mkdir(path.join(root, '.flawless-ui-ux'));
    await fs.writeFile(path.join(root, '.flawless-ui-ux/product.md'), '# Product\nExisting decisions\n');
    await fs.writeFile(path.join(root, '.flawless-ui-ux/design.md'), '# Design\nKeep this identity\n');
    const before = snapshot(root);
    const bin = path.join(repository, 'bin/flawless-ui-ux.js');
    for (const args of [[], ['--project', root], ['--project', path.join(root, 'not-created')]]) {
      const result = spawnSync(runtime, [bin, 'init', ...args], { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 2, result.stderr);
      assert.equal(result.stdout, '');
      assert.ok(result.stderr.includes('$flawless-ui-ux init'));
      assert.deepEqual(snapshot(root), before);
    }
    const json = spawnSync(runtime, [bin, 'init', '--project', root, '--format', 'json'], { cwd: root, encoding: 'utf8' });
    assert.equal(json.status, 2);
    const report = JSON.parse(json.stdout);
    assert.equal(report.schemaVersion, 2);
    assert.equal(report.operation, 'init');
    assert.equal(report.completion, 'partial');
    assert.equal(report.exitCode, 2);
    assert.deepEqual(report.coverage, {});
    assert.ok(report.limits[0].includes('$flawless-ui-ux init'));
    assert.deepEqual(snapshot(root), before);
    const help = spawnSync(runtime, [bin, 'init', '--help'], { cwd: root, encoding: 'utf8' });
    assert.equal(help.status, 0, help.stderr);
    assert.ok(help.stdout.includes('$flawless-ui-ux init'));
    assert.deepEqual(snapshot(root), before);
    const recovered = await context({ project: root });
    assert.deepEqual(recovered.documents.map(x => x.path).sort(), ['.flawless-ui-ux/design.md', '.flawless-ui-ux/product.md']);
  } finally { workspace.cleanup(); }
});

test('CLI init is rejected before touching an empty project or parsing setup flags', () => {
  const workspace = temporaryWorkspace();
  try {
    const before = snapshot(workspace.root);
    const bin = path.join(repository, 'bin/flawless-ui-ux.js');
    const result = spawnSync('node', [bin, 'init', '--format', 'json'], { cwd: workspace.root, encoding: 'utf8' });
    assert.equal(result.status, 2);
    assert.equal(JSON.parse(result.stdout).operation, 'init');
    assert.deepEqual(snapshot(workspace.root), before);
    assert.throws(() => parse(['init']), /coding agent/);
    assert.throws(() => parse(['init', '--global']), /coding agent/);
    assert.equal(parse(['init', '-h']).operation, 'init-help');
  } finally { workspace.cleanup(); }
});
