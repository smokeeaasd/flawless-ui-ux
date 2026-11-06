import path from 'node:path';

const agentOptions = ['codex', 'opencode', 'antigravity', 'kiro', 'cursor', 'kilo', 'copilot', 'claude-code', 'pi', 'all-agents'];

export function validateInspection(options) {
  options.sources = [...new Set(options.sources.map(source => source.replaceAll('\\', '/')))];
  if (!options.sources.length && !options.url) throw new Error('Provide at least one --source or --url.');
  if (!options.url && (options.selector || options.viewports.length || options.browserExecutable)) throw new Error('Selector, viewport, and browser options require --url.');
  if (options.url) {
    const url = new URL(options.url);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('URL must be HTTP(S), without credentials.');
    options.url = url.href;
    if (!options.viewports.length) options.viewports = [{ width: 1440, height: 900 }, { width: 390, height: 844 }];
  }
  if (!Number.isInteger(options.timeout) || options.timeout < 100 || options.timeout > 60000) throw new Error('Timeout must be 100–60000 milliseconds.');
  if (options.viewports.length > 8 || options.viewports.some(v => !Number.isInteger(v.width) || !Number.isInteger(v.height) || v.width < 100 || v.height < 100 || v.width > 7680 || v.height > 7680)) throw new Error('Use at most eight viewports, each between 100 and 7680 pixels.');
  if (options.browserExecutable) options.browserExecutable = path.resolve(options.browserExecutable);
  return options;
}

export function parse(argv) {
  const operation = argv.shift();
  const options = { project: '.', sources: [], viewports: [], timeout: 15000, format: 'text' };
  if (['--help', '-h', undefined].includes(operation)) return { operation: 'help', options };
  if (operation === '--version') return { operation: 'version', options };
  if (!['install', 'context', 'inspect', 'verify'].includes(operation)) throw new Error(`Unknown operation: ${operation}`);
  if (argv.length === 1 && ['--help', '-h'].includes(argv[0])) return { operation: 'help', options };
  if (operation === 'install') { options.project = undefined; options.agent = 'all'; }
  if (operation === 'verify') {
    options.baseline = argv.shift();
    if (!options.baseline || options.baseline.startsWith('--')) throw new Error('verify requires a run.json path.');
  }
  const seen = new Set();
  const allowed = operation === 'install' ? [...agentOptions, 'global', 'project', 'format'] : operation === 'context' ? ['project', 'format'] : operation === 'verify' ? ['output', 'format', 'browser-executable'] : ['project', 'source', 'url', 'selector', 'viewport', 'output', 'format', 'timeout', 'browser-executable'];
  while (argv.length) {
    const flag = argv.shift();
    if (!flag.startsWith('--') || !allowed.includes(flag.slice(2))) throw new Error(`Unknown option: ${flag}`);
    const name = flag.slice(2);
    if (seen.has(name) && !['source', 'viewport'].includes(name)) throw new Error(`Repeated option: ${flag}`);
    if (operation === 'install' && agentOptions.includes(name)) {
      if (agentOptions.some(agent => seen.has(agent))) throw new Error('Select one agent option, or use --all-agents for all supported agents.');
      options.agent = name === 'all-agents' ? 'all' : name;
      seen.add(name);
      continue;
    }
    seen.add(name);
    if (operation === 'install' && name === 'global') { options.global = true; continue; }
    const value = argv.shift();
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${flag}`);
    if (name === 'source') options.sources.push(value);
    else if (name === 'viewport') {
      const match = /^(\d+)x(\d+)$/.exec(value);
      if (!match) throw new Error('Viewport must be WIDTHxHEIGHT.');
      options.viewports.push({ width: Number(match[1]), height: Number(match[2]) });
    } else options[{ 'browser-executable': 'browserExecutable' }[name] || name] = name === 'timeout' ? Number(value) : value;
  }
  if (!['text', 'json'].includes(options.format)) throw new Error('Format must be text or json.');
  if (operation === 'install' && seen.has('global') && seen.has('project')) throw new Error('Choose --global or --project, not both.');
  if (operation === 'inspect' && options.url) options.browserExecutable ||= process.env.FLAWLESS_BROWSER_EXECUTABLE;
  if (operation === 'inspect') validateInspection(options);
  return { operation, options };
}
