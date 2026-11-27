# Interaction

Use for controls, keyboard navigation, focus paths, feedback, and accessibility verification. Reuse reliable existing primitives.

## Semantics and feedback

- **Right element for the job:** `<a href>` for navigation, `<button>` for actions, `<details>`/disclosure for inline expansion, modal `<dialog>` for bounded decisions, full route for sustained work. Never style ordinary links as tabs or fake a `<select>` with `<div>` elements without full keyboard/ARIA semantics.
- **Predictable naming:** give controls specific verb-object names (*"Delete invoice"*, *"Close details"*); provide descriptive `aria-label` on icon-only controls and `aria-hidden="true"` on decorative icons. Reserve directional arrows for actual navigation or disclosure.
- **Honest feedback near the action:** expose `aria-expanded`, `aria-pressed`, or `aria-invalid` cleanly; update stale feedback immediately on retry; confirm destructive consequences proportionally without interrupting harmless actions. See [States](states.md) and [Forms](forms.md).

## Accessibility acceptance (Web / WCAG 2.2 AA)

For native apps, apply the platform's own accessibility tools and units rather than CSS pixel rules.

- **Non-text contrast (`>= 3:1`):** check authored controls, state boundaries, and focus indicators per [non-text contrast exceptions](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- **Focus visibility & path:** verify forward/reverse `Tab`, `Enter`/`Space`, and `Escape` dismissal. Keep modal focus trapped while open and return focus to the trigger on close; never leave closed mobile drawers in the tab order. Ensure sticky bars never hide focus per [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).
- **Target size:** ensure interactive targets meet at least `24x24` CSS px (prefer `40–44px` on touch controls) per [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- **Zoom & reflow:** verify `200%` text resize and `320px` reflow without clipped controls per [resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), and [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
