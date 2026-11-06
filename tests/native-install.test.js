import { test, spyOn } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { install } from '../src/install.js';
import { parse } from '../src/options.js';
import { temporaryWorkspace, repository, packageRoot, snapshot } from './helpers.js';

const skill = 'flawless-ui-ux';
const agents = ['codex', 'opencode', 'antigravity', 'kiro', 'cursor', 'kilo', 'copilot', 'claude-code', 'pi'];
const projectDirectories = {
  codex: '.agents/skills', opencode: '.opencode/skills', antigravity: '.agents/skills', kiro: '.kiro/skills',
  cursor: '.agents/skills', kilo: '.agents/skills', copilot: '.agents/skills', 'claude-code': '.claude/skills', pi: '.agents/skills',
};
const localDestinations = root => Object.fromEntries(Object.entries(projectDirectories).map(([agent, directory]) => [agent, path.join(root, directory, skill)]));
const localPaths = root => [...new Set(Object.values(localDestinations(root)))];
const globalPaths = root => ['.codex/skills', '.config/opencode/skills', '.gemini/config/skills', '.kiro/skills', '.cursor/skills', '.kilo/skills', '.copilot/skills', '.claude/skills', '.pi/agent/skills'].map(directory => path.join(root, directory, skill));

test('native installation copies the complete skill for every agent and scope selection', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const scope of ['project', 'global']) for (const agent of [...agents, 'all']) {
      const root = path.join(workspace.root, `${scope}-${agent}`);
      await fs.mkdir(root);
      const report = await install({ agent, ...(scope === 'project' ? { project: root } : { global: true }) }, { home: root, env: {} });
      assert.equal(report.exitCode, 0);
      assert.deepEqual(report.installations.map(i => i.agent), agent === 'all' ? agents : [agent]);
      const expectedPaths = scope === 'project' ? localDestinations(root) : Object.fromEntries(agents.map((name, index) => [name, globalPaths(root)[index]]));
      for (const target of report.installations) {
        assert.equal(target.scope, scope);
        assert.equal(await fs.realpath(target.path), await fs.realpath(expectedPaths[target.agent]));
        assert.deepEqual(snapshot(target.path), snapshot(packageRoot));
      }
      if (scope === 'project' && agent === 'all') assert.equal(new Set(report.installations.map(i => i.path)).size, 4);
    }
  } finally { workspace.cleanup(); }
}, 20000);

test('global CLI installation honors environment overrides under Node and Bun', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const root = path.join(workspace.root, runtime);
      await fs.mkdir(root);
      const codex = path.join(root, 'codex config');
      const config = path.join(root, 'xdg config');
      const home = path.join(root, 'user home');
      const claude = path.join(root, 'claude config');
      const pi = path.join(root, 'pi config');
      const env = { ...process.env, CODEX_HOME: codex, XDG_CONFIG_HOME: config, CLAUDE_CONFIG_DIR: claude, PI_CODING_AGENT_DIR: pi, HOME: home, USERPROFILE: home, BUN_RUNTIME_TRANSPILER_CACHE_PATH: path.join(workspace.root, '.runtime-cache', runtime) };
      const resolvedHome = spawnSync(runtime, ['-e', "console.log(require('node:os').homedir())"], { env, encoding: 'utf8' });
      assert.equal(resolvedHome.status, 0, resolvedHome.stderr);
      assert.equal(path.resolve(resolvedHome.stdout.trim()), home, 'Global tests must use an isolated home');
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--global', '--format', 'json'], {
        cwd: root, env, encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.equal(report.operation, 'install');
      // Windows can spell the same temp directory as RUNNER~1 or runneradmin.
      const expected = globalPaths(home);
      expected[0] = path.join(codex, 'skills', skill);
      expected[1] = path.join(config, 'opencode/skills', skill);
      expected[agents.indexOf('claude-code')] = path.join(claude, 'skills', skill);
      expected[agents.indexOf('pi')] = path.join(pi, 'skills', skill);
      assert.deepEqual(await Promise.all(report.installations.map(i => fs.realpath(i.path))), await Promise.all(expected.map(destination => fs.realpath(destination))));
      for (const target of report.installations) assert.deepEqual(snapshot(target.path), snapshot(packageRoot));
      const before = snapshot(root);
      const repeat = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--global', '--format', 'json'], {
        cwd: root, env, encoding: 'utf8',
      });
      assert.equal(repeat.status, 2);
      assert.equal(JSON.parse(repeat.stdout).completion, 'partial');
      assert.deepEqual(snapshot(root), before);
      for (const destination of localPaths(root)) await assert.rejects(fs.stat(destination), { code: 'ENOENT' });
    }
  } finally { workspace.cleanup(); }
});

