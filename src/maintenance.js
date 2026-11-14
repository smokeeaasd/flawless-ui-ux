import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { installationTargets } from './install.js';
import { bundledSkill, installationRecord, readInstallation, differences, treeHashes, writeInstallationRecord } from './installation-record.js';
import { VERSION, within } from './shared.js';

const legacy = JSON.parse(await fs.readFile(new URL('./installation-baselines.json', import.meta.url), 'utf8'));
const newerVersion = version => {
  if (!version) return false;
  const installed = version.split('-')[0].split('.').map(Number), running = VERSION.split('-')[0].split('.').map(Number);
  for (let index = 0; index < 3; index++) if (installed[index] !== running[index]) return installed[index] > running[index];
  return false;
};

async function inventory(options, runtime) {
  const plan = await installationTargets(options, runtime);
  const current = await installationRecord(bundledSkill, VERSION);
  const copies = [];
  for (const target of plan.targets) {
    const existing = copies.find(copy => path.relative(copy.path, target.path) === '');
    if (existing) { existing.agents.push(target.agent); continue; }
    const copy = { path: target.path, agents: [target.agent], scope: plan.project ? 'project' : 'global', status: 'missing' };
    copies.push(copy);
    try {
      const identity = await fs.lstat(target.path);
      if (identity.isSymbolicLink()) throw new Error('Installation root is a link.');
      const real = await fs.realpath(target.path);
      if (plan.project && !within(plan.project, real)) throw new Error('Installation path leaves the project.');
      // Real paths can differ in spelling (including Windows short names) without
      // being links. Use the same physical destination as the installer.
      const duplicate = copies.find(other => other !== copy && path.relative(other.path, real) === '');
      if (duplicate) { duplicate.agents.push(...copy.agents); copies.pop(); continue; }
      copy.path = real;
      const installed = await readInstallation(real, current, legacy);
      Object.assign(copy, installed, { status: !installed.managed ? 'unmanaged' : installed.modified.length ? 'modified' : newerVersion(installed.version) ? 'newer' : differences(installed.files, current.files).length ? 'different' : 'current', changes: differences(installed.files, current.files) });
    } catch (error) {
      if (error.code !== 'ENOENT' || copy.files) { copy.status = 'blocked'; copy.reason = error.message; }
      else {
        // Distinguish a missing destination from a broken root link.
        try { await fs.lstat(target.path); copy.status = 'blocked'; copy.reason = 'Installation is a broken link.'; }
        catch (missing) { if (missing.code !== 'ENOENT') { copy.status = 'blocked'; copy.reason = missing.message; } }
      }
    }
  }
  return { project: plan.project, copies, current };
}

function publicCopies(copies) {
  return copies.map(({ files, managed, ...copy }) => copy);
}

function report(operation, project, copies, limits, exitCode = 0) {
  return { schemaVersion: 2, toolVersion: VERSION, operation, project, completion: exitCode === 2 ? 'partial' : 'complete',
    coverage: { installation: exitCode === 2 ? 'partial' : 'completed' }, installations: publicCopies(copies), findings: [], limits, exitCode };
}

