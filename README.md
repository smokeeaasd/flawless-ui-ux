<p align="center">
  <img src="https://cdn.jsdelivr.net/npm/flawless-ui-ux@0.1.1/docs/assets/logo.svg" alt="flawless-ui-ux" width="334" height="80">
</p>

<p align="center">Design interfaces around the product. Refine them against the result.</p>

flawless-ui-ux helps coding agents create, redesign, and refine web interfaces with a visual identity suited to the product. A skill guides design and implementation; a local CLI collects evidence and checks what changed after corrections. Supports **Codex, OpenCode, Antigravity, Kiro, Cursor, Kilo Code, GitHub Copilot CLI, Claude Code, Pi, Grok Build, Devin CLI, and DeepSeek Harness**.

## Setup

From your project directory, choose your package manager to open the installation menu. The CLI requires **Node 22.12+**; no checkout or Bash is needed.

```bash
npx flawless-ui-ux@latest install
pnpm dlx flawless-ui-ux@latest install
bunx flawless-ui-ux@latest install
```

Run one of these commands. Choose **this project or global installation**, select **one or more agents** with Space, then confirm the destination summary. Enter continues; Ctrl+C cancels before any installation files are written. The examples below use `npx`; replace it with `pnpm dlx` or `bunx` to use the same operations.

### Choose an agent and scope

For a specific agent, or an installation across projects:

```bash
npx flawless-ui-ux install --codex
npx flawless-ui-ux install --codex --devin
npx flawless-ui-ux install --claude-code
npx flawless-ui-ux install --pi --global
npx flawless-ui-ux install --yes
```

Explicit flags skip the menu. Combine individual agent flags to choose several, or use `--all-agents` for all supported agents. `--yes` directly installs for all supported agents in the current project when no other selection is supplied. Without a terminal, or in CI, bare install retains that same all-agent project default. `--format json` always remains noninteractive.

Choose agents with their flags:

