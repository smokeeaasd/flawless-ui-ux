# Package and installation tests

## 2.1.0 maintenance and reporting

`tests/maintenance.test.js` covers legacy adoption, read-only previews, clean replacement, local edits/additions/deletions blocking every selected update, rollback, missing/unrecognized copies, links, invalid metadata, scope divergence, and Node/Bun output. Browser availability is separate from agent activation.

`tests/html-report.test.js` covers optional HTML, unchanged default artifacts/exit semantics, complete 2.0.0 baseline verification, content escaping, offline captures, and narrow/wide layout. Browser cases use the existing `FLAWLESS_TEST_BROWSER=1` or explicit `FLAWLESS_BROWSER_EXECUTABLE` setup. Native install/prompt tests include the deterministic record while preserving full content checks.

The [focused comparison](../evals/cases/17-maintenance-and-usefulness.md) and [result matrix](../evals/results/2.1.0/README.md) are prepared and pending. Runtime passes must not be reported as design/latency evaluations.

Local validation on November 14, 2026: 79 tests passed across 13 files on Windows with Bun 1.4.4, Node 24.16.0, and an explicitly selected installed Edge executable. No browser tests were skipped. The final HTML presentation adjustment was followed by its three passing focused tests, including offline screenshot loading and narrow/wide layout. The distribution test unpacked the archive and exercised install/update through Node. All 33 maintainer Markdown documents had resolvable local file links; the 18 legacy file hashes matched the published v2.0.0 Git tag. Linux behavior remains subject to CI validation for this increment.

The first CI run passed on Ubuntu but exposed an overly strict path-spelling comparison in Windows doctor inventory. Maintenance now uses canonical physical paths, groups safe parent aliases once, and still blocks root/internal links and paths escaping the project. All 11 focused maintenance tests passed locally after the correction, including alias preview/update/diagnostics. The divergence assertion now includes installation statuses for actionable failure output.

These checks validate the skill package, installer, CLI, and inspection/verification runtime. They do not score interface design or replace evaluations in the host agents.

## Run locally

Use the Bun version recorded in `package.json`, plus Bash for installer checks. From the repository root:

```bash
bun install --frozen-lockfile
bun test
```

Use `bun run test:package` for the focused metadata, reference, and packed-distribution checks. Release validation still requires the full suite with browser fixtures enabled.

CLI tests also require Node 22.12+. To include browser fixtures, explicitly prepare a browser and enable them:

```bash
bunx playwright install chromium
FLAWLESS_TEST_BROWSER=1 bun test
```

Alternatively set `FLAWLESS_BROWSER_EXECUTABLE` to an installed compatible Chromium executable. In PowerShell use `$env:FLAWLESS_TEST_BROWSER = '1'` before `bun test`. Browser tests are explicitly skipped when neither setting is supplied; source/context/CLI and installer tests still run. CI installs Chromium separately and requires browser tests on both operating systems.

The same commands work on Windows with Git Bash installed. Tests locate Git Bash from the Git installation on Windows and use Bash from the command path elsewhere. Set `FLAWLESS_TEST_BASH` to select a compatible executable explicitly. WSL is a separate environment and is not established as tested by a Windows run.

Bun runs the built-in test runner. The only development dependency is the strict YAML parser, pinned in `package.json` and `bun.lock`. The installed skill does not depend on either tool.

## Coverage

| File | Checks |
|---|---|
| `tests/package.test.js` | Valid YAML frontmatter, skill identity, Codex presentation metadata, normal automatic discovery policy, UTF-8 text, internal file and section references, and reference reachability from the entry point |
| `tests/install.test.js` | Bash syntax, project/global destinations, individual/default/all-agent targets, complete copies including hidden and nested resources, paths with spaces, help and errors, missing source files, pre-existing destinations, links, and reinstalls |
| `tests/native-install.test.js` | Node/Bun installation for all supported agents, isolated global homes, shared destinations, configuration overrides and home expansion, canonical aliases, nested-path rejection, all-target preflight, rollback, host configuration preservation, and concurrent creation |
| `tests/install-prompts.test.js` | Terminal/flag/CI routing, scope and multi-agent configuration, read-only destination summaries, decline/cancellation preservation, preflight rechecks, combined flags with JSON, and real prompt-library keyboard input under Node/Bun |
| `tests/distribution.test.js` | Actual archive contents, native installation from an unpacked package, and missing bundled instructions |
| `tests/context-markdown.test.js` | Markdown reuse, explicit source bounds, reference freshness, read-only behavior, v1 report migration, and surface-specific fingerprints |
| `tests/init.test.js` | Canonical template creation, per-kind reuse, preservation of edits, preflight conflicts/links, concurrent creation, Node/Bun output, and discovery by context |
| `tests/workflows.test.js` | Flow validation, state capture, keyboard expectations, explicit replay and changed-flow rejection, blocked writes, corresponding-screen inventories, and unverified missing targets |
| `tests/cli.test.js` | Node/Bun command output, context provenance and stale sources, scoped source inspection, saved runs and comparisons, invalid inputs, and unavailable browser coverage |
| `tests/browser.test.js` | Known contrast/name failures and corrections, rendered text/overflow/media/runtime observations, regressions, removed targets, missing regions, and unexpected navigation |
| `tests/conventions.test.js` | Valid conventional names and rejection of invalid branches, titles, commit subjects, and empty pull requests |

