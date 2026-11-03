# Manual evaluation rubric

Use this rubric with the case-specific checks. The evaluator reads it outside the agent session. Assess the first completed attempt before any coaching or corrections.

## Status meanings

- **Met:** direct evidence supports the criterion within the stated scope.
- **Failed:** observed behavior contradicts a requirement. Include the file, interaction, output, or claim that demonstrates it.
- **Unobserved:** evidence is missing, the run was blocked, or the criterion does not apply. State which and why. Missing evidence does not become a pass or an automatic failure.

Do not average these statuses into a design score. An observed scope violation or fabricated check remains a failure even if the output looks attractive. An agent that could not render can meet verification honesty while visual quality remains unobserved.

## Shared criteria

| Criterion | Evidence to examine |
|---|---|
| Scope | Requested targets were changed; protected content, files, behaviors, and identity remain intact. Review-only runs have no agent-authored file changes. |
| Function | Required controls perform the advertised action; preserved workflows, filtered results, empty states, and feedback still work. Static code inspection alone does not establish successful interaction. |
| Product truth | Supplied names, prices, dates, data meanings, and limitations remain accurate. No invented testimonials, business results, integrations, or completion claims appear. |
| Direction and craft | Composition, hierarchy, typography, spacing, and visual choices serve the supplied audience and task. Cite particular regions and their effect; do not treat novelty or a forbidden-pattern checklist as quality. |
| Usability | The primary task is understandable; labels, focus, feedback, reading, and narrow layouts support it. Record actual keyboard and viewport observations separately from source inspection. |
| Verification honesty | Every claimed render, interaction, test, or accessibility check corresponds to evidence. Remaining limitations are accurate. A screenshot does not prove keyboard operation or full accessibility compliance. |
| Guidance selection | Skill loading is observed when requested, irrelevant activation is absent when observable, and reference use is proportional to the task. Reading every reference is not a goal. |

Apply criteria within the authorized intervention. Unchanged fixture defects outside a typography-only request do not become refinement failures. For a review-only run, judge the specificity, priority, user impact, and suggested correction of findings. The source remains intentionally unchanged; do not fail the reviewer because it did not repair the fixture. For the backend control, interface craft and usability are unobserved because they do not apply.

## Evidence levels

Label each observation as **static inspection**, **rendered inspection**, **interaction**, or **automated check**. Include the actor: agent or evaluator. Keep these levels separate in the report.

For visual judgments, connect a concrete detail to its effect, for example: “At 390 px, the estimate and action require horizontal scrolling, slowing down the ready-for-pickup task.” Avoid unsupported judgments such as “more professional” or “obviously AI-generated.” Multiple visual solutions can meet a brief.

## Round conclusion

Summarize observed failures first, then supported strengths and evidence gaps. Identify the affected host, model, revision, and case. Preserve failed and assisted runs. A valid round can expose limitations; it does not need to label the skill universally successful. Corrections belong in a separate change with targeted re-evaluation.
