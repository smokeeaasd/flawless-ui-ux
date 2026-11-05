# 12: Antigravity support

Status: project-local discovery observed in Antigravity CLI 1.4.12 on Windows; model-driven runs, global discovery, and App/IDE checks pending. See the [recorded discovery evidence](../../docs/testing.md#antigravity-support).

Use the [report template](../report-template.md) for each interface and run. Record the exact Antigravity surface/version, model, skill revision, enabled skills, permissions, tools, elapsed time, and observed reads. Availability and model loading are different observations.

## Prepare and check discovery

1. Copy the [dashboard fixture](../fixtures/dashboard/) into a disposable project outside this repository. Keep evaluator criteria and reports outside the project.
2. From that directory, install the candidate package with `flawless-ui-ux install --antigravity`. Before publication, use the candidate's absolute `bin/flawless-ui-ux.js` path with Node. Do not use the registry's older version for a candidate test.
3. Confirm `.agents/skills/flawless-ui-ux/SKILL.md` and its references/assets match the candidate. No `.agent/skills` legacy copy should be created. Codex shares this project directory; a second installation is unnecessary.
4. Start a fresh Antigravity session in this project. Check its skill inventory using the installed version's supported command or interface. CLI 1.4.12 accepts `/skills` without arguments; command syntax can change. Preserve the exact listed name and path.
5. Check global, inherited, and plugin skills before claiming isolation. Disable unrelated skills through supported host settings when possible; otherwise record incomplete isolation. Do not remove existing user installations for this evaluation.

For global discovery, use an isolated test profile and the same candidate with `install --antigravity --global`. Confirm the host discovers `~/.gemini/config/skills/flawless-ui-ux`. Record this separately from project discovery. Do not modify a personal installation just to perform the test.

## A. Explicit invocation and scope

Use `/flawless-ui-ux` with the task from [03 Typography refinement](03-typography-refinement.md), or explicitly request the installed skill by name where the surface supports it. Submit only that task, without evaluator criteria.

Assess whether:

- The skill was available; actual instruction/reference loading is recorded only when visible.
- Only permitted typography in `styles.css` changed. HTML, JavaScript, wording, colors, layout, and functionality were preserved.
- The agent reported its actual checks and limits, including unavailable rendering or image inspection.
- Guidance use remained proportional to this narrow task.

Repeat independently in App or IDE before claiming those interfaces tested; a CLI result does not establish their behavior.

## B. Inspect, correct, and verify

Start with another fresh dashboard copy and a new session. Prepare the candidate CLI, a permitted local static server, an available compatible browser, and an existing artifact parent outside the project. Replace the placeholders below with their actual values. Keep browser configuration the same between inspection and verification.

```text
Use the flawless-ui-ux skill to inspect this dashboard's readability and accessibility at desktop and mobile widths. It is served at <local URL>. Use the candidate CLI at <absolute executable path> and save the baseline under <new external artifact directory>.

Correct the confirmed issues within the existing visual identity. Preserve wording, data, useful density, and functionality. Then use verify with the baseline run.json and a new external artifact directory. Briefly report the corrections, persistent or new findings, and verification limits.
```

Record the exact commands, exit statuses, manifest paths, coverage, relevant diffs, and matching screenshots when available. Check that sources and the supplied URL refer to the same project. A partial scan, missing region, removed target, or unobserved interaction is not a confirmed repair. Fewer findings or a different style alone do not establish visual improvement.

If a requested capability is unavailable, preserve the partial result and record the limit. Do not enable permission bypasses or introduce a model runner merely to finish the case.

## Interpretation

Installation tests establish complete copies and preservation. Inventory establishes discovery. An observed read establishes loading. Scoped changes and corresponding verification establish the tested workflow only. Report each separately; keep unexecuted checks pending.
