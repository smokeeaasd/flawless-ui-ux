# Review

Use for critique, audit, diagnosis, or recommendations when implementation has not been requested. The deliverable is an evidence-based assessment with project files unchanged. When fixes are authorized, use the appropriate editing procedure with diagnosis before changes.

## Establish target and coverage

Identify the route or component, visitor task, requested breadth, relevant theme or state, and available inspection tools. Inspect the implementation and confirm the source and freshness of any supplied screenshot. A stale preview is a source of uncertainty, not evidence about the current result.

Select the relevant task-guide questions and subject sections. A queue review follows how users locate and act on records. A commercial-page review follows the offer, explanation, proof, and next action. A component review needs its immediate context without becoming a whole-product audit.

Keep an account of inspection coverage: source, rendered layouts, exercised interactions, and executed project checks. These can be short working notes. Use [Review evidence](../review.md#establish-the-evidence) for their meaning and limitations.

## Inspect task paths and actual states

Follow the visitor's primary task and relevant alternate or failure behavior with the tools available. Inspect hierarchy, information completeness, product specificity, visual execution, access, and responsive behavior where they affect the task. For a page review, include lower sections and the footer; do not infer completion from a strong opening.

Inspect consequential actions through source, supplied demo fixtures, or an authorized test environment. A review alone does not authorize changing live records, subscriptions, or other persistent state. Keep interaction evidence within the requested read-only boundary.

Use representative content and states without changing project sources or configuration. Do not add test files, run a formatter, install dependencies, or generate documentation as part of a read-only review. Checks must respect the requested file boundary: a build that writes into the project is unsuitable when no project files may change. Allowed screenshots belong in host artifact locations outside the project.

When interaction or rendering cannot be observed, continue useful source inspection. Describe suspected rendering or behavior problems as unverified risks. Missing evidence alone does not prove a defect, and a screenshot does not prove keyboard access.

## Form findings and prioritize

For each actionable issue, establish the location, evidence, effect on the visitor, and correction direction. Explain a likely cause when supported. Group related symptoms instead of repeating them as separate findings. Use the existing [blocking, significant, and finish priorities](../review.md#prioritize-and-correct).

Separate:

- An observed defect that interferes with the task or weakens execution.
- A static risk that needs an interaction or render check to establish its effect.
- A missing observation that limits the review.
- A preference-based suggestion with a stated tradeoff.

An intentional gradient, familiar font, or repeated panel is not automatically a defect. Assess it against the brief, surface purpose, readability, and actual use. Do not invent issues to fill a requested maximum finding count. A review can establish no actionable defect within its observed coverage.

## Deliver the assessment

Use the [findings format](../review.md#communicate-findings), prioritizing the most consequential issues. State what was actually inspected and what remains unverified. Give enough specificity for a correction without claiming the correction was made.

Confirm that project files remain unchanged, accounting for new or untracked files as well as tracked diffs. Distinguish host-generated artifacts from agent-authored changes. Avoid creating a report file inside the project unless documentation was explicitly requested.

**Completion:** findings are useful, prioritized, and traceable to evidence; coverage and uncertainty are explicit; the project remains unchanged. No implementation or comprehensive usability or accessibility validation is implied by the report.

## Example: commercial page with a form

Follow the offer and next action using [Content: persuasion](../tasks/content-interfaces.md#persuasion), then the relevant form section if the requested scope includes submitting interest. A clipped error below the viewport is an observed defect only if the affected state was actually inspected; a suspicious container height in CSS is a static risk. Report its location and recovery impact, suggest a correction, and leave both source and configuration intact.
