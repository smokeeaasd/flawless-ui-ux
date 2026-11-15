// Meaningful local checks for the bundled executable studies, not a design score.
// node evals/scripts/check-studies.mjs <external-artifact-directory>
// FLAWLESS_BROWSER_EXECUTABLE may select an already installed compatible browser.
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const examples = fileURLToPath(new URL('../../skills/flawless-ui-ux/assets/examples/', import.meta.url));
const output = process.argv[2] && path.resolve(process.argv[2]);
if (!output) throw new Error('Supply a fresh external artifact directory.');
await fs.mkdir(output, { recursive: false });
const browser = await chromium.launch({ headless: true, ...(process.env.FLAWLESS_BROWSER_EXECUTABLE ? { executablePath: process.env.FLAWLESS_BROWSER_EXECUTABLE } : {}) });
const results = [];
const checks = [];
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    for (const name of ['cafe', 'software', 'finance', 'queue', 'comparison', 'form', 'reading', 'collection']) {
      await page.goto(pathToFileURL(path.join(examples, `${name}.html`)).href);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false, `${name} overflows at ${width}`);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      results.push({ name, width, overflow, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) })) });
      if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(output, `${name}-${width}.png`), fullPage: true });
    }
    assert.deepEqual(errors, [], `page errors at ${width}`);
    await page.goto(pathToFileURL(path.join(examples, 'finance.html')).href);
    assert.equal(await page.locator('#projected').innerText(), '$5,900');
    await page.selectOption('#period', 'month');
    assert.equal(await page.locator('#projected').innerText(), '$6,700');
    await page.click('#pay');
    assert.equal(await page.locator('#cash').innerText(), '$4,300');
    assert.equal(await page.locator('#due').innerText(), '$3,700');
    assert.equal(await page.locator('#projected').innerText(), '$6,700');
    assert.equal(await page.locator('#pay').isDisabled(), true);
    await page.selectOption('#period', 'week');
    assert.equal(await page.locator('#projected').innerText(), '$5,900');
    await page.goto(pathToFileURL(path.join(examples, 'queue.html')).href);
    await page.fill('#search', 'R-104'); await page.selectOption('#filter', 'repair');
    assert.equal(await page.locator('#records tr:visible').count(), 1);
    await page.getByRole('button', { name: 'Mark R-104 ready', exact: true }).click();
    assert.equal(await page.locator('#records tr:visible').count(), 0);
    assert.equal(await page.locator('#no-results').isVisible(), true);
    assert.equal(await page.locator('#search').evaluate(el => el === document.activeElement), true);
    await page.click('#clear');
    assert.equal(await page.locator('#records tr:visible').count(), 3);
    assert.equal(await page.locator('[data-id="R-104"] .status').innerText(), 'Ready');
    await page.goto(pathToFileURL(path.join(examples, 'form.html')).href);
    await page.getByRole('button', { name: 'Check inquiry locally' }).click();
    assert.equal(await page.locator('#error-summary').evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('[aria-invalid=true]').count(), 3);
    await page.locator('#error-summary a').first().click();
    assert.equal(await page.locator('#name').evaluate(el => el === document.activeElement), true);
    await page.fill('#name', 'Test Reader'); await page.fill('#email', 'bad'); await page.fill('#message', 'A chair needs a repair.');
    await page.getByRole('button', { name: 'Check inquiry locally' }).click();
    assert.equal(await page.locator('[aria-invalid=true]').count(), 1);
    assert.equal(await page.inputValue('#name'), 'Test Reader');
    await page.fill('#email', 'reader@example.com');
    await page.getByRole('button', { name: 'Check inquiry locally' }).click();
    assert.match(await page.locator('#form-result').innerText(), /Nothing was sent or saved/);
    await page.fill('#message', 'Changed input');
    assert.equal(await page.locator('#form-result').innerText(), '');
    const errorAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    checks.push({ width, inputStateViolations: errorAxe.violations.map(v => v.id) });
    await page.goto(pathToFileURL(path.join(examples, 'software.html')).href);
    await page.focus('#demo-toggle'); await page.keyboard.press('Enter');
    assert.equal(await page.locator('#demo-detail').isVisible(), true);
    assert.equal(await page.locator('#demo-toggle').getAttribute('aria-expanded'), 'true');
    await page.keyboard.press('Space'); assert.equal(await page.locator('#demo-detail').isVisible(), false);
    await page.goto(pathToFileURL(path.join(examples, 'collection.html')).href);
    const work = page.getByRole('button', { name: /Open Steps/ });
    await work.focus(); await page.keyboard.press('Enter');
    assert.equal(await page.locator('#work-title').innerText(), 'Steps / 03');
    await page.keyboard.press('Escape');
    assert.equal(await work.evaluate(el => el === document.activeElement), true);
    await work.click(); await page.click('#close-work');
    assert.equal(await work.evaluate(el => el === document.activeElement), true);
    await page.goto(pathToFileURL(path.join(examples, 'reading.html')).href);
    await page.getByRole('link', { name: 'Group by use', exact: true }).click();
    assert.equal(new URL(page.url()).hash, '#group');
    await page.goto(pathToFileURL(path.join(examples, 'comparison.html')).href);
    const region = page.getByRole('region', { name: 'Water samples by site' });
    if (width === 320) {
      await region.focus(); await page.keyboard.press('End');
      await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
      assert.equal(await region.evaluate(el => el.scrollLeft > 0), true);
    }
    await context.close();
  }
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify({ browser: await browser.version(), results, checks, limits: ['One Chromium/Edge engine', 'No screen-reader or native platform verification', 'No design score'] }, null, 2));
  assert.equal(results.reduce((n, result) => n + result.violations.length, 0), 0, 'See results.json for automated accessibility findings');
  console.log('32 responsive/accessibility samples and local task transitions passed.');
} finally { await browser.close(); }
