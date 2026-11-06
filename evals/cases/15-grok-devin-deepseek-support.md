# 15: Grok Build, Devin CLI, and DeepSeek Harness support

Use independent disposable projects and fresh sessions for each host. Local inventory evidence and pending checks are recorded in [testing](../../docs/testing.md#grok-build-devin-cli-and-deepseek-harness). Installation, discovery, instruction loading, and model behavior are separate observations.

Use the [report template](../report-template.md). Record the OS, host interface/version, model/settings, candidate revision, resolved skill path, enabled instructions, tools, permissions, elapsed time, and observable reads. Evaluate local CLI and cloud/editor surfaces separately.

## Install and discover

Copy only the [dashboard fixture](../fixtures/dashboard/) into a fresh directory outside this repository and initialize its own Git repository. Run the candidate's absolute `bin/flawless-ui-ux.js` with Node, or use its local package archive; an older registry version cannot evaluate this candidate.

| Host | Selector | Project directory | Explicit invocation |
|---|---|---|---|
| Grok Build | `--grok-build` | `.grok/skills/flawless-ui-ux` | `/flawless-ui-ux` followed by the task |
| Devin CLI | `--devin` | `.agents/skills/flawless-ui-ux` | `/flawless-ui-ux` followed by the task |
| DeepSeek Harness | `--deepseek-harness` | `.agents/skills/flawless-ui-ux` | Request the `flawless-ui-ux` skill by name with the task |

Confirm the complete bundle, including references and assets. Preserve existing rules, custom agents, plugins, permissions, and other skills. Use an isolated host profile where supported; project installation alone does not disable inherited/global instructions. Record any isolation that cannot be established.

For Grok Build, inspect the disposable project before trust and record whether project skills are hidden. Then use the host's normal folder-trust flow for that exact test project and repeat discovery. Versions supporting `grok inspect --json` expose `projectTrusted`, skill metadata, and source paths without submitting a model task. Installation must not grant trust or change the real user profile.

DeepSeek Harness's default provider resolves the nearest Git root, or the working directory without Git. Install from that root, record any custom provider configuration, and check the actual resolved path. Do not assume that a skill copied into a nested package is discoverable from the repository root.

Start a new session and use the installed host's inventory or command picker. Record the exact matching name and path when exposed. A final statement that the skill was used is not evidence of a load event.

## Global and all-agent checks

Use a separate disposable profile and explicit `--global` for global discovery. Check the [global paths and overrides](../../docs/cli-contract.md#install): Grok uses `GROK_HOME` verbatim; DeepSeek uses `DSH_HOME` with home expansion; Devin uses `%APPDATA%/devin` on Windows and `${XDG_CONFIG_HOME:-~/.config}/devin` elsewhere. Keep project/global results separate, and do not change existing user installations.

In another fresh project, install with `--all-agents`. Expect twelve logical records and five unique copies. Repeat host discovery, recording matching-name counts, resolved paths, precedence, or warnings. Multiple compatible directories may be visible to a host; installer deduplication alone does not prove one instruction load.

## Invocation, scope, and runtime

Prepend the host's explicit invocation to the task from [03 Typography refinement](03-typography-refinement.md). Paste only the task, without evaluator criteria. Record actual reads when exposed and preserve the resulting diff. Only permitted typography in `styles.css` should change; wording, data, identity, and behavior must survive.

Use a further fresh dashboard/session for the [inspect/correct/verify exercise](12-antigravity-support.md#b-inspect-correct-and-verify), substituting the tested host. Preserve matching browser conditions and save CLI outputs, manifests, and captures. Missing tools, changed conditions, and removed targets remain limits rather than successful repairs.

Leave unexecuted host, global, and model checks pending. A complete install or positive inventory does not establish visual quality, workflow correctness, or faster generation.
