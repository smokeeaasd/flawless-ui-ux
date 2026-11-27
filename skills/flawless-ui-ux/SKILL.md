---
name: flawless-ui-ux
description: Initialize product context through a guided conversation, then create, redesign, refine, or review web, native mobile, and desktop interfaces with deliberate aesthetic direction, visual craft, and usable interactions.
---

# Flawless UI/UX

Turn a product task into a deliberate, visually memorable interface, then inspect what the implementation actually renders and does. A great interface pairs product truth and effortless usability with unmistakable visual craft—clear hierarchy, confident typography, hue-coherent surfaces, and intentional composition tailored to its content. Correctness is the floor, not the ceiling; conversely, visual novelty without working tasks or honest facts is unfinished.

Use the requested platform and stack, preserving appropriate navigation, input, and accessibility conventions. Examples do not prescribe a sector, device, or aesthetic.

## Initialize product context

`init` is a conversation inside the coding agent: in Codex, `$flawless-ui-ux init`; in other hosts, invoke this skill with `init` or ask it to initialize product context. Read [Initialization](references/init.md), inspect the project, confirm material product knowledge with the user, and record it. An explicit init ends with the product record; it does not design or implement an interface.

Before creating a whole interface or broadly redesigning one, recover its product context. A relevant, filled product record supplies continuity; a missing record or an unfilled template routes through Initialization. Retain the original request and resume it after confirmation and persistence, without repeating discovery. Do not force onboarding for a local component extension, focused refinement, or review. Use the existing implementation and available context within that task's scope.

## Establish the intervention

Inspect the target, neighboring components, real content, and available assets. Identify the visitor's primary task, the requested change, and the facts, behavior, and brand decisions that must survive. Recover existing product/design documents using [Project context](references/project-context.md) when continuity matters. A short brief permits confident aesthetic choices; it does not authorize invented product claims.

Distinguish the surface's job: a public page explains an offer and next action; an operational screen supports repeated tasks and comparison; a reading surface supports comprehension; a collection lets the work lead. One product can contain all four. Native and desktop applications owe users their platform's navigation, input, and accessibility conventions.

- **Create:** establish information priority, aesthetic register, and visual system before coding. Read [Direction](references/direction.md) and [Aesthetic directions](references/aesthetic-directions.md), then the craft and product references relevant to the surface.
- **Redesign:** replace authorized visual decisions with higher craft while retaining product truth and functioning behavior. Read Direction, Aesthetic directions, and [Calibration](references/calibration.md); explicitly separate preserved facts from replaceable presentation.
- **Refine:** diagnose the weak visual or structural relationship before editing. Read Calibration for a broad refinement and the reference owning the affected decision. Never flatten expression or strip character to make a screen look "cleaner."
- **Review:** use [Review](references/review.md). Report evidence, visual critique, and proportional corrections without editing, installing dependencies, formatting, or mutating live state.

Form a concrete working contract before broad edits: what leads visually, the chosen aesthetic register, the signature visual element, type/color/spacing roles, and mobile adaptation. Preserve copy in visual-only work and presentation in copy-only work. Do not manufacture loading or failure states for synchronous local operations.

## Load the knowledge that changes the decision

Read the owning reference for the decision at hand rather than reading the entire library blindly.

| Question | Reference |
|---|---|
| Which aesthetic register, visual finish, or signature element fits? | [Aesthetic directions](references/aesthetic-directions.md) |
| How do we explore composition and structure a new surface? | [Direction](references/direction.md) |
| How do we initialize or update the product record? | [Initialization](references/init.md) and [Project context](references/project-context.md) |
| Which information and action belong on this surface? | [Product structure](references/structure.md) |
| What craft decision needs deeper treatment? | [Craft](references/craft.md), routing to [Typography](references/typography.md), [Layout](references/layout.md), and [Color](references/color.md) |
| How should records and comparisons survive small screens? | [Tables](references/tables.md) and [Charts](references/charts.md) |
| How should inputs, errors, and recovery work? | [Forms](references/forms.md) and [States](references/states.md) |
| How should controls, feedback, keyboard access, and states behave? | [Interaction](references/interaction.md) |
| What should the words say, and in whose voice? | [Copy](references/copy.md) |
| What should change in a broad visual refinement? | [Calibration](references/calibration.md) |
| Which generic patterns should be upgraded or avoided? | [Contextual prevention](references/anti-slop.md) |
| Would a worked composition clarify the design? | [Design studies](references/design-studies.md) |
| How do we run a visual self-critique or review? | [Review](references/review.md) |
| Should motion exist, and how should it behave? | [Motion](references/motion.md) |
| What makes this surface slow or unstable? | [Performance](references/performance.md) |
| Which platform conventions govern this implementation? | [iOS](references/ios.md), [Android](references/android.md), or [Desktop](references/desktop.md) |

References contain concrete scales, CSS patterns, and original worked examples, not rigid templates. Adapt relationships to real product facts; never copy fictional study businesses into the user's application.

## Execute and compare

For new surfaces and broad redesigns, consider three genuinely different organizations varying **both information structure and aesthetic register** as [Direction](references/direction.md) describes. Keep exploration internal unless concepts are requested. Commit to one **content-earned signature visual element** and carry the same typographic scale, tinted neutrals, border grammar, and finish through lower regions, forms, dialogs, and empty states. A crafted hero above generic template cards is incomplete.

For refinement, fix the owning relationship directly rather than enlarging headings or stripping color. Keep a baseline capture when rendering is available and compare matching content, state, and width. Preserve intentional density and visual personality.

For data interfaces, verify semantic meaning alongside visual alignment: units, periods, signs, missing values, and aggregate scope. Inspect mobile width before trusting an inner scroll container. For public pages, make the offer and next action unmistakable without invented social proof.

## Verify the implementation, not the intention

Observe the primary task at representative widths and states with available tools. Separate source checks, rendered checks, visual self-critique, and interaction checks:

1. **CLI evidence and visual telemetry:** when the CLI can cover the target, read [Executable inspection](references/inspection.md) and run `inspect` / `verify`. Review `findings` alongside `visualMetrics` (font families, display-to-body ratio, weights, colors, radii, and card-like containers) to spot unintended font fallbacks, timid type hierarchy, palette sprawl, or excessive card boxing.
2. **Visual self-critique:** open the captured desktop and mobile screenshots at actual viewing scale and run the 6-question critique in [Review](references/review.md#visual-self-critique). Fix weak focal points, flat surfaces, cramped grouping, or sterile fallback styling before delivering.
3. **Final pattern pass:** before delivering creation or redesign, apply the [final pattern pass](references/anti-slop.md#final-pass) (and affected checks for refinement). Keep useful richness and protected text intact.
4. **Controls and platform checks:** exercise affected interactions with keyboard and pointer/touch, verify contrast against actual backgrounds, and run project tests. Native apps require platform tools, not a web scan.

Finish when the requested interface works cleanly, reads clearly, and carries deliberate visual finish—or state any concrete unverified limit. Never fabricate aesthetic scores, accessibility conformance, or speedup claims not established by evidence.
