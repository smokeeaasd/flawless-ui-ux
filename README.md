# flawless-ui-ux

A portable UI/UX skill that guides coding agents from product context and visual direction through implementation, observation, and refinement.

The [design philosophy](docs/product-contract.md#design-philosophy) connects product intent to specific visual decisions, treats function and expression as quality, and develops identity through refinement and observed evidence.

The shared package implements creation, redesign, refinement, and review procedures, composed with guidance for data interfaces, forms and journeys, and content interfaces. See the [product contract](docs/product-contract.md), [workflow procedures](docs/workflow-procedures.md), and [skill architecture](docs/skill-architecture.md) for its scope and organization. Systematic host evaluation of the expanded workflows is pending.

## Scope

- Complete, task-specific creation, redesign, refinement, and review workflows.
- Decisions for records and actions, input and state transitions, and persuasion, reading, or exploration paths.
- Typography, layout, color, UX writing, accessibility, responsive behavior, and edge cases.
- Art direction grounded in the product, audience, and available assets.
- Original visual studies for service offers, operational workspaces, editorial guides, and visual collections, with adaptation guidance and concrete design targets.
- Product-fit decisions for composition, typography, density, and references, with scoped WCAG 2.2 accessibility acceptance and evidence-based review.
- Refinement that preserves visual character, with an editorial pass for authorized copy changes and distinct checks for craft, scope, and informational repetition.
- Conditional visual calibration for presence, competing emphasis, and finish, with proportional interventions and comparison against the existing intention.
- Contextual AI slop prevention covering composition, visual language, typography, copy, imagery, interaction, motion, and resilient delivery.
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

Describe the outcome and relevant boundaries in ordinary language:

| Request | Typical procedure and task guidance |
|---|---|
| "Develop subscription management using this product's existing rules, components, and integrations." | Create + forms and journeys; inherit the existing identity |
| "Redesign the repair queue while preserving records, filters, and ready-for-pickup behavior." | Redesign + data interfaces |
| "Build a searchable knowledge collection with article views and a useful return path." | Create + content exploration and reading |
| "Improve only the heading hierarchy; preserve colors, layout, wording, and behavior." | Refine + focused typography guidance |
| "Review the pricing page and prioritize the problems without editing files." | Review + content persuasion |

The skill selects guidance for the task and uses tools available in the host. It can also be explicitly selected through the host's skill interface; in Codex, use `$flawless-ui-ux`.

Procedure selection is internal to the skill. Each procedure defines the investigation, decisions, implementation or findings, verification, and completion criteria relevant to the task. Supporting detail is loaded as needed; a focused change does not require a complete redesign process. The [procedure specification](docs/workflow-procedures.md) documents the operating model and worked routing examples.

[AI slop prevention](skills/flawless-ui-ux/references/anti-slop.md) is part of direction and review. It connects concrete warning signals to their consequences, legitimate uses, alternatives, and verification, while preserving intentional brand choices and useful content. It does not assign authorship from appearance or require a particular visual style.

Use the relevant prevention sections for concrete concerns rather than an exhaustive style check. Clear conventional layouts and descriptive copy are valid outcomes; custom design does not require symbolic concepts or slogans throughout the page.

## Validation status

The automated [package and installation tests](docs/testing.md) use Bun to validate metadata, internal references, UTF-8 text, complete copies, isolated project/global destinations, and preservation of existing files and links. CI runs the suite on Ubuntu and Windows.

These checks establish package integrity. Earlier manual user testing confirmed identification in both initial hosts and a satisfactory initial result. Those observations predate the expanded procedures; systematic evaluation of their invocation, interface quality, and end-to-end behavior remains pending.

Later user feedback reported improved colors and hierarchy across multiple models with minimal prompts, with limited personalization. The exact run conditions were not recorded. That feedback is separate from the unperformed systematic round and does not validate the new reference-guided studies.

The [guided manual evaluations](evals/README.md) provide seven core design scenarios, disposable fixtures, discovery and baseline controls, optional refinement follow-ups, and a shared report template. These include contextual prevention, intentional brand preservation, and copy contribution. The materials are ready; their preparation does not establish completed host runs.
