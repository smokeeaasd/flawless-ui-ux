#!/usr/bin/env node
import { parse } from '../src/options.js';
import { context } from '../src/context.js';
import { inspect } from '../src/inspect.js';
import { verify } from '../src/verify.js';
import { VERSION } from '../src/shared.js';

const args = process.argv.slice(2);
try {
  const { operation, options } = parse([...args]);
  if (operation === 'version') console.log(VERSION);
  else if (operation === 'help') console.log(`flawless-ui-ux ${VERSION}
  context [--project DIR] [--format text|json]
  inspect [--project DIR] --source FILE [--source FILE ...] [--url URL]
          [--selector CSS] [--viewport WIDTHxHEIGHT ...] [--output NEW_DIR]
          [--timeout MS] [--browser-executable FILE] [--format text|json]
  verify RUN_JSON [--output NEW_DIR] [--browser-executable FILE] [--format text|json]

inspect requires a source or URL. Defaults: 1440x900 and 390x844, 15000 ms.
No server startup, browser download, source edits, or form submission.
FLAWLESS_BROWSER_EXECUTABLE explicitly selects an installed Chromium executable.
Exit codes: 0 completed; 1 confirmed errors; 2 invalid/incomplete.`);
  else {
    const report = await ({ context, inspect, verify }[operation])(options);
    if (options.format === 'json') console.log(JSON.stringify(report, null, 2));
    else {
      console.log(`${operation}: ${report.project}\nCoverage: ${JSON.stringify(report.coverage)} (${report.completion})`);
      for (const f of report.findings) console.log(`[${f.status}/${f.severity}] ${f.checkId} ${f.target}: ${f.observation}\n  ${f.recommendation}`);
      if (report.operation === 'context') console.log(JSON.stringify({ sources: report.sources, missing: report.missing, saved: report.saved, decisions: report.decisions }, null, 2));
      if (report.comparison) console.log(`Comparison: ${JSON.stringify(report.comparison)}`);
      for (const limit of [...report.limits, ...(report.claims || [])]) console.log(`Limit: ${limit}`);
      if (report.artifacts?.manifest) console.log(`Manifest: ${report.artifacts.manifest}`);
    }
    process.exitCode = report.exitCode;
  }
} catch (error) {
  console.error(error.message);
  if (args.includes('json')) console.log(JSON.stringify({ schemaVersion: 1, operation: args[0] || null, completion: 'partial', coverage: {}, findings: [], limits: [error.message], exitCode: 2 }));
  process.exitCode = 2;
}
