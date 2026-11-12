# Workflow procedures

The toolkit supports creation, redesign, refinement, review, and verification through one working cycle. The local CLI supplies evidence and corresponding verification as described in the [delivery plan](implementation-plan.md). The skill can also use available host tools when the executable is unavailable.

The design guidance applies to web, native mobile, and desktop interfaces, using the requested platform's navigation, input, and accessibility conventions. The CLI's rendered adapter covers browser interfaces; native widgets require suitable platform/project tools.

## Intervention boundaries

| Request | Work to deliver | Preserve |
|---|---|---|
| Create | The requested surface, content, interactions, and relevant states | Surrounding conventions and confirmed rules |
| Redesign | An authorized replacement of visual decisions | Required facts, functioning paths, data meaning, and protected identity |
| Refine | A proportional improvement in the existing intention | All decisions outside the intervention |
| Review | Prioritized findings from available evidence | Project files and live state |
| Verify | Repeated observations and a comparison under corresponding conditions | Sources and application state unless explicit test actions are authorized |
| Plan | A proposed solution and checks | Implementation remains unchanged |

Mixed requests follow their local boundaries. Review with fixes authorizes the specified editing work. Resolve genuine identity or scope ambiguity without asking for routine preferences already evident in the project.

## Working path

Recover the actual project, target, content, assets, constraints, and required behavior. Use current records rather than generating a new brief for every edit. The context command supplies facts and provenance from its documented sources; it does not choose the design.

For new interfaces and broad redesigns, follow the [essential composition exploration](../skills/flawless-ui-ux/references/direction.md#essential-explore-composition-before-implementation): consider at least three meaningfully different organizations of the primary content, then choose for the actual context. Keep this internal unless concepts are requested. Small refinements, fully specified compositions, and constrained existing systems retain their authorized boundaries.

Resolve information and visual relationships together, then implement in the existing stack. Carry typography, color, density, imagery, and finish through lower sections and states. A new interface needs coherent product-specific execution; a local correction does not reopen every visual decision.

Inspect the implementation through source, rendering, and relevant interactions where available. The inspect operation supplies concrete observations and coverage. Confirm the actual URL/port and target; do not use another generated project as an unstated reference.

Before delivering creation or redesign, perform the short [final pattern pass](../skills/flawless-ui-ux/references/anti-slop.md#final-pass). Inspect arrows/icons and copy cumulatively; preserve useful affordances and deliberate expression. Refinement checks the affected scope.

Correct material authorized issues and repeat affected observations. The verify command compares corresponding runs, while the agent checks preserved behavior, identity, and semantic consequences. Neither a lower finding count nor a passing build establishes a better design.

## Guidance and tools

The skill owns product interpretation and semantic edits. The [architecture responsibilities](skill-architecture.md#responsibilities) assign context, observations, reporting, and comparison to the core. Routine work should consume focused guidance and concise results rather than read maintainer specifications or every reference.

A tool can report a small rendered label or repeated arrow occurrences. The agent must determine their role and suitable correction. Protected copy in a visual-only task is preserved; report an out-of-scope issue rather than silently rewriting it.

## Verification and completion

Keep source, rendered, interaction, and project-check evidence distinct. Keyboard behavior and business calculations need actual relevant tests. With unavailable rendering, complete useful work and identify which visual observations remain unverified; the CLI returns incomplete requested coverage explicitly.

Finish when material in-scope issues are resolved or a specific limit remains. Reports lead with the result and relevant evidence. Review-only work uses external artifact locations and avoids project-generated files. Planning does not claim implementation.

## Evaluation

The [manual kit](../evals/README.md) covers complete tasks, focused changes, scope, and unavailable tools. The [instruction-efficiency comparison](../evals/cases/11-instruction-efficiency.md) records actual loading and cost, while the [delivery plan](implementation-plan.md#behavioral-gate) defines the toolkit's usefulness gate. Post-runtime results remain pending.
