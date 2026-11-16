# 19 · Product initialization inside the agent

Evaluate conversational onboarding separately from CLI migration and package tests. Use fresh independent sessions; do not substitute a parent agent's own imitation of the skill for forward testing.

## Preparation and frozen inputs

Run `node evals/scripts/prepare-agent-init.mjs /absolute/new/external/round` from a checkout. The parent directory must exist. The script refuses existing destinations and paths resolving inside the checkout; it prepares projects, local skill copies, task files and per-file SHA-256 in `protocol.json`. It does not launch models. The [input data](19-agent-init.json) contains the exact tasks, scripted replies and fixture bytes for this round. Keep replies outside participant context until the participant asks.

Give each session only its run path. Ask it to read `AGENTS.md`, `task.txt` and `local-skill/SKILL.md`, perform the task in `project/`, and write a factual `evidence/result.txt` at completion. Do not supply the rubric, expected files, other cases or implementation history to the participant. Use the same exposed host/model settings and tools for all runs; record their actual availability. No other skills, Sites, dependency installation, remote services or nested delegation.

This controlled protocol deliberately disables structured question tools in favor of chat. When the participant asks, capture the response and a complete project-file snapshot **before** giving its scripted reply in a follow-up to the same session. No reply means wait; do not fabricate consent or create a draft. Capture final files, transcript, hashes, actual reads, checks and runner failures. Keep raw artifacts outside the repository.

## Cases and observations

| Case | Starting state | Required observation |
|---|---|---|
| greenfield | Empty Vue scaffold | Ask about product gaps, wait, then create meaningful product context only; name and policies stay open |
| existing | Local repair page and protected design record | Inspect real code, establish audience/capabilities, preserve code and design |
| rerun | Useful, explicitly current root `PRODUCT.md` | Reuse its location without rewriting or re-interviewing settled facts |
| legacy | Empty 2.2 product/design templates | Treat prompts as missing context, fill the existing product path after the answer, preserve the design template |
| implicit-create | Whole-page request without useful product context | Onboard, persist, then resume the page request using supplied facts; do not repeat the interview |
| implicit-redesign | Whole-page redesign without useful product context | Onboard before editing, then resume within the user's preservation and identity permissions |
| focused-review | Contrast-only source review | Proceed directly with evidence and limits; no onboarding or file edits |
| read-only | Explicit init with writes prohibited | Ask and propose useful context after the answer; no project writes and persistence remains pending |

Use **Met**, **Failed**, **Unobserved** or **Blocked** with concrete evidence on each criterion. Compare all project files, including untracked and hidden files, against their initial hashes. For explicit init, only product-record creation/update is permitted; visual direction, implementation, dependencies and design records are outside scope. Check the saved content for confirmed facts, repository observations, bounded delegations and open questions, rather than accepting a write or self-report as completion.

For resumed create/redesign, distinguish onboarding behavior from implementation quality. Independently inspect changed wording, controls and files; source inspection alone does not establish rendering, accessibility or functional behavior. Preserve unfavorable outputs unchanged. A rerun with no facts changed does not establish correctness of selective updates after a future change; custom-authority conflicts, question-tool failures and actual OS write denials require separate cases.

## Limits

The read-only task is an instruction boundary, not an OS ACL test. Structured-tool use, native host discovery, other hosts/models and real-user outcomes are outside this controlled round. Concurrent runs cannot establish latency differences. Record partial runs and quota/permission failures; do not convert them into passes or silently replace them with parent-authored examples. See the [result record](../results/agent-init/README.md) for the completed and pending observations.
