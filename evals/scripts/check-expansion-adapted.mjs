// Follow up harness selector gaps without altering the evaluated artifacts.
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
    const file = path.resolve(source, `.${new URL(req.url, 'http://localhost').pathname}`);
    const relative = path.relative(source, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403).end(); return; }
    const types = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
    const content = await fs.readFile(file); res.writeHead(200, { 'Content-Type': `${types[path.extname(file)] ?? 'text/html'}; charset=utf-8` }); res.end(content);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: process.env.FLAWLESS_BROWSER_EXECUTABLE, headless: true });
const results = [];
try {
  for (const id of ['beam-operations-none-1', 'beam-operations-current-1', 'terra-operations-candidate-1', 'terra-operations-current-2']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage(); await page.goto(`${origin}/${id}/index.html`);
    const record = { id, snapshots: [] };
    const snapshot = async name => record.snapshots.push({ name, text: await page.locator('body').innerText() });
    try {
      await snapshot('initial');
      if (id === 'beam-operations-none-1') {
        await page.locator('tr[data-id=S3]').click(); await page.selectOption('#volSelect', { label: 'Mei' }); await page.click('#assignBtn'); await snapshot('assigned Mei to S3');
        await page.locator('button[data-name=Mei]').click(); await snapshot('removed Mei from S3');
      } else if (id === 'beam-operations-current-1') {
        await page.locator('[data-view=S3]').click(); await page.selectOption('#volSelect', { label: 'Mei' }); await page.locator('#assignBtn').click(); await snapshot('assigned Mei to S3');
        await page.locator('#undoBtn').click(); await snapshot('undid last assignment');
      } else if (id === 'terra-operations-candidate-1') {
        await page.locator('.detail-toggle').last().click(); await page.locator('#detail-S3 select').selectOption({ label: 'Mei' }); await page.locator('#detail-S3 .primary').click(); await snapshot('assigned Mei to S3');
        await page.locator('#detail-S3 button[data-name=Mei]').click(); await snapshot('removed Mei from S3');
      } else {
        for (const [shift, volunteer] of [['S2', 'Ada'], ['S3', 'Tariq'], ['S3', 'Mei'], ['S3', 'Noa']]) {
          await page.locator(`[data-select=${shift}]`).selectOption({ label: volunteer }); await page.locator(`[data-assign=${shift}]`).click();
        }
        await snapshot('all seven places assigned'); await page.locator('[data-filter=open]').click(); await snapshot('empty needs-cover filter');
        await page.locator('[data-clear]').click(); await snapshot('show all shifts');
      }
      if (id !== 'terra-operations-current-2') {
        await page.fill('#search', 'zz-no-shift'); await snapshot('empty search');
        const clear = page.getByRole('button', { name: /Clear filters/i }); await clear.first().click(); await snapshot('filters cleared');
      }
      record.completed = true;
    } catch (error) { record.error = error.message.slice(0, 400); }
    await page.screenshot({ path: path.join(output, `${id}.png`), fullPage: true }); results.push(record); await context.close();
  }
  await fs.writeFile(path.join(output, 'adapted.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results.map(({ id, completed, error }) => ({ id, completed, error }))));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