test('bare install targets the working project and preserves global installations under Node and Bun', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const root = path.join(workspace.root, runtime);
      const project = path.join(root, 'project');
      const profile = path.join(root, 'profile');
      const codex = path.join(profile, 'codex');
      const config = path.join(profile, 'config');
      const env = { ...process.env, CODEX_HOME: codex, XDG_CONFIG_HOME: config, CLAUDE_CONFIG_DIR: path.join(profile, '.claude'), PI_CODING_AGENT_DIR: path.join(profile, '.pi/agent'), HOME: profile, USERPROFILE: profile, BUN_RUNTIME_TRANSPILER_CACHE_PATH: path.join(workspace.root, '.runtime-cache', runtime) };
      await fs.mkdir(project, { recursive: true });
      const globalDestinations = globalPaths(profile);
      globalDestinations[0] = path.join(codex, 'skills', skill);
      globalDestinations[1] = path.join(config, 'opencode/skills', skill);
      for (const destination of globalDestinations) {
        await fs.mkdir(destination, { recursive: true });
        await fs.writeFile(path.join(destination, 'SKILL.md'), 'Preserve global customization');
      }
      const profileBefore = snapshot(profile);
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--format', 'json'], {
        cwd: project, env, encoding: 'utf8',
      });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.equal(report.project, await fs.realpath(project));
      assert.deepEqual(report.installations.map(i => i.agent), agents);
      assert.ok(report.installations.every(i => i.scope === 'project'));
      assert.equal(report.installations[0].path, report.installations[2].path);
      for (const destination of localPaths(project)) assert.deepEqual(snapshot(destination), snapshot(packageRoot));
      assert.deepEqual(snapshot(profile), profileBefore);
      const beforeRepeat = snapshot(root);
      const repeat = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--format', 'json'], {
        cwd: project, env, encoding: 'utf8',
      });
      assert.equal(repeat.status, 2);
      assert.deepEqual(snapshot(root), beforeRepeat);
    }
  } finally { workspace.cleanup(); }
});

test('all-agent preflight preserves existing destinations before writing any target', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const scope of ['project', 'global']) for (const agent of agents.slice(1)) for (const kind of ['file', 'directory']) {
      const root = path.join(workspace.root, `${scope}-${agent}-${kind}`);
      const conflict = scope === 'project' ? localDestinations(root)[agent] : globalPaths(root)[agents.indexOf(agent)];
      await fs.mkdir(path.dirname(conflict), { recursive: true });
      if (kind === 'file') await fs.writeFile(conflict, 'Preserve this file');
      else { await fs.mkdir(conflict); await fs.writeFile(path.join(conflict, 'custom.md'), 'Preserve local changes'); }
      const before = snapshot(root);
      await assert.rejects(install(scope === 'project' ? { project: root } : { global: true }, { home: root, env: {} }), /already exists/);
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
    for (const agent of agents) for (const kind of ['target', 'broken', 'parent']) {
      const root = path.join(workspace.root, `${agent}-${kind}`);
      await fs.mkdir(root);
      const link = kind === 'parent' ? path.join(root, projectDirectories[agent].split('/')[0]) : localDestinations(root)[agent];
      await fs.mkdir(path.dirname(link), { recursive: true });
      await fs.symlink(kind === 'broken' ? path.join(workspace.root, 'missing') : outside, link, process.platform === 'win32' ? 'junction' : 'dir');
      links.push(link);
      const before = snapshot(root);
      await assert.rejects(install({ project: root, agent }), /already exists|escapes/);
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

test('Antigravity selection installs natively under Node and Bun without writing legacy directories', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const root = path.join(workspace.root, runtime);
      await fs.mkdir(root);
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--antigravity', '--format', 'json'], { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.deepEqual(report.installations.map(i => i.agent), ['antigravity']);
      assert.deepEqual(snapshot(localPaths(root)[0]), snapshot(packageRoot));
      for (const unused of ['.agent', '.gemini', '.opencode', '.kiro', '.claude']) await assert.rejects(fs.lstat(path.join(root, unused)), { code: 'ENOENT' });
    }
  } finally { workspace.cleanup(); }
});

