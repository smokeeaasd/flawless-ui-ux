// Run one already prepared isolated Beam session. Trace stays outside the repo.
// node evals/scripts/run-beam.mjs <absolute-run-directory> <opencode-executable>
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
const run = path.resolve(process.argv[2]);
const executable = process.argv[3];
const prompt = await fs.readFile(path.join(run, 'prompt.txt'), 'utf8');
const config = path.join(run, 'runner-config');
await fs.mkdir(config, { recursive: false });
await fs.writeFile(path.join(config, 'opencode.json'), JSON.stringify({ $schema: 'https://opencode.ai/config.json', model: 'opencode/beam-free#medium', permission: { skill: 'deny', task: 'deny', external_directory: 'deny' } }));
const started = Date.now();
const child = spawn(executable, ['run', '--standalone', '--model', 'opencode/beam-free#medium', '--format', 'json', '--auto', '--title', path.basename(run), prompt], { cwd: run, env: { ...process.env, OPENCODE_CONFIG_DIR: config }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
let stdout = '', stderr = '', timedOut = false;
child.stdout.on('data', data => { stdout += data.toString(); });
child.stderr.on('data', data => { stderr += data.toString(); });
const timer = setTimeout(() => { timedOut = true; child.kill(); }, 15 * 60 * 1000);
const exit = await new Promise(resolve => { child.on('error', error => resolve({ error: error.message })); child.on('exit', (code, signal) => resolve({ code, signal })); });
clearTimeout(timer);
await fs.writeFile(path.join(run, 'runner-trace.jsonl'), stdout);
await fs.writeFile(path.join(run, 'runner-stderr.txt'), stderr);
const record = { modelRequested: 'opencode/beam-free#medium', reasoningRequested: 'medium', startedAt: new Date(started).toISOString(), elapsedSeconds: (Date.now() - started) / 1000, timedOut, ...exit };
await fs.writeFile(path.join(run, 'runner.json'), JSON.stringify(record, null, 2));
console.log(JSON.stringify({ run: path.basename(run), ...record }));
