# Product contract

Agreed on November 3, 2026. This document defines the intended behavior of flawless-ui-ux. Implementation and validation status are recorded in the [project overview](../README.md#validation-status).

## Purpose

flawless-ui-ux guides coding agents to create and evolve interfaces with a distinctive visual direction and strong usability. Decisions follow the product, audience, content, user task, and project constraints. The work continues through implementation, observation, and correction.

The skill combines contextual art direction with focused UI/UX review and refinement. Its guidance connects visual decisions, implementation quality, and usability throughout a single adaptive workflow.

## Audience

The skill serves people using coding agents to build or improve web interfaces, including promotional pages, product interfaces, dashboards, and reading experiences.

OpenCode and Codex are the initial host agents. Additional agents may be supported when their behavior can be tested through an available free tier or local model. Format compatibility alone does not establish tested support.

## User experience

Users describe the result they want in ordinary language. Examples include building a product page, improving an existing screen, and redesigning an onboarding flow.

The skill interprets the request and selects relevant guidance. Users do not need to learn a command catalog or choose individual procedures to receive a complete result. Supporting procedures are loaded as needed.

The depth of the workflow follows the request. A typography adjustment can be focused; a new interface or substantial redesign calls for broader exploration and review.

A complete outcome should select a procedure suited to the intervention, visitor purpose, and work behind the interface. The user should not need to enumerate every visual adjustment, state, or verification step. The [workflow procedures](workflow-procedures.md) define this next content revision, including task-specific decisions and completion criteria; its implementation and evaluation status remain recorded in the project overview.

## Core workflow

### 1. Understand

- Identify the product, audience, user task, content, and desired outcome.
- Identify the information, available actions, state changes, and confirmed product rules needed for that task.
- Inspect the existing implementation, visual system, available assets, and technical constraints.
- Distinguish creation, focused refinement, and redesign; establish what the request permits changing.
- Reuse existing project documentation and explicit user decisions. Record material assumptions without turning them into confirmed facts.

### 2. Define the direction

- Ground visual decisions in characteristics of the actual product and its content.
- Establish the relevant content order and interaction structure so visual treatment supports a concrete task path.
- Choose composition, typography, color, imagery, density, and interaction appropriate to the surface's purpose.
- Preserve an established identity during refinement. For redesign, identify the constraints and functions that remain valid.
- Explore alternatives when they resolve meaningful uncertainty. A fixed number of alternatives is not required for every request.

### 3. Implement

- Work within the project's existing technology and conventions.
- Deliver the requested interface and behavior at an appropriate level of completeness.
- Address responsive composition, semantic structure, accessibility, UX writing, and relevant interaction states.
- Keep changes proportional to the agreed scope.

### 4. Observe

- Use browser and image capabilities available in the host environment to inspect the rendered result.
- Review representative desktop and mobile layouts where applicable, including content beyond the first screen.
- Run existing project checks relevant to the change.
- Distinguish implementation inspection from visual observation and actual interaction testing.

### 5. Correct

- Prioritize failures of function, understanding, accessibility, and layout before decorative details.
- Evaluate coherence, product specificity, and visual quality after the essential behavior is sound.
- Fix observed problems and repeat the relevant verification after changes.
- Report unresolved limitations honestly.

## Supporting UI/UX practices

The following practices enrich the core workflow:

- Durable product context and awareness of the existing visual system.
- Different design criteria for persuasion, task execution, reading, and exploration.
- Focused refinement of hierarchy, typography, layout, spacing, color, and interaction.
- Clear UX writing, responsive behavior, accessibility, empty states, loading states, and error handling where relevant.
- Prioritized critique that connects each finding to its effect on the user or product.
- An explicit distinction between refinement and replacement of a visual direction.

A supporting practice belongs in flawless-ui-ux when it improves a decision or the execution of a step in the core workflow and serves the product's goals.

## Behavioral guarantees

- Explicit user requirements take precedence over aesthetic preferences in the skill.
- Design choices must serve the content, task, brand, or intended experience.
- Familiar AI-generated patterns are signals for contextual review, not proof of poor quality or machine authorship.
- Colors, fonts, cards, gradients, minimalism, and animation are not universally good or bad.
- Do not invent customers, testimonials, awards, performance figures, or other credibility claims.
- Identify sample content and assumptions that need confirmation before publication.
- Preserve factual content and functioning behavior outside the authorized scope.
- Do not claim a browser review, accessibility test, interaction test, or project check that did not run.

## Technical boundary

The initial product is a portable skill with instructions, supporting references, and assets. It uses capabilities already available in the host agent.

A deterministic interface detector, dedicated runtime engine, browser extension, custom live-editing platform, and required external model service are outside the initial scope. A proprietary browser driver or inspection system is not required.

Visual review depends on available host capabilities. When rendering or interaction tools are unavailable, the agent should complete useful work that remains possible and identify what could not be verified. Static inspection must not be presented as equivalent evidence.

## Successful delivery

A successful delivery:

- Addresses the requested task at the agreed scope.
- Gives the interface a coherent direction suited to the product and surface.
- Preserves applicable brand, content, functional, and technical constraints.
- Includes the responsive behavior and interaction states relevant to the task.
- Uses observed evidence to guide corrections when inspection tools are available.
- Explains material decisions, completed verification, and remaining limitations.

Visual novelty alone does not establish success. The interface must communicate clearly and support its intended use.

## Architecture

The [skill architecture](skill-architecture.md) defines the shared package, entry instructions, reference responsibilities, loading rules, host capabilities, and evaluation approach used to implement this contract.

The [procedure specification](workflow-procedures.md) develops the architecture into creation, redesign, refinement, and review workflows composed with data-interface, forms-and-journeys, and content-interface guidance. These are internal selection concepts within the single skill, not a separate command catalog.
