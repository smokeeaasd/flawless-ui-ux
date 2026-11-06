# 14: Additional agent support

Use independent disposable projects and fresh sessions for Cursor, Kilo Code, GitHub Copilot CLI, Claude Code, and Pi. Status and observed local inventory evidence are recorded in [testing](../../docs/testing.md#additional-agent-support). Model-driven checks remain pending until actually performed.

Use the [report template](../report-template.md) for each interface. Record its version, selected agent/model, skill revision, installed/resolved path, other enabled instructions, available tools, permissions, elapsed time, and observed reads. Evaluate CLI and editor surfaces separately; local installation does not upload a skill to cloud services.

## Install and discover

Copy the [dashboard fixture](../fixtures/dashboard/) outside this repository. Install the candidate from that project using the selector below. Before publication, use the checkout's absolute `bin/flawless-ui-ux.js` path with Node or its local archive; an older registry version cannot test the candidate.

| Host | Selector | Explicit invocation |
|---|---|---|
| Cursor | `--cursor` | `/flawless-ui-ux` or request the skill by name |
| Kilo Code | `--kilo` | `/flawless-ui-ux` or request the skill by name |
| Copilot CLI | `--copilot` | `/flawless-ui-ux` or request the skill by name |
| Claude Code | `--claude-code` | `/flawless-ui-ux` |
| Pi | `--pi` | `/skill:flawless-ui-ux` |

Confirm the complete candidate bundle under `.agents/skills/flawless-ui-ux`, or `.claude/skills/flawless-ui-ux` for Claude Code. Preserve pre-existing rules, settings, custom agents, hooks, and plugins. Start a new host session and inspect its supported skill inventory or command picker. Kilo versions supporting `debug skill` and Copilot versions supporting `skill list --json` can report local inventory without a generation task; record the actual command and resolved path. Pi exposes skill startup diagnostics and `/skill:name` commands. Use installed-version help when controls differ.

Check global, inherited, and plugin instructions before claiming isolation. For global discovery, use an isolated profile and explicit `--global`, checking the [documented destinations](../../docs/cli-contract.md#install). Claude Code and Pi may use configured global roots; record active overrides. Keep global observations separate from project observations.

## Shared copies and duplicate names

In another fresh project, install with `--all-agents`. Expect nine logical agent records and four unique project directories, with one shared `.agents/skills` copy. Compare each copy's complete resources to the same candidate.

Repeat host discovery and record the number of matching skill names and their resolved paths. Some hosts also read compatibility directories, including `.claude/skills`; path precedence or duplicate warnings belong to host discovery, not the installer's physical-copy count. Do not claim a single model load merely because the installer deduplicated its destinations.

## Invocation, scope, and runtime

Use the explicit invocation above with the task from [03 Typography refinement](03-typography-refinement.md). Submit only that task, without evaluator criteria. Record actual reads when exposed, the diff, available checks, and limits. Only permitted typography in `styles.css` should change; other content, data, identity, and behavior must survive.

Use a further fresh dashboard/session for the [inspect/correct/verify exercise](12-antigravity-support.md#b-inspect-correct-and-verify), substituting the tested host and preserving matching browser conditions. Record CLI outputs, manifests, corresponding captures, and coverage. Missing tools or permissions remain explicit limits; fewer findings, removed targets, or changed styling alone do not establish success.

Installation, inventory, instruction loading, implementation, and verification are separate observations. Keep unexecuted checks pending and preserve failed attempts as evidence.