test('Kiro CLI selection preserves custom agents and steering under Node and Bun', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) {
      const root = path.join(workspace.root, runtime);
      const configuration = {
        'agents/reviewer.json': JSON.stringify({ name: 'reviewer', resources: ['file://docs/product.md'] }),
        'steering/product.md': '# Product\nKeep the existing product decisions.\n',
      };
      for (const [file, content] of Object.entries(configuration)) {
        const destination = path.join(root, '.kiro', file);
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, content);
      }
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--kiro', '--format', 'json'], { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.deepEqual(report.installations.map(i => [i.agent, i.scope]), [['kiro', 'project']]);
      assert.equal(await fs.realpath(report.installations[0].path), await fs.realpath(localPaths(root)[2]));
      assert.deepEqual(snapshot(report.installations[0].path), snapshot(packageRoot));
      for (const [file, content] of Object.entries(configuration)) assert.equal(await fs.readFile(path.join(root, '.kiro', file), 'utf8'), content);
      for (const unused of ['.agents', '.opencode', '.gemini']) await assert.rejects(fs.lstat(path.join(root, unused)), { code: 'ENOENT' });
      const before = snapshot(root);
      const repeated = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', '--kiro', '--format', 'json'], { cwd: root, encoding: 'utf8' });
      assert.equal(repeated.status, 2);
      assert.deepEqual(snapshot(root), before);
    }
  } finally { workspace.cleanup(); }
});

test('canonical aliases share one copy while retaining each selected agent in the report', async () => {
  const workspace = temporaryWorkspace();
  const alias = path.join(workspace.root, 'codex-alias');
  try {
    const config = path.join(workspace.root, '.gemini/config');
    await fs.mkdir(config, { recursive: true });
    await fs.symlink(config, alias, process.platform === 'win32' ? 'junction' : 'dir');
    const report = await install({ global: true }, { home: workspace.root, env: { CODEX_HOME: alias, XDG_CONFIG_HOME: path.join(workspace.root, 'xdg') } });
    assert.equal(report.installations.length, 9);
    assert.equal(report.installations[0].path, report.installations[2].path);
    assert.equal(new Set(report.installations.map(i => i.path)).size, 8);
    assert.deepEqual(snapshot(report.installations[2].path), snapshot(packageRoot));
    const before = snapshot(workspace.root);
    await assert.rejects(install({ agent: 'antigravity', global: true }, { home: workspace.root, env: {} }), /already exists/);
    assert.deepEqual(snapshot(workspace.root), before);
  } finally { await fs.unlink(alias).catch(() => {}); workspace.cleanup(); }
});

test('new agent selections preserve host configuration and install only the requested target under Node and Bun', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const runtime of ['node', 'bun']) for (const agent of ['cursor', 'kilo', 'copilot', 'claude-code', 'pi']) {
      const root = path.join(workspace.root, runtime, agent);
      const configuration = {
        '.cursor/rules/product.mdc': '# Product\nPreserve the current brand.\n',
        'kilo.jsonc': '{"skills":{"paths":[]}}\n',
        '.github/copilot-instructions.md': 'Preserve the existing product behavior.\n',
        '.claude/settings.json': '{"permissions":{"deny":["Bash(deploy:*)"]}}\n',
        '.pi/settings.json': '{"enableSkillCommands":true}\n',
      };
      for (const [file, content] of Object.entries(configuration)) {
        await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true });
        await fs.writeFile(path.join(root, file), content);
      }
      const result = spawnSync(runtime, [path.join(repository, 'bin/flawless-ui-ux.js'), 'install', `--${agent}`, '--project', root, '--format', 'json'], { cwd: workspace.root, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const report = JSON.parse(result.stdout);
      assert.deepEqual(report.installations.map(i => [i.agent, i.scope]), [[agent, 'project']]);
      const expected = localDestinations(root)[agent];
      assert.equal(await fs.realpath(report.installations[0].path), await fs.realpath(expected));
      assert.deepEqual(snapshot(expected), snapshot(packageRoot));
      for (const [file, content] of Object.entries(configuration)) assert.equal(await fs.readFile(path.join(root, file), 'utf8'), content);
      for (const destination of localPaths(root).filter(destination => destination !== expected)) await assert.rejects(fs.lstat(destination), { code: 'ENOENT' });
    }
  } finally { workspace.cleanup(); }
}, 20000);

