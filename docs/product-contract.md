# Product contract

Revised on November 12, 2026. The toolkit includes the portable skill and a local executable inspection core. The skill installer installs instructions; the CLI has a Node-compatible package entry point and public npm publishing configuration. Publication follows the [release procedure](releasing.md); automatic integration remains separate. Implementation and evidence are tracked in the [delivery plan](implementation-plan.md) and [testing guide](testing.md).

## Purpose

flawless-ui-ux helps coding agents conceive, build, review, and evolve web, native mobile, and desktop interfaces through product-specific design decisions. It combines a skill, compact project context, and a local inspection core whose rendered adapter covers browser interfaces; native verification uses appropriate host/project tools.

The product must improve both the design and the work needed to deliver it. More instructions, findings, or reports do not establish usefulness.

## Design philosophy

**Product intent directs the design; observation tests the execution; correction develops the intended experience.**

1. **Context determines choices.** Audience, task, content, identity, and resources become concrete composition, typography, color, imagery, density, and interaction decisions.
2. **Quality combines function and expression.** Usability, accessibility, identity, and finish belong to the delivery. Both a dense working interface and an expressive page can be well designed.
3. **Richness comes from relationships.** Hierarchy, proportions, rhythm, imagery, and detail work together. Neither effect counts nor minimalism define quality.
4. **Refinement develops the existing intention.** Preserve protected identity, wording, facts, and behavior. Redesign replaces only the authorized decisions.
5. **Decisions must hold up under observation.** Tools supply repeatable evidence; the agent interprets context and applies authorized corrections. Keep measurements, hypotheses, and unobserved behavior distinct.

Implement original procedures, examples, interfaces, and checks. No universal palette, font list, composition, metaphor, or style is imposed.

For new interfaces and broad redesigns, [Direction](../skills/flawless-ui-ux/references/direction.md#essential-explore-composition-before-implementation) requires internal consideration of at least three meaningfully different compositions before implementation. Choose for the context; preserve explicit constraints and the scope of focused refinements.

## Capabilities

| Capability | Required outcome |
|---|---|
| Context | Reuse product/design Markdown, surface sources and freshness, and preserve useful decisions across tasks without mandatory records |
| Initialization | Create missing canonical product/design Markdown templates or reuse supported records, preserving content; the agent interprets and fills the documents |
| Design and construction | Implement the requested content, visual treatment, interactions, and relevant states in the existing stack |
| Review and refinement | Diagnose concrete problems and select proportional improvements within scope |
| Inspection | Produce localized findings across selected sources, screens, and explicit flow states, with conditions and coverage |
| Consistency | Supply corresponding role/style observations across selected screens for contextual review |
| Correction and verification | Let the agent fix authorized problems, then repeat affected observations and report regressions or unresolved limits |
| Contextual prevention | Review cumulative copy, icon use, composition, and treatment while preserving intentional expression and useful affordances |

Users can request these activities in ordinary language through the existing skill invocation. A short brief still permits confident choices. The user should not need to enumerate every visual adjustment or check.

## Division of responsibility

The skill and agent resolve product meaning, visual direction, information structure, and semantic edits. The local core supplies relevant context, measurements, artifacts, and comparable reports. It does not require a model API or autonomously redesign a page.

A reviewed finding can justify retaining an intentional choice. Repeated arrows and promises require examination across the target, not a zero-pattern quota. Familiar styling alone is not proof of a defect or AI authorship.

Relevant WCAG 2.2 A/AA requirements guide web implementation. Native interfaces use platform accessibility semantics, units, text scaling, input conventions, and tools. Automated checks cover only named criteria under observed conditions; no scan establishes full conformance. Typography heuristics must not be presented as WCAG minimum pixel sizes.

## Working cycle

Recover relevant context, resolve design decisions, implement, inspect, correct, and recheck. Existing-interface work can enter at diagnosis.

Creation and redesign include a final contextual pattern review. Focused refinements inspect the affected scope. Review-only work preserves project files and live state; planning produces a proposal. Ordinary CLI inspection is observational. Explicitly selected flows authorize only their defined test actions; verification requires the same flow to be selected again.

Keep product claims accurate, identify sample data, and preserve functioning paths. Never invent customer proof or present local-demo feedback as a real integration result. Report only checks actually performed.

## Technical boundary

The toolkit includes a small local CLI, a shared inspection core, source observations, and a replaceable browser adapter. Bun remains the development toolchain; executable JavaScript must support Node for future npx/bunx distribution. Browser availability and setup are explicit capabilities.

The supported hosts listed in the [CLI contract](cli-contract.md#install) share the same design guidance and core. Claim installation, discovery, execution, browser coverage, and automatic integration separately and only after testing. The [testing guide](testing.md#behavioral-evidence) records observations and pending checks by host. Interface behavior and model-driven workflows are separate validation gates.

Host-triggered checks follow a useful, verified core. Extension overlays, live variants, native inspection adapters, cloud services, and image-generation infrastructure are later candidates. Suitable existing host tools can still support a task.

## Acceptance

A delivery must demonstrate useful design choices, relevant content and working behavior, accurate observations, and scoped corrections that preserve identity and avoid regressions. Execution cost must be assessed against observable benefit.

Evaluate representative creation, data-interface work, and expressive refinement under matched conditions, including a no-tool baseline. Preserve prior failures and the first completed results. A smaller package, green infrastructure tests, or a single attractive output does not establish general improvement.

The [architecture](skill-architecture.md), [CLI contract](cli-contract.md), and [workflow guide](workflow-procedures.md) define the implemented executable boundary. Runtime fixtures validate that boundary; matched host/model behavioral acceptance remains pending.
