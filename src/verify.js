import fs from 'node:fs/promises';
import path from 'node:path';
import { inspect } from './inspect.js';
import { validateInspection } from './options.js';
import { projectRoot, VERSION, CHECK_VERSION, finish, reserveOutput, saveReport, finding } from './shared.js';

export async function verify(options) {
  const stat = await fs.stat(options.baseline);
  if (stat.size > 20 * 1024 * 1024) throw new Error('Baseline exceeds 20 MiB.');
  const baseline = JSON.parse(await fs.readFile(options.baseline, 'utf8'));
  if (baseline.schemaVersion !== 1 || !['inspect', 'verify'].includes(baseline.operation) || baseline.toolVersion !== VERSION || baseline.checkVersion !== CHECK_VERSION || baseline.completion !== 'complete') throw new Error('Baseline is incomplete or incompatible. Use a complete run from this tool/check version.');
  if (typeof baseline.project !== 'string' || await projectRoot(baseline.project) !== baseline.project) throw new Error('Baseline project identity changed.');
  const identity = await fs.stat(baseline.project);
  if (JSON.stringify(baseline.projectIdentity) !== JSON.stringify({ device: identity.dev, inode: identity.ino, created: identity.birthtimeMs })) throw new Error('Baseline project directory identity changed.');
  const scope = baseline.scope;
  if (!scope || !Array.isArray(scope.sources) || scope.sources.some(s => typeof s !== 'string') || !Array.isArray(scope.viewports) || !Array.isArray(baseline.findings) || !Array.isArray(baseline.observations) || !Array.isArray(baseline.sources)) throw new Error('Invalid baseline schema.');
  for (const f of baseline.findings) {
    if (!f || typeof f.target !== 'string' || typeof f.checkId !== 'string' || !f.conditions || !['confirmed', 'needs-review'].includes(f.status) || !['error', 'warning'].includes(f.severity) || f.fingerprint !== finding(f.checkId, f.target, '', { conditions: f.conditions }).fingerprint) throw new Error('Invalid baseline finding or fingerprint.');
  }
  for (const source of baseline.sources) if (typeof source.path !== 'string' || !scope.sources.includes(source.path) || !/^[a-f0-9]{64}$/.test(source.hash)) throw new Error('Invalid baseline source.');
  const configured = options.browserExecutable || (scope.url ? process.env.FLAWLESS_BROWSER_EXECUTABLE : null);
  const executable = configured ? path.resolve(configured) : null;
  // A manifest must never select an executable. Only the caller can select one.
  if ((scope.browserExecutable || null) !== executable) throw new Error('Use the same explicit browser executable as the baseline; manifests cannot select executables.');
  const inspection = validateInspection({ ...scope, project: baseline.project, sources: scope.sources, viewports: scope.viewports, browserExecutable: executable });
  const output = await reserveOutput(options.output);
  const report = await inspect(inspection, output, false);
  report.operation = 'verify';
  report.comparison = { baseline: path.resolve(options.baseline), persistent: [], new: [], noLongerObserved: [], unverified: [] };
  const old = new Map(baseline.findings.map(f => [f.fingerprint, f]));
  const current = new Map(report.findings.map(f => [f.fingerprint, f]));
  for (const f of report.findings) {
    report.comparison[old.has(f.fingerprint) ? 'persistent' : 'new'].push(f.fingerprint);
    if (old.get(f.fingerprint)?.status === 'confirmed' && f.status !== 'confirmed') {
      report.coverage.comparison = 'partial';
      report.comparison.unverified.push({ fingerprint: f.fingerprint, target: f.target, reason: 'A previously confirmed finding now requires manual review.' });
    }
  }
  for (const f of baseline.findings) if (!current.has(f.fingerprint)) {
    const observation = report.observations.find(o => o.viewport === f.conditions.viewport);
    const incomplete = report.findings.some(n => n.target === f.target && n.checkId === f.checkId && n.conditions.viewport === f.conditions.viewport && n.status !== 'confirmed');
    const observed = f.checkId.startsWith('source.') ? report.sourceTargets.includes(f.target) : observation?.completedChecks.includes(f.checkId) && (f.target === 'document' || observation.targets.includes(f.target));
    if (observed && !incomplete && report.completion === 'complete') report.comparison.noLongerObserved.push({ fingerprint: f.fingerprint, target: f.target, checkId: f.checkId, resolution: 'check and target re-observed without the finding' });
    else {
      report.comparison.unverified.push({ fingerprint: f.fingerprint, target: f.target, reason: 'Check, target, or equivalent coverage could not be re-observed.' });
      if (f.status === 'confirmed' && f.severity === 'error') report.coverage.comparison = 'partial';
    }
  }
  if (report.browser && JSON.stringify(report.browser) !== JSON.stringify(baseline.browser)) { report.coverage.comparison = 'partial'; report.limits.push('Browser engine/version changed; comparison is not equivalent.'); }
  for (const observation of report.observations) {
    const original = baseline.observations.find(o => o.viewport === observation.viewport);
    if (!original || observation.axeVersion !== original.axeVersion || observation.finalUrl !== original.finalUrl) { report.coverage.comparison = 'partial'; report.limits.push('Check engine or final URL changed.'); }
  }
  if (report.comparison.unverified.length) report.limits.push('Some previous findings could not be re-observed; absence alone is not a repair.');
  finish(report);
  return saveReport(report, output);
}
