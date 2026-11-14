import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const json = value => `<pre>${escape(JSON.stringify(value, null, 2))}</pre>`;
const list = values => `<ul>${values.map(value => `<li>${escape(value)}</li>`).join('')}</ul>`;
const table = (headings, rows) => `<div class="table"><table><thead><tr>${headings.map(heading => `<th scope="col">${escape(heading)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(value => `<td>${escape(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

// No script, external resource, or executable markup from the inspected interface.
export async function writeHtmlReport(report, directory) {
  const screenshots = [];
  for (const file of report.artifacts.screenshots || []) {
    if (path.dirname(path.resolve(file)) !== path.resolve(directory) || !/^[\w.-]+\.png$/.test(path.basename(file))) continue;
    const stat = await fs.lstat(file);
    if (!stat.isFile() || stat.isSymbolicLink()) continue;
    const observation = report.observations.find(item => path.basename(file) === `surface-${createHash('sha256').update(item.surface).digest('hex').slice(0, 12)}-${item.viewport}-${item.state}.png`);
    const label = observation ? `${observation.surface} · ${observation.state} · ${observation.viewport}` : path.basename(file);
    screenshots.push(`<figure><a href="${escape(path.basename(file))}"><img src="${escape(path.basename(file))}" alt="Captured interface: ${escape(label)}" loading="lazy"></a><figcaption>${escape(label)}</figcaption></figure>`);
  }
  const findings = report.findings.map(finding => `<article><h3>${escape(finding.checkId)}</h3><p class="meta">${escape(finding.status)} · ${escape(finding.severity)} · ${escape(finding.target)}</p><p>${escape(finding.observation)}</p><p><strong>Next step:</strong> ${escape(finding.recommendation)}</p><details><summary>Conditions, basis and evidence</summary>${json({ conditions: finding.conditions, basis: finding.basis, evidence: finding.evidence })}</details></article>`).join('');
  const comparisonNames = { persistent: 'Still observed', new: 'New findings', noLongerObserved: 'No longer observed', unverified: 'Not verified again' };
  const comparison = report.comparison ? `<section><h2>Verification comparison</h2><p>“No longer observed” applies only to rechecked targets and equivalent coverage. It is not an aesthetic rating.</p>${Object.entries(comparisonNames).map(([key, label]) => {
    const values = report.comparison[key] || [];
    return `<h3>${escape(label)} (${values.length})</h3>${values.length ? table(['Check / target', 'Where', 'Result'], values.map(value => {
      const finding = typeof value === 'string' ? report.findings.find(item => item.fingerprint === value) || { target: value } : value;
      return [[finding.checkId, finding.target].filter(Boolean).join(' · '), [finding.conditions?.surface, finding.conditions?.state, finding.conditions?.viewport].filter(Boolean).join(' · ') || 'Selected source', finding.reason || finding.resolution || finding.observation || label];
    })) : '<p>None recorded.</p>'}`;
  }).join('')}</section>` : '';
  const scope = report.scope;
  const scopeRows = [['Sources', scope.sources.join(', ') || 'Not requested'], ['URLs', scope.urls.join(', ') || 'Not requested'], ['Viewports', scope.viewports.map(viewport => `${viewport.width} × ${viewport.height}`).join(', ') || 'Not requested'], ['Region', scope.selector || 'Whole surface'], ['Flow', scope.flow?.path || 'Not requested']];
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>Flawless UI/UX ${escape(report.operation)} report</title>
<style>:root{font-family:system-ui,sans-serif;color:#20242b;background:#f4f5f7;font-size:16px;line-height:1.6}body{max-width:1080px;margin:auto;padding:32px 24px}h1{font-size:2rem;line-height:1.2}h2{margin-top:2.5rem}h3{overflow-wrap:anywhere}a{color:#214ab5}article,figure{background:white;border:1px solid #d6dbe3;border-radius:8px;padding:20px;margin:16px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:.875rem;background:#e9edf3;padding:16px}.meta{color:#4c5666;overflow-wrap:anywhere}img{display:block;width:100%;height:auto}figcaption{overflow-wrap:anywhere}summary{cursor:pointer}li{margin:8px 0}table{width:100%;border-collapse:collapse;table-layout:fixed;text-align:left;background:white}td,th{padding:12px;border-bottom:1px solid #d6dbe3;vertical-align:top;overflow-wrap:anywhere}th{background:#e9edf3}td:first-child{font-weight:600}.table{margin:16px 0}.captures{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:16px}.captures figure{margin:0;align-self:start}nav{display:flex;flex-wrap:wrap;gap:16px;margin:24px 0}</style></head>
<body><header><p>Flawless UI/UX · ${escape(report.toolVersion)}</p><h1>${escape(report.operation)} report</h1><p class="meta">${escape(report.project)}<br>${escape(report.timestamp)}</p><p><strong>${escape(report.completion)}</strong> · Exit code ${escape(report.exitCode)} · ${report.findings.length} findings</p><p><a href="run.json">Machine-readable report</a></p></header>
<nav aria-label="Report sections"><a href="#findings">Findings</a><a href="#captures">Screenshots</a><a href="#coverage">Coverage</a></nav>
<section id="coverage"><h2>Coverage and scope</h2>${table(['Check group', 'Coverage'], Object.entries(report.coverage))}${table(['Scope', 'Selection'], scopeRows)}${report.pairing ? `<p>${escape(report.pairing)}</p>` : ''}<details><summary>Full scope configuration</summary>${json(scope)}</details></section>
<section><h2>Limits</h2>${list([...(report.limits || []), ...(report.claims || [])])}</section>
${comparison}<section id="findings"><h2>Findings</h2>${findings || '<p>No findings were recorded in the selected scope. See coverage and limits before drawing conclusions.</p>'}</section>
<section id="captures"><h2>Captured screens</h2>${screenshots.length ? `<div class="captures">${screenshots.join('')}</div>` : '<p>No screenshots captured. Source-only checks do not establish visual quality.</p>'}</section>
${report.flow ? `<section><h2>Flow steps</h2>${json(report.flow)}</section>` : ''}
${report.consistency ? `<section><h2>Style inventory</h2>${json(report.consistency)}</section>` : ''}
<section><h2>Observations</h2><details><summary>Rendered observation details (${report.observations.length})</summary>${json(report.observations.map(({ targets, ...observation }) => observation))}</details></section>
</body></html>\n`;
  const file = path.join(directory, 'report.html');
  await fs.writeFile(file, html, { flag: 'wx' });
  return file;
}
