# Toolkit delivery plan

Status: the local CLI, source/browser inspection path, saved artifacts, and corresponding verification are implemented. Runtime fixture tests are separate from the pending matched host/design evaluation. This plan follows the [product contract](product-contract.md), [architecture](skill-architecture.md), and [CLI contract](cli-contract.md).

## First functional slice

Deliver one complete path: an agent creates or improves a local web target, obtains actual inspection evidence, corrects authorized issues, and checks the affected result.

Include:

- A Node-compatible ESM CLI exposing install, context, inspect, and verify, with Bun development/tests and no model-service dependency.
- A project-scoped context reader with optional saved decisions, provenance, and stale-source reporting.
- Source observations and a Playwright browser adapter using selected axe checks, rendered legibility/overflow/media observations, and runtime error evidence.
- Compact text/JSON findings, explicit coverage, saved captures/manifests, and conservative before/after comparison.
- Skill guidance that uses these capabilities when available, retains source-only usefulness when rendering is unavailable, and completes the final contextual pattern review.
- Matching no-tool and candidate runs on representative tasks, preserving identity, content, functionality, first outputs, and actual execution cost.

Keep installation, invocation, and checks already working while migrating. Retain useful guidance selectively. Do not add an empty module tree or make all maintainer documents part of the skill's context.

## Delivery sequence

Use three bounded milestones, with a demonstrable outcome at each.

| Milestone | Deliverable | Exit criterion |
|---|---|---|
| 1. Working inspection/correction path | The first functional slice above, initially against local public pages and supplied fixtures | A source/browser finding can be observed, localized, corrected by the agent, and rechecked; unavailable capabilities are honest |
| 2. Demonstrated design usefulness | Calibrated findings, task-specific guidance, evaluated states and host workflows | Matched creation and refinement runs show useful improvements without loss of identity/function; cost and false positives are recorded |
| 3. Automatic integration | Supported host-triggered checks consuming the same core | Changed-scope checks work in the tested host without duplicate logic or repeated broad context loading |

Antigravity joins Codex and OpenCode through the same portable skill and installer, with discovery evidence and remaining host checks recorded in [testing](testing.md#antigravity-support). Broader browser engines, authenticated contexts, further hosts, extension overlays, live variants, native mobile, and image tooling follow demonstrated needs. Their absence does not prevent acceptance of the first slice.

## Implementation boundaries

Runtime dependencies and supported Node versions are pinned in package metadata. Browser setup is explicit. The package declares a bin entry and public npm publishing configuration. The release procedure is documented in [releasing](releasing.md); preparation does not establish a completed publication.

Start with browser evidence and limited source observations rather than a complete framework parser or a new accessibility engine. Validate contrast/name findings using upstream check evidence, and retain incomplete results. Keep text-size, overflow, arrow, and copy signals contextual.

Persist only what the workflow uses. Context is optional; run artifacts are explicit. Cache static metadata only when its source identity remains current. Fresh browser evidence cannot be replaced by a cached passing result.

Semantic corrections belong to the agent. A human can inspect/fix/verify using the same core; no paid API or autonomous rewrite service is needed.

## Verification gates

The implementation must add tests that establish behavior, not exact instruction wording:

- CLI argument/status/output contracts; no writes in default/read-only paths.
- Project scoping, preservation of existing artifacts, malformed context/manifests, stale sources, and unsupported comparison.
- Browser fixtures with known positive and negative cases for the selected checks; missing browser/readiness/region cases remain partial rather than passing.
- A correction followed by a corresponding verification; regressions, missing targets, and reduced coverage cannot masquerade as resolution.
- Node and Bun execution plus distribution/install behavior on Windows and Ubuntu, with browser setup exercised in the appropriate test jobs.

Existing package and installer tests remain useful but do not cover these new capabilities. Add browser CI only with the implemented adapter and fixtures. No model API or agent generation runs belong in routine CI.

## Behavioral gate

Use the existing [manual kit](../evals/README.md) and [matched dashboard comparison](../evals/cases/11-instruction-efficiency.md), supplemented by a product page and expressive refinement. Start with GPT 6.1 Sol at medium reasoning as the user's primary reported configuration; record exact host/model settings and repeat on the other supported host when available.

Compare the first completed candidate and no-tool result under matching tools, input, scaffold, plugin isolation, and browser permissions. Keep screenshots at corresponding states and sizes. Historical reports remain separate.

Record concrete hierarchy, content, legibility, contrast, navigation, state correctness, scope, and identity. Judge the usefulness of findings and corrections alongside elapsed time and actual instruction reads. More findings, a different style, or green infrastructure checks do not establish improvement. Report confounds and repeated variation instead of declaring a universal win.

## Current delivery

The implementation delivers context, inspect, and verify, with versioned text/JSON reports, conservative comparisons, explicit captures, and selected source/rendered checks. Automated fixtures exercise correction, regression, removed targets, missing capabilities, scope, and preservation. Node/Bun portability and browser tests run in Windows/Ubuntu CI. See [testing](testing.md).

Milestone 1's executable path is delivered; its matched agent runs remain pending. Milestone 2 must establish useful design outcomes and actual cost before automatic integration. No design-quality or latency improvement is established by passing runtime tests.
