# Forms, validation and recovery

Use for data entry, validation, submission, and recovery. Coordinate focus/semantics with [Interaction](interaction.md) and async states with [States](states.md).

## Core rules

- **Match the real promise:** label local demos honestly (*"Demo validated; no message sent"*) and never fabricate payments, reservations, or persisted accounts. Place consequential terms (cancellation, pricing, destructive impact) beside the submit action.
- **Order and grouping:** follow the user's natural mental sequence in a clean single column (pairing only closely related short fields like city/postal code). Do not split short forms into multi-step wizards merely for aesthetic effect.
- **Visible labels & semantics:** use persistent visible `<label>` elements (placeholders are hints, not labels), appropriate `type`/`autocomplete`/`inputmode` attributes, and `aria-describedby` linking hints and errors. Prefer native `<select>` and accessible primitives over fragile custom widgets.
- **Validate fairly & retain data:** validate on submit or blur—never scream errors after a single typed character. Clear errors promptly on correction (`aria-invalid`). Always preserve user input on validation or network failure.
- **Summary & focus:** for multi-field errors, focus a concise error summary linking to each invalid control; for a single error, focus the field directly. Prevent duplicate submissions during real remote requests.

```html
<label for="reply-email">Reply email</label>
<input id="reply-email" name="email" type="email" autocomplete="email"
       aria-describedby="email-hint email-error" required>
<p id="email-hint">Used only to reply to this inquiry.</p>
<p id="email-error" hidden>Enter a valid reply email address.</p>
```

## Acceptance

Test empty submit, malformed input, correction, long strings, keyboard-only completion, and `390px` / `200%` text zoom. Verify entered data persists and confirmation wording matches actual backend or local behavior.
