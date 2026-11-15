// Independent observations of preserved model artifacts. Never edits the runs.
// node evals/scripts/inspect-expansion.mjs <round-root> <stage> <fresh-output>
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const root = path.resolve(process.argv[2]);
const stage = process.argv[3];
const output = path.resolve(process.argv[4]);
const source = path.join(root, stage);
const skip = process.argv[5] ? new Set(JSON.parse(await fs.readFile(process.argv[5], 'utf8')).results.map(x => x.id)) : new Set();
await fs.mkdir(output);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
  try {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(source, `.${name}`);
    const inside = path.relative(source, file);
    if (inside.startsWith('..') || path.isAbsolute(inside) || req.method !== 'GET') { res.writeHead(403).end(); return; }
    res.writeHead(200, { 'Content-Type': `${types[path.extname(file)] ?? 'text/plain'}; charset=utf-8` });
    res.end(await fs.readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.env.FLAWLESS_BROWSER_EXECUTABLE ? { executablePath: process.env.FLAWLESS_BROWSER_EXECUTABLE } : {}) });
const results = [];
try {
  const entries = (await fs.readdir(source, { withFileTypes: true })).filter(x => x.isDirectory()).map(x => x.name).sort();
  for (const id of entries) {
    if (skip.has(id)) continue;
    try { await fs.access(path.join(source, id, 'result.txt')); await fs.access(path.join(source, id, 'index.html')); } catch { continue; }
    const record = { id, samples: [] };
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [], external = [];
      page.on('pageerror', x => errors.push(x.message));
      await page.route('**/*', route => {
        const url = route.request().url();
        if (!url.startsWith(origin) && !url.startsWith('data:')) { external.push(url); route.abort(); }
        else route.continue();
      });
      await page.goto(`${origin}/${id}/index.html`); await page.waitForTimeout(100);
      const dom = await page.evaluate(() => {
        const clone = document.body.cloneNode(true); clone.querySelectorAll('script,style').forEach(x => x.remove());
        return { text: clone.textContent.replace(/\s+/g, ' ').trim(), overflow: document.documentElement.scrollWidth > innerWidth + 1,
          controls: [...document.querySelectorAll('input,select,textarea,button,a')].map(x => ({ tag: x.tagName, id: x.id, name: x.getAttribute('name'), type: x.getAttribute('type'), text: x.getAttribute('aria-label') || x.innerText || '', options: x.tagName === 'SELECT' ? [...x.options].map(o => ({ value: o.value, text: o.text })) : undefined })) };
      });
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      await page.screenshot({ path: path.join(output, `${id}-${width}.png`), fullPage: true });
      await fs.writeFile(path.join(output, `${id}-${width}.aria.txt`), await page.locator('body').ariaSnapshot());
      const interactions = [];
      // Stable selectors are prescribed by the refinement fixture, not by its styling.
      if (id.includes('refinement') || (stage === 'pilot' && id.startsWith('type-'))) {
        try {
          if (id.includes('refinement')) {
            await page.fill('#note', 'A local observation.'); await page.locator('form button').click();
            interactions.push({ check: 'local note added', met: (await page.locator('#added').innerText()).includes('A local observation.') && /Nothing was sent or saved/.test(await page.locator('#feedback').innerText()) });
          } else {
            await page.fill('#name', 'Test Reader'); await page.fill('#email', 'reader@example.com'); await page.locator('form button').click();
            interactions.push({ check: 'local interest form', text: await page.locator('#form-feedback').innerText() });
          }
        } catch (error) { interactions.push({ check: 'fixture interaction', met: false, error: error.message.slice(0, 200) }); }
      }
      if (stage === 'pilot' && id.startsWith('mobile-')) {
        try {
          await page.fill('#search', 'Maya'); await page.selectOption('#status-filter', 'received');
          const filtered = await page.locator('#job-rows').innerText();
          await page.getByRole('button', { name: /Mark ready: R-201/ }).click();
          const removed = await page.locator('#job-rows').innerText();
          await page.click('#clear-filters');
          interactions.push({ check: 'search/filter/update/clear', met: filtered.includes('R-201') && !removed.includes('R-201') && (await page.locator('#ready-count').innerText()) === '3' && (await page.locator('#total-count').innerText()) === '6' });
        } catch (error) { interactions.push({ check: 'queue interaction', met: false, error: error.message.slice(0, 200) }); }
      }
      if (stage === 'pilot' && id.startsWith('form-')) {
        try {
          await page.fill('#name', 'Test Reader'); await page.fill('#email', 'bad'); await page.fill('#details', 'A chair needs repair.'); await page.locator('form button').click();
          const retained = await page.inputValue('#name') === 'Test Reader' && await page.inputValue('#details') === 'A chair needs repair.';
          await page.fill('#email', 'reader@example.com'); await page.locator('form button').click();
          interactions.push({ check: 'invalid retention and local valid result', retained, visibleResult: await page.locator('body').innerText() });
        } catch (error) { interactions.push({ check: 'form interaction', met: false, error: error.message.slice(0, 200) }); }
      }
      record.samples.push({ width, ...dom, errors, external, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) })), interactions });
      await context.close();
    }
    results.push(record);
    await fs.writeFile(path.join(output, 'observations.json'), JSON.stringify({ stage, browser: await browser.version(), results }, null, 2));
  }
  console.log(JSON.stringify({ runsObserved: results.length, overflows: results.flatMap(r => r.samples.filter(s => s.overflow).map(s => `${r.id}/${s.width}`)), automatedFindings: results.flatMap(r => r.samples.filter(s => s.violations.length).map(s => ({ id: r.id, width: s.width, rules: s.violations.map(v => v.id) }))) }));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
