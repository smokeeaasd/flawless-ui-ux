# Review

Use for critique or an unresolved diagnosis. Keep review-only work read-only: no source edits, dependency installation, formatting, project-generated artifacts, or live-state mutations. Store permitted captures outside the project.

## Establish the evidence

Inspect the actual requested component, route, theme, and state. Confirm that a preview reflects the current implementation.

- **Source:** implementation and intended behavior.
- **Rendered:** composition, type, crops, colors, overflow, and visible states actually inspected.
- **Interaction:** controls, keyboard paths, state transitions, and recovery actually exercised.
- **Project checks:** exact commands and observed results.

These support different claims. A passing build cannot establish visual quality; a screenshot cannot establish keyboard behavior. With unavailable tools, continue useful inspection and distinguish suspected problems from observed defects.

## Follow the task

For consistency across screens, select corresponding roles and states rather than treating every visual difference as a defect. Review type roles, controls, terminology, spacing, and navigation against the shared product/design decisions. Preserve intentional variants. When the CLI is available, repeated `--url` inputs with `--consistency` provide computed-style inventories for contextual review; their variation count is not a quality score.

Check whether the visitor can understand the relevant information and complete the requested action. Inspect preserved facts, data meaning, behavior, scope, and identity.

Review the whole target, including lower sections and working states. Check the primary focal point, supporting hierarchy, proportions, type roles, imagery, and continuity. During refinement, compare both the intended improvement and character retained.

Look at navigation and detail presentation: does the apparent destination match what happens, and does an overlay fit the work? Use the [final pattern pass](anti-slop.md#final-pass) within the review's scope, including cumulative icon and copy repetition. Compare representative widths and content extremes where tools permit.

Verify access using the relevant interaction criteria. Measure contrast against actual backgrounds; distinguish text, icons, and decoration. Source-based candidate scans require confirmation, not blanket restyling.

## Correct and report

Prioritize task/access failures, significant comprehension problems, and finish within scope. Correct structural causes rather than repeatedly decorating their symptoms. Retest affected paths after edits; run broader checks when changes or failures justify them.

For findings, give the location, observed issue, consequence, and correction, with severity proportional to the effect. Mark unverified risks and distinguish preferences from defects. Avoid inventing findings to fill a report.

Finish when material in-scope issues are resolved or a specific limitation prevents further work. Summarize the result and evidence without narrating every checkpoint. Never present more checks, fewer effects, or a different style as proof of better design.

## Run a task-shaped critique

Choose one representative primary journey and the changed edge cases. On a finance page, compare a particular period and trace one obligation into the total. On an inquiry form, intentionally submit incomplete input, correct one field, and complete the local action. On a reading page, follow a contents link with the sticky header present. Merely scanning the initial viewport misses the work that determines usefulness.

Inspect at actual viewing size before enlarging a screenshot for detail. First ask what leads, what groups together and where action belongs. Then inspect type, alignment, contrast and crops. A full-page thumbnail is useful for rhythm but makes small text appear more legible than it is. Open matching narrow and wide captures; neither can stand in for the other. Include long content, zero results and meaningful selection/error states where applicable.

Use the relevant reference to resolve a finding rather than accumulating generic advice. “Use more whitespace” does not identify which grouping is wrong. “The due date sits closer to the next record than its own amount” identifies the relationship and a plausible correction. “Replace the font” needs evidence that the current family or roles fail the content, beyond personal preference.

## Write findings another person can reproduce

A finding needs location and conditions, observed behavior, consequence and a proportional correction. For example: “At 390px, the Ready action for record R-104 is outside the page viewport. The fixed six-column grid causes page-level overflow, so a phone user cannot find the action without horizontal page scrolling. Adapt the row's secondary fields and retain the identifier, state and action together.” This can be reproduced and checked after a repair.

Separate certainty: confirmed from the exercised state, source-derived risk awaiting rendering, or a design preference with its rationale. Severity follows impact: inability to complete a task and loss of input outrank a slightly inconsistent radius. Do not promote every stylistic difference to a blocker or bury a broken action under a list of cosmetic suggestions.

A concise result can say: “Invalid input is now retained and linked to field errors. Checked empty submission and correction at 390px and desktop. Screen-reader announcement remains untested.” It should not say “fully accessible” after one automated scan. Keep tool output as supporting evidence; report the important interpretation in normal language.

## Verify a correction without moving the goalposts

Retest the original object, input and conditions. Verify neighboring behavior that shares the changed component or state. Confirm preserved copy and calculations from source when appearance could hide a change. A disappearing finding may mean the target disappeared, the page failed to load or the state was no longer sampled. Check coverage before treating the count as a repair.

Stop when the requested outcome and material affected checks are satisfied. Repeatedly changing a valid design to accumulate novelty is not iteration. If a material issue remains outside scope, state it separately with its evidence and the boundary preventing correction. If a tool fails, name the unobserved check and complete the useful source or project checks still available.
