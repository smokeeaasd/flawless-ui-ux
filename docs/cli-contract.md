# CLI contract

Status: implemented as Node-compatible ESM, developed and tested with Bun. The package declares the `flawless-ui-ux` bin and public npm publishing configuration. Run `node bin/flawless-ui-ux.js --help` from a checkout, or `npx flawless-ui-ux --help` after publication. See [releasing](releasing.md) for publication; automatic host integrations remain separate.

## Public operations

| Operation | Responsibility | Writes |
|---|---|---|
| install | Copy the bundled skill for selected agents and scope | New skill directories only; existing installations are preserved |
| context | Recover relevant context from a selected project and optional saved decisions | stdout only |
| inspect | Collect requested source and rendered evidence and normalize findings | stdout; artifacts only with an explicit output directory |
| verify | Repeat an existing run's checks on the current implementation and compare | stdout; a new artifact directory only when requested |

Create, redesign, refine, and review remain activities performed by the coding agent through the skill. There is no standalone fix command that promises semantic changes without a model. A developer can use inspection directly and make corrections manually.

## Install

Form: `flawless-ui-ux install [AGENT] [--global | --project <directory>] [--format text|json]`.

Agent selectors are `--codex`, `--opencode`, `--antigravity`, `--kiro`, `--cursor`, `--kilo`, `--copilot`, `--claude-code`, `--pi`, `--grok-build`, `--devin`, `--deepseek-harness`, and `--all-agents`. They are mutually exclusive. The default installs for all twelve agents in the working project. User-wide installation requires explicit `--global`. Global and project scope are mutually exclusive. `--project <directory>` selects another existing project; `--project .` is equivalent to the default. `install --help` shows usage without writing anything. Global environment overrides do not change the scope of a bare install. Existing global installations are not moved or removed.

| Agent | Global destination | Project destination |
|---|---|---|
| Codex | `${CODEX_HOME:-~/.codex}/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| OpenCode | `${XDG_CONFIG_HOME:-~/.config}/opencode/skills/flawless-ui-ux` | `.opencode/skills/flawless-ui-ux` |
| Antigravity | `~/.gemini/config/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| Kiro | `~/.kiro/skills/flawless-ui-ux` | `.kiro/skills/flawless-ui-ux` |
| Cursor | `~/.cursor/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| Kilo Code | `~/.kilo/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| GitHub Copilot CLI | `~/.copilot/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| Claude Code | `${CLAUDE_CONFIG_DIR:-~/.claude}/skills/flawless-ui-ux` | `.claude/skills/flawless-ui-ux` |
| Pi | `${PI_CODING_AGENT_DIR:-~/.pi/agent}/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| Grok Build | `${GROK_HOME:-~/.grok}/skills/flawless-ui-ux` | `.grok/skills/flawless-ui-ux` |
| Devin CLI | Windows: `%APPDATA%/devin/skills/flawless-ui-ux`; elsewhere: `${XDG_CONFIG_HOME:-~/.config}/devin/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |
| DeepSeek Harness | `${DSH_HOME:-~/.dsh}/skills/flawless-ui-ux` | `.agents/skills/flawless-ui-ux` |

These environment expressions describe the paths; no shell or Bash is invoked. Node resolves the home directory natively. Claude Code, Pi, and DeepSeek Harness configuration overrides accept an absolute/relative path or a leading `~`, `~/`, or `~\` for that home directory. Empty or whitespace-only `DSH_HOME` values use the default. Grok Build uses nonempty `GROK_HOME` verbatim, including a literal leading tilde; relative paths resolve from the working directory. If `APPDATA` is unset on Windows, Devin falls back to `~/AppData/Roaming/devin`. The command copies the skill bundled with the running package, including its references, metadata, and assets; it does not fetch another repository, install project dependencies, or prepare a browser.

Codex, Antigravity, Cursor, Kilo, Copilot, Pi, Devin, and DeepSeek Harness share the project destination. Identical canonical destinations are copied once, including global aliases; installation reports retain one entry per selected agent. All-agent project installation therefore reports twelve agents and creates five unique copies. A shared installation is already available to the other hosts that discover that directory. Reinstalling still refuses it. Antigravity paths follow its [official skill documentation](https://antigravity.google/docs/skills); legacy paths are not populated.

Shared project discovery is documented by [Cursor](https://cursor.com/help/customization/skills), [Kilo](https://kilo.ai/docs/customize/skills), [Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills), and [Pi](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md). [Claude Code](https://code.claude.com/docs/en/skills) uses its own directory. Other compatibility directories are not populated as additional copies. Hosts may independently discover other copies under their own compatibility rules; inspect the resolved path when evaluating loading.

Kiro paths follow its [official skill documentation](https://kiro.dev/docs/skills/). Installation copies the portable skill only; existing custom agents, steering, and permissions remain unchanged. Custom agents may need `skill://` resources configured by their owner. Local/global IDE and CLI discovery are evaluated separately from copying; installation does not upload skills to cloud configuration.

