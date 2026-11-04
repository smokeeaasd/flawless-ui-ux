# Workflow procedures

This specification defines the task-specific procedures implemented in flawless-ui-ux, supported by reusable design and interaction guidance. It develops the [product contract](product-contract.md) and [skill architecture](skill-architecture.md).

**Status:** phases 1 and 2, definition and package implementation, are complete. The installed package contains the entry point, host metadata, four workflow guides, three task guides, and six subject references. Phase-3 behavioral evaluation of the expanded procedures remains pending; shipped instructions do not establish observed host outcomes.

## 1. Operating model

A user supplies an outcome, such as developing a subscription-management screen or redesigning a repair queue. The skill selects the intervention, understands the work the interface supports, and carries it through the applicable decisions, implementation, observation, and correction. Users can still request a small adjustment without initiating a whole-screen process.

Backend-only work and repository administration without an interface-design intervention remain outside this workflow.

Selection combines three independent decisions:

| Decision | Question | Effect |
|---|---|---|
| Intervention | Is the request creating, redesigning, refining, or reviewing? | Select one primary workflow and its change boundary |
| Surface purpose | Is the visitor deciding, operating, reading, or exploring? | Set priorities using the existing persuasion, task-execution, reading, or exploration guidance |
| Task structure | Does this work involve records and data, forms and journeys, or content and navigation? | Load the task-guide sections that change how the work should be done |

The intervention controls permission and scope. Surface purpose controls emphasis. Task structure supplies concrete decisions, states, and verification cases. A screen name alone does not establish its behavior: billing settings and a public pricing page share a subject but support different work.

### Select the intervention

| Evidence in the request | Primary procedure | Default boundary |
|---|---|---|
| A new screen, route, page, or independent component is needed | Create | Build the requested surface; inherit the surrounding system where one exists |
| The existing visual approach is explicitly being replaced | Redesign | Replace permitted visual decisions while preserving product truth and required behavior |
| An existing target needs improvement without explicit replacement | Refine | Preserve identity, content, behavior, and everything outside the named intervention |
| Findings or advice are requested without implementation | Review | Inspect and report; leave project files unchanged |

Adding a field to an existing form normally belongs to refinement; it does not authorize a new visual identity. A request to review and fix uses the appropriate editing procedure with diagnosis before changes. A planning-only request uses its procedure through solution definition and returns a plan without implementation or claims of completed verification.

For mixed requests, separate the affected targets and respect each boundary. For example, a new marketing page can contain an existing application preview that must remain recognizable. Reuse established decisions rather than restarting the process for every region.

Choose one primary task guide. Add a section from another only when the local work needs it. A dashboard with an edit dialog can combine data-interface guidance with the relevant form section; it does not require every journey or commercial-page procedure. Unfamiliar surfaces use the primary workflow and relevant subject guidance, with assumptions identified instead of forcing a category.

## 2. Shared decisions and working outputs

The following checkpoints describe information needed to proceed. They are internal decision checks, not required files, stage announcements, or requests for user approval. Their depth scales with the intervention; current session context can already satisfy them.

| Checkpoint | Decisions or evidence needed | Working output |
|---|---|---|
| Task basis | Visitor, actual task, target, supplied facts, implementation context, permitted changes, available assets and tools, consequential unknowns | A concise task brief and preservation boundary |
| Solution definition | Information order, actions and state transitions, applicable visual direction, technical integration boundaries, responsive behavior, acceptance cases | A concrete solution outline, including only relevant states and dependencies |
| Working interface | Real content and controls within scope, consistent visual roles, correct local or integrated behavior, applicable failure and recovery states | The implemented target and a reviewable change set |
| Evidence and handoff | Checks actually performed, observed defects and corrections, preserved requirements, unresolved dependencies or unavailable evidence | A proportionate result or findings report |

Ask only when an unresolved fact changes the product's truth, authorized scope, or consequential behavior. Inspect existing sources first. Continue independent work while an answer is pending. Routine aesthetic choices can be made within the brief. Contradictory business rules must be resolved rather than replaced with a convenient assumption.

External services, persistence, payments, and permissions follow the actual project and task authorization. A static demo remains explicitly a demo. Missing capabilities do not justify controls that claim an operation succeeded when it did not.

