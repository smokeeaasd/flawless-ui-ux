import { readSource, finding } from './shared.js';

const fields = {
  click: ['selector'], fill: ['selector', 'value'], press: ['key'],
  expect: ['selector', 'state'], observe: [],
};
export async function readFlow(root, input) {
  const { text, ...source } = await readSource(root, input);
  const flow = JSON.parse(text);
  if (!flow || flow.schemaVersion !== 1 || typeof flow.name !== 'string' || !flow.name.trim() || flow.name.length > 100 ||
      Object.keys(flow).some(key => !['schemaVersion', 'name', 'steps'].includes(key)) ||
      !Array.isArray(flow.steps) || !flow.steps.length || flow.steps.length > 12) throw new Error('Flow requires schemaVersion 1, a name, and 1–12 steps.');
  const ids = new Set(['initial']);
  for (const step of flow.steps) {
    if (!step || !Object.hasOwn(fields, step.action) || typeof step.id !== 'string' || !/^[a-z][a-z0-9-]{0,47}$/.test(step.id) || ids.has(step.id)) throw new Error('Flow steps need unique IDs and supported actions.');
    ids.add(step.id);
    const required = fields[step.action];
    if (Object.keys(step).some(key => !['id', 'action', ...required].includes(key)) || required.some(key => typeof step[key] !== 'string') ||
        (step.selector !== undefined && (!step.selector.trim() || step.selector.length > 500)) ||
        (step.value !== undefined && step.value.length > 2000) ||
        (step.action === 'expect' && !['visible', 'hidden', 'focused'].includes(step.state)) ||
        (step.action === 'press' && !['Tab', 'Shift+Tab', 'Enter', 'Space', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(step.key))) throw new Error(`Invalid flow step: ${step.id}`);
  }
  return { ...source, name: flow.name, steps: flow.steps };
}

export async function executeFlow(page, flow, conditions, results, capture) {
  let stopped = false;
  for (const step of flow.steps) {
    const record = { ...conditions, step: step.id, action: step.action, status: 'not-run' };
    results.steps.push(record);
    if (stopped) continue;
    try {
      if (step.action === 'observe') await capture(step.id);
      else if (step.action === 'press') await page.keyboard.press(step.key);
      else {
        const target = page.locator(step.selector);
        if (step.action === 'expect') {
          if (await target.count() > 1) throw new Error('Expectation target is ambiguous.');
          const checkId = `flow.expect.${step.id}`;
          let matched = true;
          try {
            if (step.state === 'focused') await page.waitForFunction(selector => document.querySelectorAll(selector).length === 1 && document.activeElement === document.querySelector(selector), step.selector);
            else {
              await target.waitFor({ state: step.state });
            }
          } catch (error) { if (error.name !== 'TimeoutError' || page.isClosed()) throw error; matched = false; }
          const stateConditions = { ...conditions, state: step.id };
          results.observations.push({ ...stateConditions, finalUrl: page.url(), completedChecks: [checkId], targets: [step.selector], aliases: {}, readiness: ['explicit expectation evaluated'] });
          if (!matched) {
            results.findings.push(finding(checkId, step.selector, `Expected target to be ${step.state}.`, { conditions: stateConditions, status: 'confirmed', severity: 'error', category: 'interaction', basis: { type: 'constraint', reference: `Explicit flow: ${flow.name}` }, evidence: { expected: step.state, matched: false } }));
            record.status = 'failed';
            continue;
          }
        } else {
          if (await target.count() !== 1) throw new Error('Action target must match exactly one element.');
          if (step.action === 'click') await target.click();
          else await target.fill(step.value);
        }
      }
      record.status = 'completed';
    } catch (error) {
      record.status = 'blocked';
      record.reason = error.message;
      results.limits.push(`${conditions.surface} ${conditions.viewport} step ${step.id}: ${error.message}`);
      results.interactionComplete = false;
      stopped = true;
    }
  }
}
