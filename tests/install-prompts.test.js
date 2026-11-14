import { test } from 'bun:test';
import { installationRecord, recordName } from '../src/installation-record.js';
import { hash, VERSION } from '../src/shared.js';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { configureInstall, shouldPromptInstall, InstallationCancelled } from '../src/install-prompts.js';
import { install } from '../src/install.js';
import { parse } from '../src/options.js';
import { temporaryWorkspace, repository, snapshot, packageRoot } from './helpers.js';

test('only bare install on an interactive terminal opens the wizard', () => {
  const terminal = { input: { isTTY: true }, output: { isTTY: true }, env: {} };
  assert.equal(shouldPromptInstall(['install'], terminal), true);
  for (const args of [['install', '--yes'], ['install', '--codex'], ['install', '--global'], ['install', '--project', '.'], ['install', '--format', 'json'], ['install', '--format', 'text'], ['install', '--help'], ['context']]) assert.equal(shouldPromptInstall(args, terminal), false);
  for (const runtime of [
    { ...terminal, input: {} }, { ...terminal, output: {} }, { ...terminal, env: { CI: 'true' } },
  ]) assert.equal(shouldPromptInstall(['install'], runtime), false);
  assert.equal(parse(['install', '--yes']).options.yes, true);
});

function prompts(values) {
  const events = [];
  const ui = { events, isCancel: value => typeof value === 'symbol' };
  for (const method of ['intro', 'outro', 'note', 'cancel']) ui[method] = (...args) => events.push([method, ...args]);
  for (const method of ['select', 'multiselect', 'confirm']) ui[method] = async options => { events.push([method, options]); return values.shift(); };
  return ui;
}

test('confirmation previews canonical destinations without writes, then installs just the selected shared copy', async () => {
  const workspace = temporaryWorkspace();
  try {
    const ui = prompts(['project', ['codex', 'antigravity', 'devin'], true]);
    const before = snapshot(workspace.root);
    const configured = await configureInstall({ project: workspace.root }, { prompts: ui });
    assert.deepEqual(snapshot(workspace.root), before);
    const summary = ui.events.find(([method]) => method === 'note')[1];
    assert.match(summary, /Agents: 3 \| Skill copies: 1/);
    const canonicalRoot = await fs.realpath(workspace.root);
    assert.ok(summary.includes(path.join(canonicalRoot, '.agents', 'skills', 'flawless-ui-ux')));
    assert.equal(ui.events.find(([method]) => method === 'multiselect')[1].required, true);
    const report = await install(configured);
    assert.deepEqual(report.installations.map(target => target.agent), ['codex', 'antigravity', 'devin']);
    assert.equal(new Set(report.installations.map(target => target.path)).size, 1);
    assert.deepEqual(snapshot(report.installations[0].path), { ...snapshot(packageRoot), [recordName]: hash(`${JSON.stringify(await installationRecord(packageRoot, VERSION), null, 2)}\n`) });
    assert.deepEqual(await fs.readdir(workspace.root), ['.agents']);
  } finally { workspace.cleanup(); }
});

test('declining or cancelling any prompt leaves project and isolated profile unchanged', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const values of [[Symbol()], ['global', Symbol()], ['global', ['codex'], Symbol()], ['global', ['codex'], false]]) {
      const ui = prompts([...values]);
      const before = snapshot(workspace.root);
      await assert.rejects(configureInstall({}, { prompts: ui, runtime: { home: workspace.root, env: {} } }), error => error instanceof InstallationCancelled && error.exitCode === (values.at(-1) === false ? 0 : 130));
      assert.deepEqual(snapshot(workspace.root), before);
    }
  } finally { workspace.cleanup(); }
});

test('preflight conflicts stop before confirmation and destinations are rechecked after it', async () => {
  const workspace = temporaryWorkspace();
  try {
    const destination = path.join(workspace.root, '.agents/skills/flawless-ui-ux');
    const ui = prompts(['project', ['codex'], true]);
    const configured = await configureInstall({ project: workspace.root }, { prompts: ui });
    await fs.mkdir(destination, { recursive: true });
    await fs.writeFile(path.join(destination, 'custom.md'), 'Preserve this concurrent installation');
    const before = snapshot(workspace.root);
    await assert.rejects(install(configured), /already exists/);
    const conflicted = prompts(['project', ['codex'], true]);
    await assert.rejects(configureInstall({ project: workspace.root }, { prompts: conflicted }), /already exists/);
    assert.equal(conflicted.events.some(([method]) => method === 'confirm'), false);
    assert.deepEqual(snapshot(workspace.root), before);
    for (const agents of [[], ['unknown']]) await assert.rejects(install({ project: workspace.root, agents }), /supported installation agent/);
  } finally { workspace.cleanup(); }
});

