import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { temporaryWorkspace, repository } from './helpers.js';

test('packed distribution contains the executable core and portable skill without maintainer material', async () => {
  const workspace = temporaryWorkspace();
  try {
    const packed = spawnSync('bun', ['pm', 'pack', '--ignore-scripts', '--destination', workspace.root, '--quiet'], { cwd: repository, encoding: 'utf8' });
    assert.equal(packed.status, 0, packed.stderr);
    const archive = (await fs.readdir(workspace.root)).find(file => file.endsWith('.tgz'));
    assert.ok(archive);
    const extracted = spawnSync('tar', ['-xzf', path.join(workspace.root, archive), '-C', workspace.root], { encoding: 'utf8' });
    assert.equal(extracted.status, 0, extracted.stderr);
    const root = path.join(workspace.root, 'package');
    const metadata = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
    assert.notEqual(metadata.private, true);
    assert.equal(metadata.publishConfig.access, 'public');
    assert.equal(metadata.publishConfig.registry, 'https://registry.npmjs.org/');
    assert.equal(metadata.bin['flawless-ui-ux'], 'bin/flawless-ui-ux.js');
    for (const file of ['src/browser.js', 'skills/flawless-ui-ux/SKILL.md', 'skills/flawless-ui-ux/references/inspection.md', 'docs/assets/logo.svg', 'CHANGELOG.md', 'install.sh']) assert.ok((await fs.stat(path.join(root, file))).isFile());
    assert.deepEqual(await fs.readdir(path.join(root, 'docs')), ['assets']);
    assert.deepEqual(await fs.readdir(path.join(root, 'docs/assets')), ['logo.svg']);
    for (const excluded of ['evals', 'tests', 'node_modules']) await assert.rejects(fs.stat(path.join(root, excluded)), { code: 'ENOENT' });
    const result = spawnSync('node', [path.join(root, metadata.bin['flawless-ui-ux']), 'inspect', '--project', root, '--source', 'README.md', '--format', 'json'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).coverage.source, 'completed');
    const project = path.join(workspace.root, 'consumer');
    await fs.mkdir(project);
    const installed = spawnSync('node', [path.join(root, metadata.bin['flawless-ui-ux']), 'install', '--format', 'json'], { cwd: project, encoding: 'utf8' });
    assert.equal(installed.status, 0, installed.stderr);
    const report = JSON.parse(installed.stdout);
    assert.equal(report.installations.length, 3);
    assert.equal(new Set(report.installations.map(target => target.path)).size, 2);
    assert.ok(report.installations.every(target => target.scope === 'project'));
    for (const target of report.installations) assert.equal(await fs.readFile(path.join(target.path, 'SKILL.md'), 'utf8'), await fs.readFile(path.join(root, 'skills/flawless-ui-ux/SKILL.md'), 'utf8'));
    await fs.unlink(path.join(root, 'skills/flawless-ui-ux/SKILL.md'));
    const missing = spawnSync('node', [path.join(root, metadata.bin['flawless-ui-ux']), 'install', '--project', root, '--format', 'json'], { encoding: 'utf8' });
    assert.equal(missing.status, 2);
    assert.equal(JSON.parse(missing.stdout).completion, 'partial');
    await assert.rejects(fs.stat(path.join(root, '.agents')), { code: 'ENOENT' });
  } finally { workspace.cleanup(); }
});
