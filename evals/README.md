# Guided manual evaluations

These materials evaluate skill behavior in Codex and OpenCode. They are maintainer resources, excluded from the installed skill and npm distribution. There is no agent runner, model dependency, or design score in CI.

## Current evidence

The user previously confirmed skill identification in both hosts and reported a satisfactory initial design result. The exact model, revision, invocation method, and inspection capabilities were not recorded. Those observations remain separate from this round: **the runs below have not been performed**.

Later informal feedback reported improved colors and visual hierarchy across several models with minimal prompts, and tolerable limits in personalization. Exact conditions were not recorded. This feedback predates the original visual studies and does not establish their effect.

Subsequent feedback reported overly plain refinements and continuing slogan repetition. Those reports motivated the [guidance review](../docs/design-guidance-review.md), but do not isolate a cause or establish an outcome for its corrections. The follow-up evaluation remains pending.

### Focused reference-guidance round

For changes to positive design guidance, use cases 01 and 02 for creation and redesign, paired with 05 for brand preservation and 06 for unavailable browser tools. Keep tasks, model, tool availability, and settings fixed when comparing revisions; use independent sessions and fresh fixtures. Record observable reference use, the concrete target, adaptation to the product, drift in the implementation, and verification gaps using the rubric. Do not introduce image-generation access in only one arm or treat copied study styling as improvement. These focused runs supplement the full matrix below and have not been performed.

### Focused calibration round

Use [10 Visual calibration](cases/10-visual-calibration.md) for four independent runs from the existing fixtures: strengthen presence, redistribute competing emphasis, interpret ambiguous refinement, and edit wording without restyling. Runs A and D pair visual-only and copy-only boundaries on unchanged brand-page copies. Record both the specific improvement and the identity retained using matched content, states, and widths where possible. These runs remain pending; no source audit or package test substitutes for their observations.

## Cases and run matrix

| Case | Starting project | Main observation |
|---|---|---|
| [01 Promotional page](cases/01-promotional-page.md) | Empty directory | Product-specific direction, complete content, useful next action |
| [02 Dashboard redesign](cases/02-dashboard-redesign.md) | [Dashboard](fixtures/dashboard/) | New visual treatment without losing data or workflows |
| [03 Typography refinement](cases/03-typography-refinement.md) | Fresh dashboard copy | Proportional changes within the existing identity |
| [04 Review only](cases/04-review-only.md) | Fresh dashboard copy | Actionable findings without edits |
| [05 Brand preservation](cases/05-brand-preservation.md) | [Brand page](fixtures/brand-page/) | Explicit visual choices survive usability improvements |
| [06 No browser](cases/06-no-browser.md) | Empty directory | Useful implementation and accurate verification limits |
| [07 Backend control](cases/07-backend-control.md) | [Backend](fixtures/backend/) | An unrelated task does not activate UI/UX guidance |
| [08 Contextual prevention](cases/08-anti-slop-redesign.md) | [Restoration page](fixtures/restoration-page/) | Replace unconsidered decisions while preserving substance, facts, and functionality |
| [09 Refinement continuity](cases/09-refinement-continuity.md) | Preserved completed case-01 output | Optional independent visual-only and copy-only follow-ups; character and scope survive targeted improvement |
| [10 Visual calibration](cases/10-visual-calibration.md) | Fresh brand-page and dashboard copies | Optional presence, competing emphasis, ambiguous refinement, and complementary scope controls |

Run this matrix separately in each host:

| Runs | Skill availability | Invocation |
|---|---|---|
| Cases 01–06 and 08, once each | Only flawless-ui-ux enabled | Explicit |
| Case 01, fresh project | Only flawless-ui-ux enabled | Natural language |
| Case 01, fresh project | No skills enabled | Baseline; identical natural-language task |
| Case 07 | Only flawless-ui-ux enabled | Natural language; negative control |

The core matrix is ten runs per host, twenty total. Optional case 09 adds two follow-ups per host when a suitable preserved baseline exists; optional case 10 adds four fixture-based runs per host. Start with case 03 in each host as the loading smoke check; successful smoke runs count toward the matrix. If loading cannot be established, investigate before spending time on the remaining cases. Preserve failed attempts as separate records.

For a focused prevention round, use cases 01, 08, and 05: creation, replacement of a generic prototype, and intentional brand preservation. Add scope or review controls when shared changes affect them. The full matrix is not required for every small instruction change. All runs remain pending until their actual observations are recorded.

## Prepare the environment

1. Record the date, OS, host interface and version, exact model, reasoning settings when exposed, and available file, terminal, browser, screenshot, and interaction tools. CLI versions can be checked with `codex --version` and `opencode --version`; record the app version separately when using an app. An unavailable host or model is a limitation, not a completed run.
2. Record `git rev-parse HEAD` in this repository. Install from that checkout for every skill-enabled run. Record local changes if the checkout is dirty; preferably use a committed revision.
3. Create fresh working directories outside this repository and any project with inherited instructions. Give each directory its own Git repository. Copy only the indicated fixture's contents, never the case descriptions, rubric, reports, or other cases.
4. Configure the host as described below, then start a new session. Keep the model, reasoning, tools, permissions, and execution limits fixed within each host's case-01 comparison. Record any setting the host does not expose. Cross-host differences do not establish a skill effect.

The following preparation example uses Bash, including Git Bash on Windows. Replace the checkout path. Keep `flawless_runs` for this round, and repeat project creation with a new run name for each entry in the matrix:

```bash
flawless_repo="/absolute/path/to/flawless-ui-ux"
flawless_runs="$(mktemp -d -t flawless-evals-XXXXXX)"
flawless_project="$flawless_runs/codex-03-typography-explicit"
mkdir -- "$flawless_project"
cp -R -- "$flawless_repo/evals/fixtures/dashboard/." "$flawless_project/"
cd -- "$flawless_project"
git init -q
bash "$flawless_repo/install.sh" --codex --project
```

For OpenCode use `--opencode`, in a different directory. Use `brand-page`, `backend`, or `restoration-page` for their cases; omit the copy for empty-project cases. Omit installation for the baseline, and also disable any globally available copy. The installer preserves existing destinations, so use a fresh directory rather than trying to reinstall over a previous run.

### Skill isolation and invocation

Use host-supported skill settings to disable unrelated skills, including plugin-provided skills. Check the resulting inventory after restarting. A project-local installation alone does not hide global or inherited skills. Do not remove existing user installations to perform this evaluation.

- **Codex:** install the tested copy in the project and disable other discovered paths, including duplicate copies of this skill. The official documentation describes `[[skills.config]]` entries with an absolute `path` and `enabled = false`. Apply settings only in a location supported by the installed version; preserve and restore any user settings changed for the round. For explicit runs, prepend `Use $flawless-ui-ux for this task.` to the case's task. See [Codex skill settings and invocation](https://learn.chatgpt.com/docs/build-skills).
- **OpenCode:** allow `flawless-ui-ux` and deny other skills using the permissions supported by the installed version and selected agent. For explicit runs, prepend `Use the flawless-ui-ux skill for this task.` The official documentation describes discovery locations, the skill tool, and permission controls; configuration syntax can differ by major version. See [OpenCode skills](https://opencode.ai/docs/skills) and [OpenCode 2 skills](https://opencode.ai/v2/docs/skills/).

For natural-language runs, paste only the task block. Do not select the skill manually or add a hint about it. For the baseline, verify that flawless-ui-ux is neither advertised nor loaded, including global and duplicate copies. Keep other instructions and capabilities the same. If isolation or loading cannot be observed, mark it unobserved and explain the limitation; do not label the comparison controlled.

Listing a skill establishes availability, not loading. Capture a native load event, an entry-file read, or equivalent host trace when available. A final response saying the skill was used is not sufficient evidence by itself. Reference reads are optional observations, not a requirement to read every file.

### Case 06 capabilities

Disable browser, screenshot, computer-use, image inspection, and delegated rendering integrations for this run. Keep ordinary file editing, terminal checks, and native skill loading available. Do not install or launch a headless browser as a substitute. Record the actual restrictions. If tools cannot be disabled, record a request-constrained run instead of claiming the environment had no browser access.

### Save the starting state

After fixture copying, skill installation, and project configuration, create a local baseline commit. Keep credentials outside the project. In Bash:

```bash
git add --all
git -c user.name="Evaluation" -c user.email="evaluation@example.invalid" \
  commit --quiet --allow-empty -m "test: record evaluation starting state"
git status --short --untracked-files=all
```

Confirm the starting state is clean. Do not push these disposable repositories. Open an unchanged dashboard or brand fixture locally to understand its existing behavior before beginning; close it for case 06.

## Conduct and record a run

1. Copy the [report template](report-template.md) to a records directory beside, rather than inside, the agent's project. Use a name such as `codex-03-typography-explicit.md`. Keep screenshots and captured outputs there too, outside the agent's accessible workspace when possible.
2. Paste the exact case task, with the explicit prefix only when prescribed. Record the full input and any native skill selection. Do not supply the rubric, expected findings, previous results, or follow-up coaching.
3. Save the first completed response, observable loading events, checks, and elapsed time. If the agent stops with a question, error, or execution limit, record that outcome before assisting. Assisted continuations are separate runs, not replacements for the first result.
4. Inspect `git diff --stat`, `git diff --binary`, and `git status --short --untracked-files=all`. The diff omits newly created untracked files: preserve those files separately or save a complete final project copy. Distinguish host-generated files from agent edits. For case 04, compare all project files with the starting state, including untracked files.
5. Apply the [rubric](rubric.md) and the case-specific checks. Inspect representative desktop and narrow layouts, for example 1280 × 800 and 390 × 844, when rendering is available. Record the actual dimensions, screenshots, console errors, and interactions observed. Reuse the same dimensions across a paired comparison.
6. For case 06, assess the agent's verification claims before opening its result yourself. Any later reviewer rendering belongs in a separate evidence section and must not be attributed to the agent.

The fixtures open directly through `index.html`; no server or dependency installation is required. A host may use an available local static server if its browser cannot open local files. Record that choice and keep it consistent within comparisons. Do not install extra tooling solely to make a run appear fully verified.

## Interpret the round

Compare the case-01 natural-language run against the baseline: their task bodies must be identical. If the natural-language run never loaded the skill, record a discovery miss or unobserved loading, rather than attributing its design to skill guidance. The explicit run can help diagnose loading, but its extra instruction makes it a separate comparison.

Use concrete observations such as preserved controls, accurate content, readable hierarchy, and unsupported verification claims. One paired run is an example, not statistical proof or a universal quality claim. Keep failures and unavailable capabilities visible in the round summary. Proposed instruction changes should cite the observed failure and rerun affected cases after a separate fix.

This task delivers evaluation materials. Completed compatibility or workflow claims require actual run records; preparing the fixtures does not complete the matrix. Share only reviewed reports and artifacts, without credentials or private session data.