Working outputs stay in the conversation or existing project records by default. Maintain durable documentation when requested or when the project already requires it. Do not generate a brief, design document, hidden state directory, or report file as a side effect of every request.

## 3. Primary procedures

The sequences below express useful dependencies. Combine adjacent work when the task is small, revisit earlier decisions when evidence changes them, and avoid repeating investigation that is already current. Host tools and permissions govern execution throughout.

### Create

**Use for:** a missing interface or independent surface. A new screen inside an established product inherits its visual system unless the request authorizes a new direction.

1. **Establish the task and integration boundary.** Inspect the stack, routes, shared components, tokens, content, data sources, and available assets. Identify what the visitor must understand or accomplish. Distinguish a functioning integration, a local interaction, and an illustrative preview.
2. **Model the work before arranging it.** Identify the information and actions needed for that outcome, their order, and the states the interface can encounter. Select the relevant task guide. On a working screen, define how objects are found and acted upon; on a content page, map visitor questions to supplied information and evidence.
3. **Define the solution and direction.** Choose composition, hierarchy, density, type and color roles, imagery, interaction, and responsive changes together. Explain a consequential choice through a product fact and its visible effect. Reuse the incumbent system when it is a constraint. Compare alternatives only when they resolve a meaningful choice.
4. **Implement a complete path.** Build the primary task with real content and working controls before polishing secondary details. Include the relevant empty, pending, failure, success, and restricted states within the requested boundary. Use existing integration and component conventions. Complete lower sections and affected states rather than finishing only the opening view.
5. **Observe and correct.** Exercise the main path and applicable failure or recovery path. Inspect representative wide and narrow compositions and their actual states when tools permit. Correct functional and comprehension failures first, then visual coherence and finish; repeat affected checks after the final edits.

**Completion:** the requested surface supports its stated task, supplied facts remain accurate, relevant states are handled, and material in-scope issues have been resolved or explicitly reported. The handoff identifies verification actually performed and any remaining dependency. Unavailable rendering remains unverified; it is never implied by a successful build.

### Redesign

**Use for:** deliberate replacement of an existing visual approach. The request determines the extent of replacement; preserved brand choices can coexist with a substantial redesign.

1. **Establish the incumbent baseline.** Inspect the target, current visual system, real content, functioning paths, and relevant states. Obtain current rendered evidence when available. Record what must survive: facts, terminology, routes, data meaning, interactions, integrations, and explicit visual constraints.
2. **Diagnose the reason for replacement.** Identify the problems or desired change in experience. Separate task failures, structural problems, and visual preferences. A redesign needs a stated objective beyond changing colors or making the page look different.
3. **Define the replacement solution.** Use the applicable task guide to reconsider information order and interaction where authorized. Choose a coherent new direction and explain how it addresses the objective. Preserve required behavior even when its presentation changes. Keep unrelated routes and shared components outside scope unless the requested replacement genuinely requires them.
4. **Replace consistently.** Implement the authorized structure and visual roles through the full target, including controls, content beyond the first viewport, and relevant states. Avoid leaving accidental mixtures of the retired and replacement treatment. A local visual replacement does not authorize backend or business-rule changes.
5. **Compare and verify.** Recheck preserved task paths and data. Where before/after evidence exists, compare corresponding content, states, and viewport conditions. Confirm the improvement against the stated redesign objective, then resolve affected regressions and finish issues.

**Completion:** the replacement is coherent across the agreed target, the stated problem has been addressed with concrete evidence, and preserved facts and behavior still hold. Missing baseline rendering is recorded as a comparison limitation rather than reconstructed as observed history.

### Refine

**Use for:** an improvement to an existing interface, component, interaction, or visual aspect. This is the default for an ambiguous request to improve an incumbent screen.

1. **Bound and diagnose.** Inspect the named target and enough surrounding context to identify the cause. Establish which visual, content, and behavioral decisions remain fixed. Select only the task and subject sections needed to understand the problem.
2. **Choose the intervention.** Identify which change will improve the target and what could be affected by it. Typography, grouping, wording, feedback, or interaction changes should follow the diagnosed cause. Do not replace a visual identity to solve a local readability problem.
3. **Implement within the boundary.** Reuse tokens and accessible primitives. Check the reach of shared styles and components before changing them. Make necessary coupled changes within the authorized target while preserving unrelated content and behavior. If the solution needs a material scope expansion, surface that dependency and continue work that remains authorized.
4. **Verify the improvement and its surroundings.** Inspect the changed aspect, dependent states, and likely neighboring regressions. A larger type size must still fit real labels; a filter change must still preserve data meaning. Recheck after corrections without expanding into an unrelated full-product audit.

