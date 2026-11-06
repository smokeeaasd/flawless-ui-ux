# Package and installation tests

These checks validate the skill package, installer, CLI, and inspection/verification runtime. They do not score interface design or replace evaluations in the host agents.

## Run locally

Use the Bun version recorded in `package.json`, plus Bash for installer checks. From the repository root:

```bash
bun install --frozen-lockfile
bun test
```

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
| `tests/native-install.test.js` | Node/Bun installation for all supported agents, isolated global homes, Codex/Antigravity shared destinations, canonical aliases, nested-path rejection, all-target preflight, rollback, custom Kiro configuration preservation, and concurrent creation |
| `tests/distribution.test.js` | Actual archive contents, native installation from an unpacked package, and missing bundled instructions |
| `tests/conventions.test.js` | Valid conventional names and rejection of invalid branches, titles, commit subjects, and empty pull requests |

The metadata checks reject duplicate YAML keys. Reference checks are scoped to the package's inline Markdown links and heading anchors; external links are not fetched. They check package integrity, not the wording of design instructions.

Installation tests copy the actual installer and skill into disposable directories and execute Bash against that copy. Global installation modes use isolated child-process home directories and `CODEX_HOME`/`XDG_CONFIG_HOME` paths under those directories. Native tests set both `HOME` and `USERPROFILE`, check the resolved home before CLI global installation, and keep Bun's runtime cache outside the simulated profile. The user's actual home and existing agent installations are not used as destinations. The test checks complete file hashes rather than a fixed list of current filenames.

Conflict tests verify that existing files, directories, local edits, and link targets survive. A conflict at a later destination, including Kiro's fourth global target, must fail before installing the first target. Link cases use directory junctions on Windows and directory symlinks on Linux, including missing targets and Kiro parent paths escaping the project. Shared destinations are copied once, while non-identical nested destinations are rejected; failure at the third or fourth copy rolls back the earlier newly allocated skill directories.

## Continuous integration

The `Package` workflow installs the pinned Bun version and uses the frozen lockfile before running the same test command on Ubuntu and Windows for pull requests and pushes to `main`. It has read-only repository permissions and does not call model APIs or launch coding agents. The conventions workflow also uses Bun, through `scripts/check-conventions.js`.

The platform checks are named:

- `package-and-installation (ubuntu-latest)`
- `package-and-installation (windows-latest)`

Branch protection should require these checks after their first successful execution. The ruleset configuration in `.github/rulesets/main.json` describes the desired settings; GitHub configuration must also be updated to enforce them.

## npm distribution

`package.json` defines an explicit distribution list, runtime dependencies, Node engine, the `flawless-ui-ux` bin, and public npm publishing configuration. The archive includes the runtime, portable skill, README, changelog, license, installer, and logo; maintainer documents and evaluation fixtures remain excluded. The install command copies the bundled skill natively; `install.sh` remains an alternative.

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

Kiro receives the same portable skill at `.kiro/skills/flawless-ui-ux` in a project or `~/.kiro/skills/flawless-ui-ux` globally, following the [official skill documentation](https://kiro.dev/docs/skills/). Default/all-agent installation reports four agents and creates three unique project copies, since Codex and Antigravity share their directory. Existing Kiro custom-agent and steering files are preserved; the installer does not add `skill://` resource entries to custom agents.

Automated tests cover the new paths, individual/default/all-agent selections, isolated global homes, pre-existing targets, target and parent links, nested destinations, rollback on Kiro copy failure, and configuration preservation under Node/Bun. These are installation checks, not discovery or model behavior evidence.

On November 5, 2026, the 0.5.0 candidate passed all 40 Bun tests on Windows with Node 24.16.0, Bun 1.4.4, and an explicitly configured Edge browser. Its 30-file npm archive installed through npx, pnpm dlx, and bunx into independent disposable projects using `--kiro`. Each installed skill matched the complete shared source bundle, and no other agent destination was created.

No Kiro executable was found on the command path or in the checked standard Windows installation locations during this implementation. Kiro discovery, explicit invocation, and model-driven inspection/correction/verification remain pending. Use [13 Kiro support](../evals/cases/13-kiro-support.md) to record those observations separately for the CLI and IDE; cloud surfaces are outside this local-installation task.

### Earlier host feedback

Earlier manual user testing confirmed identification in OpenCode and Codex and a satisfactory initial design result. These observations predate the expanded procedure package. They are separate from the automated checks above and do not establish the current workflows or every invocation method as tested.

The [guided manual evaluation kit](../evals/README.md) covers creation, redesign, typography-only refinement, review-only requests, intentional brand choices, and accurate reporting without rendering tools. It includes natural-language discovery, a paired no-skill baseline, and an unrelated backend activation control in both hosts.

The kit contains copy-ready tasks, dependency-free fixtures, an evidence-based rubric, and a report template. Runs use disposable projects and fresh sessions, with host, model, input, skill revision, isolation, actual loading when observable, and verification limits recorded. Reports and evaluator criteria stay outside the projects shown to agents.

These materials are excluded from the skill and npm distribution. No automated agent invocation, design scoring, or additional CI checks are introduced. The planned host runs remain pending until their observations are recorded; preparing the kit does not add compatibility evidence.

The [workflow guide](workflow-procedures.md#evaluation) connects complete tasks and focused interventions to the manual kit. The [instruction-efficiency comparison](../evals/cases/11-instruction-efficiency.md) checks actual reads, elapsed time, design, and scope against the previous revision and a no-skill baseline. Those runs remain pending. Package tests establish complete installation copies and internal integrity, not better decisions or faster generation.

The [contextual prevention case](../evals/cases/08-anti-slop-redesign.md) supplies a deliberately generic restoration-page prototype with unsupported proof, competing decoration, real service facts, and a local form. Pair it with intentional brand preservation when evaluating prevention changes. The fixture and evaluator checks are ready; behavioral outcomes and rendered verification remain pending. A zero-pattern count or authorship judgment is not an acceptance criterion.