test('combined flags remain direct and produce clean JSON under Node and Bun', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const root = path.join(workspace.root, runtime);
      await fs.mkdir(root);
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--devin', '--codex', '--opencode', '--yes', '--format', 'json'], { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.deepEqual(report.installations.map(target => target.agent), ['codex', 'opencode', 'devin']);
      assert.equal(new Set(report.installations.map(target => target.path)).size, 2);
      for (const target of report.installations) assert.deepEqual(snapshot(target.path), { ...snapshot(packageRoot), [recordName]: hash(`${JSON.stringify(await installationRecord(packageRoot, VERSION), null, 2)}\n`) });
      assert.deepEqual((await fs.readdir(root)).sort(), ['.agents', '.opencode']);
    }
  } finally { workspace.cleanup(); }
});

for (const runtime of ['node', 'bun']) test(`real CLI prompts accept keyboard selection and cancellation under ${runtime}`, async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const scenario of ['project', 'global', 'decline', 'interrupt']) {
      const root = path.join(workspace.root, scenario);
      const project = path.join(root, 'project');
      const home = path.join(root, 'profile');
      await fs.mkdir(project, { recursive: true });
      await fs.mkdir(home);
      const env = { ...process.env, HOME: home, USERPROFILE: home, CODEX_HOME: path.join(home, '.codex'), XDG_CONFIG_HOME: path.join(home, '.config'), APPDATA: path.join(home, 'AppData/Roaming'), GROK_HOME: path.join(home, '.grok'), DSH_HOME: path.join(home, '.dsh'), CLAUDE_CONFIG_DIR: path.join(home, '.claude'), PI_CODING_AGENT_DIR: path.join(home, '.pi/agent'), NO_COLOR: '1', TERM: 'xterm' };
      env.BUN_RUNTIME_TRANSPILER_CACHE_PATH = path.join(root, 'runtime-cache');
      delete env.CI;
      // Exercise the real prompt library and CLI over controlled terminal-like
      // streams, without requiring a platform-specific PTY dependency in CI.
      const script = `Object.defineProperty(process.stdin,'isTTY',{value:true}); process.stdin.setRawMode=()=>{}; Object.defineProperty(process.stdout,'isTTY',{value:true}); process.argv=[process.argv[0],${JSON.stringify(path.join(repository, 'bin/flawless-ui-ux.js'))},'install']; await import(${JSON.stringify(pathToFileURL(path.join(repository, 'bin/flawless-ui-ux.js')).href)});`;
      const result = await new Promise((resolve, reject) => {
        const child = spawn(runtime, ['--input-type=module', '-e', script], { cwd: project, env });
        let output = '', error = '', stage = 0;
        const timeout = setTimeout(() => { child.kill(); reject(new Error(`Prompt did not finish (${runtime}/${scenario}): ${output}`)); }, 8000);
        child.on('error', reason => { clearTimeout(timeout); reject(reason); });
        child.stderr.on('data', data => { error += data; });
        child.stdout.on('data', data => {
          output += data;
          if (output.includes('Installed flawless-ui-ux for opencode') || output.includes('Installation cancelled.')) child.stdin.end();
          const expected = ['Where should the skill be installed?', 'Which agents should use the skill?', 'Install this configuration?'][stage];
          if (expected && output.includes(expected)) {
            const keys = stage === 0 ? (scenario === 'global' ? '\x1b[B\r' : scenario === 'interrupt' ? '\x03' : '\r') : stage === 1 ? ' \x1b[B \r' : scenario === 'decline' ? 'n\r' : '\r';
            stage++;
            if (stage === 2) {
              // Enter cannot advance an empty multi-selection.
              setTimeout(() => child.stdin.write('\r'), 20);
              setTimeout(() => child.stdin.write(keys), 80);
            } else setTimeout(() => child.stdin.write(keys), 40);
          }
        });
        child.on('close', code => { clearTimeout(timeout); resolve({ code, output, error }); });
      });
      assert.equal(result.code, scenario === 'interrupt' ? 130 : 0, result.error + result.output);
      if (['interrupt', 'decline'].includes(scenario)) {
        assert.deepEqual(await fs.readdir(project), []);
        assert.deepEqual(await fs.readdir(home), []);
      } else {
        const targets = scenario === 'global' ? [path.join(home, '.codex/skills/flawless-ui-ux'), path.join(home, '.config/opencode/skills/flawless-ui-ux')] : [path.join(project, '.agents/skills/flawless-ui-ux'), path.join(project, '.opencode/skills/flawless-ui-ux')];
        for (const target of targets) assert.deepEqual(snapshot(target), { ...snapshot(packageRoot), [recordName]: hash(`${JSON.stringify(await installationRecord(packageRoot, VERSION), null, 2)}\n`) });
        assert.deepEqual(await fs.readdir(scenario === 'global' ? project : home), []);
        assert.ok(result.output.includes('Installation summary'));
      }
    }
  } finally { workspace.cleanup(); }
}, 20000);