**Completion:** the specific problem is addressed, protected decisions remain intact, and the change set is proportional. Untouched defects outside scope do not become a requirement to redesign the rest of the screen.

### Review

**Use for:** critique, audit, diagnosis, or recommendations without an implementation request.

1. **Establish target and evidence.** Identify the route, component, state, visitor task, and requested breadth. Verify that supplied captures correspond to the current implementation. Record which inspection capabilities are available.
2. **Inspect the work users perform.** Follow the relevant task-guide questions and subject guidance. Examine content, hierarchy, behavior, accessibility, responsive composition, and states only to the extent relevant to the requested review. Inspect beyond the first viewport for a page review; keep a component review bounded.
3. **Form findings from evidence.** Distinguish observed defects, static risks, missing evidence, and preference-based suggestions. Explain the location, problem, user effect, and correction direction. Group symptoms with a common cause. Use the existing blocking, significant, and finish priorities.
4. **Deliver a read-only assessment.** Report findings and actual coverage without implementing suggestions. Leave project files and configuration unchanged, including auxiliary documentation or tests. Use host artifact locations for allowed screenshots; avoid checks that write into a project when the request requires no file changes. Account for newly created files as well as tracked changes when checking that boundary.

**Completion:** findings are actionable, prioritized, and traceable to evidence, and the project remains unchanged. A review can legitimately establish no actionable defect. Unavailable interaction or rendering is reported without inventing findings or claiming complete accessibility validation.

## 4. Task-specific guidance

Task guides describe the work behind the interface. They supply concrete decisions and acceptance cases to the selected procedure; they do not introduce separate commands or require every listed feature on every screen. Product facts determine which actions and states actually exist.

### Data interfaces

**Applies to:** dashboards, queues, tables, inboxes, monitoring views, and record-detail workspaces. Usually paired with task execution.

- **Inspect:** record types and identifiers, authoritative sources, units, periods, freshness, aggregation scope, current filters, actionable statuses, and existing navigation or permissions.
- **Decide:** the question users need to answer and what they do with the answer; useful default ordering; overview versus detail; search, filter, sort, and selection behavior where required; the relationship between summaries and visible records. A chart needs a question and interpretable values; metric tiles are not a default screen structure.
- **Handle:** genuinely empty data, no filter matches, loading, failed or stale data, pending updates, and restricted actions when applicable. Preserve the distinction between zero, missing, and unavailable. Keep action feedback connected to the affected object.
- **Adapt:** retain essential context, identifiers, and actions at narrow widths. Decide which secondary details can move behind disclosure. A table may have a dedicated scrolling region when its relationships require two-dimensional reading; hiding information to eliminate overflow is not a solution.
- **Verify:** filters and clearing, summary scope, values and units, object actions and feedback, relevant update failures, keyboard access, and dense or long content. Preserve records and data meaning during redesign and refinement.

### Forms and journeys

**Applies to:** registration, onboarding, checkout, editable settings, subscriptions, and other flows that collect information or change state. Usually paired with task execution.

- **Inspect:** required information, existing business rules, allowed actions by role, source of saved values, integration behavior, existing pending and error handling, and consequential transitions.
- **Decide:** field groups and sequence; whether a task needs multiple steps; input constraints and explanation; local validation versus server rejection; where progress, consequences, and completion are communicated. Preserve established terminology and recovery patterns.
- **Handle:** invalid input, pending submission, success, failure with input retained, and unavailable actions when relevant. Use confirmed project behavior for unsaved changes, retries, conflicts, and cancellation; do not invent transaction guarantees, commercial policy, or persistence.
- **Implement:** labels and field feedback, appropriate input behavior, understandable action consequences, focus movement, and protection against accidental duplicate actions where applicable. Keep ordinary reversible work direct. A demo submission cannot claim a reservation, payment, email, or persisted change.
- **Verify:** a valid path, a relevant invalid or failure path, recovery without unnecessary data loss, keyboard progression, narrow-screen errors and overlays, and truthful completion feedback. Test existing integrations only within the authorized environment.