The metadata checks reject duplicate YAML keys. Reference checks are scoped to the package's inline Markdown links and heading anchors; external links are not fetched. They check package integrity, not the wording of design instructions.

Installation tests copy the actual installer and skill into disposable directories and execute Bash against that copy. Global installation modes use isolated child-process home directories and `CODEX_HOME`/`XDG_CONFIG_HOME`/`CLAUDE_CONFIG_DIR`/`PI_CODING_AGENT_DIR` paths under those directories. Native tests set both `HOME` and `USERPROFILE`, check the resolved home before CLI global installation, and keep Bun's runtime cache outside the simulated profile. The user's actual home and existing agent installations are not used as destinations. The test checks complete file hashes rather than a fixed list of current filenames.

Conflict tests verify that existing files, directories, local edits, and link targets survive. A conflict at any selected destination must fail before installing the first target. Link cases use directory junctions on Windows and directory symlinks on Linux, including missing targets and parent paths escaping the project for every agent selector. Shared destinations are copied once, while non-identical nested destinations are rejected; failure at the third, fourth, or final global copy rolls back earlier newly allocated skill directories. The fault simulation resolves home aliases and Windows short paths before matching a copy.

## Continuous integration

The `Package` workflow installs the pinned Bun version and uses the frozen lockfile before running the same test command on Ubuntu and Windows for pull requests and pushes to `main`. It has read-only repository permissions and does not call model APIs or launch coding agents. The conventions workflow also uses Bun, through `scripts/check-conventions.js`.

The platform checks are named:

- `package-and-installation (ubuntu-latest)`
- `package-and-installation (windows-latest)`

Branch protection should require these checks after their first successful execution. The ruleset configuration in `.github/rulesets/main.json` describes the desired settings; GitHub configuration must also be updated to enforce them.

## npm distribution

### 2.0.0 release validation

On November 12, 2026, the release candidate including context initialization and readability guidance passed all 66 tests across eleven Bun test files on Windows with Bun 1.4.4, Node 24.16.0, and the explicitly configured Edge browser. Frozen-lockfile installation required no dependency changes, and the skill validator passed.

The npm pack dry run included 41 files: the runtime, portable skill and context templates, installer, README, changelog, license, and README assets. Maintainer documentation and evaluation fixtures remain excluded. These are runtime and package checks; matched agent/model design and latency evaluations remain pending. Windows/Ubuntu PR checks and registry publication are separate verification steps.

### Context initialization

The init addition passed 26 targeted tests across init, Markdown context, CLI, package/distribution, and installation prompts on Windows under Node 24.16.0 and Bun 1.4.4. Coverage includes preserved edits, conventional reuse, missing-kind creation, directory/file/link preflight, concurrent exclusive writes, and an unpacked package missing a template. The local archive also ran init twice through bunx in an independent project: the first run created both records and the second reused them. These checks establish structure and preservation; the agent's interpretation and filled content still require review.

### 2.0.0 candidate validation

On November 12, 2026, the 2.0.0 candidate passed all 62 tests across ten Bun test files on Windows with Bun 1.4.4, Node 24.16.0, and the explicitly configured Edge browser. The new cases cover Markdown context and reference freshness, source/report preservation, v1 source/browser migration, state-aware verification, keyboard and focus expectations, changed-flow rejection, blocked HTTP writes and WebSocket connections, cross-screen inventories, and engine-mismatch limits. The documented member-editor fixture was exercised through the Node CLI.

