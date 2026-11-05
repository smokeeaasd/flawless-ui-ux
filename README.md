# flawless-ui-ux

A local design and UI/UX toolkit for coding agents, connecting product-specific decisions, implementation, inspection, and correction.

**Current delivery:** the installable product is the portable skill described below. The local CLI, inspection core, and browser adapter are specified but not implemented. See the [delivery plan](docs/implementation-plan.md) for the first functional slice and acceptance gates.

The [design philosophy](docs/product-contract.md#design-philosophy) connects product intent to specific visual decisions, treats function and expression as quality, and develops identity through refinement and observed evidence.

The current skill supports creation, redesign, refinement, and review through a direct working path and focused references. The revised [product contract](docs/product-contract.md), [workflow guide](docs/workflow-procedures.md), and [architecture](docs/skill-architecture.md) define the transition to a shared executable core. Post-change design and performance benefits remain unverified.

## Scope

- Direct creation, redesign, refinement, and review with clear scope boundaries.
- Decisions for records and actions, input and state transitions, and persuasion, reading, or exploration paths.
- Typography, layout, color, UX writing, accessibility, responsive behavior, and edge cases.
- Art direction grounded in the product, audience, and available assets.
- Original visual studies for service offers, operational workspaces, editorial guides, and visual collections, with adaptation guidance and concrete design targets.
- Product-fit decisions for composition, typography, density, and references, with scoped WCAG 2.2 accessibility acceptance and evidence-based review.
- Refinement that preserves visual character, with an editorial pass for authorized copy changes and distinct checks for craft, scope, and informational repetition.
- Conditional visual calibration for presence, competing emphasis, and finish, with proportional interventions and comparison against the existing intention.
- Contextual AI slop prevention covering composition, visual language, typography, copy, imagery, interaction, motion, and resilient delivery.
- Visual review using capabilities available in the host agent.

The planned first functional delivery adds project context, source/browser inspection, and before/after verification through a Node-compatible CLI developed with Bun. The [CLI contract](docs/cli-contract.md) specifies context, inspect, and verify; these operations are not yet available. Automatic host integrations follow the validated core. Extension overlays, live editing, and native mobile are later candidates.

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

| Request | Relevant guidance |
|---|---|
| "Develop subscription management using this product's existing rules, components, and integrations." | Product structure and relevant interaction detail |
| "Redesign the repair queue while preserving records, filters, and ready-for-pickup behavior." | Direction and record relationships |
| "Build a searchable knowledge collection with article views and a useful return path." | Direction, discovery, and reading structure |
| "Improve only the heading hierarchy; preserve colors, layout, wording, and behavior." | Focused typography detail if needed |
| "Review the pricing page and prioritize the problems without editing files." | Review and relevant content questions |

The skill selects guidance for the task and uses tools available in the host. It can also be explicitly selected through the host's skill interface; in Codex, use `$flawless-ui-ux`.

The entry point handles the intervention directly. For a new visual direction, start with Direction; use other reference sections for particular questions rather than reading the package in sequence. The [workflow guide](docs/workflow-procedures.md) documents scope and completion without separate procedure files.

[Contextual prevention](skills/flawless-ui-ux/references/anti-slop.md#final-pass) includes a short final check of created or redesigned interfaces for cumulative arrow/icon use, repeated slogans, and unsuitable composition. Focused refinements check only the affected scope. Diagnosis preserves intentional brand choices and useful content; it does not assign authorship from appearance or require a particular visual style.

Use the relevant prevention sections for concrete concerns rather than an exhaustive style check. Clear conventional layouts and descriptive copy are valid outcomes; custom design does not require symbolic concepts or slogans throughout the page.

## Validation status

The automated [package and installation tests](docs/testing.md) use Bun to validate metadata, internal references, UTF-8 text, complete copies, isolated project/global destinations, and preservation of existing files and links. CI runs the suite on Ubuntu and Windows.

These checks establish package integrity. Earlier manual user testing confirmed identification in both initial hosts and a satisfactory initial result. Those observations predate the expanded procedures; systematic evaluation of their invocation, interface quality, and end-to-end behavior remains pending.

Later user feedback reported improved colors and hierarchy across multiple models with minimal prompts, with limited personalization. The exact run conditions were not recorded. That feedback is separate from the unperformed systematic round and does not validate the new reference-guided studies.

The [guided manual evaluations](evals/README.md) provide seven core design scenarios, disposable fixtures, discovery and baseline controls, optional refinement follow-ups, and a shared report template. These include contextual prevention, intentional brand preservation, and copy contribution. The materials are ready; their preparation does not establish completed host runs.

The simplified package reduces available Markdown from 18,551 to 4,553 words and removes overlapping routing layers. This is an authoring measurement, not a measured speed or design improvement. The [instruction-efficiency comparison](evals/cases/11-instruction-efficiency.md) is prepared and remains pending.
