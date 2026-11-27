# Review

Use for critique or unresolved diagnosis. Keep review-only work strictly read-only: no source edits, dependency installs, formatting, project artifacts, or live-state mutations. Save permitted captures outside the project.

## Establish the evidence

Separate what each check actually proves:

- **Source:** implementation, copy accuracy, state logic, and intended tokens.
- **Rendered (`1440x900`, `390x844`):** actual composition, loaded fonts, crops, surface finish, contrast, and overflow.
- **Interaction:** keyboard path, focus visibility/order, error recovery, and state transitions.
- **Project checks:** exact commands and observed test/build results.

A passing build or clean accessibility scan never proves visual quality; a screenshot never proves keyboard behavior. Label unverified aspects explicitly.

## Visual self-critique

Inspect captured screenshots at actual reading size (not shrunk thumbnails) alongside CLI `visualMetrics` telemetry, and answer these six questions before signing off on any creation, redesign, or review:

1. **First-glance anchor:** Where does the eye land in the first second, and does that match the user's primary task?
2. **1 → 2 → 3 path:** Can you trace primary subject → supporting context → next action without competing elements fighting for attention?
3. **Product specificity & signature:** Does the layout carry a clear, content-earned visual signature, or does it read as an interchangeable generic template?
4. **Surface, border & palette finish:** Are neutrals hue-coherent, borders subtle (`1px` hairlines), elevation crisp, and accent colors disciplined—or are heavy strokes and competing hues creating clutter?
5. **Type scale & optical alignment:** Did the intended fonts load, does `displayToBodyRatio` match the surface tone, and are labels, numbers (`tabular-nums`), and controls cleanly aligned?
6. **Whitespace & density balance:** Is negative space framing the focal point intentionally without pushing primary work below the fold or cramping mobile rows?

If any answer fails on a creation or refinement task, fix the owning relationship in source and re-capture rather than rationalizing the screenshot.

## Run a task-shaped critique and report

Exercise one realistic end-to-end journey (comparing a period and checking totals, submitting an invalid form and recovering, filtering a queue and updating a record, or opening and closing a collection detail). Apply the [final pattern pass](anti-slop.md#final-pass) within scope.

Write reproducible findings with: **location & conditions** (viewport, state, route), **observed behavior**, **user/visual consequence**, **certainty** (confirmed rendered/interaction failure, source-derived risk, or aesthetic recommendation), and a **proportional correction**.

Prioritize broken tasks, data errors, and accessibility failures above cosmetic tweaks; keep preferences distinct from defects; stop when in-scope issues are resolved or explicitly scoped out.