Frozen-lockfile installation required no dependency changes. The npm pack dry run included 38 files, with the new runtime modules and portable context reference, while excluding maintainer docs and fixtures. Local checks resolved 172 links across 43 Markdown documents, and the skill validator passed. This is implementation/package evidence; the agent/model runs in case 16 remain pending. CI records Windows/Ubuntu PR validation separately.

### 1.1.0 release preparation

On November 12, 2026, the 1.1.0 candidate passed all 55 Bun tests on Windows with Bun 1.4.4, Node 24.16.0, and the explicitly configured Edge browser. The frozen lockfile installed without changes. `npm pack --dry-run --json` listed 35 files, including both README comparison images; 155 local links across 39 Markdown documents resolved. This records local release checks, not publication or a controlled model-quality evaluation. Windows/Ubuntu PR checks are recorded separately by CI.

### Interactive installation

Bare installation uses the wizard only when both input and output are terminals and `CI` is unset. Explicit flags, including JSON output and `--yes`, retain the direct path. The prompt tests exercise the real library through controlled terminal-like subprocess streams under Node and Bun: local/global scope, multi-selection, required nonempty selection, confirmation, refusal, and interruption. They also test shared-path preview without writes, conflicts before confirmation, and a concurrent destination appearing after it. This stream-based coverage does not replace native terminal observations on every OS.

Local Windows validation for this change passed all 55 tests with Bun 1.4.4, Node 24.16.0, and an explicitly configured Edge browser. A real Windows terminal run through Node selected Codex and Antigravity, previewed one shared copy, confirmed, installed, and exited successfully. A local 32-file archive run through `bunx` also completed the wizard for Devin in a separate disposable project. These runs did not install globally or submit model prompts. macOS terminal behavior remains unverified.

### Archive contents

`package.json` defines an explicit distribution list, runtime dependencies, Node engine, the `flawless-ui-ux` bin, and public npm publishing configuration. The archive includes the runtime, portable skill, README, changelog, license, installer, logo, banner, and README comparison images; maintainer documents and evaluation fixtures remain excluded. The install command copies the bundled skill natively; `install.sh` remains an alternative.

The portable JavaScript entry point supports `bunx`/`npx` distribution. Tests pack and unpack the actual archive and run its source-only CLI with Node. Registry publication follows [releasing](releasing.md); tests do not publish or call a model service.

Native installation tests copy only into temporary destinations, covering each agent/scope selection, complete package resources, environment overrides under Node/Bun, existing files/directories/links, escaped project parents, overlapping paths, copy-failure cleanup, and concurrent destination creation. A bare install is tested from a working project with existing global installations and environment overrides; the global copies remain unchanged. Explicit --global is tested without creating project-local destinations. The distribution test runs bare install from the unpacked archive in an unrelated project, without a checkout or Bash, and rejects a package missing SKILL.md. The Bash installer retains its separate preservation tests. CI runs on Windows/Ubuntu; these checks do not establish macOS behavior.

## Runtime gates

The [architecture](skill-architecture.md) and [CLI contract](cli-contract.md) define executable context, inspection, and verification. CLI tests exercise Node/Bun output, invalid input, source scope and external links, stale saved context, output preservation, source comparisons, and missing browsers. Browser fixtures exercise known contrast/name failures, corresponding corrections, regressions, removed targets, missing regions, and unexpected navigation.

