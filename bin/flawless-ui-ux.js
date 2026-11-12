#!/usr/bin/env node
import { parse } from '../src/options.js';
import { context } from '../src/context.js';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { install } from '../src/install.js';
import { VERSION } from '../src/shared.js';
import { configureInstall, shouldPromptInstall, InstallationCancelled } from '../src/install-prompts.js';

const args = process.argv.slice(2);
try {
  const { operation, options: parsed } = parse([...args]);
  const options = operation === 'install' && shouldPromptInstall(args) ? await configureInstall(parsed) : parsed;
  if (operation === 'version') console.log(VERSION);
  else if (operation === 'help') console.log(`flawless-ui-ux ${VERSION}
  install [AGENT ...] [--global | --project DIR]
          [--yes] [--format text|json]
  context [--project DIR] [--source DOCUMENT.md ...] [--format text|json]
  inspect [--project DIR] [--source FILE ...] [--url URL ...]
          [--flow FILE] [--consistency]
          [--selector CSS] [--viewport WIDTHxHEIGHT ...] [--output NEW_DIR]
          [--timeout MS] [--browser-executable FILE] [--format text|json]
  verify RUN_JSON [--flow FILE] [--output NEW_DIR] [--browser-executable FILE] [--format text|json]

Agent selectors (combine individual flags): --codex, --opencode, --antigravity, --kiro,
  --cursor, --kilo, --copilot, --claude-code, --pi, --grok-build, --devin,
  --deepseek-harness, --all-agents.
Bare install opens scope, agent selection, and confirmation in a terminal.
Explicit flags skip prompts. Use --yes for the default all-agent project install.
Without a terminal, or in CI, bare install keeps the all-agent project default.
Use --global for user-wide installation. Shared destinations are copied once.
Existing installations are preserved.
inspect requires a source or URL. Defaults: 1440x900 and 390x844, 15000 ms.
Ordinary inspection is observational. --flow explicitly runs selected UI actions; non-read-only network requests are blocked.
Inspection does not start servers, download browsers, or edit sources.
FLAWLESS_BROWSER_EXECUTABLE explicitly selects an installed Chromium executable.
Exit codes: 0 completed/declined; 1 confirmed errors; 2 invalid/incomplete;
  130 interrupted installation.`);
  else {
    const report = await ({ install, context, inspect, verify }[operation])(options);
    if (options.format === 'json') console.log(JSON.stringify(report, null, 2));
    else {
      if (operation === 'install') {
        for (const target of report.installations) console.log(`Installed flawless-ui-ux for ${target.agent} (${target.scope}): ${target.path}`);
      } else console.log(`${operation}: ${report.project}\nCoverage: ${JSON.stringify(report.coverage)} (${report.completion})`);
      for (const f of report.findings) console.log(`[${f.status}/${f.severity}] ${f.checkId} ${f.target}: ${f.observation}\n  ${f.recommendation}`);
      if (report.operation === 'context') console.log(JSON.stringify({ sources: report.sources, missing: report.missing, documents: report.documents, saved: report.saved, decisions: report.decisions }, null, 2));
      if (report.flow) console.log(`Flow: ${JSON.stringify(report.flow)}`);
      if (report.consistency) console.log(`Consistency: ${JSON.stringify(report.consistency)}`);
      if (report.comparison) console.log(`Comparison: ${JSON.stringify(report.comparison)}`);
      for (const limit of [...report.limits, ...(report.claims || [])]) console.log(`Limit: ${limit}`);
      if (report.artifacts?.manifest) console.log(`Manifest: ${report.artifacts.manifest}`);
    }
    process.exitCode = report.exitCode;
  }
} catch (error) {
  if (error instanceof InstallationCancelled) {
    process.exitCode = error.exitCode;
  } else {
    console.error(error.message);
    if (args.includes('json')) console.log(JSON.stringify({ schemaVersion: args[0] === 'install' ? 1 : 2, operation: args[0] || null, completion: 'partial', coverage: {}, findings: [], limits: [error.message], exitCode: 2 }));
    process.exitCode = 2;
  }
}