### Content interfaces

**Applies to:** commercial pages, long-form reading, documentation, portfolios, collections, and discovery experiences. Select the section appropriate to the visitor's purpose.

| Purpose | Decisions to make | Evidence to seek |
|---|---|---|
| Persuasion | Identify the offer and audience; order visitor questions; connect claims to supplied explanation or proof; establish an honest next action and carry the direction through lower sections | The offer, material facts, tradeoffs, and action are understandable; links and controls lead somewhere useful; claims and imagery represent the actual product |
| Reading | Distinguish explanation, reference, and procedure; organize headings and reading measure; make long-page navigation, anchors, examples, code, and figures usable | Readers can locate information, follow it, and recover their place; reflow and sticky regions preserve access to content |
| Exploration | Let the actual collection or work lead; provide item context, selection and detail routes, discoverable navigation, and requested contact or next actions | Items can be found and understood; navigation works across input methods and sizes; motion does not hide the work or trap the visitor |

Inspect the actual content and assets before planning the composition. Choose a visible organizing idea tied to the subject when the task calls for a new direction. Establish type, color, alignment, spacing, and imagery roles across the whole target. Use real product output or available media honestly; distinguish atmosphere or sample content from evidence.

For a mixed surface, use the relevant secondary task section locally. A product page with an application preview needs meaningful interface structure and coherent data in the preview; it does not turn the whole page into a dashboard.

## 5. Verification, correction, and stopping

Define acceptance cases from the requested task and confirmed constraints before implementing. They can be short working notes. A complete task includes applicable structure, content, interactions, states, and visual execution; it is not complete merely because the skill was loaded or a reference was read.

Prioritize verification around:

1. The visitor's primary path and relevant failure or recovery behavior.
2. Preserved facts, data meaning, functionality, identity, and scope boundaries.
3. Representative wide and narrow layouts, relevant intermediate widths, keyboard behavior, and actual content or state extremes.
4. Visual hierarchy, coherent execution, subject-specific decisions where appropriate, and complete content throughout the target.
5. Applicable project checks and any likely regressions caused by the change.

Use evidence available in the host: source inspection, rendered inspection, interaction testing, and executed project checks remain distinct. Record what was actually observed and by whom when relevant. Source inspection cannot establish a rendered result, and attractive captures cannot establish a working interaction. Do not install tooling or create an external service solely to satisfy a ritual.

For visual quality, explain a particular choice and its effect on understanding, use, or product expression. Check whether the direction survives beyond the hero, whether important information leads, and whether restraint has removed useful substance. Judge refinement within the inherited identity. Aesthetic conventions are not automatic defects, and no universal score, image quota, animation count, or fixed number of alternatives defines success.

Correct task and access failures before significant comprehension issues, then finish. Reinspect the affected paths and layouts after changes. Return to solution definition if the evidence exposes a structural cause; do not continue decorating an incorrect structure.

Stop when material issues within scope are resolved and applicable checks have been performed, or when a specific dependency prevents further work. State remaining failures or unverified behavior plainly. If rendering is unavailable, deliver useful implementation or static findings and identify that limit. If the user explicitly required verification that could not run, that portion of the request remains outstanding.

The final response leads with the result, followed by consequential decisions, evidence, and remaining limitations. It does not need to narrate every checkpoint. Planning and review deliver their respective outputs; they do not claim implementation completion.

## 6. Worked routing examples

| Request | Selection | Decisions that make the work specific | Completion evidence |
|---|---|---|---|
| Develop subscription management in an existing product | Create + task execution + forms and journeys | Recover actual plan, billing terms, permissions, available actions, integration boundaries, and pending states; inherit existing identity. Resolve unknown cancellation consequences rather than guessing. Use data-interface guidance only for an applicable history or comparison region | Supported actions and their relevant failure paths work within the specified environment; terms and current state remain truthful; limitations are visible |
| Redesign the Benchroom repair queue | Redesign + task execution + data interfaces | Preserve the six records, identifiers, estimates, due dates, statuses, indigo brand constraint, search, filters, and ready-for-pickup behavior; improve the receptionist's path | Matched baseline and final records, correct whole-queue counts, working filters and object feedback, and usable corresponding layouts where observed |
| Improve only dashboard typography | Refine + relevant craft sections | Diagnose relative text roles, wrapping, and numeric readability; preserve colors, outer layout, content, and behavior. A complete dashboard redesign procedure is unnecessary | Proportional typography diff, preserved protected files and decisions, and observed or explicitly unverified fit at affected widths |
| Review a commercial page without edits | Review + persuasion + content interfaces | Follow the offer, supplied proof, content order, and actual next action; inspect a form section only if it affects the requested review | Prioritized findings linked to real locations and evidence, honest coverage, and unchanged project files |
| Build a searchable knowledge collection with an article view | Create + exploration with local reading + content interfaces | Establish real metadata, search or navigation behavior, item context, article hierarchy, anchors, and return paths; keep collection and reading needs distinct within one identity | Users can find an item, read it, navigate its sections, and return without losing essential context; keyboard and narrow layouts are checked where possible |