| Agent | Flag |
|---|---|
| Codex | `--codex` |
| OpenCode | `--opencode` |
| Antigravity | `--antigravity` |
| Kiro | `--kiro` |
| [Cursor](https://cursor.com/help/customization/skills) | `--cursor` |
| [Kilo Code](https://kilo.ai/docs/customize/skills) | `--kilo` |
| [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills) | `--copilot` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `--claude-code` |
| [Pi](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md) | `--pi` |
| [Grok Build](https://docs.x.ai/build/features/skills-plugins-marketplaces) | `--grok-build` |
| [Devin CLI](https://docs.devin.ai/cli/extensibility/skills/overview) | `--devin` |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/skills.md) | `--deepseek-harness` |

`--global` explicitly installs in your user profile; `--project <directory>` selects another project. Start a new agent session if needed for discovery.

Codex, Antigravity, Cursor, Kilo, Copilot, Pi, Devin, and DeepSeek Harness share `.agents/skills/flawless-ui-ux` in a project; the installer copies it once. An existing copy there is already available to those agents. OpenCode uses `.opencode/skills`, Kiro uses `.kiro/skills`, Claude Code uses `.claude/skills`, and Grok Build uses `.grok/skills`, each containing the same `flawless-ui-ux` bundle.

Existing installations are never overwritten, including links and local changes. All selected destinations are checked before copying. Review or remove an existing installation yourself before reinstalling. Global paths honor the host's configuration directory, including `GROK_HOME`, `DSH_HOME`, and Devin's `%APPDATA%` on Windows or `XDG_CONFIG_HOME` elsewhere. The [CLI contract](docs/cli-contract.md#install) lists all destinations and overrides.

Grok Build requires project-folder trust before it exposes project skills. DeepSeek Harness resolves project skills from the nearest Git root; install from that root, or from the working directory for a project without Git. Installation does not change host trust, permissions, or custom discovery settings.

<details>
<summary>Alternative: install from a checkout with Bash</summary>

```bash
bash ./install.sh --codex --project
bash ./install.sh --claude-code --project
bash ./install.sh --pi --project
```

Run these from the target project's directory, using the script's absolute path when the checkout is elsewhere. Use `--all-agents` for all supported agents. The legacy Bash script requires `--project` for local installation and otherwise installs globally. On Windows, this alternative requires Git Bash or WSL.

</details>

## Use the skill

In Codex, select `$flawless-ui-ux` and describe what you want to build:

```text
Use $flawless-ui-ux to build a financial dashboard for freelancers.
```

Use the host's invocation method with your task:

| Agent | Invocation |
|---|---|
| Codex | `$flawless-ui-ux` |
| OpenCode, DeepSeek Harness | Request the `flawless-ui-ux` skill by name |
| Antigravity, Kiro, Cursor, Kilo, Copilot CLI, Claude Code, Grok Build, Devin CLI | `/flawless-ui-ux` followed by the task, or request the skill by name |
| Pi | `/skill:flawless-ui-ux` followed by the task |

Custom Kiro agents can include skills through `skill://` entries in their `resources`. Installation preserves host rules, custom agents, plugins, and permissions. Host versions can differ in command discovery and name-collision handling; see the linked host documentation and the recorded compatibility evidence for [Cursor through Pi](docs/testing.md#additional-agent-support) and [Grok, Devin, and DeepSeek](docs/testing.md#grok-build-devin-cli-and-deepseek-harness).

Continue in the same conversation to develop the result:

| Goal | Example request |
|---|---|
| Create | Build a landing page for a DevOps app that coordinates deployments and incident handoffs. |
| Redesign | Redesign the mobile account screen using the supplied brand palette. Preserve its content and behavior. |
| Refine | Strengthen the main action and improve hierarchy while preserving the page's visual character. |
| Focus | Improve typography and spacing. Preserve wording, colors, and functionality. |
| Review | Review this dashboard for readability, navigation, repeated slogans, and redundant icon cues. Report findings without editing files. |

The skill connects product intent to composition, typography, color, density, imagery, and interaction. It works with your project's stack and existing constraints, using focused references when they answer a design question. Refinement can add presence, redistribute emphasis, or improve finish; it does not prescribe a universal aesthetic.

## Inspect and verify

Use the CLI directly or have your agent run it as part of the task. Design and corrections stay with you and your agent; the CLI supplies observations and comparisons.

### 1. Inspect the affected scope

Start with project context or selected source files:

```bash
npx flawless-ui-ux context --project . --format json
npx flawless-ui-ux inspect --project . --source src/App.tsx --format json
```

For rendered checks, start your application and prepare a browser using one of these commands:

```bash
# npm
npx playwright@1.64.1 install chromium

# pnpm
pnpm dlx playwright@1.64.1 install chromium

# Bun
bunx playwright@1.64.1 install chromium
```

The version matches the CLI's browser adapter. Alternatively, select an installed compatible Chromium executable with `--browser-executable` or `FLAWLESS_BROWSER_EXECUTABLE`.

Inspect the actual development-server URL and save a baseline:

```bash
npx flawless-ui-ux inspect --project . --source src/App.tsx --url http://localhost:5173 --output ../app-before --format json
```

Repeat `--source` for additional files, use `--selector` for a specific region, or repeat `--viewport WIDTHxHEIGHT` to select widths. Default samples are **1440×900** and **390×844**.

### 2. Correct and compare

Review the findings, make the relevant corrections, then repeat the saved scope:

```bash
npx flawless-ui-ux verify ../app-before/run.json --output ../app-after --format json
```

Verification separates persistent, new, and no-longer-observed findings. A missing confirmed target or changed conditions remain unverified instead of being counted as a repair. Keep the same browser selection between runs.

Without `--output`, results go to stdout. With it, a new directory receives `run.json` and any screenshots; the parent must already exist. Existing output directories are never overwritten. For review-only work, keep artifacts outside the project.

## What gets checked

| Area | Evidence |
|---|---|
| Accessibility | Selected axe contrast and accessible-name rules, with upstream evidence and incomplete results retained. |
| Readability and layout | Computed text sizes and horizontal overflow at the requested widths. |
| Assets and runtime | Visible broken images and uncaught JavaScript errors in the sampled state. |
| Copy and icons | Exact repeated phrases and arrow cues for contextual review. |
| Source | Literal pixel font sizes and arrow/icon cues in selected files. |

Small text, overflow, and repetition require judgment. A small font size alone is not a WCAG failure, and an arrow count does not determine whether an interface is good. The skill's contextual review considers what each element contributes to the product.

Inspection does not edit sources, start servers, download browsers, or submit forms. These initial-state samples do not establish full WCAG conformance, keyboard journeys, business-flow correctness, or visual quality.

| Exit code | Meaning |
|---|---|
| `0` | Requested coverage completed without confirmed errors. |
| `1` | Requested coverage completed with confirmed errors. |
| `2` | Invalid input or incomplete requested coverage. |

## Development

Use the pinned Bun toolchain from a local checkout:

```bash
bun install --frozen-lockfile
bun test
```

See the [testing guide](docs/testing.md) for browser fixtures, distribution checks, and Windows/Ubuntu CI. Automated tests validate runtime and packaging behavior; matched host/model evaluations of design quality and elapsed time remain pending in the [manual evaluation kit](evals/README.md).

## Documentation

- [CLI options, saved context, and comparison limits](docs/cli-contract.md)
- [Design philosophy and product contract](docs/product-contract.md)
- [Workflow guide](docs/workflow-procedures.md)
- [Architecture](docs/skill-architecture.md)
- [Delivery plan](docs/implementation-plan.md)
- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE).
