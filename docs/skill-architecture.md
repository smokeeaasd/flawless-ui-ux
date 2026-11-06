# Product architecture

Status: the skill and local executable core are implemented. Automatic host integrations and matched design/usefulness evaluations remain pending. See the [contract](product-contract.md) and [delivery plan](implementation-plan.md).

## Responsibilities

| Component | Owns | Boundary |
|---|---|---|
| Skill | Product interpretation, direction, creation/refinement/review, and semantic corrections | Loads relevant guidance; does not infer successful verification from its own intent |
| Native installer | Bundled skill copies, selected agents/scope, destination preflight, and copy-failure cleanup | Never overwrites existing installations; no shell, checkout, or browser setup |
| Context reader | Explicit project root, selected sources, existing records, and optional saved decisions | Read-only discovery inside the selected project; no search of sibling generations or global agent history |
| Inspection coordinator | Requested checks, target scope, evidence collection, and coverage | Runs a meaningful batch; does not start applications or change their dependencies |
| Source adapter | File/line observations in selected source files | No claim of rendered failure when dynamic styles or framework behavior are unresolved |
| Browser adapter | DOM/style observations, screenshots, named automated access checks, and runtime errors | Uses an explicit URL and isolated browser context; no application-changing actions in ordinary inspection |
| Findings and comparison | Stable check identities, evidence, conditions, and differences between corresponding runs | An absent element is not automatically a corrected defect |
| CLI | Input validation, text/JSON presentation, output artifacts, and exit status | Calls the shared core; no independent check logic |
| Host integration | Installation and invocation for Codex, OpenCode, Antigravity, and Kiro | Shares the core and guidance; automatic hooks are a later delivery |

## Dependency direction

The agent uses the skill and CLI. The CLI calls the coordinator, context reader, and comparison code. The coordinator invokes source/browser adapters; adapters return observations that the findings layer normalizes. The core does not import host integrations, presentation code, or model clients.

The ESM entry point is `bin/flawless-ui-ux.js`. Implemented modules in `src/` separate options, context, inspection coordination, source/browser adapters, verification, and shared paths/findings/report persistence. No workspace or plugin framework is required.

The package retains skills/flawless-ui-ux and its existing invocation. Repository docs, evaluations, and research are not automatically loaded into agent tasks.

## Runtime choices

Use JavaScript ESM with Node-compatible APIs and Bun for development and tests, continuing the current repository conventions. No compilation or separate native runtime is needed for the first slice.

