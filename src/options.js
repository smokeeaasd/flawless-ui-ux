import path from 'node:path';
import { agents } from './agents.js';

const agentOptions = [...agents.map(agent => agent.id), 'all-agents'];

export function validateInspection(options) {
  options.sources = [...new Set(options.sources.map(source => source.replaceAll('\\', '/')))];
  options.urls ||= options.url ? [options.url] : [];
  if (options.url && options.urls[0] !== options.url) options.urls = [options.url, ...options.urls.slice(1)];
  options.urls = [...new Set(options.urls.map(value => {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('URL must be HTTP(S), without credentials.');
    return url.href;
  }))];
  options.url = options.urls[0];
  if (options.urls.length > 8) throw new Error('Use at most eight URLs.');
  if (options.flow && !options.url) throw new Error('--flow requires --url.');
  if (options.consistency && options.urls.length < 2) throw new Error('--consistency requires at least two distinct URLs.');
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
  if (options.urls.length * options.viewports.length > 16) throw new Error('Use at most sixteen URL/viewport combinations.');
  if (options.browserExecutable) options.browserExecutable = path.resolve(options.browserExecutable);
  options.viewports = options.viewports.filter((viewport, index, all) => all.findIndex(other => other.width === viewport.width && other.height === viewport.height) === index);
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
  const selectedAgents = [];
  const allowed = operation === 'install' ? [...agentOptions, 'global', 'project', 'format', 'yes'] : operation === 'context' ? ['project', 'format', 'source'] : operation === 'verify' ? ['output', 'format', 'browser-executable', 'flow'] : ['project', 'source', 'url', 'selector', 'viewport', 'output', 'format', 'timeout', 'browser-executable', 'flow', 'consistency'];
  while (argv.length) {
    const flag = argv.shift();
    if (!flag.startsWith('--') || !allowed.includes(flag.slice(2))) throw new Error(`Unknown option: ${flag}`);
    const name = flag.slice(2);
    if (seen.has(name) && !['source', 'viewport', 'url'].includes(name)) throw new Error(`Repeated option: ${flag}`);
    if (operation === 'install' && agentOptions.includes(name)) {
      if (seen.has('all-agents') || (name === 'all-agents' && selectedAgents.length)) throw new Error('Choose individual agents or --all-agents, not both.');
      if (name !== 'all-agents') selectedAgents.push(name);
      seen.add(name);
      continue;
    }
    seen.add(name);
    if (operation === 'install' && name === 'global') { options.global = true; continue; }
    if (operation === 'install' && name === 'yes') { options.yes = true; continue; }
    if (name === 'consistency') { options.consistency = true; continue; }
    const value = argv.shift();
    if (!value || value.startsWith('--')) throw new Error(`Missing value for ${flag}`);
    if (name === 'source') options.sources.push(value);
    else if (name === 'url') { options.urls ||= []; options.urls.push(value); }
    else if (name === 'viewport') {
      const match = /^(\d+)x(\d+)$/.exec(value);
      if (!match) throw new Error('Viewport must be WIDTHxHEIGHT.');
      options.viewports.push({ width: Number(match[1]), height: Number(match[2]) });
    } else options[{ 'browser-executable': 'browserExecutable' }[name] || name] = name === 'timeout' ? Number(value) : value;
  }
  if (!['text', 'json'].includes(options.format)) throw new Error('Format must be text or json.');
  if (selectedAgents.length === 1) options.agent = selectedAgents[0];
  else if (selectedAgents.length > 1) { delete options.agent; options.agents = selectedAgents; }
  if (operation === 'install' && seen.has('global') && seen.has('project')) throw new Error('Choose --global or --project, not both.');
  if (operation === 'context' && (options.sources.length > 8 || options.sources.some(source => !/\.md$/i.test(source)))) throw new Error('Context accepts at most eight Markdown --source files.');
  if (operation === 'inspect' && (options.url || options.urls?.length)) options.browserExecutable ||= process.env.FLAWLESS_BROWSER_EXECUTABLE;
  if (operation === 'inspect') validateInspection(options);
  return { operation, options };
}