test('Claude Code and Pi global configuration overrides expand the isolated home', async () => {
  const workspace = temporaryWorkspace();
  try {
    for (const [agent, variable] of [['claude-code', 'CLAUDE_CONFIG_DIR'], ['pi', 'PI_CODING_AGENT_DIR']]) for (const mode of ['absolute', 'home', 'nested-home']) {
      const root = path.join(workspace.root, `${agent}-${mode}`);
      await fs.mkdir(root);
      const configured = mode === 'absolute' ? path.join(root, 'custom config') : mode === 'home' ? '~' : '~/custom config';
      const expected = path.join(root, ...(mode === 'home' ? [] : ['custom config']), 'skills', skill);
      const report = await install({ agent, global: true }, { home: root, env: { [variable]: configured } });
      assert.deepEqual(report.installations.map(i => [i.agent, i.scope]), [[agent, 'global']]);
      assert.equal(await fs.realpath(report.installations[0].path), await fs.realpath(expected));
      assert.deepEqual(snapshot(expected), snapshot(packageRoot));
      for (const destination of localPaths(root).filter(destination => destination !== expected)) await assert.rejects(fs.stat(destination), { code: 'ENOENT' });
    }
  } finally { workspace.cleanup(); }
});

test('failure at a later global target rolls back the earlier copies', async () => {
  const workspace = temporaryWorkspace();
  const copy = fs.cp;
  try {
    for (const agent of ['antigravity', 'kiro', 'pi']) {
      const root = path.join(workspace.root, agent);
      await fs.mkdir(root);
      const homeAlias = path.join(workspace.root, `${agent}-home`);
      await fs.symlink(root, homeAlias, process.platform === 'win32' ? 'junction' : 'dir');
      // Resolve the home alias and Windows short paths before matching a copy.
      const failedDestination = globalPaths(await fs.realpath(homeAlias))[agents.indexOf(agent)];
      const failure = spyOn(fs, 'cp').mockImplementation(async (...args) => {
        const destination = await fs.realpath(path.dirname(args[1]));
        if (path.relative(failedDestination, destination) === '') throw new Error('Simulated later-target copy failure');
        return copy(...args);
      });
      try {
        await assert.rejects(install({ global: true }, { home: homeAlias, env: {} }), /Simulated later-target copy failure/);
        for (const destination of globalPaths(root)) await assert.rejects(fs.lstat(destination), { code: 'ENOENT' });
      } finally { failure.mockRestore(); await fs.unlink(homeAlias); }
    }
  } finally { workspace.cleanup(); }
});

test('invalid selections, unavailable project roots, and overlapping global paths do not install', async () => {
  for (const args of [
    ['install', '--codex', '--opencode'], ['install', '--all-agents', '--codex'],
    ['install', '--global', '--project', '.'], ['install', '--project'],
    ['install', '--codex', '--codex'], ['install', '--url', 'http://localhost'],
    ['install', '--antigravity', '--codex'], ['install', '--all-agents', '--antigravity'],
    ['install', '--kiro', '--codex'], ['install', '--kiro', '--opencode'],
    ['install', '--kiro', '--antigravity'], ['install', '--all-agents', '--kiro'], ['install', '--kiro', '--kiro'],
  ]) assert.throws(() => parse(args));
  assert.equal(parse(['install']).options.agent, 'all');
  assert.notEqual(parse(['install']).options.global, true);
  assert.equal(parse(['install', '--global']).options.global, true);
  assert.equal(parse(['install', '--antigravity']).options.agent, 'antigravity');
  assert.equal(parse(['install', '--kiro']).options.agent, 'kiro');
  for (const agent of agents) {
    assert.equal(parse(['install', `--${agent}`]).options.agent, agent);
    assert.throws(() => parse(['install', `--${agent}`, '--all-agents']));
    for (const other of agents) assert.throws(() => parse(['install', `--${agent}`, `--${other}`]));
  }
  assert.equal(parse(['install', '--help']).operation, 'help');
  const workspace = temporaryWorkspace();
  try {
    await assert.rejects(install({ project: path.join(workspace.root, 'missing') }), { code: 'ENOENT' });
    const codexHome = path.join(workspace.root, 'codex');
    await assert.rejects(install({ global: true }, { env: { CODEX_HOME: codexHome, XDG_CONFIG_HOME: path.join(codexHome, 'skills', skill) }, home: workspace.root }), /overlap/);
    await assert.rejects(install({ global: true }, { env: { CODEX_HOME: codexHome, XDG_CONFIG_HOME: path.join(workspace.root, '.gemini/config/skills', skill) }, home: workspace.root }), /overlap/);
    await assert.rejects(install({ global: true }, { env: { CODEX_HOME: codexHome, XDG_CONFIG_HOME: path.join(workspace.root, '.kiro/skills', skill) }, home: workspace.root }), /overlap/);
    await assert.rejects(install({ global: true }, { env: { PI_CODING_AGENT_DIR: path.join(workspace.root, '.claude/skills', skill) }, home: workspace.root }), /overlap/);
    assert.deepEqual(await fs.readdir(workspace.root), []);
  } finally { workspace.cleanup(); }
});
