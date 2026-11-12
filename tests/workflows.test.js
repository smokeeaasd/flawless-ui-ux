import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { readFlow } from '../src/flow.js';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { parse } from '../src/options.js';
import { temporaryWorkspace, snapshot } from './helpers.js';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { repository } from './helpers.js';

const browserTest = process.env.FLAWLESS_TEST_BROWSER === '1' || process.env.FLAWLESS_BROWSER_EXECUTABLE ? test : test.skip;
test('flow input rejects scripts, ambiguous steps, excessive work, and escaped paths', async () => {
  const workspace = temporaryWorkspace();
  try {
    const file = path.join(workspace.root, 'flow.json');
    for (const steps of [[{ id: 'script', action: 'evaluate', value: 'alert(1)' }], [{ action: 'observe' }], [{ id: 'initial', action: 'observe' }], Array.from({ length: 13 }, (_, index) => ({ id: `step-${index}`, action: 'observe' })), [{ id: 'click', action: 'click', selector: '#x', command: 'npm run anything' }]]) {
      await fs.writeFile(file, JSON.stringify({ schemaVersion: 1, name: 'Test', steps }));
      await assert.rejects(readFlow(workspace.root, 'flow.json'));
    }
    await assert.rejects(readFlow(workspace.root, '../outside.json'));
    assert.throws(() => parse(['inspect', '--url', 'http://localhost', '--consistency']));
    assert.equal(parse(['inspect', '--url', 'http://localhost/a', '--url', 'http://localhost/b', '--consistency']).options.urls.length, 2);
  } finally { workspace.cleanup(); }
});