The [delivery plan](implementation-plan.md#verification-gates) requires Node/Bun execution, scoped/read-only behavior, structured output and exit status, browser fixtures with positive and negative cases, partial capability results, artifact preservation, and corresponding before/after verification. Windows and Ubuntu are the first runtime integration targets. Other platforms and automatic host hooks remain unverified.

Local implementation validation on November 5, 2026 used Windows, Node 24.16.0, Bun 1.4.4, and an explicitly configured installed Edge executable. The complete suite passed with browser fixtures enabled, including a report created by Node and verified by Bun. The CI jobs separately prepare Playwright Chromium and exercise Node 22 on Windows/Ubuntu. This records runtime evidence only; matched model/host design and latency runs remain pending.

Fixture tests establish the implemented runtime behaviors, not design quality or faster execution. Agent-driven manual evaluations stay outside routine CI and must record matching model/settings, active plugins, actual reads, evidence, and elapsed time.

## Behavioral evidence

### Antigravity support

The same portable skill installs to Antigravity's documented `.agents/skills` project directory or `~/.gemini/config/skills` global directory. No separate instructions, dependencies, hooks, or extension are introduced.

The 0.4.0 candidate passed all 39 Bun tests locally on Windows with the configured Edge browser. Its 30-file npm archive installed successfully through npx, pnpm dlx, and bunx into separate disposable projects; each used the Antigravity selector and project-local scope.

On November 5, 2026, Antigravity CLI 1.4.12 on Windows discovered a project-local installation in a disposable project. The local command `agy --print "/skills" --mode plan --output-format json --print-timeout 15s` returned success and listed `flawless-ui-ux` with the expected project `SKILL.md` path, `builtin: false`, and `model_invocable: true`. Its report recorded zero model turns and zero tokens. This establishes availability in that CLI version; it does not establish that a model loaded or followed the instructions.

Use [12 Antigravity support](../evals/cases/12-antigravity-support.md) for explicit invocation, scoped refinement, and inspection/correction/verification. Those model-driven runs, global host discovery, and App/IDE validation remain pending. Filesystem tests and the shared documented paths do not replace those observations.

### Kiro support

Kiro receives the same portable skill at `.kiro/skills/flawless-ui-ux` in a project or `~/.kiro/skills/flawless-ui-ux` globally, following the [official skill documentation](https://kiro.dev/docs/skills/). Current agent counts and shared destinations are defined in the [CLI contract](cli-contract.md#install). Existing Kiro custom-agent and steering files are preserved; the installer does not add `skill://` resource entries to custom agents.

Automated tests cover the new paths, individual/default/all-agent selections, isolated global homes, pre-existing targets, target and parent links, nested destinations, rollback on Kiro copy failure, and configuration preservation under Node/Bun. These are installation checks, not discovery or model behavior evidence.

On November 5, 2026, the 0.5.0 candidate passed all 40 Bun tests on Windows with Node 24.16.0, Bun 1.4.4, and an explicitly configured Edge browser. Its 30-file npm archive installed through npx, pnpm dlx, and bunx into independent disposable projects using `--kiro`. Each installed skill matched the complete shared source bundle, and no other agent destination was created.

No Kiro executable was found on the command path or in the checked standard Windows installation locations during this implementation. Kiro discovery, explicit invocation, and model-driven inspection/correction/verification remain pending. Use [13 Kiro support](../evals/cases/13-kiro-support.md) to record those observations separately for the CLI and IDE; cloud surfaces are outside this local-installation task.

### Additional agent support

The nine-agent candidate in PR #27 added Cursor, Kilo Code, GitHub Copilot CLI, Claude Code, and Pi to the same skill installers. Cursor, Kilo, Copilot, and Pi use the shared project `.agents/skills` copy; Claude Code uses `.claude/skills`. That candidate reported nine logical targets with four unique project copies. The current targets, counts, global destinations, and overrides are defined in the [CLI contract](cli-contract.md#install).

All 43 Bun tests passed locally on Windows with Node 24.16.0, Bun 1.4.4, and an explicitly configured Edge browser. The 30-file archive installed through npx (Cursor), pnpm dlx (Claude Code), and bunx (all agents) in independent disposable projects. Full installed resources are checked against the shared source bundle.

Project-local discovery was observed on Windows on November 5, 2026:

| Host | Observed evidence | Limit |
|---|---|---|
| Kilo CLI 7.8.27 | `kilo --pure debug skill` listed `flawless-ui-ux` at the expected project `SKILL.md` path | Local inventory, not model activation |
| Copilot CLI 1.0.105 | `skill list --json` listed the shared project skill with `source: project` and `enabled: true` | Local inventory, not model activation |
| Claude Code 2.1.318 | Installed version checked | Skill discovery and invocation pending |
| Cursor and Pi | No executable found in the checked command path or Cursor installation locations | Host discovery and invocation pending |

Kilo's inventory used a disposable home/configuration profile with external plugins disabled. Copilot's VS Code launcher could not locate its installed package under an isolated home, so its existing JavaScript entry point was run with Node and the isolated profile to perform the inventory. No host was installed or upgraded, and no generation prompt was submitted. Inventory confirms availability only; it does not demonstrate instruction following or visual quality.

Both Kilo and Copilot also listed exactly one `flawless-ui-ux` record from `.agents/skills` in separate projects installed with `--all-agents`, including the additional Claude Code copy. This establishes the observed inventory resolution in those versions; it does not establish duplicate handling in Cursor or Pi, or a single model load in any host.

Global host discovery, model-driven workflows, and separate editor/cloud surfaces remain pending. Use [14 Additional agent support](../evals/cases/14-additional-agent-support.md) to evaluate them and record duplicate-name precedence independently from installation completeness.

### Grok Build, Devin CLI, and DeepSeek Harness

The candidate for 1.0.0 added `--grok-build`, `--devin`, and `--deepseek-harness` to the native and Bash installers. Grok uses `.grok/skills` locally; Devin and DeepSeek Harness share `.agents/skills`. All-agent project installation reports twelve targets and creates five unique copies of the same bundle. Existing host configuration, trust decisions, custom skill roots, and other skills are preserved.

Automated installer coverage includes each new selector and scope, default/all-agent selection, Node/Bun environment overrides, shared copies, destination conflicts and links, rollback, and complete resources. Devin path tests cover Windows `APPDATA` and Unix `XDG_CONFIG_HOME` independently. Regression cases distinguish literal `GROK_HOME` from home-expanded `DSH_HOME` and check the latter's blank-value fallback. The Bash matrix exercises the current platform; it runs on Windows and Ubuntu in CI.

All 48 Bun tests passed locally on Windows with Node 24.16.0, Bun 1.4.4, and an explicitly configured Edge browser. The 30-file archive installed through npx (Grok Build), pnpm dlx (Devin), and bunx (DeepSeek Harness) in independent disposable projects. All fifteen installed skill files matched the shared source bundle by SHA-256. Markdown local links and anchors were checked separately.

Local host observations on Windows, November 5, 2026:

| Host | Observed evidence | Limit |
|---|---|---|
| Grok Build 1.0.77 (`50ca579fa996`) | `grok inspect --json` listed one user-invocable `flawless-ui-ux` from `.grok/skills/flawless-ui-ux/SKILL.md` in both single-agent and all-agent projects | Local project inventory, not model activation |
| Devin CLI | No executable available on the checked command path or standard Windows application location | Host discovery and invocation pending |
| DeepSeek Harness | No executable available on the checked command path or standard Windows application location | Host discovery and invocation pending |

Grok's inventory initially returned `projectTrusted: false` and no skills in each fresh disposable Git project. After recording trust for those exact test roots through the normal `trusted_folders.toml` format in an isolated Grok profile, both inventories returned `projectTrusted: true` and exactly one matching skill. The real user profile and folder trust were not changed. This confirms the observed trust gate and path resolution; the installer itself never grants trust. No generation prompt was submitted.

Global host discovery, model-driven scope/refinement/runtime checks, and separate cloud/editor surfaces remain pending. The [focused evaluation](../evals/cases/15-grok-devin-deepseek-support.md) covers those checks, shared-name resolution, and DeepSeek's Git-root discovery. Installer test success does not establish host loading, design quality, or generation time.

### Earlier host feedback

Earlier manual user testing confirmed identification in OpenCode and Codex and a satisfactory initial design result. These observations predate the expanded procedure package. They are separate from the automated checks above and do not establish the current workflows or every invocation method as tested.

The [guided manual evaluation kit](../evals/README.md) covers creation, redesign, typography-only refinement, review-only requests, intentional brand choices, and accurate reporting without rendering tools. It includes natural-language discovery, a paired no-skill baseline, and an unrelated backend activation control in both hosts.

The kit contains copy-ready tasks, dependency-free fixtures, an evidence-based rubric, and a report template. Runs use disposable projects and fresh sessions, with host, model, input, skill revision, isolation, actual loading when observable, and verification limits recorded. Reports and evaluator criteria stay outside the projects shown to agents.

These materials are excluded from the skill and npm distribution. No automated agent invocation, design scoring, or additional CI checks are introduced. The planned host runs remain pending until their observations are recorded; preparing the kit does not add compatibility evidence.

The [workflow guide](workflow-procedures.md#evaluation) connects complete tasks and focused interventions to the manual kit. The [instruction-efficiency comparison](../evals/cases/11-instruction-efficiency.md) checks actual reads, elapsed time, design, and scope against the previous revision and a no-skill baseline. Those runs remain pending. Package tests establish complete installation copies and internal integrity, not better decisions or faster generation.

The [contextual prevention case](../evals/cases/08-anti-slop-redesign.md) supplies a deliberately generic restoration-page prototype with unsupported proof, competing decoration, real service facts, and a local form. Pair it with intentional brand preservation when evaluating prevention changes. The fixture and evaluator checks are ready; behavioral outcomes and rendered verification remain pending. A zero-pattern count or authorship judgment is not an acceptance criterion.
