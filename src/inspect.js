import { inspectSources } from './source.js';
import { inspectBrowser } from './browser.js';
import { readFlow } from './flow.js';
import { consistency } from './consistency.js';
import { validateInspection } from './options.js';
import { projectRoot, VERSION, CHECK_VERSION, REPORT_VERSION, finish, reserveOutput, saveReport } from './shared.js';
import fs from 'node:fs/promises';

export async function inspect(options, reservedOutput, persist = true) {
  if (options.html && !options.output && !reservedOutput) throw new Error('--html requires --output NEW_DIR.');
  options = validateInspection({ ...options, sources: [...(options.sources || [])], viewports: [...(options.viewports || [])] });
  const root = await projectRoot(options.project);
  const flow = options.flow ? await readFlow(root, options.flow) : null;
  const output = reservedOutput === undefined ? await reserveOutput(options.output) : reservedOutput;
  const identity = await fs.stat(root);
  const scope = { sources: options.sources || [], urls: options.urls, selector: options.selector || null,
    viewports: options.url ? options.viewports : [], timeout: options.timeout,
    browserExecutable: options.url ? options.browserExecutable || null : null,
    flow: flow ? { path: flow.path, hash: flow.hash } : null, consistency: !!options.consistency };
  const report = { schemaVersion: REPORT_VERSION, operation: 'inspect', toolVersion: VERSION, checkVersion: CHECK_VERSION,
    timestamp: new Date().toISOString(), project: root, projectIdentity: { device: identity.dev, inode: identity.ino, created: identity.birthtimeMs }, scope,
    coverage: { source: scope.sources.length ? 'completed' : 'not-requested', rendered: options.url ? 'completed' : 'not-requested', interaction: flow ? 'completed' : 'not-requested', consistency: options.consistency ? 'completed' : 'not-requested' },
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
    const rendered = await inspectBrowser({ ...options, flowData: flow }, output);
    report.observations = rendered.observations;
    report.browser = rendered.engine;
    report.findings.push(...rendered.findings);
    report.limits.push(...rendered.limits);
    report.artifacts.screenshots = rendered.screenshots;
    if (rendered.limits.length) report.coverage.rendered = 'partial';
    if (flow) {
      report.flow = { name: flow.name, steps: rendered.steps };
      if (!rendered.interactionComplete || !rendered.engine || rendered.limits.length) report.coverage.interaction = 'partial';
    }
    if (options.consistency) {
      report.consistency = consistency(report.observations);
      if (!report.consistency.groups.length) report.limits.push('No corresponding roles were observed across the selected screens.');
      if (rendered.limits.length || !report.consistency.groups.length) report.coverage.consistency = 'partial';
    }
    report.pairing = 'Project and URL supplied by caller; served source identity is not proven.';
  }
  report.claims = ['Evidence covers selected surfaces, viewports, and explicit flow states only; no full WCAG conformance or business-flow verification.', 'Copy, icon, and style variations require contextual review; they do not identify AI authorship or establish design quality.'];
  finish(report);
  return persist ? saveReport(report, output, options) : report;
}
