# Review

Use this reference for critique and for verification after implementation. In a review-only request, inspect and report findings without editing the source. When fixes are authorized, correct the highest-impact issues within scope.

## Establish the evidence

Inspect the actual requested route, component, theme, and state. Confirm that a screenshot or preview represents the current implementation before treating it as authoritative. Old screenshots and source intentions can disagree with what is running.

Use available host capabilities rather than assuming a particular browser integration exists. Distinguish:

- **Source inspection:** structure, styles, data flow, and likely defects visible in files.
- **Rendered inspection:** layout, type, crops, contrast, overflow, and visual states actually observed.
- **Interaction testing:** actions performed, keyboard behavior, focus movement, and resulting state changes.
- **Project checks:** applicable builds, tests, or analysis actually executed.

Do useful static work when browser access is missing. Describe rendering-dependent concerns as unverified risks, not observed failures. Do not install tools or claim a full audit solely to make the evidence list look complete.

## Inspect according to the job

Begin with the visitor's task and the requested intervention. Check the relevant questions:

1. **Understanding:** can the visitor identify what this is, what matters, and what to do next?
2. **Structure:** do reading order, grouping, alignment, and hierarchy support that task?
3. **Specificity:** do content and visual decisions belong to the actual product, or rely on interchangeable claims and decoration?
4. **Substance:** is the information the visitor needs present and credible? Has visual restraint removed useful content?
5. **Execution:** are type, spacing, imagery, color roles, and repeated components coherent?
6. **Behavior:** do relevant controls, states, keyboard paths, and recovery actions work?
7. **Adaptation:** do small screens, long content, and changed states preserve meaning and access?

For creation and visual refinement, inspect both the requested improvement and the character retained. A reduction in color, density, or ornament is a change, not evidence of improvement by itself. A larger visual gesture is not proof of quality either. Compare concrete hierarchy, proportions, imagery, and detail with the intended experience; relevant finish remains part of the deliverable after task and access failures are corrected. For work that used [Visual calibration](calibration.md), check the diagnosed difference and chosen intervention without requiring calibration for every review or local fix.

For a full page, inspect beyond the first viewport. For a focused component change, inspect its surrounding context and likely regressions without expanding into a whole-product redesign. Use the applicable [Surface](surfaces.md) priorities to distinguish intentional density or expression from a defect.

Check the task's concrete acceptance cases, not just its visual categories. A filtered queue must retain the intended summary scope; a form must distinguish a confirmed result from a failed attempt; a collection must connect finding an item to reading and returning. Reference loading establishes guidance use, not completion of those paths.

For a redesign, compare corresponding content, states, and widths when baseline evidence exists. Verify that the result addresses the stated objective while preserving protected decisions. Record absent before/after evidence as a limitation rather than inventing a visual history.

Use [AI slop prevention](anti-slop.md) to investigate concrete composition, visual, copy, imagery, and behavior signals. Report the observed consequence and appropriate correction; retain intentional choices that serve the task. Neither eliminating every familiar device nor an authorship label is a review objective. After cleanup, verify that substance, actions, and protected identity remain intact.

When repeated promotional copy is a concern, use the [editorial pass](tasks/content-interfaces.md#editorial-pass) to assess the complete sequence. During a visual-only intervention, report material copy concerns separately rather than silently changing protected wording. Do not fail a scoped edit for leaving those words intact.

## Check design fit and access

Compare the implementation with the brief, not just with recurring-pattern warnings. Does the chosen type work for the actual language, reading length, and numbers? Does density fit the workload? Do imagery and expression fit the intended character without imitating an unrelated identity? Can section content explain its own position and emphasis? Inspect lower sections and working states as well as the opening. Cite the mismatch and its consequence; a familiar font or library component is not itself a finding.

For creation and redesign, check that customization reaches the information hierarchy and relevant interactions where the task calls for it. A new palette over an unsuitable starter composition is not enough. For refinement, evaluate only the permitted decisions and affected regressions; do not penalize the agent for preserving a required identity.

Use [accessibility acceptance](interaction.md#accessibility-acceptance) for affected content and controls. Separate measured contrast and target dimensions, observed keyboard and focus behavior, and tested resize/reflow from static expectations. For a failure, record the element, state, conditions, and applicable requirement. For a style preference, record how it fits or conflicts with the brief instead of labeling it a WCAG violation. Passing accessibility checks does not by itself establish good visual design.

Before finishing, correct material mismatches within scope and repeat the affected observations. If a check cannot run, keep it outstanding; a plausible rationale or passing build does not turn it into verified quality.

## Compare with the design target

When creation or redesign established a target, compare it with the actual implementation, including lower regions, relevant states, and narrow layouts. Inspect hierarchy, proportions, type roles, color distribution, image treatment, and the visitor's path. Use the selected reference or [study](design-studies.md) for the qualities being transferred, not as a page to copy pixel for pixel.

Distinguish productive adaptation from unexplained drift. Replacing a wide comparison with labeled stacked records may preserve the target on a phone; retaining its colors while losing the comparison does not. If a font, image, or composition changed because of content, access, or technical constraints, check that the alternative still achieves its purpose. Do not accept a polished opening followed by unrelated stock sections as a coherent result.

Correct material gaps within the authorized scope, then repeat the affected observations together. A reference image establishes a target, not proof of rendering, keyboard behavior, or functional completion. If no visual inspection is available, report the comparison as outstanding. Do not reopen an inherited identity during focused refinement or invent a target retroactively to justify the result.

## Prioritize and correct

Classify findings by effect rather than personal preference:

| Priority | Meaning | Example |
|---|---|---|
| Blocking | Prevents the task or access to essential content | The confirmation action cannot be reached by keyboard |
| Significant | Creates material confusion, friction, or loss of information | A chart omits the unit needed to interpret its values |
| Finish | Weakens coherence or polish without preventing the task | An isolated spacing value breaks an otherwise consistent rhythm |

Separate observation from explanation and recommendation. "The error is below the clipped panel" is stronger evidence than "the form feels wrong." Explain how the issue affects the user; classify an unsupported aesthetic preference as a suggestion rather than a defect.

When editing is authorized, fix task and access failures first, then significant hierarchy or comprehension issues, then finish. Reinspect the affected layouts and behavior after changes. Use the project's relevant checks; do not rerun unrelated suites without a reason.

Stop when material issues within scope are resolved, or report the concrete limitation that prevents resolution. Do not keep redesigning to achieve a self-assigned visual score.

## Communicate findings

For a critique, give each actionable finding a location, observed problem, user effect, and correction direction. Include priority and uncertainty when they help the reader act. Group related symptoms under their cause rather than producing many nearly identical findings.

For implementation, lead with the result, then material decisions, verification performed, and remaining limitations. Record which layouts and states were actually observed when that matters. Identify sample content awaiting confirmation.

Do not equate a clean source review, passing build, or attractive screenshot with complete usability or accessibility validation. If no actionable defect is established, say so and identify the evidence reviewed without inventing findings to fill the report.
