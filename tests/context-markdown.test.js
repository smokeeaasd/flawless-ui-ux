import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { context } from '../src/context.js';
import { parse } from '../src/options.js';
import { hash, finding, VERSION } from '../src/shared.js';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { temporaryWorkspace, snapshot } from './helpers.js';

test('Markdown context reuses documents, exposes freshness, and leaves the project unchanged', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.mkdir(path.join(workspace.root, 'docs'));
    await fs.writeFile(path.join(workspace.root, 'README.md'), 'Product facts');
    await fs.writeFile(path.join(workspace.root, 'docs/product.md'), `# Audience\nReaders\n[Source](../README.md) sha256: ${hash('Old facts')}\n[Unavailable](missing.md)\n[External](https://example.com/brief.md)\n`);
    const before = snapshot(workspace.root);
    const report = await context({ project: workspace.root });
    assert.equal(report.schemaVersion, 2);
    assert.equal(report.documents.length, 1);
    assert.deepEqual(report.documents[0].references.map(ref => ref.state), ['stale', 'unavailable', 'external']);
    assert.deepEqual(snapshot(workspace.root), before);
    await fs.writeFile(path.join(workspace.root, 'docs/product.md'), `# Audience\n[Source](../README.md) sha256: ${hash('Product facts')}`);
    assert.equal((await context({ project: workspace.root })).documents[0].references[0].state, 'current');
  } finally { workspace.cleanup(); }
});

test('explicit Markdown context is bounded and cannot read sibling projects', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'brief.md'), '# Brief\n' + 'x'.repeat(9000));
    const report = await context(parse(['context', '--project', workspace.root, '--source', 'brief.md']).options);
    assert.equal(report.documents[0].truncated, true);
    assert.equal(report.documents[0].excerpt.length, 8000);
    assert.equal((await context({ project: workspace.root, sources: ['../outside.md'] })).exitCode, 2);
    assert.equal((await context({ project: workspace.root, sources: ['absent.md'] })).exitCode, 2);
    assert.throws(() => parse(['context', '--source', 'context.json']));
  } finally { workspace.cleanup(); }
});

test('v1 initial-state manifests can be verified and unsupported versions are rejected', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p{font-size:10px}');
    const report = await inspect(parse(['inspect', '--project', workspace.root, '--source', 'style.css']).options);
    const baseline = { ...report, schemaVersion: 1, toolVersion: '1.1.0', checkVersion: 1, scope: { ...report.scope, url: null } };
    delete baseline.scope.urls;
    const file = path.join(workspace.root, 'v1.json');
    await fs.writeFile(file, JSON.stringify(baseline));
    const verified = await verify({ baseline: file });
    assert.equal(verified.schemaVersion, 2);
    assert.equal(verified.migration.fromSchemaVersion, 1);
    assert.equal(verified.comparison.persistent.length, 1);
    await fs.writeFile(file, JSON.stringify({ ...baseline, checkVersion: 999 }));
    await assert.rejects(verify({ baseline: file }), /incompatible/);
    const left = finding('render.text-size', '#title', '', { conditions: { viewport: '390x844', state: 'initial', surface: 'http://localhost/a' } });
    const right = finding('render.text-size', '#title', '', { conditions: { viewport: '390x844', state: 'initial', surface: 'http://localhost/b' } });
    assert.notEqual(left.fingerprint, right.fingerprint);
  } finally { workspace.cleanup(); }
});

test('verify keeps complete 2.x and 3.0 report compatibility without accepting unknown versions or checks', async () => {
  const workspace = temporaryWorkspace();
  try {
    const style = path.join(workspace.root, 'style.css');
    await fs.writeFile(style, 'p{font-size:10px}');
    const baseline = await inspect(parse(['inspect', '--project', workspace.root, '--source', 'style.css']).options);
    const file = path.join(workspace.root, 'baseline.json');
    await fs.writeFile(style, 'p{font-size:16px}');
    for (const version of ['2.0.0', '2.1.0', '2.2.0', '3.0.0', '3.0.1', VERSION]) {
      await fs.writeFile(file, JSON.stringify({ ...baseline, toolVersion: version }));
      const result = await verify({ baseline: file });
      assert.equal(result.completion, 'complete', version);
      assert.equal(result.schemaVersion, 2);
      assert.equal(result.comparison.noLongerObserved.length, 1, version);
    }
    for (const change of [{ toolVersion: '2.99.0' }, { toolVersion: '4.0.0' }, { toolVersion: '3.0.0', checkVersion: 999 }, { toolVersion: '3.0.0', completion: 'partial' }]) {
      await fs.writeFile(file, JSON.stringify({ ...baseline, ...change }));
      await assert.rejects(verify({ baseline: file }), /incompatible/);
    }
  } finally { workspace.cleanup(); }
});
