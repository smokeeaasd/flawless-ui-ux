# 13: Kiro support

Status: host discovery and model-driven runs pending. Installation tests are recorded separately in [Kiro support](../../docs/testing.md#kiro-support).

Use the [report template](../report-template.md). Record the Kiro interface, executable/version, selected agent, model/settings, skill revision, installed path, permissions, available tools, other skills, and elapsed time. Test CLI and IDE independently. Cloud upload, Web, Mobile, and Crew are outside this local-installation round.

## Prepare and check discovery

1. Copy the [dashboard fixture](../fixtures/dashboard/) into a fresh disposable project outside this repository. Keep reports and evaluator criteria outside the project.
2. Run the candidate's `flawless-ui-ux install --kiro` from that project. Before publication, use its absolute `bin/flawless-ui-ux.js` path with Node, or its locally packed archive. Do not test a candidate with an older registry release.
3. Check that `.kiro/skills/flawless-ui-ux` contains the candidate's complete skill, references, and assets. Preserve existing `.kiro/agents` and `.kiro/steering` files.
4. Start a fresh Kiro session in the project. In the IDE, check Agent Steering & Skills and the `/` command picker; in the CLI, use the installed version's documented inventory/context controls. Record whether `flawless-ui-ux` is available and its resolved path when exposed.
5. Check global, inherited, and other enabled skills before claiming isolation. Record any duplicate or uncontrolled instructions. Do not remove personal installations for this evaluation.

For a custom Kiro agent, check its `resources` against the [official documentation](https://kiro.dev/docs/skills/). A test agent can explicitly include `skill://.kiro/skills/flawless-ui-ux/SKILL.md`. Make any test configuration in the disposable project; the installer must not rewrite an existing custom agent. Record default-agent and custom-agent outcomes separately.

Repeat global discovery using an isolated test profile and `install --kiro --global`, checking `~/.kiro/skills/flawless-ui-ux`. Keep that result separate from project discovery. Workspace skills take precedence when names collide, so verify the actual loaded path before attributing a global result.

## Explicit invocation and scope

In a new session, invoke `/flawless-ui-ux` with the task from [03 Typography refinement](03-typography-refinement.md), or explicitly request the installed skill by name. Submit only the task, without evaluator criteria.

Record availability, observed instruction/reference reads, the diff, checks performed, and verification limits. Only permitted typography in `styles.css` should change; HTML, JavaScript, wording, data, colors, outer layout, and functionality should survive. A listed skill or self-reported use does not establish that its instructions were loaded.

## Inspect, correct, and verify

Use another fresh dashboard copy and session. Follow the [inspection/correction/verification exercise](12-antigravity-support.md#b-inspect-correct-and-verify) with Kiro as the host, using the candidate CLI and matching browser configuration between runs. The task itself names only flawless-ui-ux and the local application.

Record manifests, exit statuses, coverage, the relevant diff, and matching screenshots when available. Missing tools or permissions remain explicit limits. A removed target, partial scan, fewer findings, or different styling alone does not establish a repair or better design. Keep unexecuted observations pending.
