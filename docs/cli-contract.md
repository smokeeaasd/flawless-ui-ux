# Planned CLI contract

Status: specification only. These commands are not implemented or available in the current package. They belong to the [first functional slice](implementation-plan.md#first-functional-slice).

## Public operations

| Operation | Responsibility | Writes |
|---|---|---|
| context | Recover relevant context from a selected project and optional saved decisions | stdout only |
| inspect | Collect requested source and rendered evidence and normalize findings | stdout; artifacts only with an explicit output directory |
| verify | Repeat an existing run's checks on the current implementation and compare | stdout; a new artifact directory only when requested |

Create, redesign, refine, and review remain activities performed by the coding agent through the skill. There is no standalone fix command that promises semantic changes without a model. A developer can use inspection directly and make corrections manually.

## Context

Planned form: flawless-ui-ux context --project <directory> --format text|json.

The project defaults to the working directory; text is the default format. Read only relevant files within that root, excluding dependencies, generated output, secrets, and other projects. Report inspected and missing sources. Return saved confirmed/inferred decisions with their provenance and stale-source indicators; never execute setup scripts or silently create context records.

## Inspect

Planned form: flawless-ui-ux inspect --project <directory> [--source <path>] [--url <http-url>] [--selector <css>] [--viewport <width>x<height>] [--output <directory>] [--format text|json].

At least one of source or URL is required. Source paths are project-relative, can be repeated, and must resolve within the selected root; do not follow links into other projects. Browser selectors and viewport arguments require a URL. Repeated viewport arguments replace the default sample set.

Use an explicit URL, including the actual development-server port. No implicit localhost probing or assumption that another process on a default port belongs to this project. Reject unsupported URL schemes and ambiguous targets. The run records redirects, readiness, and whether source-to-URL pairing was merely declared.

Inspection does not start the application, install packages, download browsers, edit source/configuration, or submit forms. Required setup belongs to the developer/agent's authorized task. Missing browser capability still permits source results but leaves the requested rendered coverage incomplete.

Use output only to save a new manifest and artifacts. Without it, JSON/text results go to stdout and inspection creates no project files. Screenshots require a saved output directory; use a host artifact directory outside the project for review-only requests. Existing output content is preserved; request a fresh directory instead of overwriting.

## Verify

Planned form: flawless-ui-ux verify <run.json> [--output <new-directory>] [--format text|json].

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
