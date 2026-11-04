# Interaction

Read the sections affected by the request. Reuse established controls and their behavior; custom styling is not a reason to rebuild a working interaction primitive.

## Controls and affordances

Match the element to its job: links navigate, buttons perform actions, and form controls collect values. Make the name and visible form communicate the action. A clickable-looking region should have a meaningful result; an illustrative preview should not imply a live integration.

Keep primary and secondary actions distinguishable. Place object actions close to the object and clarify consequences when ambiguity matters. Avoid hiding essential actions behind hover alone. For dense interfaces, use familiar disclosure patterns without turning every row into an unlabeled collection of icons.

## UX writing

Name the action, object, and consequence at the point of decision. Prefer concrete labels such as "Download invoice" to vague labels when the object is known. Use the product's established terminology consistently.

Help text should answer a likely question rather than repeat the label. Errors should explain what failed and what the user can do next. Preserve the user's input where possible and avoid blaming them for a network or service failure.

For a destructive or consequential action, make the affected object and outcome clear and follow the product's confirmation or recovery pattern. Do not add repeated confirmation dialogs to ordinary reversible actions.

## Semantics and access

Start with native elements or established accessible components. Give controls accessible names and associate visible labels, hints, and errors programmatically where applicable. An icon-only action needs a name that describes its purpose. Decorative images should not create repetitive announcements; meaningful images need an appropriate text equivalent.

Check reading and focus order, visible focus, and keyboard operation of the changed interaction. Do not remove focus outlines without an equally visible replacement. Keep targets comfortably operable and separated; shrinking the label does not have to shrink the hit area.

For dialogs, menus, tabs, or other composite widgets, preserve the established keyboard model and focus management. A dialog should not strand focus behind it; closing it should return users to a sensible location. Keep expanded, selected, invalid, and disabled states consistent between visuals and exposed semantics. Prefer a reliable existing primitive over hand-built ARIA behavior.

## Relevant states

Design states that the changed feature can actually encounter. Distinguish them instead of rendering every absence as an empty panel:

| State | Useful behavior |
|---|---|
| Initial empty | Explain what belongs here and offer the first useful action |
| No filter matches | Preserve the query and offer a way to broaden or clear it |
| Loading | Keep context stable, indicate progress, and prevent accidental duplicate actions where appropriate |
| Success | Confirm the result where users are looking and make the next state clear |
| Error | Preserve useful work, explain recovery, and distinguish local validation from service failure |
| Unavailable or restricted | Explain the relevant limitation without suggesting that data is merely loading |

Mark zero as zero and missing data as missing. Do not invent plausible-looking business data to conceal a failure. Announce important dynamic status without interrupting unrelated reading or moving focus unnecessarily.

## Forms and data actions

Use suitable input types, autocomplete, and mobile keyboard hints when relevant. Explain format constraints before an avoidable failure. Associate field-specific feedback with the field; make a failed submission understandable without requiring users to search the entire form.

For asynchronous actions, provide pending feedback and a safe retry path. Disable only what cannot currently be used; preserve navigation and reading where possible. Keep loading changes from displacing the action the user is trying to reach.

Reflect the result actually confirmed by the integration or local demo. Clear or update stale feedback when a new attempt would otherwise appear successful. An uncertain network outcome does not prove a consequential operation failed; use the project's established status and retry behavior. For complete input or state-change work, use [Forms and journeys](tasks/forms-and-journeys.md) to connect these details to the action contract and verification cases.

## Motion and responsive behavior

Use motion to explain a state change, spatial relationship, or meaningful transition. Give feedback promptly and keep the duration proportional to the interaction. Avoid motion that competes with reading, repeatedly requests attention, or requires users to wait for content.

Honor reduced-motion preferences and keep essential content and controls available when animation or scripting fails. Prefer transitions that avoid unnecessary layout work; consider rendering cost when effects cover large areas.

On touch and narrow screens, preserve an equivalent route to hover actions, readable errors, and usable overlays. Test the interaction with the keyboard or the relevant input method; a screenshot alone cannot establish that it works.
