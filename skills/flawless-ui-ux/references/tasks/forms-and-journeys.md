# Forms and journeys

Use inside the selected workflow when a visitor provides information or changes state: registration, onboarding, checkout, editable settings, subscriptions, or a focused form interaction. Apply only the transitions and sections relevant to the request. A visual refinement does not authorize different business rules.

## Recover the action contract

Inspect the existing fields, rules, saved values, supported actions, permissions, and integration boundary. Establish what the visitor is trying to change and what confirms that the change took effect. Distinguish local input validation from a decision made by the service.

Recover consequential facts before presenting them: required information, eligible options, prices and billing periods when supplied, timing, cancellation consequences, and recovery behavior. Inspect project sources first. If a missing fact changes the promised outcome, resolve it instead of inventing commercial policy. Continue independent work on confirmed facts.

Decide whether the task is a real integration, a local interaction, or a preview. A functioning local form can validate and show demo feedback; it cannot truthfully claim that a reservation, payment, email, or server update occurred.

## Grouping and progression

Group fields around meaningful decisions. Put context and constraints near the point where they matter, and distinguish current saved state from proposed changes. Use labels and product terminology that describe the actual information and outcome.

Choose a single page or multiple steps from the task's dependencies, amount of information, and existing conventions. Do not introduce a wizard merely to make an ordinary form look more elaborate. For an actual multi-step flow, identify what is required to continue, what Back preserves, what can be edited later, and where completion occurs.

Keep primary, secondary, and consequential actions distinct. Name the object and outcome where ambiguity matters. Follow established confirmation or recovery patterns for destructive work while keeping routine reversible actions direct. Use the existing component model for dialogs or other composite controls.

## State transitions

For a complete journey, trace the relevant transitions before styling all of its screens. A compact working sequence is enough; it does not require a new schema or document. Use the confirmed project behavior to resolve each transition:

| Transition | Decisions to establish |
|---|---|
| Viewing saved state → editing | Which values are current, which controls are permitted, and what counts as a change |
| Editing → invalid input | Which constraint failed, where the explanation appears, and how values and focus are preserved |
| Valid submission → pending | Which action is underway, how duplicate submission is avoided, and what remains usable |
| Pending → confirmed success | Which result the service or local demo actually confirmed, and how the interface reflects it |
| Pending → failure or uncertain outcome | What is known, what work is retained, and what retry or status-check path the integration supports |
| Back, cancel, or leave | What the existing product preserves or discards and whether the consequences need explanation |

Use only applicable rows. A static contact-interest demo does not need fabricated billing failures or account permissions. A timeout does not prove that a consequential server operation failed; follow the integration's established status and retry behavior rather than promising an unverified result.

## Feedback and recovery

Use appropriate input types, labels, autocomplete, and keyboard hints where they fit the field. Explain avoidable constraints before failure. Keep local validation close to its field and associate hints and errors programmatically where applicable.

On failed submission, make the failure understandable without losing useful input. Provide a sensible focus route to an error or affected field; do not repeatedly steal focus during ordinary typing. Distinguish a format problem from an unavailable service, permission restriction, or business-rule rejection.

Pending and completion feedback belongs where the user expects the result. Disable only controls that cannot currently be used. Keep reading, navigation, and unaffected actions available where possible. Remove or update stale feedback when it would misrepresent the current attempt. Success wording must match the actual outcome.

For retries or conflicts, follow the confirmed integration contract. Avoid adding persistence, automatic resubmission, or a recovery mechanism that the project cannot support.

## Access and narrow layouts

Use reliable existing primitives for controls, dialogs, menus, and focus management. Keep labels, relevant help, errors, and disabled states understandable through both visual treatment and semantics. Preserve meaningful keyboard order and visible focus.

Check long labels, error messages, small viewports, and the space taken by the mobile keyboard or sticky actions. A primary action must remain reachable and its consequences readable. Closing an overlay should return focus to a useful location; moving through a journey should not strand the user in a previous step.

Use [Interaction](../interaction.md) for control and state details and the relevant [Craft](../craft.md) sections for grouping, contrast, typography, and responsive composition.

## Verification cases

Select cases that can establish the requested behavior:

- Current values and supported actions agree with supplied product rules and permissions.
- A valid path reaches the actual supported result.
- Relevant invalid input produces useful feedback without claiming success.
- A failure or uncertain outcome preserves work and offers the recovery the project supports.
- Pending behavior does not accidentally duplicate the action.
- Back, cancel, or leaving has the established effect when applicable.
- Labels, keyboard progression, overlays, and narrow-screen feedback remain usable where observed.

For refinement, verify the changed feedback or control and its dependencies rather than rebuilding the journey. For review, exercise only permitted read-only paths. A render does not establish submission behavior; use the evidence distinctions in [Review](../review.md).

## Example: subscription management

Show the confirmed current plan, billing period, renewal information, and actions available to this user before offering a change. Use supplied terms to explain a proposed plan change or cancellation at the decision point. Preserve the existing identity and integration behavior.

An unknown cancellation effective date is a consequential gap: resolve it before promising immediate termination or continued access. An action returning a failure should retain the current confirmed subscription and offer the actual supported recovery. A demo can show local transitions only when labeled accordingly. Use [data-interface guidance](data-interfaces.md) locally if a requested invoice history or comparison table needs it; do not add those regions by default.