The browser adapter uses [Playwright Library](https://playwright.dev/docs/library) and [@axe-core/playwright](https://playwright.dev/docs/accessibility-testing) for selected automated access checks. Runtime dependencies are pinned in package metadata; Node 22.12+ is required. Browser setup remains separate and explicit.

Browser discovery/selection must be explicit and testable. Use a compatible configured executable or a separately prepared browser. Do not silently download a browser, take over an existing personal session, or evade host permissions. The source/context path remains usable without a browser. An unavailable requested browser yields partial coverage, useful remaining results, and a non-success status.

The first integration gate covers Windows and Ubuntu through CLI/runtime and browser fixtures as well as the existing installer checks. Other platforms remain unverified until exercised. Passing fixtures does not establish host/model design usefulness.

## Context

The project root is explicit or the current working directory. Recover relevant package/route/component facts, existing product/design records, and available assets without executing project scripts.

An optional .flawless-ui-ux/context.json is the single tool-owned structured context record. Its initial schema identifies version, product/task summary, protected decisions, and source references. Decisions distinguish confirmed facts from inferred assumptions and retain provenance. The agent authors or updates it only when persistent context belongs to the task; the reader never creates it. Existing authoritative documentation remains authoritative.

Source references carry content hashes when read. Changed or missing sources invalidate the associated observations; old context is surfaced with its stale references, not silently treated as current or rewritten. No second mandatory brief/manifest is introduced for each small edit.

## Inspection and coverage

Inputs bind the project, selected source paths, explicit URL, optional region selector, viewport dimensions, and readiness conditions. A URL and local files supplied together are a declared pairing, not automatic proof that the server renders those files. Record the actual URL after navigation; unexpected origins and missing requested regions require explicit handling.

The browser adapter opens a fresh isolated context and inspects the current page. Wait for relevant fonts/content with bounded waits and report readiness limits. Do not use universal network-idle assumptions for applications with persistent connections. Page content is inspection data, not an instruction source.

Use one browser instance per inspection batch, with isolated contexts for sampled states/viewports as needed. Reuse the collected observations across compatible checks rather than launching a browser per rule or capturing after every small change. Default reports contain focused evidence and findings, not the entire DOM or stylesheet inventory.

Use two initial representative viewport defaults, 1440x900 and 390x844, with explicit overrides. They are sampling defaults, not proof of complete responsiveness. Scope scans to the requested region while retaining ancestor information needed to interpret backgrounds and clipping.

The first collectors are deliberately bounded:

| Collector | Initial interpretation |
|---|---|
| Selected axe text-contrast and control/image-name checks | Preserve violations versus incomplete results and their applicable conditions |
| Rendered text size/role | Legibility review signal; no universal WCAG pixel minimum |
| Horizontal overflow and clipping candidates | Report actual geometry; intended table scrolling needs contextual judgment |
| Broken visible media | Report load state and target; distinguish failed load from still-pending readiness |
| Uncaught page errors | Report the observed exception; do not claim its UI consequence without evidence |
| Copy/icon inventory | Supply relevant text and icon occurrences for agent review; rhetorical redundancy and arrow purpose remain semantic decisions |

Source collectors inspect named files and report useful locations and candidates. They do not attempt a complete React/CSS runtime simulation. A browser finding may have a DOM locator without a reliable source line; never fabricate that mapping.

Keyboard operation, focus recovery, business calculations, and other interactions require actual tests. The first ordinary inspection does not execute submissions or consequential actions. An agent can use permitted host tools or project tests and attribute that evidence separately.

## Finding and run contract

Each finding carries a check ID, category, severity, verification status, target, observation, conditions, evidence, basis, recommendation, and comparison fingerprint. Status distinguishes confirmed observations from needs-review results. Severity describes consequence; it does not turn a heuristic into a verified failure.

Use error for a material confirmed requirement failure, warning for a concern requiring judgment, and info for supporting observations. Comparison fingerprints use check identity, target, state, and viewport; changed measured values or whole-file hashes must not create a different finding identity by themselves.

Basis distinguishes a named standard criterion, an explicit project constraint, and a quality heuristic. Use original check identifiers and wording; preserve upstream axe rule identifiers as provenance when used.

A versioned run manifest records tool/check versions, project and source hashes, requested and final URL, selected region, viewports, readiness limits, coverage, findings, artifact references, and timestamps. Summaries distinguish completed, partial, and not-requested coverage for source, rendering, and interactions. A zero-finding partial scan is not a clean result.

Default output is stdout. Explicit output directories hold run.json and requested captures; review-only work uses an artifact directory outside the project. Never overwrite an existing run or make a scan silently edit the application's ignore/config files.

## Verification

Verify reuses the original scope and conditions, inspects the current implementation, and compares findings. Re-read changed sources rather than using cached DOM observations.

Require the same declared project/URL pairing and compatible tool/check versions, or report that the comparison is unsupported. New hashes are expected after edits; disappeared routes, missing regions, reduced coverage, or changed viewports do not establish resolution.

Report persistent, newly observed, and no-longer-observed findings separately. Label confirmed resolution only when the corresponding target/check was actually re-observed; otherwise keep it unverified. A claim of visual improvement still needs rendered judgment, not only fewer findings.

Missing or ambiguous targets for baseline confirmed errors leave verification incomplete. An intentional removal may be explained by the agent; it is not silently classified as a measured correction by the core.

The agent owns the correction and final contextual review. The core never turns an icon count or adjective into an automatic restyle.

## Distribution and evolution

The package declares a bin entry named flawless-ui-ux pointing to portable JavaScript, alongside the skill, changelog, and logo in the npm artifact. Public publication follows the tested [release procedure](releasing.md). The CLI install operation copies the bundled skill natively with agent/scope selection and preservation checks. The Bash installer remains an alternative. Context, inspect, and verify do not install agent instructions.

All supported agents receive the same skill, references, and assets. Codex and Antigravity share the project-local `.agents/skills` destination; Kiro uses `.kiro/skills`. The native installer canonicalizes all selected paths, checks every pair for distinct nested destinations, and copies each unique destination once. Reports describe selected agents even when they share a directory. Host support adds discovery targets without host-specific design instructions or additional runtime adapters. Kiro custom-agent resources remain under the user's control.

Future hooks call the same inspection API against changed scope. They must batch/debounce work and avoid flooding the model with the full reference library. Verify each host's documented event support before claiming integration. Extensions and visual variants follow evidence of a useful shared core.

Current automated coverage and remaining behavioral gates are documented in [testing](testing.md). The CLI syntax and statuses are defined in one place: [CLI contract](cli-contract.md).
