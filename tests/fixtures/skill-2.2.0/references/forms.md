# Forms, validation and recovery

Use for data entry, submission and confirmation. First recover actual fields, permitted actions, validation rules and integration boundaries. A polished form that discards valid input or claims a transaction occurred when it did not is unfinished. Read [Interaction](interaction.md) for focus and control semantics, and [States](states.md) for asynchronous outcomes.

## Define the transaction

Name what the user is trying to accomplish and the smallest set of inputs required for it. Separate account creation, quote request, booking inquiry and confirmed reservation: the same fields can lead to very different promises. In a local demo, state that submission validates locally. Never fabricate a successful payment, sent email or saved account.

Order fields according to the user's reasoning and dependencies. Group related fields with a meaningful heading or fieldset. A single-column layout often supports a simple task, but related short values may share a row when their labels and enlargement behavior remain clear. Do not split a short form into a wizard merely to create an onboarding aesthetic.

Put consequential terms where they affect the decision. A cancellation condition matters before confirmation, not only in a footer. A destructive action should identify the object and effect. If required business terms are unknown, resolve them before promising an outcome while continuing independent work on known fields.

## Labels and input behavior

Use a persistent visible label and associate it with the control. A placeholder can illustrate format but disappears during typing and is not a label. Connect hints and errors through `aria-describedby` when relevant. Indicate optional or required fields consistently; do not rely solely on color or an unexplained symbol.

Choose input type and autocomplete based on meaning. A telephone number is not a numeric quantity and can contain a plus sign. A postal code can start with zero. Use input mode to improve the keyboard when appropriate without rejecting valid formats. Preserve browser zoom and avoid tiny inputs that cause frustrating focus behavior on mobile.

Use native controls or the project's accessible primitives unless the task requires a custom interaction. A custom date picker has responsibilities around keyboard navigation, focus, range, localization and invalid text entry. A visually matching div is not an adequate replacement for a select. Do not add dependencies merely to avoid styling a native control.

## Validate without punishing entry

Validate constraints at the appropriate time. A field should not announce an error after the user has typed the first letter of a valid value. Submission can identify missing required data; after an error, correction feedback can update as the value becomes valid. Client-side validation improves feedback, but it does not replace authoritative server-side checks for a real integration.

Keep error messages specific and recoverable. “Invalid” provides no action; “Enter the email address where we should reply” may explain the missing input. Avoid over-restrictive validation for names and addresses. Do not invent a business rule such as a minimum age or region restriction because the UI pattern commonly contains one.

```html
<label for="reply-email">Reply email</label>
<input id="reply-email" name="email" type="email" autocomplete="email"
       aria-describedby="email-hint email-error" required>
<p id="email-hint">Used only to reply to this inquiry.</p>
<p id="email-error" hidden>Enter a reply email address.</p>
```

When showing the error, set `aria-invalid="true"` and remove it or set it false after correction. The actual privacy promise in the hint must be supported by the product; omit or replace illustrative wording when facts differ. Do not include the example's claim merely because the markup is useful.

## Error summary and focus

For several errors, provide a summary with links to the fields, then choose a predictable focus location. A concise summary can receive programmatic focus after submission; it need not become a permanent extra tab stop. For one local error, moving directly to the field may be simpler. Preserve the user's entered data.

An error shown below the fold is not sufficient if nothing tells the user submission failed. Conversely, moving focus on every keystroke interrupts entry. Announce consequential asynchronous status changes without repeatedly reading the entire form. Validate that a hidden field or closed disclosure does not receive unreachable focus.

## Pending, success and retry

Prevent duplicate consequential submissions. Disable the submit action during a real pending request when necessary, but retain readable status and avoid disabling every field without reason. If edits are allowed while a request is pending, define which values belong to the submitted request and prevent stale completion from describing newer input.

On failure, preserve useful input and explain whether retry is safe. Network uncertainty can mean the action succeeded but the response was lost; do not blindly instruct another payment attempt. Follow the integration's idempotency and status-query behavior. A local demonstration should not simulate this complexity unless it is part of the requested example.

Success must identify the result and next step. An inquiry receipt is not a reservation. A locally validated draft is not a sent message. Use precise wording and keep confirmation details available long enough to act on them. Do not replace the whole form with a celebratory panel that loses necessary reference information.

## Worked correction

A service inquiry contains unlabeled placeholders and clears all inputs when validation fails. Preserve the requested fields and layout boundary. Add visible labels, keep the entered values, connect each error and bring the summary into view after an invalid submit. Test correction and resubmission. If no backend exists, label the result “Demo validated; no message was sent.” This is a stronger improvement than changing the submit button's gradient.

For a genuine integration, exercise its permitted test environment and inspect network responses. Do not submit real personal data merely to prove a form works. Use project-owned test accounts or fixtures where authorized.

## Acceptance

Try empty submission, partial input, malformed data, corrected data, long text, keyboard-only completion and narrow-screen entry. Verify label association, current error state, focus and retained input. Test pending and server failure only when those states exist. Confirm that successful wording matches an observed outcome and that the form remains usable with enlarged text. Record integration behavior not exercised; a click handler and a green toast are not evidence of a completed external action.
