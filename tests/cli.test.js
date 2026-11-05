import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { temporaryWorkspace, repository, snapshot } from './helpers.js';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { context } from '../src/context.js';
import { parse } from '../src/options.js';
import { hash } from '../src/shared.js';

test('Node and Bun expose the same CLI contract and preserve the project', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p { font-size: 10px }');
    const before = snapshot(workspace.root);
    for (const runtime of ['node', 'bun']) {
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'inspect', '--project', workspace.root, '--source', 'style.css', '--format', 'json'], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.equal(report.coverage.rendered, 'not-requested');
      assert.equal(report.findings[0].status, 'needs-review');
      assert.equal(report.findings[0].evidence.line, 1);
      const bad = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'inspect', '--format', 'json'], { encoding: 'utf8' });
      assert.equal(bad.status, 2);
      assert.equal(JSON.parse(bad.stdout).completion, 'partial');
    }
    assert.deepEqual(snapshot(workspace.root), before);
    const output = path.join(workspace.root, 'node-run');
    const saved = spawnSync('node', [path.join(repository, 'bin/flawless-ui-ux.js'), 'inspect', '--project', workspace.root, '--source', 'style.css', '--output', output, '--format', 'json'], { encoding: 'utf8' });
    assert.equal(saved.status, 0, saved.stderr);
    const compared = spawnSync('bun', [path.join(repository, 'bin/flawless-ui-ux.js'), 'verify', path.join(output, 'run.json'), '--format', 'json'], { encoding: 'utf8' });
    assert.equal(compared.status, 0, compared.stderr);
    assert.equal(JSON.parse(compared.stdout).comparison.persistent.length, 1);
  } finally { workspace.cleanup(); }
});

test('input validation rejects unsupported targets and ambiguous options', () => {
  for (const args of [
    ['inspect'], ['inspect', '--url', 'file:///tmp/test'], ['inspect', '--url', 'http://user:pass@localhost'],
    ['inspect', '--source', 'a.css', '--viewport', '390x844'], ['inspect', '--url', 'http://localhost', '--viewport', 'small'],
    ['inspect', '--url', 'http://localhost', '--timeout', 'Infinity'], ['inspect', '--url', 'http://localhost', '--url', 'http://other'],
    ['context', '--source', 'a.css'], ['verify'], ['verify', 'a.json', '--project', 'other'],
  ]) assert.throws(() => parse([...args]), args.join(' '));
});

test('source scope rejects traversal, secrets, dependency files, and external links', async () => {
  const workspace = temporaryWorkspace();
  try {
    const root = path.join(workspace.root, 'project');
    await fs.mkdir(root);
    await fs.writeFile(path.join(root, '.env'), 'SECRET=not-for-inspection');
    await fs.writeFile(path.join(workspace.root, 'outside.css'), 'body { font-size: 8px }');
    await fs.symlink(workspace.root, path.join(root, 'external'), process.platform === 'win32' ? 'junction' : 'dir');
    for (const source of ['../outside.css', '.env', 'node_modules/a.css', 'external/outside.css']) {
      const report = await inspect(parse(['inspect', '--project', root, '--source', source]).options);
      assert.equal(report.exitCode, 2);
      assert.equal(report.sources.length, 0);
    }
    await fs.unlink(path.join(root, 'external'));
  } finally { workspace.cleanup(); }
});

test('context preserves saved provenance and reports changed/missing sources without writing', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.mkdir(path.join(workspace.root, '.flawless-ui-ux'));
    await fs.writeFile(path.join(workspace.root, 'README.md'), 'Current identity');
    await fs.writeFile(path.join(workspace.root, '.flawless-ui-ux/context.json'), JSON.stringify({ schemaVersion: 1, product: 'Sample', task: 'Refine', sources: [{ path: 'README.md', hash: hash('old') }, { path: 'missing.md', hash: hash('missing') }], decisions: [{ value: 'Preserve identity', status: 'confirmed', protected: true, provenance: ['README.md'] }] }));
    const before = snapshot(workspace.root);
    const report = await context({ project: workspace.root });
    assert.deepEqual(report.saved.sources.map(s => s.state), ['stale', 'unavailable']);
    assert.equal(report.decisions[0].protected, true);
    assert.deepEqual(snapshot(workspace.root), before);
    await fs.writeFile(path.join(workspace.root, '.flawless-ui-ux/context.json'), '{"schemaVersion":999}');
    await assert.rejects(context({ project: workspace.root }), /schema/);
  } finally { workspace.cleanup(); }
});

test('source verification compares changed values, preserves output, and refuses executable recipes', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p { font-size: 10px }');
    const output = path.join(workspace.root, 'first');
    const baseline = await inspect(parse(['inspect', '--project', workspace.root, '--source', 'style.css', '--output', output]).options);
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p { font-size: 16px }');
    const report = await verify({ baseline: baseline.artifacts.manifest });
    assert.equal(report.exitCode, 0);
    assert.equal(report.comparison.noLongerObserved.length, 1);
    assert.notEqual(report.sources[0].hash, baseline.sources[0].hash);
    await assert.rejects(inspect(parse(['inspect', '--project', workspace.root, '--source', 'style.css', '--output', output]).options), /exist/i);
    baseline.scope.browserExecutable = 'untrusted-executable';
    await fs.writeFile(baseline.artifacts.manifest, JSON.stringify(baseline));
    await assert.rejects(verify({ baseline: baseline.artifacts.manifest }), /cannot select executables/);
    await fs.writeFile(baseline.artifacts.manifest, '{}');
    await assert.rejects(verify({ baseline: baseline.artifacts.manifest }), /incompatible/);
  } finally { workspace.cleanup(); }
});

test('missing browser retains source findings and reports incomplete requested coverage', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p { font-size: 9px }');
    const report = await inspect(parse(['inspect', '--project', workspace.root, '--source', 'style.css', '--url', 'http://127.0.0.1:1', '--browser-executable', path.join(workspace.root, 'missing-browser')]).options);
    assert.equal(report.exitCode, 2);
    assert.equal(report.coverage.source, 'completed');
    assert.equal(report.coverage.rendered, 'partial');
    assert.equal(report.findings[0].checkId, 'source.text-size');
  } finally { workspace.cleanup(); }
});
