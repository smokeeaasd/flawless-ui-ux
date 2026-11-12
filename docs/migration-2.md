# Migrating to 2.0

The breaking change is the JSON report contract for context, inspect, verify, and their error envelopes: `schemaVersion` is now 2. Installation reports retain schema 1. Existing basic CLI commands and flags remain supported; no new dependency or browser installation is implicit.

## Context

Product and design decisions belong in existing Markdown documents. Conventional candidates and explicit inputs are listed in [product-aware workflows](product-aware-workflows.md#markdown-context). There is no required Markdown schema or frontmatter.

Context reports add a `documents` collection with path/hash, bounded excerpt, truncation, and reference freshness. Package/README metadata remains in `sources`. Consumers should use these documents as project data, not parse their prose as a fixed executable contract. The agent resolves meaning and conflicting sources.

Existing `.flawless-ui-ux/context.json` schema-1 records remain readable and are marked `legacyContext`. Transfer useful information into authoritative Markdown when appropriate; the tool neither writes records nor deletes the old file. No automatic priority is assigned to legacy decisions over current documents or user instructions.

## Inspection and verification

| v1 | v2 |
|---|---|
| `scope.url` | `scope.urls`, an ordered list of selected surfaces |
| A single initial-state sample per viewport | `observations` keyed by `surface`, `state`, and `viewport` |
| Finding identity excludes screen | Browser fingerprints include `conditions.surface`; source fingerprints remain source-specific |
| Only ordinary inspection | Optional `scope.flow` path/hash and `flow.steps` execution outcomes |
| No style comparison inventory | Optional `consistency.groups` containing observed variants and their provenance |
| Source/rendered/interaction coverage | Additional consistency coverage; explicit flows can request interaction coverage |

Flow step status is completed, failed, blocked, or not-run. Observed failed expectations are confirmed findings; execution failures are partial coverage. Rendered observations retain copy, targets, checks, final URL, and engine evidence where available. Expectation observations contain only the expectation's evidence, not an axe result. Do not assume every observation contains screenshots, copy, styles, or an axe version.

Update JSON consumers to group browser findings by surface/state/viewport. Do not aggregate equal selectors across screens as if they were the same target. Consistency variants are contextual observations, not automatic defects.

## Saved v1 runs

Verify accepts complete schema-1/check-version-1 runs from version 1.x, subject to the original project, directory identity, browser selection/version, target, and check conditions. It validates the original findings, maps the original URL to one surface, and interprets observations as initial-state evidence. The new report describes this migration and uses schema 2.

Unknown schemas/check versions and incomplete baselines are rejected. V1 reports cannot establish flow or multi-screen coverage retroactively. If browser/check conditions changed or a target cannot be re-observed, repeat inspection for a new baseline; absence is not a measured repair.

For v2 flows, explicitly supply the same `--flow` file to verify. Manifests cannot select executables or authorize actions. Changed flow files require a new baseline.
