# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- Project-local `init` creates missing product/design Markdown templates, reuses supported existing documents, and reports created or reused paths without overwriting content.
- Shared template assets and skill guidance separate deterministic initialization from the agent's product interpretation and writing.

### Changed

- Strengthened contextual readability guidance during creation, including supporting text, user text scaling, and the distinction between suggested sizing and WCAG requirements.
- Clarified authored focus contrast and browser compatibility when choosing native web capabilities, preserving platform-specific guidance and scoped work.

## 2.0.0

### Breaking

- Context, inspect, verify, and their JSON error envelopes now use report schema 2. Browser findings and comparisons distinguish surface, state, and viewport; inspection scope uses a URL list. Installation reports retain schema 1. Complete supported v1 runs have an explicit initial-state migration path.

### Added

- Optional product/design context from existing Markdown documents, conventional locations, and explicit project-local sources, with bounded excerpts, hashes, and reference freshness. Legacy JSON context remains readable for migration.
- Explicit project-owned browser flows for UI actions, keyboard navigation, expectations, and named rendered states. Verify requires the unchanged flow file to be selected again; blocked steps remain incomplete.
- Selected multi-screen inspection and computed-style inventories for contextual consistency review, with no automatic defect classification or aesthetic score.
- Runtime tests, a local member-editor fixture, migration documentation, and a focused manual evaluation round. Agent/model design and latency outcomes remain pending.

### Changed

- Preserved the four public commands and basic installation/inspection usage. Flow runs block non-read-only network requests and popups and keep screenshots and reports opt-in.

## 1.1.0

### Added

- A README introduction and side-by-side fintech example documenting an initial no-skill generation followed by skill-assisted refinement in Codex with GPT 6.1 Sol at low reasoning.
- npm metadata for discovery, authorship, and issue reporting, plus a focused `test:package` script.
- Bundled comparison images so the README's local image references resolve in the published archive.

### Changed

- Essential internal exploration of at least three meaningfully different compositions before implementing new interfaces or broad redesigns, while preserving explicit constraints and focused scope.
- Clarified shared web/native mobile/desktop design guidance and the narrower coverage of browser inspection and CSS accessibility criteria.
- Updated the logo and README banner to an all-white pencil and wordmark, with smaller Manrope Semibold lettering.
- Aligned workflow, architecture, accessibility scope, test coverage, and release documentation with the implemented toolkit.

## 1.0.0

### Added

- Interactive CLI installation with project/global scope, multi-agent selection, a destination preview, and explicit confirmation. Cancelled or declined prompts do not install anything.
- Combined individual agent flags and `--yes` for direct installation. Explicit flags, JSON output, CI, and non-terminal use do not open prompts.
- Grok Build, Devin CLI, and DeepSeek Harness installation through `--grok-build`, `--devin`, and `--deepseek-harness`, also available in the Bash alternative.
- Grok Build and DeepSeek Harness global configuration overrides, platform-specific Devin global paths, and a focused compatibility evaluation covering discovery, trust, scope, and verification.
- Cursor, Kilo Code, GitHub Copilot CLI, Claude Code, and Pi installation through explicit agent selectors and the Bash alternative, using the shared project skill directory where supported.
- Claude Code and Pi global configuration overrides, including home expansion, plus a focused multi-host compatibility evaluation.
- Kiro installation through `install --kiro` and the Bash alternative, using `.kiro/skills/flawless-ui-ux` locally and `~/.kiro/skills/flawless-ui-ux` globally.
- A focused Kiro discovery and invocation evaluation, including custom-agent resource configuration and scoped refinement; host observations remain pending.
- Antigravity installation through `install --antigravity` and the Bash alternative, using the documented project and global skill locations.
- Antigravity discovery and workflow evaluation procedure, with CLI discovery evidence recorded separately from pending model-driven and App/IDE checks.

### Changed

- Default and all-agent installation now cover twelve agents with five unique project-local copies; reports retain each selected agent.
- Canonical destinations are copied once, distinct nested destinations are rejected across all targets, and copy failures roll back newly allocated directories.
- Extended isolated installation, alias, preflight, link-preservation, rollback, and distribution coverage, including host configuration preservation, while preserving the shared design guidance.

## 0.3.0

### Changed

- Made CLI install project-local by default. A bare install copies the skill for both agents into the current project; user-wide installation now requires explicit --global.
- Retained --project <directory> for another project, mutually exclusive with --global. Existing local and global installations are preserved.
- Updated help, README setup, contract, and package-level tests for the new default. The legacy Bash alternative retains its own explicit --project option.

## 0.2.0

### Added

- Native CLI install command for the bundled skill, without a repository checkout or Bash.
- Codex, OpenCode, and both-agent selection, global installation with CODEX_HOME/XDG_CONFIG_HOME support, and explicit project-local installation.
- Preflight of all selected destinations, preservation of existing files/directories/links, project-boundary checks, and cleanup of newly created skill directories after copy failures.
- Text/JSON installation reports and package-level installation tests under Node and Bun.

### Changed

- Made npm, pnpm, and Bun skill installation the primary README setup path; retained the Bash installer as an alternative.

## 0.1.1

### Fixed

- Added a black (#000000) background to the README logo so the white wordmark remains readable on light pages.
- Updated the README image URL to use the matching published package asset.

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
