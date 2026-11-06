import { agents } from './agents.js';
import { planInstallation } from './install.js';
import { VERSION } from './shared.js';
import path from 'node:path';

export function shouldPromptInstall(args, { input = process.stdin, output = process.stdout, env = process.env } = {}) {
  return args.length === 1 && args[0] === 'install' && input.isTTY === true && output.isTTY === true && !env.CI;
}

export class InstallationCancelled extends Error {
  constructor(interrupted) {
    super('Installation cancelled. No files were changed.');
    this.exitCode = interrupted ? 130 : 0;
  }
}

export async function configureInstall(options, { prompts, runtime } = {}) {
  const ui = prompts || await import('@clack/prompts');
  const answer = value => {
    if (ui.isCancel(value)) {
      ui.cancel('Installation cancelled. No files were changed.');
      throw new InstallationCancelled(true);
    }
    return value;
  };
  ui.intro(`flawless-ui-ux ${VERSION}`);
  const scope = answer(await ui.select({
    message: 'Where should the skill be installed?',
    initialValue: 'project',
    options: [
      { value: 'project', label: 'This project', hint: process.cwd() },
      { value: 'global', label: 'Global', hint: 'Available across projects' },
    ],
  }));
  const selected = answer(await ui.multiselect({
    message: 'Which agents should use the skill?',
    options: agents.map(agent => ({ value: agent.id, label: agent.name })),
    required: true,
  }));
  const configured = { ...options, global: scope === 'global', agents: selected };
  // Preview performs the same read-only preflight as the actual installation.
  const plan = await planInstallation(configured, runtime);
  const destinations = plan.uniqueTargets.map(target => {
    const names = plan.targets.filter(candidate => path.relative(target.path, candidate.path) === '').map(candidate => agents.find(agent => agent.id === candidate.agent).name);
    return `${names.join(', ')}\n  ${target.path}`;
  }).join('\n');
  ui.note(`Scope: ${plan.project ? `Project (${plan.project})` : 'Global'}\n\n${destinations}\n\nAgents: ${plan.targets.length} | Skill copies: ${plan.uniqueTargets.length}\nExisting installations will not be overwritten.`, 'Installation summary');
  const confirmed = answer(await ui.confirm({ message: 'Install this configuration?', initialValue: true }));
  if (!confirmed) {
    ui.cancel('Installation cancelled. No files were changed.');
    throw new InstallationCancelled(false);
  }
  ui.outro('Configuration confirmed.');
  return configured;
}
