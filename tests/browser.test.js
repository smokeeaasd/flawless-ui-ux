import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { temporaryWorkspace, snapshot } from './helpers.js';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { parse } from '../src/options.js';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { repository } from './helpers.js';

// Browser setup is explicit. CI installs Chromium; local runs can name an installed browser.
const browserTest = process.env.FLAWLESS_TEST_BROWSER === '1' || process.env.FLAWLESS_BROWSER_EXECUTABLE ? test : test.skip;

browserTest('rendered inspection, correction, regression, and missing targets are distinguished', async () => {
  const workspace = temporaryWorkspace();
  let mode = 'bad';
  const server = http.createServer((request, response) => {
    if (request.url === '/missing.png') { response.writeHead(404); response.end(); return; }
    if (request.url === '/redirect') { response.writeHead(302, { location: 'http://localhost:1/other' }); response.end(); return; }
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(`<!doctype html><html lang="en"><head><title>Inspection fixture</title><style>
      body{background:#fff;color:#181818;font:16px Arial;margin:20px}button{min-height:40px}
      #copy{color:${mode === 'bad' ? '#ddd' : '#222'};font-size:${mode === 'bad' ? '10' : '16'}px}
    </style></head><body><main id="main"><h1>Account overview</h1>
      <p id="copy">Review your available balance.</p>
      ${mode === 'removed' ? '' : `<button id="action" ${mode !== 'bad' ? 'aria-label="Open account"' : ''}></button>`}
      ${mode === 'regression' ? '<button id="new-action"></button>' : ''}
      <p>Open account →</p><p>Open report →</p>
    </main></body></html>`);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const project = path.join(workspace.root, 'project');
    await fs.mkdir(project);
    const before = snapshot(project);
    const options = parse(['inspect', '--project', project, '--url', url, '--viewport', '390x844', '--viewport', '1440x900', '--output', path.join(workspace.root, 'baseline')]).options;
    const baseline = await inspect(options);
    assert.equal(baseline.exitCode, 1, JSON.stringify(baseline.limits));
    assert.ok(baseline.findings.some(f => f.checkId === 'accessibility.color-contrast' && f.status === 'confirmed'));
    assert.ok(baseline.findings.some(f => f.checkId === 'accessibility.button-name' && f.target === '#action'));
    assert.ok(baseline.findings.some(f => f.checkId === 'render.arrow-inventory' && f.status === 'needs-review'));
    assert.equal(baseline.artifacts.screenshots.length, 2);
    assert.equal((await fs.readFile(baseline.artifacts.screenshots[0])).subarray(1, 4).toString(), 'PNG');
    mode = 'good';
    const fixed = await verify({ baseline: baseline.artifacts.manifest, browserExecutable: options.browserExecutable, output: path.join(workspace.root, 'fixed') });
    assert.equal(fixed.exitCode, 0, JSON.stringify(fixed.limits));
    assert.ok(fixed.comparison.noLongerObserved.some(f => f.checkId === 'accessibility.button-name'));
    assert.equal(fixed.artifacts.screenshots.length, 2);
    mode = 'regression';
    const regression = await verify({ baseline: fixed.artifacts.manifest, browserExecutable: options.browserExecutable });
    assert.equal(regression.exitCode, 1);
    assert.ok(regression.comparison.new.length);
    mode = 'removed';
    const removed = await verify({ baseline: baseline.artifacts.manifest, browserExecutable: options.browserExecutable });
    assert.equal(removed.exitCode, 2);
    assert.ok(removed.comparison.unverified.some(f => f.target === '#action'));
    const region = await inspect({ ...options, output: undefined, selector: '#missing' });
    assert.equal(region.exitCode, 2);
    const redirected = await inspect({ ...options, output: undefined, url: `${url}/redirect` });
    assert.equal(redirected.exitCode, 2);
    assert.deepEqual(snapshot(project), before);
  } finally { await new Promise(resolve => server.close(resolve)); workspace.cleanup(); }
}, 120000);

browserTest('Node browser execution reports overflow, broken media, runtime errors and bounded readiness', async () => {
  const workspace = temporaryWorkspace();
  let pending = false;
  const connections = new Set();
  const server = http.createServer((request, response) => {
    if (request.url === '/image') {
      if (!pending) { response.writeHead(404); response.end(); }
      return;
    }
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(`<!doctype html><html lang="en"><head><title>Evidence fixture</title></head>
      <body style="color:#111;background:#fff;font:16px sans-serif"><main><h1>Evidence</h1>
      <div style="width:1900px">Wide content</div><img id="media" src="/image" alt="Account chart" width="120" height="80">
      </main><script>throw new Error('Controlled fixture error')</script></body></html>`);
  });
  server.on('connection', socket => { connections.add(socket); socket.on('close', () => connections.delete(socket)); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const { stdout } = await promisify(execFile)('node', [path.join(repository, 'bin/flawless-ui-ux.js'), 'inspect', '--project', workspace.root, '--url', url, '--viewport', '390x844', '--format', 'json'], { encoding: 'utf8' }).catch(error => {
      assert.equal(error.code, 1, error.stderr);
      return error;
    });
    const report = JSON.parse(stdout);
    for (const id of ['render.horizontal-overflow', 'render.broken-image', 'runtime.page-error']) assert.ok(report.findings.some(f => f.checkId === id), id);
    assert.equal(report.coverage.interaction, 'not-requested');
    pending = true;
    const partial = await inspect(parse(['inspect', '--project', workspace.root, '--url', url, '--viewport', '390x844']).options);
    assert.equal(partial.exitCode, 2);
    assert.ok(partial.limits.some(limit => /settle|pending/.test(limit)), partial.limits.join('\n'));
  } finally { for (const connection of connections) connection.destroy(); await new Promise(resolve => server.close(resolve)); workspace.cleanup(); }
}, 60000);
