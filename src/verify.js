import fs from 'node:fs/promises';
import path from 'node:path';
import { inspect } from './inspect.js';
import { readFlow } from './flow.js';
import { validateInspection } from './options.js';
import { projectRoot, VERSION, CHECK_VERSION, finish, reserveOutput, saveReport, finding } from './shared.js';

export async function verify(options) {
  const stat = await fs.stat(options.baseline);
  if (stat.size > 20 * 1024 * 1024) throw new Error('Baseline exceeds 20 MiB.');
  let baseline = JSON.parse(await fs.readFile(options.baseline, 'utf8'));
  const legacy = baseline.schemaVersion === 1 && baseline.checkVersion === 1 && /^1\./.test(baseline.toolVersion);
  if ((!legacy && (baseline.schemaVersion !== 2 || baseline.toolVersion !== VERSION || baseline.checkVersion !== CHECK_VERSION)) || !['inspect', 'verify'].includes(baseline.operation) || baseline.completion !== 'complete') throw new Error('Baseline is incomplete or incompatible. Use a complete supported run.');
  if (typeof baseline.project !== 'string' || await projectRoot(baseline.project) !== baseline.project) throw new Error('Baseline project identity changed.');
  const identity = await fs.stat(baseline.project);
  if (JSON.stringify(baseline.projectIdentity) !== JSON.stringify({ device: identity.dev, inode: identity.ino, created: identity.birthtimeMs })) throw new Error('Baseline project directory identity changed.');
  let scope = baseline.scope;
  if (!scope || !Array.isArray(scope.sources) || scope.sources.some(s => typeof s !== 'string') || !Array.isArray(scope.viewports) || !Array.isArray(baseline.findings) || !Array.isArray(baseline.observations) || !Array.isArray(baseline.sources)) throw new Error('Invalid baseline schema.');
  for (const f of baseline.findings) {
    if (!f || typeof f.target !== 'string' || typeof f.checkId !== 'string' || !f.conditions || !['confirmed', 'needs-review'].includes(f.status) || !['error', 'warning'].includes(f.severity) || f.fingerprint !== finding(f.checkId, f.target, '', { conditions: f.conditions }).fingerprint) throw new Error('Invalid baseline finding or fingerprint.');
  }
  for (const source of baseline.sources) if (typeof source.path !== 'string' || !scope.sources.includes(source.path) || !/^[a-f0-9]{64}$/.test(source.hash)) throw new Error('Invalid baseline source.');
  if (!legacy && Object.hasOwn(scope, 'url')) throw new Error('Schema-2 scope uses urls, not url.');
  if (legacy) {
    const surface = scope.url || null;
    baseline = { ...baseline, schemaVersion: 2, scope: { ...scope, urls: surface ? [surface] : [], flow: null, consistency: false },
      findings: baseline.findings.map(f => finding(f.checkId, f.target, f.observation, { ...f, conditions: { ...f.conditions, ...(surface && !f.checkId.startsWith('source.') ? { surface } : {}) } })),
      observations: baseline.observations.map(o => ({ ...o, surface, state: 'initial' })) };
    scope = baseline.scope;
    delete scope.url;
  }
  if (!Array.isArray(scope.urls) || scope.urls.some(url => typeof url !== 'string') || typeof scope.consistency !== 'boolean' ||
      baseline.observations.some(o => !o || typeof o.viewport !== 'string' || typeof o.state !== 'string' || !scope.urls.includes(o.surface) || !Array.isArray(o.completedChecks) || !Array.isArray(o.targets))) throw new Error('Invalid baseline surfaces or observations.');
  if (scope.flow) {
    if (!options.flow) throw new Error('Verify requires an explicit --flow file to authorize replay.');
    const flow = await readFlow(baseline.project, options.flow);
    if (flow.path !== scope.flow.path || flow.hash !== scope.flow.hash) throw new Error('Flow changed. Create a new baseline with the intended flow.');
  } else if (options.flow) throw new Error('Baseline did not include a flow.');
  const configured = options.browserExecutable || (scope.urls.length ? process.env.FLAWLESS_BROWSER_EXECUTABLE : null);
  const executable = configured ? path.resolve(configured) : null;
  // A manifest must never select an executable. Only the caller can select one.
  if ((scope.browserExecutable || null) !== executable) throw new Error('Use the same explicit browser executable as the baseline; manifests cannot select executables.');
  const inspection = validateInspection({ ...scope, project: baseline.project, sources: scope.sources, viewports: scope.viewports, browserExecutable: executable, flow: options.flow });
  const output = await reserveOutput(options.output);
  const report = await inspect(inspection, output, false);
  report.operation = 'verify';
  if (legacy) report.migration = { fromSchemaVersion: 1, toSchemaVersion: 2, interpretation: 'Initial-state observations only; v1 browser fingerprints are rebound to the original URL.' };
  const sameSample = (o, conditions) => o.viewport === conditions.viewport && o.state === (conditions.state || 'initial') && o.surface === conditions.surface;
  report.comparison = { baseline: path.resolve(options.baseline), persistent: [], new: [], noLongerObserved: [], unverified: [] };
  if (report.browser && JSON.stringify(report.browser) !== JSON.stringify(baseline.browser)) { report.coverage.comparison = 'partial'; report.limits.push('Browser engine/version changed; comparison is not equivalent.'); }
  for (const observation of report.observations) {
    const original = baseline.observations.find(o => sameSample(o, observation));
    if (!original || observation.axeVersion !== original.axeVersion || observation.finalUrl !== original.finalUrl) { report.coverage.comparison = 'partial'; report.limits.push('Check engine or final URL changed.'); }
  }
  for (const original of baseline.observations) {
    const current = report.observations.find(o => sameSample(o, original));
    if (!current || original.completedChecks.some(check => !current.completedChecks.includes(check))) {
      report.coverage.comparison = 'partial'; report.limits.push('A baseline surface, state, or check was not re-observed.');
    }
  }
  finish(report);
  const old = new Map(baseline.findings.map(f => [f.fingerprint, f]));
  const current = new Map(report.findings.map(f => [f.fingerprint, f]));
  for (const f of report.findings) {
    report.comparison[old.has(f.fingerprint) ? 'persistent' : 'new'].push(f.fingerprint);
    if (old.get(f.fingerprint)?.status === 'confirmed' && f.status !== 'confirmed') {
      report.coverage.comparison = 'partial';
      report.comparison.unverified.push({ fingerprint: f.fingerprint, target: f.target, checkId: f.checkId, conditions: f.conditions, reason: 'A previously confirmed finding now requires manual review.' });
    }
  }
  for (const f of baseline.findings) if (!current.has(f.fingerprint)) {
    const observation = report.observations.find(o => sameSample(o, f.conditions));
    const incomplete = report.findings.some(n => n.target === f.target && n.checkId === f.checkId && n.conditions.viewport === f.conditions.viewport && n.conditions.state === f.conditions.state && n.conditions.surface === f.conditions.surface && n.status !== 'confirmed');
    const observed = f.checkId.startsWith('source.') ? report.sourceTargets.includes(f.target) : observation?.completedChecks.includes(f.checkId) && (f.target === 'document' || observation.targets.includes(f.target));
    if (observed && !incomplete && report.completion === 'complete') report.comparison.noLongerObserved.push({ fingerprint: f.fingerprint, target: f.target, checkId: f.checkId, conditions: f.conditions, resolution: 'check and target re-observed without the finding' });
    else {
      report.comparison.unverified.push({ fingerprint: f.fingerprint, target: f.target, checkId: f.checkId, conditions: f.conditions, reason: 'Check, target, or equivalent coverage could not be re-observed.' });
      if (f.status === 'confirmed' && f.severity === 'error') report.coverage.comparison = 'partial';
    }
  }
  if (report.comparison.unverified.length) report.limits.push('Some previous findings could not be re-observed; absence alone is not a repair.');
  finish(report);
  return saveReport(report, output);
}
