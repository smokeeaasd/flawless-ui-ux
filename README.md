# flawless-ui-ux

A portable UI/UX skill that guides coding agents from product context and visual direction through implementation, observation, and refinement.

The initial skill package is implemented. OpenCode and Codex are the initial agent targets; end-to-end behavior evaluation is pending. See the [product contract](docs/product-contract.md) and [skill architecture](docs/skill-architecture.md) for its scope and organization.

## Scope

- Context-aware interface critique and refinement.
- Typography, layout, color, UX writing, accessibility, responsive behavior, and edge cases.
- Art direction grounded in the product, audience, and available assets.
- Visual review using capabilities available in the host agent.

A deterministic interface detector, dedicated runtime engine, browser extension, and live editing platform are outside the initial scope.

## Installation

From a local checkout, run one of the following with Bash:

```bash
bash ./install.sh --codex
bash ./install.sh --opencode
bash ./install.sh --all-agents
```

The default target is both agents. Existing installations are preserved; the installer refuses to overwrite them. On Windows, use Git Bash or WSL. The isolated installation smoke tests have been run with Git Bash; WSL has not been tested yet.

For a project-local installation, run the script from the target project's directory:

```bash
bash /path/to/flawless-ui-ux/install.sh --codex --project
```

Replace `--codex` with `--opencode` or `--all-agents` for the other targets. Start a new host session if needed for skill discovery.

## Usage

Describe the result you want in ordinary language:

- "Build a product page around this brief and the available assets."
- "Improve this dashboard's hierarchy while preserving its identity and workflows."
- "Review the pricing page and prioritize the problems without editing it."

The skill selects guidance for the task and uses tools available in the host. It can also be explicitly selected through the host's skill interface; in Codex, use `$flawless-ui-ux`.

## Validation status

Package metadata, internal links and section references, and isolated project installations have passed authoring checks. The installation smoke tests cover the three agent options, paths containing spaces, complete file copies, and refusal to overwrite existing installations.

These checks establish package integrity. Natural-language activation, interface quality, and end-to-end behavior in the host agents still need evaluation.
