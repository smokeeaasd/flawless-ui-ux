# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

## 1.0.0

### Added

- Cursor, Kilo Code, GitHub Copilot CLI, Claude Code, and Pi installation through explicit agent selectors and the Bash alternative, using the shared project skill directory where supported.
- Claude Code and Pi global configuration overrides, including home expansion, plus a focused multi-host compatibility evaluation.
- Kiro installation through `install --kiro` and the Bash alternative, using `.kiro/skills/flawless-ui-ux` locally and `~/.kiro/skills/flawless-ui-ux` globally.
- A focused Kiro discovery and invocation evaluation, including custom-agent resource configuration and scoped refinement; host observations remain pending.
- Antigravity installation through `install --antigravity` and the Bash alternative, using the documented project and global skill locations.
- Antigravity discovery and workflow evaluation procedure, with CLI discovery evidence recorded separately from pending model-driven and App/IDE checks.

### Changed

- Default and all-agent installation now cover nine agents with four unique project-local copies; reports retain each selected agent.
- Canonical destinations are copied once, distinct nested destinations are rejected across all targets, and copy failures roll back newly allocated directories.
- Extended isolated installation, alias, preflight, link-preservation, rollback, and distribution coverage, including host configuration preservation, without adding dependencies or changing the shared design guidance.

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
