import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
const repository = fileURLToPath(new URL('../../', import.meta.url));
const project = path.join(repository, 'skills/flawless-ui-ux/assets/examples');
const output = path.resolve(process.argv[2]);
await fs.mkdir(output);
const port = process.argv[3] ?? '4187';
const server = spawn(process.execPath, [path.join(project, 'serve.mjs'), port], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
async function run(args) {
  const child = spawn(process.execPath, [path.join(repository, 'bin/flawless-ui-ux.js'), ...args], { cwd: project, env: process.env, windowsHide: true });
  let stdout = '', stderr = '';
  child.stdout.on('data', x => { stdout += x; }); child.stderr.on('data', x => { stderr += x; });
  const code = await new Promise((resolve, reject) => { child.on('error', reject); child.on('exit', resolve); });
  if (![0, 1].includes(code)) throw new Error(`Incomplete CLI run: ${code} ${stderr} ${stdout.slice(0, 500)}`);
  return { code, report: JSON.parse(stdout) };
}
try {
  await new Promise((resolve, reject) => { server.once('error', reject); server.stdout.once('data', resolve); server.once('exit', code => reject(new Error(`Server exited ${code}`))); });
  const inspected = await run(['inspect', '--project', project, '--source', 'form.html', '--url', `http://127.0.0.1:${port}/form.html`, '--flow', 'inquiry.flow.json', '--output', path.join(output, 'inspect'), '--format', 'json']);
  const verified = await run(['verify', path.join(output, 'inspect/run.json'), '--flow', 'inquiry.flow.json', '--output', path.join(output, 'verify'), '--format', 'json']);
  const summary = { inspect: { code: inspected.code, coverage: inspected.report.coverage }, verify: { code: verified.code, coverage: verified.report.coverage }, limit: 'Unchanged example replay establishes CLI compatibility, not a measured repair or full accessibility.' };
  await fs.writeFile(path.join(output, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary));
} finally { server.kill(); }
