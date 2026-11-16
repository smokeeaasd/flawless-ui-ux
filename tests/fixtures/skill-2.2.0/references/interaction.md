# Interaction

Use for affected controls, state changes, and accessibility questions. Reuse established working primitives.

## Controls and feedback

Use links for navigation and buttons for actions. Give controls names that predict the result. Add icons where their meaning helps; reserve directional arrows for actual movement, disclosure, or a useful destination distinction.

Keep object actions near their object. Show the result where it is expected, and update stale feedback when a new action occurs. Errors should explain recovery without discarding useful input. Disable only what cannot be used during a pending action. Do not fabricate loading or failure paths for a synchronous local action.

Use appropriate inputs, visible labels, associated hints/errors, autocomplete, and keyboard hints. Announce important status changes without repeatedly interrupting reading or moving focus.

## Keyboard and semantics

Check logical reading and focus order, visible focus, keyboard activation, and a sensible location after changes. Essential actions must work beyond hover.

Prefer native elements or reliable existing components for dialogs, menus, and tabs. Keep exposed and visual state consistent. For a modal, ensure focus enters appropriately, remains within it while open, and returns sensibly on dismissal; preserve Escape behavior where applicable. Closed mobile navigation must not remain in the keyboard path. Check the desktop/mobile transition as well as the drawer itself.

For web work, consider current platform capabilities before adding custom behavior or a dependency. Check support in the project's target browsers and retain a usable fallback where needed; support in one browser does not establish compatibility elsewhere.

Decorative icons should not create repetitive accessible names. Meaningful images need suitable text alternatives.

## Accessibility acceptance

For web content, apply relevant WCAG 2.2 A/AA requirements within the intervention. The CSS measurements below describe web criteria. For native interfaces, use the platform's accessibility semantics, units, text scaling, input conventions, and tools instead of treating CSS thresholds as native specifications. Verify actual states rather than inferring compliance from source intentions.

- **Contrast:** measure actual foreground/background pairs using Craft. Meaningful authored control/state/graphic information generally needs 3:1 against adjacent colors, subject to [non-text contrast exceptions](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Decorative borders do not all carry this requirement.
- **Focus:** operate the affected path, check visible focus and applicable non-text contrast for authored indicators, and ensure sticky regions or overlays do not entirely obscure focus. See [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).
- **Targets:** check the 24 by 24 CSS px minimum or applicable spacing/other exception; use more generous targets where suitable. See [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- **Text and layout:** preserve browser zoom and user text-size preferences; check text resizing to 200% and vertical-content reflow at 320 CSS px where applicable. Retain local scrolling for genuinely two-dimensional content. See [resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) and [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
- **Spacing overrides:** test applicable user-set line height, paragraph, letter, and word spacing without content loss. These test overrides are not authored defaults. See [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).

Check recovery and reduced-motion behavior where the changed interaction needs them. Report exact observations and gaps; neither this list nor a source scan establishes full conformance.

## Choose semantics before styling behavior

Use a disclosure for optional local content, a dialog for a bounded interruption and a destination for sustained work. Do not style three ordinary links as tabs unless they really switch related panels with appropriate keyboard and state behavior. A menu is not a generic container for every floating region. Existing tested components usually handle more edge cases than a new hand-written imitation.

For an icon-only control, provide a name describing the action and object where needed: “Close invoice details” is clearer than “X.” A tooltip may explain an unfamiliar symbol but cannot be the only usable label on touch. Avoid giving every identical row action an indistinguishable accessible name. Visible text often removes the need for tooltips altogether.

Keep state in the real control: a toggle needs an exposed checked/pressed state; a disclosure needs its expanded state; an invalid input needs its associated error. Do not leave the old state in the accessibility tree while updating only the color. Decorative SVGs inside already named buttons should not repeat the button name. Prefer ordinary text and native elements to a large amount of corrective ARIA.

## Plan focus as a path

Write the expected route through the changed interaction: enter, act, observe and leave. Opening a modal should place focus where its task can begin, keep background content unavailable as appropriate, and return focus to a logical invoker when it closes. If the invoker was removed by the action, choose a surviving related control or heading. For inline feedback, retaining focus on the action is often preferable to jumping to a status message.

After filtering records, avoid rebuilding the focused search input. After deleting a record, choose the next relevant row action or list heading rather than the document body. After form validation, focus a useful error summary or the first invalid field according to the established pattern. A live region can announce the result without replacing a visible explanation; excessive announcements can be as disruptive as silence.

Test forward and reverse Tab, activation and dismissal as well as the happy pointer path. Check scrolling with sticky headers, touch keyboards and magnification. Resize with a mobile drawer open, close it and continue tabbing: hidden links must not retain focus. Native widgets have different conventions; use the platform reference rather than translating a web key handler literally.

## Verify failures and reversibility

For every changed action, identify whether it is local/reversible or consequential/remote. A local filter can update immediately. A remote save needs truthful pending and failure behavior, and a successful response must match the presented object. Do not show success on button click while the request is unresolved. Do not add a confirmation to every harmless action; reserve interruption for consequences that justify it.

Exercise repeated activation and a recoverable failure when those states exist. Confirm useful values survive and that stale feedback clears after a new attempt. If the action moves an item out of the current filter, explain the change and keep the remaining screen usable. See [States](states.md) for transition design and [Forms](forms.md) for input recovery. No amount of animation repairs a transition with incorrect data meaning.
