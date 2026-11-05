# Package and installation tests

These checks validate the skill's packaging and installer. They do not score interface design or replace evaluations in the host agents.

## Run locally

Use the Bun version recorded in `package.json`, plus Bash for installer checks. From the repository root:

```bash
bun install --frozen-lockfile
bun test
```

The same commands work on Windows with Git Bash installed. Tests locate Git Bash from the Git installation on Windows and use Bash from the command path elsewhere. Set `FLAWLESS_TEST_BASH` to select a compatible executable explicitly. WSL is a separate environment and is not established as tested by a Windows run.

Bun runs the built-in test runner. The only development dependency is the strict YAML parser, pinned in `package.json` and `bun.lock`. The installed skill does not depend on either tool.

## Coverage

| File | Checks |
|---|---|
| `tests/package.test.js` | Valid YAML frontmatter, skill identity, Codex presentation metadata, normal automatic discovery policy, UTF-8 text, internal file and section references, and reference reachability from the entry point |
| `tests/install.test.js` | Bash syntax, project/global destinations, individual/default/all-agent targets, complete copies including hidden and nested resources, paths with spaces, help and errors, missing source files, pre-existing destinations, links, and reinstalls |
| `tests/conventions.test.js` | Valid conventional names and rejection of invalid branches, titles, commit subjects, and empty pull requests |

The metadata checks reject duplicate YAML keys. Reference checks are scoped to the package's inline Markdown links and heading anchors; external links are not fetched. They check package integrity, not the wording of design instructions.

Installation tests copy the actual installer and skill into disposable directories and execute Bash against that copy. Global installation modes use child-process `CODEX_HOME` and `XDG_CONFIG_HOME` paths under those directories. The user's actual home and existing agent installations are not used as destinations. The test checks complete file hashes rather than a fixed list of current filenames.

Conflict tests verify that existing files, directories, local edits, and link targets survive. When the second agent's destination already exists, the all-agent preflight must fail before installing the first target. Link cases use directory junctions on Windows and directory symlinks on Linux, including missing targets.

## Continuous integration

The `Package` workflow installs the pinned Bun version and uses the frozen lockfile before running the same test command on Ubuntu and Windows for pull requests and pushes to `main`. It has read-only repository permissions and does not call model APIs or launch coding agents. The conventions workflow also uses Bun, through `scripts/check-conventions.js`.

The platform checks are named:

- `package-and-installation (ubuntu-latest)`
- `package-and-installation (windows-latest)`

Branch protection should require these checks after their first successful execution. The ruleset configuration in `.github/rulesets/main.json` describes the desired settings; GitHub configuration must also be updated to enforce them.

## Future npm distribution

`package.json` defines the package identity and an explicit distribution file list. It remains marked private while the executable installation entry point is pending. Current installation uses `install.sh` from a checkout.

A future CLI should expose a `bin` entry pointing to portable JavaScript with a Node-compatible entry point. That allows both `bunx` and `npx` to run it while Bun remains the development toolchain. Registry publication and CLI implementation are separate delivery steps.

## Planned toolkit gates

The revised [architecture](skill-architecture.md) and [CLI contract](cli-contract.md) define executable context, inspection, and verification. They are specifications; no runtime dependencies, commands, or browser tests are added by the architecture change.

The [delivery plan](implementation-plan.md#verification-gates) requires Node/Bun execution, scoped/read-only behavior, structured output and exit status, browser fixtures with positive and negative cases, partial capability results, artifact preservation, and corresponding before/after verification. Windows and Ubuntu are the first runtime integration targets. Other platforms and automatic host hooks remain unverified.

Add these tests with implemented behavior. Existing package/installer tests cannot establish inspection accuracy, browser support, correction safety, design quality, or faster execution. Agent-driven manual evaluations stay outside routine CI and must record matching model/settings, active plugins, actual reads, evidence, and elapsed time.

## Behavioral evidence

Earlier manual user testing confirmed identification in OpenCode and Codex and a satisfactory initial design result. These observations predate the expanded procedure package. They are separate from the automated checks above and do not establish the current workflows or every invocation method as tested.

The [guided manual evaluation kit](../evals/README.md) covers creation, redesign, typography-only refinement, review-only requests, intentional brand choices, and accurate reporting without rendering tools. It includes natural-language discovery, a paired no-skill baseline, and an unrelated backend activation control in both hosts.

The kit contains copy-ready tasks, dependency-free fixtures, an evidence-based rubric, and a report template. Runs use disposable projects and fresh sessions, with host, model, input, skill revision, isolation, actual loading when observable, and verification limits recorded. Reports and evaluator criteria stay outside the projects shown to agents.

These materials are excluded from the skill and npm distribution. No automated agent invocation, design scoring, or additional CI checks are introduced. The planned host runs remain pending until their observations are recorded; preparing the kit does not add compatibility evidence.

The [workflow guide](workflow-procedures.md#evaluation) connects complete tasks and focused interventions to the manual kit. The [instruction-efficiency comparison](../evals/cases/11-instruction-efficiency.md) checks actual reads, elapsed time, design, and scope against the previous revision and a no-skill baseline. Those runs remain pending. Package tests establish complete installation copies and internal integrity, not better decisions or faster generation.

The [contextual prevention case](../evals/cases/08-anti-slop-redesign.md) supplies a deliberately generic restoration-page prototype with unsupported proof, competing decoration, real service facts, and a local form. Pair it with intentional brand preservation when evaluating prevention changes. The fixture and evaluator checks are ready; behavioral outcomes and rendered verification remain pending. A zero-pattern count or authorship judgment is not an acceptance criterion.
