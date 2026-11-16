# Layout decisions and responsive structure

Use when content order, grouping, density or adaptation prevents the task. Read [Direction](direction.md) for an authorized new composition and [Calibration](calibration.md) for refinement. A layout pass within an existing identity does not authorize replacing its visual language.

## Find the information path

Write the first three things the visitor must understand or do. On a repair queue this might be finding a bicycle, identifying its status and opening the next action. On a public offer it might be recognizing the service, comparing terms and contacting the provider. On a guide it might be locating a topic, reading an explanation and returning to the index.

Trace those steps in the implementation. Note where the eye, pointer and keyboard go. A tall summary block can push the actual work below the fold; an overly dense header can hide location; a persistent panel can preserve comparison or consume the space the primary work needs. The diagnosis is about these relationships, not whether a sidebar or card is fashionable.

Use a squint or reduced-detail view to test hierarchy. The primary region should remain recognizable without relying on every word. Then restore detail and verify that labels and controls are readable. Strong silhouette and readable content are complementary; a beautiful abstract composition can still fail as an interface.

## Group before adding containers

Related items should be closer to each other than to the next independent group. Inspect real spacing values and content lengths. If a border is the only reason two fields appear related, ask whether proximity and heading placement can do the job more clearly. Containers remain useful for selection, ownership, separate tasks and layered surfaces. Removing every card can destroy useful grouping.

Use shared edges and deliberate exceptions. Align the heading, explanation, controls and records that belong to one region. Optical adjustments may be appropriate for icons and large type, but first establish the structural grid. A hero image can intentionally bleed beyond a text column; a randomly misaligned submit button usually communicates no such intent.

Spacing should express relationships. A project may use a 4-unit or another established scale; preserve its meaningful steps. Repeating 24px everywhere makes a form's internal rhythm indistinguishable from the separation between forms. More space above a heading than between the heading and its content often helps ownership, but assess the actual composition rather than applying that ratio mechanically.

## Choose density from the work

Frequent comparison benefits from stable rows, aligned quantities and limited interruption. Exploratory content can allow larger images and more variation. Density is information per usable region, not simply small font size. Remove repetitive labels or unhelpful containers before shrinking working text. Conversely, large empty panels are not automatically premium: they may hide a lack of useful information.

For a dashboard with four summaries, a chart and a record list, ask whether all three need equal emphasis. If the user is reconciling records, make the list accessible early and keep summaries compact. If the user is deciding whether cash covers upcoming bills, a projection and obligations may lead. The same dataset supports different compositions because the decision differs.

## Adapt relationships, not screenshots

Identify which region must remain paired with which other region. A service and its price should not separate; a row action should not drift to an unrelated record; a chart's legend must stay connected to its series. Reordering for visual convenience must not create a confusing DOM or focus sequence.

Let breakpoints follow content pressure. Inspect narrow, intermediate and wide sizes instead of assuming that two named devices cover the space. A component used in both a main column and a narrow inspector may need container-aware behavior rather than a global viewport breakpoint. Prefer the project's supported layout primitives; do not introduce a compatibility-dependent feature without checking its target browsers.

```css
.workspace { display: grid; grid-template-columns: minmax(0, 1fr) 20rem; gap: 1.5rem; }
.workspace > * { min-inline-size: 0; }
@media (max-width: 60rem) {
  .workspace { grid-template-columns: minmax(0, 1fr); }
}
```

This fixes a common grid minimum-size problem; it does not decide what a phone should show first. That decision still follows the task. A detail panel may move below a selected record, become a separate view or use a bounded dialog. Pick the model that preserves context and a return path.

## Scroll, fixed regions and focus

Choose a scroll owner deliberately. Multiple nested scroll regions can make wheel, touch and keyboard navigation unpredictable. A fixed header should not cover anchored headings or focused controls. Reserve space for bottom action bars and device insets. Test zoom and tall labels, not only the default viewport.

An intentionally horizontal table is different from document overflow. When preserving two-dimensional comparison is justified, make the region discoverable and keyboard-operable as [Tables](tables.md) describes. A screenshot with no document overflow does not prove that essential values are visible or reachable.

For reading, avoid forcing every section to one screen height. Content length, font settings and language vary. For marketing, a composed first view can be useful, but do not clip an action to protect a fixed-height design. For working screens, avoid entrance choreography or oversized framing that delays the task.

## Worked intervention

A queue has a promotional panel above its filters and rows. The user asks for easier scanning while keeping the feature set. Measure the space occupied by the promotion, locate search and status controls, and identify the required record fields. Reduce the promotion's priority or move it only when within scope. Place search and filters with the records; align status and next action consistently. At phone width, keep record identity and status together and provide an explicit detail action.

Do not respond by adding another KPI row. Do not delete the promotion if its content is protected. The improvement should be explainable as fewer interruptions between arriving and selecting the right record, not “a cleaner look.”

## Acceptance

Run the task from arrival to result using pointer and keyboard. Inspect the layout with empty data, long content, enlarged text and realistic overlays. Check that primary actions remain findable and focus order follows the meaningful reading order. Capture corresponding states before and after where possible. If a rearrangement makes the opening more dramatic but slows the main task, revisit the structural hypothesis. Preserve useful variation; identical section silhouettes are not a requirement for coherence.