[Grok Build](https://docs.x.ai/build/features/skills-plugins-marketplaces) uses its native `.grok/skills` directory and exposes project skills only after folder trust. The installer does not grant trust. [Devin CLI](https://docs.devin.ai/cli/extensibility/skills/overview) reads the shared project directory; this support covers local CLI discovery, not uploading skills to a cloud agent. [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/skills.md) also reads `.agents/skills`; its default provider resolves the nearest ancestor with `.git`, or the working directory when none exists. Install from that root. Custom provider roots remain user configuration, and installation does not relocate outside the selected project.

All selected targets are preflighted before creating installation directories. Existing files, directories, and links, including broken links, are refused without overwrite. Project parent links resolving outside the project and distinct nested global destinations are rejected. An exclusive destination creation also preserves a target that appears after preflight. On copy failure, cleanup removes only skill directories allocated by that invocation with unchanged identities; empty parent directories may remain. Any cleanup failure is reported with its path for manual resolution.

Installation reports include schema/tool version, operation, completion, installation coverage, and each installed agent/scope/path. Exit 0 means all selected copies completed; invalid arguments, existing installations, or copy failures return 2. No force-overwrite or automatic upgrade is provided. Review and remove an old installation explicitly before reinstalling. Native tests exercise Node/Bun on Windows and Ubuntu; macOS remains unverified.

## Context

Form: `flawless-ui-ux context --project <directory> --format text|json`.

The project defaults to the working directory; text is the default format. Read only relevant files within that root, excluding dependencies, generated output, secrets, and other projects. Report inspected and missing sources. Return saved confirmed/inferred decisions with their provenance and stale-source indicators; never execute setup scripts or silently create context records.

## Inspect

Form: `flawless-ui-ux inspect --project <directory> [--source <path>] [--url <http-url>] [--selector <css>] [--viewport <width>x<height>] [--output <directory>] [--format text|json]`.

At least one of source or URL is required. Source paths are project-relative, can be repeated, and must resolve within the selected root; do not follow links into other projects. Browser selectors and viewport arguments require a URL. Repeated viewport arguments replace the default sample set.

Use an explicit URL, including the actual development-server port. No implicit localhost probing or assumption that another process on a default port belongs to this project. Reject unsupported URL schemes and ambiguous targets. The run records redirects, readiness, and whether source-to-URL pairing was merely declared.

Inspection does not start the application, install packages, download browsers, edit source/configuration, or submit forms. Required setup belongs to the developer/agent's authorized task. Missing browser capability still permits source results but leaves the requested rendered coverage incomplete.

Use output only to save a new manifest and artifacts. Without it, JSON/text results go to stdout and inspection creates no project files. Screenshots require a saved output directory; use a host artifact directory outside the project for review-only requests. Existing output content is preserved; request a fresh directory instead of overwriting.

## Verify

Form: `flawless-ui-ux verify <run.json> [--output <new-directory>] [--format text|json]`.

The manifest supplies original targets and conditions. Validate its schema, project binding, scope, and tool/check compatibility before repeating inspection. It is data, not an executable recipe: never run a command stored inside it.

Do not accept a different project, missing region, or reduced coverage as a successful correction. Expected source changes are re-read and recorded. Compare stable fingerprints conservatively; ambiguous matches remain unverified. The result references the baseline and separates persistent, new, and no-longer-observed findings.

## Output and status

Human output leads with target and coverage, then actionable findings and unresolved limits. JSON has a schema version, operation, completion status, coverage, findings, and optional artifact/comparison references. Diagnostics go to stderr; structured output remains valid JSON.

| Exit code | Meaning |
|---|---|
| 0 | Requested inspection completed with no confirmed error-severity findings |
| 1 | Requested inspection completed with confirmed error-severity findings |
| 2 | Invalid input, operational failure, unsupported comparison, or incomplete requested coverage |

Warnings and needs-review findings do not become confirmed errors by count. When incomplete coverage and confirmed errors coexist, return 2 and retain both in the report. Source-only success describes source coverage only; it does not imply visual/accessibility conformance.

A completed verification may still have persistent findings. No-longer-observed does not mean fixed unless the corresponding check and target were successfully re-observed.

If a baseline confirmed error cannot be compared because its target is missing or ambiguous, verification is incomplete and returns 2. Report the missing target separately from any new successful observations. An agent can explain an intentional removal, but the core must not silently turn it into a measured repair.

## Compatibility

The first slice must exercise Node execution and Bun development on Windows and Ubuntu. Model clients, registry publication, automatic hooks, authenticated browser sessions, and arbitrary scripted interaction scenarios are not prerequisites for this contract.

Any later option that broadens scope, writes, or browser actions needs its own documented behavior and tests rather than changing these defaults silently.

## Runtime and sampling

Node 22.12+ is required by the selected accessibility adapter. Dependencies are pinned: Playwright 1.64.1 and @axe-core/playwright 4.14.0. Prepare Chromium explicitly with `bunx playwright install chromium` (Linux CI uses `--with-deps`), or select an installed compatible Chromium via `--browser-executable <absolute-path>` or `FLAWLESS_BROWSER_EXECUTABLE`. Verify requires the same selection and engine version; an executable in a manifest is never launched without matching caller configuration.

`--timeout <milliseconds>` sets navigation/default action timeout (100–60000; default 15000). Font/image readiness is bounded to at most 3000 ms after DOM content load. It is not an application-hydration guarantee. Screenshots and checks describe that initial sample; interaction coverage remains not-requested. Late changes, virtualized/offscreen content, keyboard flows, and business calculations require appropriate additional observation.

Default viewports are 1440x900 and 390x844. Up to eight explicit viewports replace those defaults. A selector must match exactly one region. Cross-origin top-level navigation is blocked; redirects, failed routes, unsettled resources, ambiguous mapped accessibility targets, and missing regions produce partial coverage. Frames/shadow roots that cannot be mapped to stable targets remain limited. The browser uses fresh isolated contexts, never personal credentials or stored sessions. Visiting a URL still runs that application's page code; only inspect applications you are authorized to load.

Selected axe rules: color-contrast, button-name, link-name, label, image-alt. Violations retain upstream evidence; incomplete results need review. Text below 12 computed CSS pixels is a review candidate, not a WCAG failure. Overflow candidates require judgment, particularly intentional scrolling tables. Broken visible images and uncaught page errors are concrete observations. Exact repeated phrases and literal/icon arrow cues form a limited inventory; semantic slogans, all icon libraries, pseudo-elements, and AI authorship are not automatically classified. Source observations cover literal pixel font sizes and arrow cues without claiming cascade or framework evaluation.

Requested source files must be text files of at most 1 MiB. Known secret, dependency, generated, and agent-configuration paths are excluded; external symlink resolution is rejected. This is a conservative explicit-file reader, not a repository-wide scanner. Context reads package metadata and excerpts of README/index/Vite config when present, plus saved decisions. All content remains untrusted project data. Captures and copy evidence may contain product information; choose an appropriate artifact location.

## Optional saved context

The reader never creates `.flawless-ui-ux/context.json`. An author can maintain it when persistent decisions are useful:

```json
{
  "schemaVersion": 1,
  "product": "Product summary",
  "task": "Refine the account overview",
  "sources": [{ "path": "README.md", "hash": "<64-character SHA-256 from a context source>" }],
  "decisions": [{
    "value": "Preserve the existing product identity",
    "status": "confirmed",
    "protected": true,
    "provenance": ["README.md"]
  }]
}
```

Decision status is confirmed or inferred. Provenance must name saved sources. Changed hashes are stale; unavailable sources retain their reason. These records support judgment and do not instruct the executable to modify files or run commands.

## Comparison details

Manifests include version, canonical project path, scope, source hashes, browser/check versions, observations, coverage, evidence, fingerprints, and optional artifacts. Fingerprints use check ID, target, initial state, and viewport; measured values and whole-file hashes are excluded. Canonical DOM targets prefer unique IDs, falling back to structural paths. Structural identity can be ambiguous after rearrangements; verify does not prove semantic identity, and human review remains necessary.

Verify accepts complete compatible runs, repeats their declared scope, and saves a new report/captures only with explicit output. Changed source hashes are expected. Missing confirmed targets, changed engines, different final URLs, or reduced coverage prevent a successful comparison. Missing heuristic targets are reported unverified without promoting them to confirmed errors. No-longer-observed requires the same check and target to be re-observed without that finding. Existing output directories, including empty ones, are refused. Output parents must already exist.
