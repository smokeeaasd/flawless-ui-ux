# flawless-ui-ux

A portable UI/UX skill that guides coding agents from product context and visual direction through implementation, observation, and refinement.

The initial skill package is implemented. Manual user testing has confirmed that the skill is identified in OpenCode and Codex; broader end-to-end behavior evaluation is pending. See the [product contract](docs/product-contract.md) and [skill architecture](docs/skill-architecture.md) for its scope and organization.

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

The default target is both agents. Existing installations are preserved; the installer refuses to overwrite them. On Windows, use Git Bash or WSL. The Windows installation tests use Git Bash; WSL remains a separate, unverified environment.

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

The automated [package and installation tests](docs/testing.md) use Bun to validate metadata, internal references, UTF-8 text, complete copies, isolated project/global destinations, and preservation of existing files and links. CI runs the suite on Ubuntu and Windows.

These checks establish package integrity. Manual skill identification is confirmed in both initial hosts, while systematic evaluation of invocation methods, interface quality, and end-to-end behavior remains pending.

The [guided manual evaluations](evals/README.md) provide six design scenarios, disposable fixtures, discovery and baseline controls, and a shared report template for that evaluation. The materials are ready; their preparation does not establish completed host runs.
