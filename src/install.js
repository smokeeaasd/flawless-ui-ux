import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { projectRoot, within, VERSION } from './shared.js';

const skillName = 'flawless-ui-ux';
const bundledSkill = fileURLToPath(new URL('../skills/flawless-ui-ux/', import.meta.url));

// Resolve the nearest existing parent before writing. Project installs cannot
// escape through an existing directory symlink or junction.
async function destinationPath(destination, project) {
  try {
    await fs.lstat(destination);
    throw new Error(`Installation already exists: ${destination}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  let parent = path.dirname(destination);
  while (true) {
    try {
      await fs.lstat(parent);
      if (!(await fs.stat(parent)).isDirectory()) throw new Error(`Installation parent is not a directory: ${parent}`);
      const real = await fs.realpath(parent);
      if (project && !within(project, real)) throw new Error(`Installation parent escapes the project: ${parent}`);
      return path.join(real, path.relative(parent, destination));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      // An existing broken link is a conflict, not a missing parent to create.
      try { await fs.lstat(parent); throw new Error(`Installation parent is a broken link: ${parent}`); }
      catch (linkError) { if (linkError.code !== 'ENOENT') throw linkError; }
      const next = path.dirname(parent);
      if (next === parent) throw new Error(`No usable installation parent: ${destination}`);
      parent = next;
    }
  }
}

async function rollback(created) {
  const errors = [];
  for (const entry of [...created].reverse()) {
    try {
      const current = await fs.lstat(entry.path);
      const real = await fs.realpath(entry.path);
      // Recursive removal is limited to the exact directory allocated by this
      // invocation, with its identity unchanged and no root symlink followed.
      if (!current.isDirectory() || current.isSymbolicLink() || real !== entry.path ||
          current.dev !== entry.device || current.ino !== entry.inode ||
          path.basename(real) !== skillName || !within(path.dirname(entry.path), real)) {
        throw new Error('Directory identity changed; manual cleanup is required.');
      }
      await fs.rm(real, { recursive: true, force: true });
    } catch (error) { errors.push(`${entry.path}: ${error.message}`); }
  }
  return errors;
}

export async function install(options, runtime = {}) {
  const env = runtime.env || process.env;
  const home = runtime.home || os.homedir();
  const project = options.global ? null : await projectRoot(options.project || '.');
  const agent = options.agent || 'all';
  if (!['all', 'codex', 'opencode', 'antigravity', 'kiro'].includes(agent)) throw new Error('Unknown installation agent.');
  if (!(await fs.stat(path.join(bundledSkill, 'SKILL.md'))).isFile()) throw new Error('The package does not contain an installable skill.');
  const entries = await fs.readdir(bundledSkill);
  const candidates = [
    { agent: 'codex', path: project ? path.join(project, '.agents', 'skills', skillName) : path.resolve(env.CODEX_HOME || path.join(home, '.codex'), 'skills', skillName) },
    { agent: 'opencode', path: project ? path.join(project, '.opencode', 'skills', skillName) : path.resolve(env.XDG_CONFIG_HOME || path.join(home, '.config'), 'opencode', 'skills', skillName) },
    { agent: 'antigravity', path: project ? path.join(project, '.agents', 'skills', skillName) : path.join(home, '.gemini', 'config', 'skills', skillName) },
    { agent: 'kiro', path: path.join(project || home, '.kiro', 'skills', skillName) },
  ].filter(target => agent === 'all' || target.agent === agent);
  // Preflight every target before creating any installation directories.
  const targets = [];
  for (const candidate of candidates) targets.push({ ...candidate, path: await destinationPath(candidate.path, project) });
  // Multiple agents may discover the same physical skill directory.
  const uniqueTargets = [];
  for (const target of targets) if (!uniqueTargets.some(existing => path.relative(existing.path, target.path) === '')) uniqueTargets.push(target);
  for (let i = 0; i < uniqueTargets.length; i++) for (let j = i + 1; j < uniqueTargets.length; j++) {
    if (within(uniqueTargets[i].path, uniqueTargets[j].path) || within(uniqueTargets[j].path, uniqueTargets[i].path)) throw new Error('Agent installation destinations overlap. Check the selected configuration paths.');
  }
  const created = [];
  try {
    for (const target of uniqueTargets) {
      await fs.mkdir(path.dirname(target.path), { recursive: true });
      // Exclusive mkdir also preserves a destination created after preflight.
      await fs.mkdir(target.path);
      const identity = await fs.lstat(target.path);
      created.push({ path: target.path, device: identity.dev, inode: identity.ino });
      for (const entry of entries) await fs.cp(path.join(bundledSkill, entry), path.join(target.path, entry), { recursive: true, force: false, errorOnExist: true, verbatimSymlinks: true });
    }
  } catch (error) {
    const cleanup = await rollback(created);
    throw new Error(`Installation failed: ${error.message}${cleanup.length ? ` Cleanup incomplete: ${cleanup.join('; ')}` : ' Newly created skill directories were removed; empty parent directories may remain.'}`);
  }
  return {
    schemaVersion: 1, toolVersion: VERSION, operation: 'install', project,
    completion: 'complete', coverage: { installation: 'completed' },
    installations: targets.map(target => ({ ...target, scope: project ? 'project' : 'global' })),
    findings: [], limits: [], exitCode: 0,
  };
}