browserTest('explicit flows collect distinct states, compare fixes, preserve scope and block network writes', async () => {
  const workspace = temporaryWorkspace();
  let bad = true, posts = 0, upgrades = 0;
  const server = http.createServer((req, res) => {
    if (req.method === 'POST') posts++;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<!doctype html><html lang="en"><head><title>Workflow</title><style>body{font:16px sans-serif;color:#111;background:white}button,input{font:inherit}#copy{font-size:${bad ? 10 : 16}px}</style></head><body><main><h1>Schedule</h1><button id="open">Edit</button><div id="editor" hidden><label for="name">Name</label><input id="name"><p id="copy">Edit your display name.</p></div><button id="send">Send test request</button><button id="socket">Connect</button></main><script>document.querySelector('#open').onclick=()=>{document.querySelector('#editor').hidden=false;document.querySelector('#name').focus()};document.querySelector('#send').onclick=()=>fetch('/write',{method:'POST'}).catch(()=>{});document.querySelector('#socket').onclick=()=>new WebSocket('ws://'+location.host+'/socket');</script></body></html>`);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  server.on('upgrade', (req, socket) => { upgrades++; socket.destroy(); });
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const flow = { schemaVersion: 1, name: 'Edit name', steps: [{ id: 'open', action: 'click', selector: '#open' }, { id: 'focus', action: 'expect', selector: '#name', state: 'focused' }, { id: 'fill', action: 'fill', selector: '#name', value: 'Avery' }, { id: 'editing', action: 'observe' }, { id: 'tab', action: 'press', key: 'Tab' }, { id: 'next', action: 'expect', selector: '#send', state: 'focused' }] };
    await fs.writeFile(path.join(workspace.root, 'flow.json'), JSON.stringify(flow));
    const before = snapshot(workspace.root);
    const options = parse(['inspect', '--project', workspace.root, '--url', url, '--flow', 'flow.json', '--viewport', '390x844', '--timeout', '1000', '--output', path.join(workspace.root, 'baseline')]).options;
    const baseline = await inspect(options);
    assert.equal(baseline.exitCode, 0, JSON.stringify(baseline.limits));
    assert.equal(baseline.coverage.interaction, 'completed');
    assert.ok(baseline.findings.some(f => f.checkId === 'render.text-size' && f.conditions.state === 'editing'));
    assert.equal(baseline.artifacts.screenshots.length, 2);
    assert.ok(baseline.flow.steps.every(step => step.status === 'completed'));
    await assert.rejects(verify({ baseline: baseline.artifacts.manifest, browserExecutable: options.browserExecutable }), /explicit --flow/);
    bad = false;
    const fixed = await verify({ baseline: baseline.artifacts.manifest, browserExecutable: options.browserExecutable, flow: 'flow.json' });
    assert.equal(fixed.exitCode, 0, JSON.stringify(fixed.limits));
    assert.ok(fixed.comparison.noLongerObserved.some(f => f.checkId === 'render.text-size'));
    await fs.writeFile(path.join(workspace.root, 'flow.json'), JSON.stringify({ ...flow, name: 'Changed' }));
    await assert.rejects(verify({ baseline: baseline.artifacts.manifest, browserExecutable: options.browserExecutable, flow: 'flow.json' }), /Flow changed/);
    await fs.writeFile(path.join(workspace.root, 'flow.json'), JSON.stringify({ schemaVersion: 1, name: 'Failed expectation', steps: [{ id: 'hidden', action: 'expect', selector: '#editor', state: 'visible' }] }));
    const failed = await inspect({ ...options, output: undefined });
    assert.equal(failed.exitCode, 1, JSON.stringify(failed.limits));
    assert.ok(failed.findings.some(f => f.checkId === 'flow.expect.hidden' && f.status === 'confirmed'));
    await fs.writeFile(path.join(workspace.root, 'flow.json'), JSON.stringify({ schemaVersion: 1, name: 'Missing target', steps: [{ id: 'absent', action: 'click', selector: '#absent' }, { id: 'later', action: 'observe' }] }));
    const blocked = await inspect({ ...options, output: undefined });
    assert.equal(blocked.exitCode, 2);
    assert.equal(blocked.flow.steps[1].status, 'not-run');
    await fs.writeFile(path.join(workspace.root, 'flow.json'), JSON.stringify({ schemaVersion: 1, name: 'Blocked write', steps: [{ id: 'send', action: 'click', selector: '#send' }, { id: 'after', action: 'observe' }] }));
    const write = await inspect({ ...options, output: undefined });
    assert.equal(write.exitCode, 2);
    assert.equal(posts, 0);
    await fs.writeFile(path.join(workspace.root, 'flow.json'), JSON.stringify({ schemaVersion: 1, name: 'Blocked socket', steps: [{ id: 'connect', action: 'click', selector: '#socket' }, { id: 'after', action: 'observe' }] }));
    const socket = await inspect({ ...options, output: undefined });
    assert.equal(socket.exitCode, 2);
    assert.ok(socket.limits.some(limit => limit.includes('WebSocket')));
    assert.equal(upgrades, 0);
    const current = snapshot(workspace.root);
    for (const [file, value] of Object.entries(before)) if (file !== 'flow.json') assert.equal(current[file], value);
  } finally { await new Promise(resolve => server.close(resolve)); workspace.cleanup(); }
}, 120000);

browserTest('consistency groups corresponding roles without merging screen identities or scoring styles', async () => {
  const workspace = temporaryWorkspace();
  let removed = false;
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end(`<!doctype html><html lang="en"><head><title>Accounts</title><style>body{font:16px sans-serif;background:white;color:#111}h1{font-size:${req.url === '/a' ? 24 : 32}px}</style></head><body><main><h1 data-flawless-role="page-title">Accounts</h1>${removed && req.url === '/b' ? '' : '<p id="small" style="font-size:10px">Available accounts</p>'}</main></body></html>`);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const options = parse(['inspect', '--project', workspace.root, '--url', `${url}/a`, '--url', `${url}/b`, '--consistency', '--viewport', '390x844', '--output', path.join(workspace.root, 'baseline')]).options;
    const baseline = await inspect(options);
    assert.equal(baseline.exitCode, 0, JSON.stringify(baseline.limits));
    assert.equal(baseline.consistency.groups.find(group => group.role === 'page-title').differs, true);
    assert.equal(new Set(baseline.findings.filter(f => f.checkId === 'render.text-size').map(f => f.fingerprint)).size, 2);
    removed = true;
    const compared = await verify({ baseline: baseline.artifacts.manifest, browserExecutable: options.browserExecutable });
    assert.ok(compared.comparison.persistent.length > 0);
    assert.ok(compared.comparison.unverified.some(item => item.target === '#small'));
    assert.equal(compared.comparison.noLongerObserved.length, 0);
  } finally { await new Promise(resolve => server.close(resolve)); workspace.cleanup(); }
}, 60000);

browserTest('the documented fixture runs through Node and legacy browser samples retain their screen identity', async () => {
  const workspace = temporaryWorkspace();
  const html = await fs.readFile(new URL('../evals/fixtures/workflows/index.html', import.meta.url), 'utf8');
  let corrected = false;
  const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(html.replace('</main>', `<p id="size" style="font-size:${corrected ? 16 : 10}px">Directory details</p></main>`)); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    await fs.copyFile(new URL('../evals/fixtures/workflows/edit-member.flow.json', import.meta.url), path.join(workspace.root, 'flow.json'));
    const { stdout } = await promisify(execFile)('node', [path.join(repository, 'bin/flawless-ui-ux.js'), 'inspect', '--project', workspace.root, '--url', url, '--flow', 'flow.json', '--viewport', '390x844', '--format', 'json'], { encoding: 'utf8' });
    const flowReport = JSON.parse(stdout);
    assert.equal(flowReport.schemaVersion, 2);
    assert.ok(flowReport.flow.steps.every(step => step.status === 'completed'));
    assert.ok(flowReport.observations.some(o => o.state === 'returned'));
    const report = await inspect(parse(['inspect', '--project', workspace.root, '--url', url, '--viewport', '390x844']).options);
    const { hash } = await import('../src/shared.js');
    const baseline = { ...report, schemaVersion: 1, toolVersion: '1.1.0', checkVersion: 1, scope: { ...report.scope, url: report.scope.urls[0] }, observations: report.observations.map(({ surface, state, ...o }) => o), findings: report.findings.map(f => {
      const { surface, ...conditions } = f.conditions;
      return { ...f, conditions, fingerprint: hash(JSON.stringify([f.checkId, f.target, conditions.state || 'initial', conditions.viewport || null])) };
    }) };
    delete baseline.scope.urls;
    const file = path.join(workspace.root, 'legacy.json');
    await fs.writeFile(file, JSON.stringify(baseline));
    const verified = await verify({ baseline: file, browserExecutable: report.scope.browserExecutable });
    assert.equal(verified.exitCode, 0, JSON.stringify(verified.limits));
    assert.equal(verified.migration.fromSchemaVersion, 1);
    assert.ok(verified.observations.every(o => o.surface === `${url}/` && o.state === 'initial'));
    corrected = true;
    baseline.browser = { ...baseline.browser, version: 'different-engine-version' };
    await fs.writeFile(file, JSON.stringify(baseline));
    const changed = await verify({ baseline: file, browserExecutable: report.scope.browserExecutable });
    assert.equal(changed.exitCode, 2);
    assert.equal(changed.comparison.noLongerObserved.length, 0);
    assert.ok(changed.comparison.unverified.some(item => item.target === '#size'));
  } finally { await new Promise(resolve => server.close(resolve)); workspace.cleanup(); }
}, 60000);
