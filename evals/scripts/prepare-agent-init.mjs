import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const destination = process.argv[2];
if (!destination || !path.isAbsolute(destination)) throw new Error('Supply a new absolute external round directory.');
const root = path.resolve(destination);
const relative = path.relative(repository, root);
if (!relative || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) {
  throw new Error('Keep evaluation workspaces outside the repository.');
}
// Resolve the existing parent as well, so a path alias cannot put a run in the checkout.
const parent = await fs.realpath(path.dirname(root));
const canonical = path.join(parent, path.basename(root));
const canonicalRepository = await fs.realpath(repository);
const within = path.relative(canonicalRepository, canonical);
if (!within || (!within.startsWith(`..${path.sep}`) && within !== '..' && !path.isAbsolute(within))) {
  throw new Error('Evaluation destination resolves inside the repository.');
}

const skill = path.join(repository, 'skills/flawless-ui-ux');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
async function hashes(directory, prefix = '') {
  const result = {};
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) Object.assign(result, await hashes(source, name));
    else if (entry.isFile()) result[name] = hash(await fs.readFile(source));
    else throw new Error(`Not a regular skill file: ${source}`);
  }
  return result;
}
const inputs = JSON.parse(await fs.readFile(path.join(repository, 'evals/cases/19-agent-init.json'), 'utf8'));
const candidateFiles = await hashes(skill);
const instructions = 'This is an isolated behavior evaluation. Work only in this run directory. The product project is project/. The bundled local-skill is the skill under test, not product context. Do not inspect parent directories or other runs. Do not use other skills, Sites, delegation, dependencies, remote assets or services. For this controlled test, structured user-input tools are unavailable: ask in chat and stop the turn when a reply is needed. The evaluator will supply scripted replies in a follow-up. Do not contact the real user. Follow the skill and task scope. Evidence notes may be written only in evidence/, outside the product project. A supplied reply is simulated test data, not permission outside this fixture.\n';
await fs.mkdir(canonical); // Exclusive: never overwrite an existing round.
const cases = [];
for (const { id, request, scriptedReply, files } of inputs.cases) {
  const run = path.join(canonical, 'cases', id);
  await fs.mkdir(path.join(run, 'project'), { recursive: true });
  await fs.mkdir(path.join(run, 'evidence'));
  await fs.cp(skill, path.join(run, 'local-skill'), { recursive: true, errorOnExist: true, force: false });
  await fs.writeFile(path.join(run, 'AGENTS.md'), instructions, { flag: 'wx' });
  await fs.writeFile(path.join(run, 'task.txt'), `${request}\n`, { flag: 'wx' });
  const initialFiles = {};
  for (const [name, content] of Object.entries(files)) {
    const target = path.join(run, 'project', name);
    const local = path.relative(path.join(run, 'project'), target);
    if (!local || local.startsWith('..') || path.isAbsolute(local)) throw new Error(`Invalid fixture path: ${name}`);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, { flag: 'wx' });
    initialFiles[name] = hash(Buffer.from(content));
  }
  cases.push({ id, request, scriptedReply, initialFiles });
}
await fs.writeFile(path.join(canonical, 'protocol.json'), JSON.stringify({
  method: 'isolated scripted chat reply evaluations; structured question tool is deliberately unavailable; read-only case is instructed, not enforced by OS ACL',
  cases, candidateFiles,
}, null, 2) + '\n', { flag: 'wx' });
console.log(`Prepared ${cases.length} independent cases in ${canonical}. No agents were launched.`);
