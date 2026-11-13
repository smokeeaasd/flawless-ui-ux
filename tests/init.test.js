import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { init } from '../src/init.js';
import { context } from '../src/context.js';
import { parse } from '../src/options.js';
import { repository, temporaryWorkspace, snapshot } from './helpers.js';

test('init creates only the two canonical templates, context discovers them, and repeats preserve edits', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'README.md'), 'Existing project');
    const report = await init({ project: workspace.root });
    assert.equal(report.schemaVersion, 2);
    assert.equal(report.exitCode, 0);
    assert.deepEqual(report.documents.map(doc => [doc.kind, doc.path, doc.status]), [
      ['product', '.flawless-ui-ux/product.md', 'created'], ['design', '.flawless-ui-ux/design.md', 'created'],
    ]);
    assert.deepEqual((await fs.readdir(path.join(workspace.root, '.flawless-ui-ux'))).sort(), ['design.md', 'product.md']);
    for (const kind of ['product', 'design']) assert.equal(await fs.readFile(path.join(workspace.root, `.flawless-ui-ux/${kind}.md`), 'utf8'), await fs.readFile(path.join(repository, `skills/flawless-ui-ux/assets/context/${kind}.md`), 'utf8'));
    await fs.writeFile(path.join(workspace.root, '.flawless-ui-ux/product.md'), '# Product\nConfirmed user decisions');
    const before = snapshot(workspace.root);
    const repeated = await init({ project: workspace.root });
    assert.ok(repeated.documents.every(doc => doc.status === 'reused'));
    assert.deepEqual(snapshot(workspace.root), before);
    assert.equal((await context({ project: workspace.root })).documents.length, 2);
    assert.equal(await fs.readFile(path.join(workspace.root, 'README.md'), 'utf8'), 'Existing project');
  } finally { workspace.cleanup(); }
});

test('init reuses conventional documents per kind without creating competing records', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.mkdir(path.join(workspace.root, 'docs'));
    await fs.writeFile(path.join(workspace.root, 'PRODUCT.md'), '# Product\nExisting product facts');
    await fs.writeFile(path.join(workspace.root, 'docs/design.md'), '# Design\nExisting identity');
    const before = snapshot(workspace.root);
    const report = await init({ project: workspace.root });
    assert.ok(report.documents.every(doc => doc.status === 'reused'));
    assert.deepEqual(report.documents.map(doc => doc.path), ['PRODUCT.md', 'docs/design.md']);
    assert.deepEqual(snapshot(workspace.root), before);
    await fs.unlink(path.join(workspace.root, 'docs/design.md'));
    const partial = await init({ project: workspace.root });
    assert.deepEqual(partial.documents.map(doc => doc.status), ['reused', 'created']);
    assert.deepEqual(await fs.readdir(path.join(workspace.root, '.flawless-ui-ux')), ['design.md']);
    assert.equal(await fs.readFile(path.join(workspace.root, 'PRODUCT.md'), 'utf8'), '# Product\nExisting product facts');
  } finally { workspace.cleanup(); }
});

test('init preflight preserves conflicts, broken links and external paths before writing', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const scenario of ['directory', 'file', 'link', 'broken-link', 'source-link']) {
      const root = path.join(workspace.root, scenario);
      const outside = path.join(workspace.root, `${scenario}-outside`);
      await fs.mkdir(root); await fs.mkdir(outside);
      await fs.writeFile(path.join(outside, 'product.md'), 'External content');
      if (scenario === 'directory') await fs.mkdir(path.join(root, 'DESIGN.md'));
      if (scenario === 'file') await fs.writeFile(path.join(root, '.flawless-ui-ux'), 'Preserve this file');
      if (scenario === 'link' || scenario === 'broken-link') await fs.symlink(scenario === 'link' ? outside : path.join(outside, 'missing'), path.join(root, '.flawless-ui-ux'), process.platform === 'win32' ? 'junction' : 'dir');
      if (scenario === 'source-link') {
        await fs.mkdir(path.join(root, 'docs'));
        await fs.symlink(outside, path.join(root, 'docs/product.md'), process.platform === 'win32' ? 'junction' : 'dir');
      }
      const before = snapshot(root), external = snapshot(outside);
      await assert.rejects(init({ project: root }));
      assert.deepEqual(snapshot(root), before, scenario);
      assert.deepEqual(snapshot(outside), external, scenario);
    }
  } finally { workspace.cleanup(); }
});

test('Node and Bun expose init with scoped JSON/text output, direct flags and idempotent concurrent writes', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const project = path.join(workspace.root, runtime); await fs.mkdir(project);
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'init', '--project', project, '--format', 'json'], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      assert.equal(JSON.parse(result.stdout).documents.length, 2);
      const text = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'init', '--project', project], { encoding: 'utf8' });
      assert.equal(text.status, 0, text.stderr);
      assert.match(text.stdout, /reused: .flawless-ui-ux\/product.md/);
    }
    const project = path.join(workspace.root, 'concurrent'); await fs.mkdir(project);
    const reports = await Promise.all([init({ project }), init({ project })]);
    assert.ok(reports.every(report => report.exitCode === 0));
    assert.deepEqual((await fs.readdir(path.join(project, '.flawless-ui-ux'))).sort(), ['design.md', 'product.md']);
    assert.ok(reports.flatMap(report => report.documents).every(doc => ['created', 'reused'].includes(doc.status)));
    assert.throws(() => parse(['init', '--global']));
    assert.throws(() => parse(['init', '--source', 'brief.md']));
  } finally { workspace.cleanup(); }
});
