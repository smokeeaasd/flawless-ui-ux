// Freeze the final round before any final model sees a task.
// node evals/scripts/prepare-expansion.mjs <external-round-root>
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const repository = fileURLToPath(new URL('../../', import.meta.url));
const root = path.resolve(process.argv[2]);
const final = path.join(root, 'final');
await fs.mkdir(final); // Fail rather than replace any earlier run.
const candidate = path.join(root, 'final-candidate');
await fs.cp(path.join(repository, 'skills/flawless-ui-ux'), candidate, { recursive: true, errorOnExist: true, force: false });
const tasks = {
  public: 'Build a distinctive, usable public page for the fictional Morrow Print Room. Audience: neighbors deciding which print session to attend. Facts: 24 River Lane; open Saturday and Sunday 10:00–17:00; step-free entrance; Intro to risograph, Saturday 10:30, 90 minutes, $25, materials included; Open print desk, Sunday 13:00, 2 hours, $18, bring a prepared design; edition size is limited to 20 sheets per visitor. Make the offers and visit information easy to find. Include a local session-selection and inquiry interaction with name and email, understandable validation and retained input; nothing is sent or reserved. Use only these facts, no invented social proof. Use plain HTML/CSS/JS without dependencies or remote assets. Supply index.html and working local interactions at desktop and phone widths.',
  operations: 'Build an operational volunteer shift overview from data.json. The coordinator must find uncovered shifts, assign an available volunteer to a shift, and undo that assignment. Preserve every supplied shift and volunteer. Coverage is the number of assigned places divided by the seven required places. Prevent duplicate assignments within a shift, capacity overflow and assignments outside the supplied availability. Update coverage, counts, row/detail state and feedback together. Provide a useful empty result and a way to clear filtering. Changes are in memory only, not saved or sent. Use plain HTML/CSS/JS without dependencies or remote assets. Supply index.html and working local interactions at desktop and phone widths. Choose a coherent visual direction appropriate to repeated operational work.',
  refinement: 'Improve typography, readability and hierarchy on this field-notes page. Preserve every word, content order, brand palette, two-region desktop composition, and all existing behavior. Limit changes to typography, spacing and focus treatment. Do not replace the brand, add features or rewrite copy. Check desktop and phone widths.'
};
const data = {
  shifts: [
    { id: 'S1', day: 'Tuesday', time: '09:00–11:00', task: 'Welcome desk', capacity: 2, assigned: ['Ada', 'Tariq'] },
    { id: 'S2', day: 'Tuesday', time: '11:00–13:00', task: 'Welcome desk', capacity: 2, assigned: ['Jon'] },
    { id: 'S3', day: 'Wednesday', time: '09:00–11:00', task: 'Packing', capacity: 3, assigned: [] }
  ],
  volunteers: [ { name: 'Ada', available: ['S1', 'S2'] }, { name: 'Tariq', available: ['S1', 'S3'] }, { name: 'Jon', available: ['S2'] }, { name: 'Mei', available: ['S2', 'S3'] }, { name: 'Noa', available: ['S1', 'S2', 'S3'] } ]
};
const html = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Small Weather / Field notes</title><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script><body><header><a href="#notes">Small Weather</a><span>Field notes / 04</span></header><main><aside><p class="label">Places in use</p><h1>A room changes through the day.</h1><p>Notes on light, objects and the routines between them.</p><a href="#notes">Read the notes</a></aside><article id="notes"><h2>Start with what happens here</h2><p>A desk can be a place to read in the morning and a place to mend something in the evening. Notice the routine before deciding what should stay within reach.</p><h2>Keep a place for returning</h2><p>An arrangement is useful when an object can leave and return without everything else moving. Leave enough room for the things you actually use.</p><blockquote>Order becomes visible through use.</blockquote><h2>Leave a note</h2><p>This local example keeps a note on the page until reload. It does not send or save anything.</p><form><label for="note">Your observation</label><textarea id="note" required></textarea><button>Add note locally</button></form><p id="feedback" role="status"></p><ul id="added"></ul></article></main><footer>Small Weather / Original illustrative text</footer></body></html>';
const css = ':root{--paper:#f1e5cf;--ink:#392d25;--accent:#9b432b}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:13px/1.25 Georgia,serif}header,footer{padding:18px 5%;border-bottom:1px solid var(--accent);display:flex;justify-content:space-between}a{color:var(--accent)}main{width:90%;margin:40px auto;display:grid;grid-template-columns:1fr 1.2fr;gap:50px}h1{font-size:38px;line-height:1.05;margin:0 0 12px}h2{font-size:16px;margin:30px 0 4px}p{margin:4px 0 12px}aside p{font-size:14px}.label{text-transform:uppercase;letter-spacing:2px}blockquote{font-size:17px;border-left:2px solid var(--accent);margin:20px 0;padding-left:12px}label{display:block}textarea{width:100%;height:80px;background:var(--paper);color:var(--ink);border:1px solid var(--accent)}button{background:var(--accent);color:var(--paper);border:0;padding:6px 12px;font:inherit}footer{border-top:1px solid var(--accent)}@media(max-width:650px){main{grid-template-columns:1fr;gap:24px}}';
const js = 'document.querySelector("form").addEventListener("submit",event=>{event.preventDefault();const field=document.querySelector("#note");if(!field.value.trim())return;const item=document.createElement("li");item.textContent=field.value;document.querySelector("#added").append(item);document.querySelector("#feedback").textContent="Note added locally. Nothing was sent or saved.";field.value="";});';
const common = 'Work only inside this run directory. Do not inspect other runs, the parent directory, other skills or external examples. No Sites, delegation, remote services, remote assets or dependency installation. tools.json lists the already installed Playwright, Edge and inspection CLI. Browser sandbox launch may fail with Crashpad; an authorized local browser check may use exec sandbox escalation. Stop after 15 minutes. Save result.txt with the changes, exact references read, checks actually performed and remaining limits. Do not publish or commit.';
const tools = { playwright: path.join(repository, 'node_modules/playwright/index.mjs'), browser: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', cli: path.join(repository, 'bin/flawless-ui-ux.js') };
const runs = [];
for (const [model, repeats] of [['terra', 2], ['beam', 1]]) for (let repeat = 1; repeat <= repeats; repeat++) for (const task of Object.keys(tasks)) for (const arm of ['none', 'current', 'candidate']) {
  const id = `${model}-${task}-${arm}-${repeat}`;
  const dir = path.join(final, id); await fs.mkdir(dir);
  await fs.writeFile(path.join(dir, 'AGENTS.md'), common + '\n');
  await fs.writeFile(path.join(dir, 'tools.json'), JSON.stringify(tools, null, 2));
  await fs.writeFile(path.join(dir, 'task.txt'), tasks[task]);
  if (task === 'operations') await fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(data, null, 2));
  if (task === 'refinement') { await fs.writeFile(path.join(dir, 'index.html'), html); await fs.writeFile(path.join(dir, 'styles.css'), css); await fs.writeFile(path.join(dir, 'app.js'), js); }
  if (arm !== 'none') await fs.cp(arm === 'current' ? path.join(root, 'baseline/flawless-ui-ux') : candidate, path.join(dir, 'local-skill'), { recursive: true });
  const prompt = `${common}\n${arm === 'none' ? 'Do not use any skill.' : 'Read local-skill/SKILL.md and relevant bundled references and use that skill.'}\n${tasks[task]}`;
  await fs.writeFile(path.join(dir, 'prompt.txt'), prompt);
  runs.push({ id, model: model === 'terra' ? 'gpt-6.1-terra' : 'opencode/beam-free#medium', reasoning: model === 'terra' ? 'low' : 'medium', task, arm, repeat, promptSha256: createHash('sha256').update(prompt).digest('hex') });
}
async function hashes(dir, prefix = '') {
  const result = {};
  for (const file of await fs.readdir(dir, { withFileTypes: true })) {
    const key = `${prefix}${file.name}`;
    if (file.isDirectory()) Object.assign(result, await hashes(path.join(dir, file.name), `${key}/`));
    else result[key] = createHash('sha256').update(await fs.readFile(path.join(dir, file.name))).digest('hex');
  }
  return result;
}
await fs.writeFile(path.join(root, 'final-manifest.json'), JSON.stringify({ frozenAt: new Date().toISOString(), tools, tasks, runs, initialHashes: await hashes(final), candidateHashes: await hashes(candidate), rubric: 'Met/Failed/Unobserved per function, access, scope and craft; no aesthetic score; preserve failed runs' }, null, 2));
console.log(`Prepared ${runs.length} isolated final runs and a frozen candidate.`);
