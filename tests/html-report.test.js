import { test } from 'bun:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { writeHtmlReport } from '../src/html-report.js';
import { temporaryWorkspace } from './helpers.js';

test('optional HTML keeps report schema and exit semantics, escapes findings, and preserves 2.0.0 baselines', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p{font-size:8px}');
    const report = await inspect({ project: workspace.root, sources: ['style.css'], timeout: 15000, output: path.join(workspace.root, 'before'), html: true });
    assert.equal(report.schemaVersion, 2);
    const html = await fs.readFile(report.artifacts.html, 'utf8');
    assert.match(html, /Source-only checks do not establish visual quality/);
    assert.match(html, /Coverage and scope/);
    const baseline = JSON.parse(await fs.readFile(report.artifacts.manifest, 'utf8'));
    baseline.toolVersion = '2.0.0';
    await fs.writeFile(report.artifacts.manifest, JSON.stringify(baseline));
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p{font-size:16px}');
    const compared = await verify({ baseline: report.artifacts.manifest, output: path.join(workspace.root, 'after'), html: true });
    assert.ok(compared.comparison.noLongerObserved.length);
    assert.match(await fs.readFile(compared.artifacts.html, 'utf8'), /Verification comparison/);
    await assert.rejects(inspect({ project: workspace.root, sources: ['style.css'], timeout: 15000, output: path.join(workspace.root, 'before'), html: true }), { code: 'EEXIST' });
    const malicious = structuredClone(report);
    malicious.findings[0].observation = '<script>alert(1)</script>';
    malicious.findings[0].evidence = { text: '<img src=x onerror=alert(1)>' };
    malicious.artifacts.screenshots = ['https://example.org/image.png', path.join(workspace.root, 'outside.png')];
    const directory = path.join(workspace.root, 'escaped');
    await fs.mkdir(directory);
    const escaped = await fs.readFile(await writeHtmlReport(malicious, directory), 'utf8');
    assert.ok(escaped.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
    assert.ok(!escaped.includes('<script>'));
    assert.ok(!escaped.includes('<img src="https:'));
    assert.match(escaped, /default-src 'none'/);
  } finally { workspace.cleanup(); }
});

test('existing inspection output remains JSON-only unless HTML is requested', async () => {
  const workspace = temporaryWorkspace();
  try {
    await fs.writeFile(path.join(workspace.root, 'style.css'), 'p{font-size:16px}');
    const output = path.join(workspace.root, 'plain');
    const report = await inspect({ project: workspace.root, sources: ['style.css'], timeout: 15000, output });
    assert.equal(report.artifacts.html, undefined);
    assert.deepEqual(await fs.readdir(output), ['run.json']);
  } finally { workspace.cleanup(); }
});

const browserTest = process.env.FLAWLESS_TEST_BROWSER === '1' || process.env.FLAWLESS_BROWSER_EXECUTABLE ? test : test.skip;
browserTest('rendered HTML report opens offline, loads local screenshots, and fits narrow windows', async () => {
  const workspace = temporaryWorkspace();
  const server = http.createServer((request, response) => response.end('<!doctype html><html lang="en"><title>Report fixture</title><body><main><h1>Account overview</h1><button>View transactions</button></main></body></html>'));
  let browser;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}/`;
    const report = await inspect({ project: workspace.root, urls: [url], timeout: 15000, browserExecutable: process.env.FLAWLESS_BROWSER_EXECUTABLE, output: path.join(workspace.root, 'report'), html: true });
    assert.ok(report.artifacts.screenshots.length, report.limits.join('\n'));
    const { chromium } = await import('playwright');
    browser = await chromium.launch({ headless: true, ...(process.env.FLAWLESS_BROWSER_EXECUTABLE ? { executablePath: process.env.FLAWLESS_BROWSER_EXECUTABLE } : {}) });
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(pathToFileURL(report.artifacts.html).href);
      await page.locator('img').first().scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
      assert.equal(await page.locator('img').count(), report.artifacts.screenshots.length);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.equal(await page.locator('script').count(), 0);
      await page.close();
    }
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); workspace.cleanup(); }
}, 60000);
