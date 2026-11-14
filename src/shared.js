import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const VERSION = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version;
export const CHECK_VERSION = 2;
export const REPORT_VERSION = 2;
export const hash = value => createHash('sha256').update(value).digest('hex');
export const excluded = /(^|[/\\])(node_modules|\.git|dist|build|coverage|\.next|\.aws|\.ssh|\.codex|\.agents|\.npmrc|\.env[^/\\]*|[^/\\]*\.(pem|key)|(?:credentials|secrets)[^/\\]*)([/\\]|$)/i;
export function within(root, target) {
  const relative = path.relative(root, target);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}
export async function projectRoot(input = '.') {
  const root = await fs.realpath(input);
  if (!(await fs.stat(root)).isDirectory()) throw new Error('Project must be a directory.');
  return root;
}
export async function sourcePath(root, input) {
  if (path.isAbsolute(input) || excluded.test(input)) throw new Error(`Source is outside the allowed scope: ${input}`);
  const candidate = path.resolve(root, input);
  if (!within(root, candidate)) throw new Error(`Source escapes the project: ${input}`);
  const real = await fs.realpath(candidate);
  if (!within(root, real) || excluded.test(path.relative(root, real))) throw new Error(`Source resolves outside the allowed scope: ${input}`);
  return real;
}
export async function readSource(root, input) {
  const file = await sourcePath(root, input);
  const stat = await fs.stat(file);
  if (!stat.isFile() || stat.size > 1024 * 1024) throw new Error(`Source must be a file of at most 1 MiB: ${input}`);
  const bytes = await fs.readFile(file);
  if (bytes.includes(0)) throw new Error(`Binary source is unsupported: ${input}`);
  return { path: input.replaceAll('\\', '/'), hash: hash(bytes), text: bytes.toString('utf8') };
}
export function finding(checkId, target, observation, options = {}) {
  const conditions = options.conditions || {};
  return {
    checkId, category: options.category || 'presentation', severity: options.severity || 'warning',
    status: options.status || 'needs-review', target, observation, conditions,
    basis: options.basis || { type: 'heuristic', reference: 'Contextual review; not a conformance failure.' },
    recommendation: options.recommendation || 'Review in the product context before changing the interface.',
    evidence: options.evidence || {},
    fingerprint: hash(JSON.stringify([checkId, target, conditions.state || 'initial', conditions.viewport || null, ...(conditions.surface ? [conditions.surface] : [])])),
  };
}
export function finish(report) {
  report.completion = Object.values(report.coverage).some(value => value === 'partial') ? 'partial' : 'complete';
  report.exitCode = report.completion === 'partial' ? 2 : report.findings.some(f => f.status === 'confirmed' && f.severity === 'error') ? 1 : 0;
  return report;
}
export async function reserveOutput(output) {
  if (!output) return null;
  const directory = path.resolve(output);
  // Exclusive creation preserves even an existing empty directory.
  await fs.mkdir(directory);
  return directory;
}
export async function saveReport(report, output, options = {}) {
  if (output) {
    if (options.html) {
      const { writeHtmlReport } = await import('./html-report.js');
      report.artifacts.html = await writeHtmlReport(report, output);
    }
    report.artifacts.manifest = path.join(output, 'run.json');
    await fs.writeFile(report.artifacts.manifest, `${JSON.stringify(report, null, 2)}\n`, { flag: 'wx' });
  }
  return report;
}
