import fs from 'node:fs/promises';
import path from 'node:path';
import { contextLocations } from './context.js';
import { projectRoot, readSource, VERSION, REPORT_VERSION, finish } from './shared.js';

async function contextDirectory(root) {
  const directory = path.join(root, '.flawless-ui-ux');
  try {
    const entry = await fs.lstat(directory);
    if (!entry.isDirectory() || entry.isSymbolicLink() || path.relative(directory, await fs.realpath(directory)) !== '') {
      throw new Error('Context destination must be a regular project-local directory, not a file or link.');
    }
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  return directory;
}

export async function init(options) {
  const root = await projectRoot(options.project);
  const report = { schemaVersion: REPORT_VERSION, toolVersion: VERSION, operation: 'init', project: root,
    coverage: { initialization: 'completed' }, documents: [], findings: [], limits: [] };
  const pending = [];
  // Preflight both kinds before creating anything. Existing documents are data;
  // readSource enforces the same project/size/link boundaries as context.
  for (const [kind, candidates] of Object.entries(contextLocations)) {
    let found = false;
    for (const candidate of candidates) {
      try { await fs.lstat(path.join(root, candidate)); }
      catch (error) { if (error.code === 'ENOENT') continue; throw error; }
      await readSource(root, candidate);
      report.documents.push({ kind, path: candidate, status: 'reused' });
      found = true;
    }
    if (!found) pending.push({ kind, path: `.flawless-ui-ux/${kind}.md`, template: await fs.readFile(new URL(`../skills/flawless-ui-ux/assets/context/${kind}.md`, import.meta.url), 'utf8') });
  }
  if (pending.length) {
    const directory = await contextDirectory(root);
    try { await fs.mkdir(directory); } catch (error) { if (error.code !== 'EEXIST') throw error; }
    for (const document of pending) {
      try {
        await contextDirectory(root);
        await fs.writeFile(path.join(root, document.path), document.template, { flag: 'wx' });
        report.documents.push({ kind: document.kind, path: document.path, status: 'created' });
      } catch (error) {
        if (error.code === 'EEXIST') {
          try {
            await readSource(root, document.path);
            report.documents.push({ kind: document.kind, path: document.path, status: 'reused' });
            continue;
          } catch (conflict) { error = conflict; }
        }
        report.coverage.initialization = 'partial';
        report.documents.push({ kind: document.kind, path: document.path, status: 'blocked' });
        for (const remaining of pending.slice(pending.indexOf(document) + 1)) report.documents.push({ kind: remaining.kind, path: remaining.path, status: 'not-created' });
        report.limits.push(error.message);
        break;
      }
    }
  }
  report.limits.push('New documents are unfilled Markdown templates. The agent interprets the project, confirms material unknowns, and records facts and design decisions. Existing documents are preserved.');
  return finish(report);
}
