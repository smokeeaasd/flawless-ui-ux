# Product-aware workflows

Version 2 combines optional Markdown context, selected browser flows, and cross-screen evidence. The four public commands remain install, context, inspect, and verify. See [migration](migration-2.md) for the JSON report change.

## Markdown context

Reuse the project's authoritative product and design documents. There is no required frontmatter or document schema. Useful content includes audience, primary tasks, confirmed facts, constraints, identity, protected choices, source links, and clearly identified assumptions.

The context reader looks for `PRODUCT.md`, `DESIGN.md`, `docs/product.md`, `docs/design.md`, `.flawless-ui-ux/product.md`, and `.flawless-ui-ux/design.md`, in addition to its existing package/README/index/Vite inputs. It does not create these files. Use an existing location instead of creating duplicates:

```
flawless-ui-ux context --project . --source docs/brief.md --format json
```

Up to eight explicit Markdown inputs are accepted, in addition to the conventional candidates. Sources stay inside the selected project, follow the shared text/size/exclusion rules, and are read without running project code. Each context document includes its hash, an excerpt of at most 8,000 characters, and a truncation flag. The agent reads further only when needed.

At most twelve Markdown references per document are checked for file identity, without recursive content loading. External references are identified but not fetched. A source link may have an optional `sha256: <64 hex characters>` annotation on the same line. Matching hashes are current; changed ones are stale; missing/disallowed paths are unavailable. Links without a recorded hash have unchecked freshness. This establishes file identity, not semantic truth. The agent resolves conflicting statements and updates affected decisions when authorized.

Legacy `context.json` remains readable for migration, with a deprecation notice. It is not required and does not override Markdown. The reader never writes it or converts its decisions automatically.

## Selected surfaces

Repeat `--url` to select up to eight distinct HTTP(S) surfaces. Up to eight viewport overrides are supported, with a combined maximum of sixteen surface/viewport samples. One browser instance serves the batch; each combination gets an isolated context. The selector and optional flow apply to each selected URL. Choose separate runs for unrelated flows or selectors.

```
flawless-ui-ux inspect --project . --url http://localhost:5173/members --url http://localhost:5173/teams --consistency --output ../screen-review --format json
```

Consistency groups computed styles by HTML role or an existing `data-flawless-role` value, viewport, and state. It records typography, color, padding, radius, alignment, and gap, with surface/target provenance. Each sample includes at most 300 inventory elements; a truncated inventory makes coverage partial. Narrow the selector when necessary.

Differences are review evidence, not findings or scores. A primary and secondary button can legitimately differ. The agent uses product/design context to distinguish intentional variants from inconsistencies. No corresponding roles means incomplete consistency coverage, with a stated limit.

## Explicit flows

Ordinary inspection remains observational. `--flow` explicitly selects a project-local JSON description of UI actions in a permitted test environment. It contains only `schemaVersion`, `name`, and `steps`; executable code, shell commands, scripts, arbitrary browser expressions, and URLs are not accepted.

```
{
  "schemaVersion": 1,
  "name": "Edit member",
  "steps": [
    { "id": "open", "action": "click", "selector": "#edit-member" },
    { "id": "name-focused", "action": "expect", "selector": "#member-name", "state": "focused" },
    { "id": "enter-name", "action": "fill", "selector": "#member-name", "value": "Avery" },
    { "id": "editing", "action": "observe" },
    { "id": "close", "action": "press", "key": "Escape" },
    { "id": "closed", "action": "expect", "selector": "#member-editor", "state": "hidden" }
  ]
}
```

The flow accepts one to twelve steps. IDs are unique lowercase identifiers, at most 48 characters, and cannot be `initial`. Selectors are nonempty and at most 500 characters; fill values are at most 2,000 characters. Unknown fields and actions are rejected before browser execution.

| Action | Required fields | Meaning |
|---|---|---|
| click | selector | Click exactly one target |
| fill | selector, value | Fill exactly one editable target with test data |
| press | key | Use Tab, Shift+Tab, Enter, Space, Escape, or an Arrow key on the current page |
| expect | selector, state | Wait for visible, hidden, or focused; an ambiguous selector is incomplete coverage |
| observe | id only, besides action | Collect rendered checks and an optional screenshot for that named state |

```
flawless-ui-ux inspect --project . --url http://localhost:5173/members --flow flows/edit-member.json --output ../member-before --format json
flawless-ui-ux verify ../member-before/run.json --flow flows/edit-member.json --output ../member-after --format json
```

The initial state is always collected. Steps execute in order; only observe steps add full rendered samples. Expectations record their own check, target, state, and outcome. A failed expectation is a confirmed project-constraint error, not a WCAG classification. An unavailable action or ambiguous target blocks remaining steps in that session and makes interaction coverage partial. Other selected sessions still run.

UI actions can change local state and follow same-origin navigation. Non-read-only HTTP requests, WebSocket connections, and popups are blocked during flow runs; blocked requests leave coverage partial. These controls do not make arbitrary applications safe to interact with. Use authorized test environments and synthetic input. Reports omit fill values from step records, but screenshots and visible-copy evidence may contain them. Existing personal sessions and credentials are not used.

## Corresponding verification

Runs record every surface, state, viewport, completed check, source hash, flow-file identity, browser version, and available capture. Finding identity includes surface as well as state, viewport, check, and target, so a matching selector on another screen cannot establish resolution.

Verify never runs actions embedded in a manifest. It requires the flow file explicitly again, and checks that path and hash match the baseline. A changed flow requires a new baseline. Missing states, checks, routes, regions, or engine compatibility remain unverified. Complete failed expectations can be rechecked after an application correction; blocked sessions require a fresh complete baseline.

These capabilities establish observed implementation behavior. Product identity, usability, intentional variation, visual improvement, and complete business correctness still require contextual review and relevant project tests.
