# Product structure

Use when resolving navigation, information architecture, record workflows, or detail containers. Work within the requested feature set and real product capabilities.

## Navigation and detail containers

- Map destinations to distinct user tasks; keep single-page anchors styled as section navigation rather than pretending to be full routes. Never leave dead `#` links or fake *"Learn more"* traps.
- Choose the detail pattern from task duration:
  - *Inline disclosure:* quick explanation or small local edit.
  - *Side panel / split view:* inspecting or editing one record alongside a comparison list.
  - *Dialog:* bounded confirmation or focused short task.
  - *Dedicated route:* sustained work, deep reading, or shareable destinations.
- Preserve filter, search, and scroll context on return using stable record keys (never array index). Keep navigation usable on `390px` mobile without hiding primary actions.

## Task truth across surfaces

- **Public offers:** state what is offered, who it serves, honest terms/evidence, and one clear next action—omit fake FAQ/proof strips when no real data exists.
- **Operational data:** keep units, periods, signs, and filter counts consistent; bind actions to their object. See [Tables](tables.md), [Charts](charts.md), [Forms](forms.md), and [States](states.md).
- **Collections & reading:** preserve route into, through, and back out of items without hover-only essential metadata.
- **Editorial sequence:** ensure every section answers a distinct reader question rather than repeating the same headline promise.
