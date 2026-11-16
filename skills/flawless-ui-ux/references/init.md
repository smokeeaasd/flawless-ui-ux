# Initialization inside the agent

Use for an explicit `init` request, or before creating a whole interface or broadly redesigning one when no useful product record exists. The agent owns discovery, conversation and writing. The CLI's `context` command is an optional read-only helper; terminal `flawless-ui-ux init` no longer initializes files. No API key, model client or separate onboarding skill is required.

The deliverable is a product record: who the product serves, the work it supports, confirmed facts and constraints, and important open decisions. It is not a visual direction, a first-screen brief, or an implementation. Keep the task that brought you here so a nested initialization can return to it.

## Inspect before interviewing

Confirm the requested project or app boundary. Read relevant documentation, package/config files, representative routes or features, copy, and available assets. Learn the current platform and stack from evidence where possible. A scaffold's package name does not establish its audience or purpose. Stay inside the selected project; do not search sibling projects, installed skills or historical fixtures for product facts.

Recover authoritative product documents before creating one. The existing reader recognizes `PRODUCT.md`, `docs/product.md` and `.flawless-ui-ux/product.md`; a document explicitly identified by the user remains authoritative at its current location. Use `context --project /project --format json`, with `--source` for a selected custom document, when a runner is available. Otherwise read the relevant files directly. Read beyond a truncated excerpt before deciding what is missing or replacing content.

A useful record contains substantive, relevant product knowledge. Headings, HTML comments and unfilled prompts are not a completed record. An old template can be filled at its existing path. If multiple records conflict and the user has not identified the authority, resolve that material conflict in the interview instead of creating another competing record.

An existing interface is evidence, even without a design document. Preserve its code, content, assets and behavior during initialization. Existing names, logos, required wording and explicit brand commitments may be recorded as facts; do not choose a palette, font, visual metaphor or new brand direction. Leave every existing design document untouched, including an old empty design template.

## Confirm the product

Before writing a new product record, complete one answer or confirmation round. Use the host's structured question tool when available; otherwise ask in chat and wait. An earlier answer in this same initialization counts: do not request another approval merely to write the file.

Ask up to three related questions about the unknowns that most affect product decisions:

- Who uses the product, in what situation, and what must they understand or accomplish?
- What does it provide, and which capabilities, terminology, content or evidence are actually available?
- Which platform, integration, accessibility, delivery or brand constraints must future work preserve?

Choose questions from the actual gaps. Do not ask the user to repeat a known stack or details already supplied. With a sufficiently precise request, present a short reading of the product and ask for confirmation instead of running a questionnaire. Add another round only when an answer exposes a material unresolved issue. Optional details can remain open.

For example, a request for a fictional café page may settle the audience and basic purpose while leaving its offer, location or supported next action unknown. Ask which of those matters now; do not invent reservations or customer ratings. If the user delegates fictional naming or another product choice, record the delegation and its limits. Delegation does not establish nonexistent integrations or factual commercial proof.

Do not ask for aesthetic lanes, CSS values or a preferred composition here. In an empty project, ask about a stack only when the requested work depends on that choice and it has not been delegated; a standalone product setup can leave it open for the later build.

No answer is not confirmation. A failed question tool is not permission to infer approval; fall back to chat. If a material answer is pending, wait and do not create a draft product file or its directory. Respect the host's execution mode and write permissions: when writing is unavailable, present the proposed context and name persistence as pending, rather than reporting initialization complete.

## Persist a useful record

After the round, write through the host's ordinary file tools. Update the existing authoritative record; when none exists, create `.flawless-ui-ux/product.md` inside the selected project. Use the [product outline](../assets/context/product.md) as a starting point, not a form that must be filled mechanically. Remove unused prompts and omit irrelevant sections.

Capture the product's purpose, audience and prioritized tasks, platform/stack, capabilities and constraints, binding brand facts, sources and open questions. Distinguish user-confirmed information, repository observations, explicitly delegated choices and unresolved decisions in normal prose or short lists. Preserve required wording. Do not introduce another JSON state/schema, secrets, speculative claims or a transcript dump.

On a rerun, read the current record and update only what is stale, missing or explicitly changed. Ask about unresolved material differences; do not re-interview settled fields. If nothing needs changing, report the existing useful context without rewriting it. A mixed document may contain useful design decisions: preserve unrelated sections while updating its product content. Do not rename, move, duplicate or delete records as a side effect.

Read the saved result. Confirm it contains meaningful product information, retains known facts and labels open decisions. A filesystem write succeeding does not establish those conditions. A partial write, conflict or permission failure remains incomplete; explain the exact remaining step and preserve existing work.

## End or resume

For explicit init, report the saved/reused path, the essential confirmed facts and meaningful open decisions, then stop. Suggest the next task according to the project, without starting it: creation for a scaffold, work on a named existing surface, or a scoped review when requested. Do not create a design document, install dependencies, build a screen or initiate a visual workshop.

When init was entered for a creation or redesign request, return to that original task after the product record is ready. Reuse the answers and record; do not ask them again. Product knowledge does not itself authorize replacing an existing identity. Continue with the original intervention and its [direction guidance](direction.md). Local fixes and review-only work remain eligible to proceed directly without this onboarding.