export async function update(options, runtime = {}) {
  const { project, copies, current } = await inventory(options, runtime);
  const blocked = copies.filter(copy => ['modified', 'blocked', 'unmanaged', 'newer'].includes(copy.status));
  if (blocked.length) return report('update', project, copies, ['No installations changed. Modified, linked, unreadable, unrecognized, or newer copies require manual reconciliation. Keep your edits; use a current package for newer copies.'], 2);
  const candidates = copies.filter(copy => copy.status !== 'missing');
  for (let i = 0; i < candidates.length; i++) for (let j = i + 1; j < candidates.length; j++) {
    if (within(candidates[i].path, candidates[j].path) || within(candidates[j].path, candidates[i].path)) throw new Error('Agent installation destinations overlap.');
  }
  if (options.dryRun) return { ...report('update', project, copies, ['Preview only. The running package supplies the skill; no registry download is performed.']), dryRun: true };
  const prepared = [];
  try {
    for (const copy of candidates) {
      // Even unchanged legacy copies receive a record, making subsequent edits detectable.
      const workspace = await fs.mkdtemp(path.join(path.dirname(copy.path), '.flawless-update-'));
      const entry = { copy, workspace, staged: path.join(workspace, 'next'), backup: path.join(workspace, 'previous'), moved: false, swapped: false };
      prepared.push(entry);
      entry.identity = await fs.lstat(copy.path);
      await fs.cp(bundledSkill, entry.staged, { recursive: true, errorOnExist: true, force: false });
      await writeInstallationRecord(entry.staged, current);
    }
    for (const entry of prepared) {
      const identity = await fs.lstat(entry.copy.path);
      if (identity.isSymbolicLink() || identity.dev !== entry.identity.dev || identity.ino !== entry.identity.ino ||
          await fs.realpath(entry.copy.path) !== entry.copy.path || differences(entry.copy.files, await treeHashes(entry.copy.path)).length) throw new Error('Installation changed after preflight.');
      await fs.rename(entry.copy.path, entry.backup);
      entry.moved = true;
      await fs.rename(entry.staged, entry.copy.path);
      entry.swapped = true;
    }
  } catch (error) {
    const failures = [];
    for (const entry of [...prepared].reverse()) {
      try {
        if (entry.swapped) await fs.rename(entry.copy.path, entry.staged);
        if (entry.moved) await fs.rename(entry.backup, entry.copy.path);
      } catch (failure) { failures.push(`${entry.workspace}: ${failure.message}`); }
    }
    if (!failures.length) for (const entry of prepared) await cleanup(entry.workspace);
    throw new Error(`Update failed: ${error.message}. ${failures.length ? `Recovery files retained: ${failures.join('; ')}` : 'Original installations preserved.'}`);
  }
  const limits = ['Updated copies use the skill bundled with the running package. Missing installations are skipped. Restart agent sessions if discovery needs refreshing.'];
  for (const entry of prepared) {
    entry.copy.status = entry.copy.changes.length ? 'updated' : 'current';
    entry.copy.version = VERSION;
    try { await cleanup(entry.workspace); }
    catch (error) { limits.push(`Update succeeded; backup cleanup required at ${entry.workspace}: ${error.message}`); }
  }
  return report('update', project, copies, limits);
}

async function cleanup(directory) {
  const real = await fs.realpath(directory), stat = await fs.lstat(directory);
  if (real !== directory || stat.isSymbolicLink() || !stat.isDirectory() || !path.basename(real).startsWith('.flawless-update-')) throw new Error('Refusing cleanup of an unexpected update directory.');
  await fs.rm(real, { recursive: true });
}

export async function doctor(options, runtime = {}) {
  const local = options.global ? null : await inventory({ ...options, global: false }, runtime);
  const global = await inventory({ ...options, global: true }, runtime);
  const copies = [...(local?.copies || []), ...global.copies];
  const selected = options.browserExecutable || (runtime.env || process.env).FLAWLESS_BROWSER_EXECUTABLE;
  const browser = { status: 'unavailable', executable: null, version: null };
  let instance;
  try {
    const { chromium } = await import('playwright');
    browser.executable = selected ? path.resolve(selected) : chromium.executablePath();
    await fs.access(browser.executable);
    instance = await chromium.launch({ headless: true, executablePath: browser.executable, timeout: 10000 });
    browser.status = 'available'; browser.version = instance.version();
  } catch (error) { browser.reason = error.message; }
  finally { if (instance) await instance.close(); }
  const require = createRequire(import.meta.url);
  const dependencies = Object.fromEntries(['playwright', '@axe-core/playwright'].map(name => {
    try { return [name, JSON.parse(require('node:fs').readFileSync(require.resolve(`${name}/package.json`), 'utf8')).version]; }
    catch { return [name, null]; }
  }));
  const limits = ['Checks installation files and browser launch only. Agent discovery, trust, active skill loading, and native rendering are not verified. No browser download or configuration changes are performed.'];
  const divergent = new Set(copies.filter(copy => copy.files).map(copy => JSON.stringify(copy.files))).size > 1;
  if (divergent) limits.push('Installed copies differ. Check project/global precedence in your agent before updating.');
  return { ...report('doctor', local?.project || null, copies, limits, copies.some(copy => ['blocked', 'modified', 'unmanaged'].includes(copy.status)) ? 2 : 0),
    runtime: { node: process.versions.node, bun: process.versions.bun || null, platform: process.platform, dependencies }, browser, divergent };
}
