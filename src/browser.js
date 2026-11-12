import { finding, hash } from './shared.js';
import { executeFlow } from './flow.js';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

export const AXE_RULES = ['color-contrast', 'button-name', 'link-name', 'label', 'image-alt'];

// Executed in the page. Page content is evidence, never executable configuration.
function snapshot({ selector, inventory }) {
  const region = selector ? document.querySelector(selector) : document.body;
  if (!region) throw new Error('Requested region was not found.');
  function locator(element) {
    if (element.id && document.querySelectorAll(`#${CSS.escape(element.id)}`).length === 1) return `#${CSS.escape(element.id)}`;
    const parts = [];
    for (let current = element; current && current.nodeType === 1; current = current.parentElement) {
      const siblings = current.parentElement ? [...current.parentElement.children].filter(e => e.tagName === current.tagName) : [current];
      parts.unshift(`${current.localName}:nth-of-type(${siblings.indexOf(current) + 1})`);
    }
    return parts.join(' > ');
  }
  const elements = [region, ...region.querySelectorAll('*')];
  const visible = elements.filter(element => {
    const style = getComputedStyle(element), rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
  });
  const targets = [], text = [], small = [], overflow = [], images = [], arrows = [];
  for (const element of visible) {
    const target = locator(element), style = getComputedStyle(element), rect = element.getBoundingClientRect();
    targets.push(target);
    const ownText = [...element.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim();
    if (ownText) {
      const item = { target, text: ownText.slice(0, 400), tag: element.localName, size: parseFloat(style.fontSize), weight: style.fontWeight };
      text.push(item);
      if (item.size < 12) small.push(item);
    }
    if (/[↗↘↖↙→←↑↓➜➔]/u.test(ownText) || /arrow/i.test(`${element.getAttribute('aria-label') || ''} ${element.getAttribute('data-lucide') || ''} ${element.getAttribute('class') || ''}`)) arrows.push({ target, text: ownText.slice(0, 100) });
    if (rect.right > innerWidth + 2 || rect.left < -2) {
      overflow.push({ target, left: Math.round(rect.left), right: Math.round(rect.right) });
    }
    if (element instanceof HTMLImageElement) images.push({ target, broken: element.complete && element.naturalWidth === 0, pending: !element.complete });
  }
  const styles = inventory ? visible.filter(element => /^(h[1-6]|p|button|a|input|select|textarea)$/.test(element.localName) || element.hasAttribute('data-flawless-role')).slice(0, 300).map(element => {
    const style = getComputedStyle(element);
    return { target: locator(element), role: element.getAttribute('data-flawless-role') || element.localName,
      style: Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'padding', 'borderRadius', 'textAlign', 'gap'].map(key => [key, style[key]])) };
  }) : [];
  // Axe may use a different selector for the same element. Keep an explicit alias map.
  return { targets, text, small, overflow, images, arrows, inventory: styles, inventoryTruncated: inventory && visible.filter(element => /^(h[1-6]|p|button|a|input|select|textarea)$/.test(element.localName) || element.hasAttribute('data-flawless-role')).length > 300, documentOverflow: selector ? region.scrollWidth > region.clientWidth + 2 : document.documentElement.scrollWidth > innerWidth + 2 };
}

