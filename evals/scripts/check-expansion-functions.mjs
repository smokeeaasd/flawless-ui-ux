// Independent common journeys. Observations, not an aesthetic or conformance score.
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';
const root = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
await fs.mkdir(output);
const source = path.join(root, 'final');
const server = http.createServer(async (req, res) => {
  try {
    const file = path.resolve(source, `.${decodeURIComponent(new URL(req.url, 'http://localhost').pathname)}`);
    const relative = path.relative(source, file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || req.method !== 'GET') { res.writeHead(403).end(); return; }
    const types = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
    const content = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': `${types[path.extname(file)] ?? 'text/html'}; charset=utf-8` }); res.end(content);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: process.env.FLAWLESS_BROWSER_EXECUTABLE });
const results = [];
try {
  const ids = (await fs.readdir(source)).filter(id => id.includes('-public-') || id.includes('-operations-') || id.includes('-refinement-')).sort();
  for (const id of ids) {
    try { await fs.access(path.join(source, id, 'result.txt')); } catch { continue; }
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const record = { id, checks: [] };
    await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    page.on('dialog', dialog => { record.checks.push({ dialog: dialog.message() }); dialog.accept(); });
    await page.goto(`${origin}/${id}/index.html`);
    const text = () => page.locator('body').innerText();
    try {
      if (id.includes('-public-')) {
        const form = page.locator('form').first();
        const name = form.locator('input[name=name],input#name,input[autocomplete=name]').first();
        const email = form.locator('input[type=email]').first();
        const submit = form.locator('button[type=submit],button:not([type])').last();
        if (await form.locator('select').count()) {
          const select = form.locator('select').first();
          const option = await select.locator('option').evaluateAll(options => options.find(x => x.value && !x.disabled)?.value);
          await select.selectOption(option);
        } else if (await form.locator('input[type=radio]').count()) await form.locator('input[type=radio]').first().check();
        await name.fill('Test Reader'); await email.fill('bad'); await submit.click();
        record.checks.push({ check: 'invalid retains input', met: await name.inputValue() === 'Test Reader' && await email.inputValue() === 'bad' });
        await email.fill('reader@example.com'); await submit.click();
        record.checks.push({ check: 'valid inquiry result', status: await page.locator('[role=status],[role=alert],[aria-live]').allTextContents(), tail: (await text()).slice(-900), valuesRetained: await name.inputValue() === 'Test Reader' && await email.inputValue() === 'reader@example.com' });
      } else if (id.includes('-operations-')) {
        const initial = await text();
        // Select Wednesday's packing shift when the view uses a detail route.
        const packingButton = page.getByRole('button', { name: /Wednesday.*Packing|Packing.*Wednesday/s }).first();
        if (await packingButton.count()) await packingButton.click();
        else {
          const views = page.getByRole('button', { name: /^View$/ });
          if (await views.count()) await views.last().click();
        }
        let select;
        const selects = page.locator('select');
        for (let i = await selects.count() - 1; i >= 0; i--) {
          if (await selects.nth(i).locator('option').filter({ hasText: /^Mei$/ }).count()) { select = selects.nth(i); break; }
        }
        if (!select) throw new Error('No available Mei assignment control found; inspect the preserved artifact manually.');
        const candidates = await select.locator('option').evaluateAll(options => options.map(x => x.textContent.trim()));
        record.checks.push({ check: 'Wednesday availability', candidates, excludesUnavailableAdaAndJon: !candidates.includes('Ada') && !candidates.includes('Jon') });
        await select.selectOption({ label: 'Mei' });
        let container = select.locator('..');
        let climbs = 0;
        while (!(await container.getByRole('button', { name: /^Assign/ }).count()) && climbs++ < 6) container = container.locator('..');
        if (climbs >= 6) throw new Error('No associated assignment button; manual inspection required.');
        await container.getByRole('button', { name: /^Assign/ }).first().click();
        const assigned = await text();
        const undo = page.getByRole('button', { name: /(?:Remove|Undo).*Mei/ }).first();
        if (!(await undo.count())) throw new Error('No named undo action for Mei; manual inspection required.');
        await undo.click();
        const after = await text();
        record.checks.push({ check: 'assignment and undo change the view', met: assigned !== initial && after !== assigned, initial, assigned, after });
        const search = page.locator('input[type=search],input#search').first();
        await search.fill('zz-no-shift');
        record.checks.push({ check: 'empty query', text: await text() });
        await page.getByRole('button', { name: /Clear filters/i }).first().click();
        record.checks.push({ check: 'clear query', cleared: await search.inputValue() === '', text: await text() });
      } else {
        const body = await page.evaluate(() => { const clone = document.body.cloneNode(true); clone.querySelectorAll('script,style').forEach(x => x.remove()); return clone.textContent.replace(/\s+/g, ' ').trim(); });
        record.checks.push({ check: 'protected initial copy', text: body });
        await page.fill('#note', 'A local observation.'); await page.locator('form button').click();
        record.checks.push({ check: 'local note', met: (await page.locator('#added').innerText()).includes('A local observation.') });
        // Diagnostic approximation, not browser zoom or a WCAG conformance claim.
        await page.setViewportSize({ width: 320, height: 844 });
        await page.evaluate(() => { const sizes = [...document.querySelectorAll('body *')].map(el => [el, parseFloat(getComputedStyle(el).fontSize)]); for (const [el, size] of sizes) el.style.fontSize = `${size * 2}px`; });
        record.checks.push({ check: '320px diagnostic doubled computed text', overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1) });
      }
    } catch (error) { record.checks.push({ check: 'journey incomplete', error: error.message.slice(0, 300) }); }
    await page.screenshot({ path: path.join(output, `${id}-state.png`), fullPage: true });
    results.push(record); await context.close();
    await fs.writeFile(path.join(output, 'functions.json'), JSON.stringify(results, null, 2));
  }
  console.log(JSON.stringify({ runs: results.length, incomplete: results.filter(x => x.checks.some(c => c.error)).map(x => ({ id: x.id, errors: x.checks.filter(c => c.error) })) }));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