Without browser access, these routes retain their task and scope. Their verification outcome changes: rendered and interaction claims remain unobserved unless another permitted capability actually establishes them.

## 7. Package implementation target

The entry point owns selection, shared boundaries, and direct reference links. The four primary procedures belong in conditional workflow references. The three task guides specialize the work. The six existing subject references retain their responsibilities; they supply context, surface priorities, direction, visual execution, interaction, and review evidence without repeating full workflows.

The installed skill includes these resources under its `references/` directory:

| Path | Responsibility |
|---|---|
| `workflows/create.md` | Missing-surface procedure and completion criteria |
| `workflows/redesign.md` | Incumbent baseline, replacement decisions, and preserved behavior |
| `workflows/refine.md` | Focused diagnosis, proportional intervention, and regression checks |
| `workflows/review.md` | Read-only inspection, evidence, priorities, and findings |
| `tasks/data-interfaces.md` | Record-oriented work, data meaning, actions, states, and verification |
| `tasks/forms-and-journeys.md` | Input, state transitions, consequences, recovery, and verification |
| `tasks/content-interfaces.md` | Separate persuasion, reading, and exploration sections with concrete content and navigation decisions |

These seven additions make fifteen package files including the entry point, metadata, and six subject references. All runtime guidance is implemented inside the installed package; this repository document is not a runtime dependency.

Load the selected workflow once and reuse it while it remains current. Load task sections when they affect decisions and subject sections when their details are needed. Entry links must make the workflow and applicable task sections directly discoverable; no chain should force reading every guide. Narrow refinement and review can omit a task guide when relevant subject guidance is sufficient.

Keep the single skill identity, normal automatic discovery, and explicit host invocation. The procedure names are internal selection concepts, not new slash commands or executable interfaces. Preserve host metadata and use the same source package for both initial hosts. No model SDK, required service, browser driver, or deterministic interface engine is added by this revision.

## 8. Delivery and acceptance

| Phase | Deliverable | Exit criterion |
|---|---|---|
| 1. Define | This procedure specification and aligned product and architecture records | Selection, intervention boundaries, task specialization, completion, and evidence expectations are explicit |
| 2. Implement | Revised entry point, conditional workflow and task guides, relevant subject-reference improvements, and worked guidance examples | A complete request selects a useful procedure without requiring users to enumerate every adjustment; all resources are self-contained and package checks pass |
| 3. Evaluate and consolidate | Actual host runs, observed corrections, and representative documented outputs | Representative complete tasks and focused interventions are observed in both hosts, relevant failures are addressed, and remaining gaps are documented |

Use the existing [manual evaluations](../evals/README.md) as the starting set. Cases 01 and 06 exercise creation, case 02 redesign, cases 03 and 05 refinement, and case 04 review. The backend control remains a check against unrelated activation.

For phase 3, add a complete forms-and-journeys case and a collection-to-article case to cover task decisions that the existing fixtures do not establish. Specify confirmed product rules and local demo boundaries in those fixtures. Reuse the current Met, Failed, and Unobserved reporting; do not introduce an aesthetic score or an automated agent runner.

Assess observable process decisions, appropriate guidance loading when visible, artifact changes, functioning outputs, visual results, and verification honesty. Do not require private reasoning, verbose stage reports, or fixed tool-call sequences as evidence. A routing success is not a completed task, and a good-looking page does not excuse broken behavior or scope violations.

Run affected cases after corrections. Repeat broader coverage when shared changes or unresolved evidence gaps justify it. CLI distribution and publication follow this content maturation as separate work.
