# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

## 0.1.0

Initial public release, consolidating the pre-release development iterations.

### Added

- A portable UI/UX skill for Codex and OpenCode, covering creation, redesign, refinement, and review with product-specific visual decisions.
- Focused references for direction, structure, craft, interaction, calibration, contextual pattern prevention, review, and original design studies.
- A Node-compatible local CLI with context, inspect, and verify operations, text/JSON output, explicit coverage, and coverage-aware exit codes.
- Project-scoped source observations and optional saved decisions with provenance, content hashes, and stale-source indicators.
- A Playwright/axe adapter for selected accessibility rules, rendered text size, horizontal overflow, visible broken images, runtime errors, and contextual copy/icon inventories.
- Explicit run manifests and screenshots, with conservative comparison that keeps missing confirmed targets and changed conditions unverified.
- A Bash skill installer that preserves existing installations, plus Windows/Ubuntu runtime, packaging, browser, and installer tests.
- Public npm package configuration, the transparent pencil logo, usage documentation, and a manual release procedure.

### Requirements and limits

- Node 22.12+; Bun is the development/test toolchain.
- Rendered inspection requires a separately prepared compatible Chromium browser and an explicitly supplied application URL.
- CLI execution does not install the agent skill, start the application, download browsers, edit source files, or submit forms.
- Contextual observations require judgment. Selected initial-state checks do not establish full WCAG conformance, business-flow correctness, or visual quality.
- Matched host/model design-quality and latency evaluations remain pending.
