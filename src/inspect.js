import { inspectSources } from './source.js';
import { inspectBrowser } from './browser.js';
import { projectRoot, VERSION, CHECK_VERSION, finish, reserveOutput, saveReport } from './shared.js';
import fs from 'node:fs/promises';

export async function inspect(options, reservedOutput, persist = true) {
  const root = await projectRoot(options.project);
  const output = reservedOutput === undefined ? await reserveOutput(options.output) : reservedOutput;
  const identity = await fs.stat(root);
  const scope = { sources: options.sources || [], url: options.url || null, selector: options.selector || null,
    viewports: options.url ? options.viewports : [], timeout: options.timeout,
    browserExecutable: options.url ? options.browserExecutable || null : null };
  const report = { schemaVersion: 1, operation: 'inspect', toolVersion: VERSION, checkVersion: CHECK_VERSION,
    timestamp: new Date().toISOString(), project: root, projectIdentity: { device: identity.dev, inode: identity.ino, created: identity.birthtimeMs }, scope,
    coverage: { source: scope.sources.length ? 'completed' : 'not-requested', rendered: options.url ? 'completed' : 'not-requested', interaction: 'not-requested' },
    sources: [], findings: [], limits: [], observations: [], sourceTargets: [], artifacts: { screenshots: [] } };
  if (scope.sources.length) {
    const source = await inspectSources(root, scope.sources);
    report.sources = source.sources;
    report.sourceTargets = source.targets;
    report.findings.push(...source.findings);
    report.limits.push(...source.limits);
    if (source.limits.length) report.coverage.source = 'partial';
  }
  if (options.url) {
    const rendered = await inspectBrowser(options, output);
    report.observations = rendered.observations;
    report.browser = rendered.engine;
    report.findings.push(...rendered.findings);
    report.limits.push(...rendered.limits);
    report.artifacts.screenshots = rendered.screenshots;
    if (rendered.limits.length) report.coverage.rendered = 'partial';
    report.pairing = 'Project and URL supplied by caller; served source identity is not proven.';
  }
  report.claims = ['Initial-state sampled evidence only; no full WCAG conformance or business-flow verification.', 'Copy and icon observations require contextual review; they do not identify AI authorship.'];
  finish(report);
  return persist ? saveReport(report, output) : report;
}