export async function inspectBrowser(options, output) {
  const results = { findings: [], limits: [], observations: [], screenshots: [], engine: null, steps: [], interactionComplete: true };
  let browser;
  try {
    const { chromium } = await import('playwright');
    const { default: AxeBuilder } = await import('@axe-core/playwright');
    browser = await chromium.launch({ headless: true, ...(options.browserExecutable ? { executablePath: options.browserExecutable } : {}) });
    const require = createRequire(import.meta.url);
    results.engine = { name: 'chromium', version: browser.version(), playwright: JSON.parse(readFileSync(require.resolve('playwright/package.json'), 'utf8')).version };
    for (const url of options.urls || [options.url]) for (const viewport of options.viewports) {
      const label = `${viewport.width}x${viewport.height}`;
      const context = await browser.newContext({ viewport, serviceWorkers: 'block' });
      try {
        if (options.flowData) await context.routeWebSocket('**/*', async socket => {
          results.limits.push('A WebSocket connection was blocked during the flow.');
          results.interactionComplete = false;
          await socket.close();
        });
        const page = await context.newPage();
        page.setDefaultTimeout(options.timeout);
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        if (options.flowData) page.on('popup', popup => { results.limits.push('A popup was blocked during the flow.'); results.interactionComplete = false; void popup.close().catch(() => {}); });
        // Do not follow an unexpected origin and accidentally inspect another application.
        await context.route('**/*', route => {
          const request = route.request();
          if (options.flowData && !['GET', 'HEAD', 'OPTIONS'].includes(request.method())) { results.limits.push('A non-read-only network request was blocked during the flow.'); results.interactionComplete = false; return route.abort(); }
          if (request.isNavigationRequest() && request.frame() === page.mainFrame() && new URL(request.url()).origin !== new URL(url).origin) { results.limits.push('Cross-origin top-level navigation was blocked.'); results.interactionComplete = false; return route.abort(); }
          return route.continue();
        });
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: options.timeout });
        if (!response || !response.ok()) throw new Error(`Navigation returned ${response?.status() ?? 'no response'}.`);
        if (new URL(page.url()).href !== new URL(url).href) results.limits.push(`${label}: URL redirected to ${page.url()}; confirm the requested route.`);
        async function capture(state) {
          const conditions = { viewport: label, state, surface: url };
          const observation = { ...conditions, completedChecks: [], targets: [], aliases: {}, readiness: [], finalUrl: page.url() };
          results.observations.push(observation);
          const ready = await page.evaluate(async timeout => {
            let timer;
            const complete = await Promise.race([
              Promise.all([document.fonts.ready, ...[...document.images].filter(image => !image.complete).map(image => new Promise(resolve => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }); }))]).then(() => true),
              new Promise(resolve => { timer = setTimeout(() => resolve(false), timeout); }),
            ]);
            clearTimeout(timer);
            return complete;
          }, Math.min(options.timeout, 3000));
          observation.readiness = ready ? ['fonts and initial images settled'] : ['font/image readiness timed out'];
          if (!ready) results.limits.push(`${label}: initial resources did not settle within the readiness window.`);
          if (options.selector && await page.locator(options.selector).count() !== 1) throw new Error('Requested region must match exactly one element.');
          const data = await page.evaluate(snapshot, { selector: options.selector, inventory: options.consistency });
          observation.targets = data.targets;
          observation.copy = data.text;
          if (options.consistency) observation.inventory = data.inventory;
          if (data.inventoryTruncated) results.limits.push(`${label}: consistency inventory exceeded 300 elements; narrow the selector.`);
          observation.arrowInventory = data.arrows;
          for (const item of data.small) results.findings.push(finding('render.text-size', item.target, `Visible ${item.tag} text computes to ${item.size}px.`, { conditions, evidence: item, recommendation: 'Evaluate readability for this role and viewport; inspect zoom and contrast. There is no universal WCAG font-size floor.' }));
          if (data.documentOverflow) results.findings.push(finding('render.horizontal-overflow', options.selector || 'document', 'The inspected surface has horizontal overflow.', { conditions, evidence: { candidates: data.overflow.slice(0, 15) }, recommendation: 'Check whether overflow is intentional, contained, and usable; inspect clipping at this width.' }));
          for (const image of data.images.filter(i => i.broken)) results.findings.push(finding('render.broken-image', image.target, 'A visible image finished loading without decoded image content.', { conditions, severity: 'error', status: 'confirmed', category: 'assets', evidence: image }));
          if (data.images.some(i => i.pending)) results.limits.push(`${label}: visible images remain pending.`);
          const repeated = new Map();
          for (const item of data.text) if (item.text.length > 20) repeated.set(item.text, [...(repeated.get(item.text) || []), item.target]);
          for (const [text, targets] of repeated) if (targets.length > 1) results.findings.push(finding('render.repeated-copy', targets[0], 'The same visible phrase appears in multiple places.', { conditions, category: 'content', evidence: { text, targets }, recommendation: 'Check whether repetition supports navigation or repeats a promise without adding information. Preserve intentional repetition.' }));
          if (data.arrows.length > 1) results.findings.push(finding('render.arrow-inventory', options.selector || 'document', `${data.arrows.length} visible arrow cues were observed.`, { conditions, evidence: { occurrences: data.arrows }, recommendation: 'Review each cue for direction or action meaning. Remove redundant decoration only when it adds no useful information; count alone is not a defect.' }));
          observation.completedChecks.push('render.text-size', 'render.horizontal-overflow', 'render.broken-image', 'render.repeated-copy', 'render.arrow-inventory', 'runtime.page-error');
          for (const message of errors.splice(0)) results.findings.push(finding('runtime.page-error', 'document', 'The page emitted an uncaught JavaScript error.', { conditions, severity: 'error', status: 'confirmed', category: 'runtime', evidence: { message } }));
          const builder = new AxeBuilder({ page }).withRules(AXE_RULES);
          if (options.selector) builder.include(options.selector);
          const axe = await builder.analyze();
          observation.axeVersion = axe.testEngine.version;
          observation.completedChecks.push(...AXE_RULES.map(rule => `accessibility.${rule}`));
          const nodes = [...axe.violations, ...axe.incomplete].flatMap(rule => rule.nodes);
          const selectors = [...new Set(nodes.filter(n => n.target.length === 1 && typeof n.target[0] === 'string').map(n => n.target[0]))];
          observation.aliases = await page.evaluate(selectors => {
            function locator(element) {
              if (element.id && document.querySelectorAll(`#${CSS.escape(element.id)}`).length === 1) return `#${CSS.escape(element.id)}`;
              const parts = [];
              for (let e = element; e && e.nodeType === 1; e = e.parentElement) {
                const siblings = e.parentElement ? [...e.parentElement.children].filter(s => s.tagName === e.tagName) : [e];
                parts.unshift(`${e.localName}:nth-of-type(${siblings.indexOf(e) + 1})`);
              }
              return parts.join(' > ');
            }
            return Object.fromEntries(selectors.map(selector => { try { const all = document.querySelectorAll(selector); return [selector, all.length === 1 ? locator(all[0]) : null]; } catch { return [selector, null]; } }));
          }, selectors);
          for (const [rules, confirmed] of [[axe.violations, true], [axe.incomplete, false]]) {
            for (const rule of rules) for (const node of rule.nodes) {
              const target = node.target.length === 1 ? observation.aliases[node.target[0]] : null;
              if (!target) results.limits.push(`${label}: accessibility target cannot be mapped unambiguously (${rule.id}).`);
              results.findings.push(finding(`accessibility.${rule.id}`, target || JSON.stringify(node.target), rule.description, {
                conditions, category: 'accessibility', severity: confirmed ? 'error' : 'warning', status: confirmed ? 'confirmed' : 'needs-review',
                basis: { type: 'standard', reference: rule.helpUrl, tags: rule.tags, upstreamRule: rule.id },
                evidence: { selector: node.target, summary: node.failureSummary, checks: [...node.any, ...node.all, ...node.none].map(check => ({ id: check.id, data: check.data, message: check.message })) },
                recommendation: rule.help,
              }));
            }
          }
          if (output) {
            const file = `${output}/surface-${hash(conditions.surface).slice(0, 12)}-${label}-${conditions.state}.png`;
            await page.screenshot({ path: file, fullPage: true, timeout: options.timeout });
            results.screenshots.push(file);
          }
        }
        await capture('initial');
        if (options.flowData) await executeFlow(page, options.flowData, { surface: url, viewport: label }, results, capture);
      } catch (error) { results.limits.push(`${url} ${label}: ${error.message}`); results.interactionComplete = false; }
      finally { await context.close(); }
    }
  } catch (error) { results.limits.push(`Browser inspection unavailable: ${error.message}`); }
  finally { if (browser) await browser.close(); }
  return results;
}
