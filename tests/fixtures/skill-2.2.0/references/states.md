# States and interface resilience

Use when a feature must remain understandable beyond its ideal screenshot. Choose states from actual behavior, not a checklist of fictional failures. A synchronous local filter does not need an invented network spinner. A remote save does need an honest pending and failure path. Coordinate this work with [Forms](forms.md), [Tables](tables.md) and [Interaction](interaction.md).

## Map the state transition

For the affected action, identify the current state, user intent, operation, possible outcomes and the information needed afterward. A repair marked ready may leave a “waiting” filter; an uploaded file can be processing rather than complete; an empty search can be a valid result rather than an error. Name these distinctions before choosing visuals.

Use the data source as authority. Avoid separate booleans that allow contradictory combinations such as success and pending at once. Preserve the application's existing state model when it works. A design refinement should not invent a new persistence or synchronization architecture unless the task includes that work.

For every visible status, ask what the user can do next. “Something went wrong” with no retry, return or explanation can trap the task. A loading panel that hides useful previously loaded data may be worse than a subtle updating state. Choose based on whether stale information is safe and how important continuity is.

## Empty does not mean failed

Distinguish a new account with no records, a filter with no matches, a permission-limited view and a service that could not load records. Their recovery paths differ. A new account can explain how to create the first record; a search should offer clearing or changing the query; a permission limitation should explain a supported access route without exposing private data; a load failure should not imply there are no records.

Keep relevant controls available in empty results. Do not remove search when it is the route out of the empty state. A small local list can use a plain message rather than a large illustration. A useful empty state tells the user what is missing and the next legitimate action; it does not need motivational marketing copy.

## Preserve continuity during change

Retain user input, selection and navigation context when the product permits it. If the selected record disappears, choose a sensible next location and explain why. Focus should not fall back unpredictably to the document body. If a background refresh changes ordering, do not move a record under the pointer during a consequential action without protecting the interaction.

Async responses can arrive out of order. Test that a slow earlier search does not replace newer results. A saved message should correspond to the values actually saved, not a later draft. Where optimistic updates exist, show a supported rollback or recovery path. Do not introduce optimism solely because it feels fast; it changes the product's behavior contract.

## Stress the content

Use realistic extremes: a long name, multiline description, large amount, missing optional image, unexpected punctuation and translated text. Do not treat a fixed percentage of expansion as a guarantee for all languages. Test actual supported strings where available. A user-entered paragraph may need wrapping; a serial number may need a readable break strategy; currency needs locale-aware formatting appropriate to the product.

Avoid truncating important consequences or the only distinguishing part of a record. If truncation is justified, provide another accessible route to the full information. A title attribute alone is unreliable for touch and keyboard. Ensure enlarged text does not expose hidden assumptions in fixed-height cards and controls.

## Permission, offline and partial results

Show only information the user is allowed to see. A disabled action can explain why when that information is safe; sometimes the right behavior is absence. Follow product rules instead of inventing role semantics. Do not expose forbidden record names in error messages or placeholder content.

When offline behavior is supported, distinguish cached content, unsent local changes and confirmed remote state. State whether an action will retry automatically and how the user can inspect or cancel it. If the product has no offline capability, provide an honest failure path rather than simulating a successful save.

A partial result needs a description of its scope. Showing two loaded accounts while a third failed should not present their sum as the complete organization balance. Keep the available work useful without hiding the incompleteness. This same principle applies to inspection reports: unobserved states are not passed states.

## Motion and announcement

Use motion to explain meaningful change, not to conceal waiting. Preserve reduced-motion behavior and keep status understandable without animation. A spinner needs a text or accessible status; a toast should not be the only place to recover a critical confirmation. Avoid multiple live regions announcing the same event.

Do not announce a whole record list after each input character when a concise result status suffices. Test screen-reader announcements with the real implementation when available. Source attributes express intent, not proof of the actual reading experience.

## Worked checks

For a filtered queue, select “Waiting,” mark one record ready, and verify that the row, total, result count and feedback agree. Confirm where focus goes after the row leaves the view. Then clear the filter and find the same record in its new state. For a form, submit invalid data, correct one field and ensure unrelated input survives. These exercises test state integrity, not just whether a button can be clicked.

Use deterministic local fixtures for failures where possible. Do not depend on breaking a real production connection or changing customer permissions. Keep any destructive or external operations within the user's authorization and test environment.

## Acceptance

Observe the affected transition and at least the realistic failure or empty alternatives it supports. Check data consistency, focus, feedback, retained input and a route back to useful work. Do not mark unavailable network or platform behavior as passed. A resilient interface can be visually simple; its quality is that users can understand what happened and continue safely.
