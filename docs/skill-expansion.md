# Skill expansion

Version 2.2.0 expands the skill with decision procedures, original worked cases and executable materials. It preserves the existing CLI and public schemas. Registry publication and the matching GitHub release are verified separately from the source changes, as described in the [release procedure](releasing.md).

## Delivered content

| Area | Before | Expanded delivery |
|---|---|---|
| Entry | 680 words, broad optional routing | About 1,190 words, intervention boundaries and owning-reference routing |
| References | 10 references, 5,488 words | 26 references, about 24,700 words |
| Brief and direction | General context and composition guidance | Evidence-based brief, protected facts, consequential alternatives and implementation relationships |
| Craft | One short craft overview | Dedicated typography, layout and color procedures with code and verification |
| Product tasks | General records/forms guidance | Tables, charts, forms, states and copy: numeric meaning, mobile decisions, error recovery and continuity |
| Refinement and review | Concise principles | Reproducible diagnoses, proportional interventions, matching comparisons and evidence-based findings |
| Platform and runtime | General convention boundary | Motion, performance, iOS, Android and desktop procedures with explicit tool limits |
| Studies | Four static composition plates | Retained plates plus ten worked cases across four references; eight executable web examples and two native source studies |
| CLI use | Supported commands and limits | Runner resolution, bounded flow example, coverage interpretation and unchanged inspect/verify replay |

Exact counts and the counting method are in [word-counts.json](../evals/results/expansion/word-counts.json). They count whitespace-separated words in the entry and reference Markdown, including code. They exclude executable sources and context templates. Word count is a content inventory, not model tokens, an instruction-loading requirement or evidence of effectiveness.

## Reading and materials

Start with the [skill entry](../skills/flawless-ui-ux/SKILL.md). It maps decisions to the owning reference rather than loading the entire library. The deeper material resolves decisions a short instruction leaves open: what should lead, which fields remain together, what a total includes, how an invalid form recovers, where focus goes and what evidence proves the result.

The [web example index](../skills/flawless-ui-ux/assets/examples/index.html) opens locally. Alternatively run `node skills/flawless-ui-ux/assets/examples/serve.mjs` and open the printed loopback URL. The examples use original fictional text, numbers and vector artwork. No remote asset, dependency installation, backend, real reservation or notification is involved. The optional server binds to loopback and serves only its examples directory.

| Study reference | Cases | Executable material |
|---|---|---|
| [Service studies](../skills/flawless-ui-ux/references/service-studies.md) | Café visit; public software offer | Menu/visit page; working disclosure |
| [Product studies](../skills/flawless-ui-ux/references/product-studies.md) | Cash planning; queue; mobile comparison; inquiry | Arithmetic/state changes; search/filter/update; local scroll table; recoverable validation |
| [Design studies](../skills/flawless-ui-ux/references/design-studies.md) | Reading; collection | Anchors/reading measure; native dialog and return focus |
| [Native studies](../skills/flawless-ui-ux/references/native-studies.md) | SwiftUI reading/detail; Compose searchable list | Source for an existing host project, explicitly uncompiled and device-unverified |

Competitor audits informed the categories of missing depth, not copied content or a word quota. Large libraries can provide useful procedures and examples but also repeat generic knowledge or impose arbitrary visual rules. This expansion retains contextual judgment: gradients, saturated colors, familiar fonts, conventional controls and useful density are allowed when appropriate. No style blacklist or numerical aesthetic score is added.

## Verification

The web studies are checked at four widths with selected axe rules and task-specific state assertions. The local inquiry flow is also inspected and verified over HTTP through the actual CLI. Package tests check links, metadata, full distribution and installation. Historical update tests use a frozen original tree so expansion cannot accidentally redefine the old baseline.

Model evaluation has its own [protocol](../evals/cases/18-skill-expansion.md) and [result record](../evals/results/expansion/README.md). Source, rendered, interaction and project evidence remain separate. A completed model run is not a passed rubric, a clean automated report is not a complete accessibility result, and a larger library is not proof of a better interface.

## Boundaries

No extensive shaders/3D library, live visual editor or automatic hooks are included. No new CLI command, report schema, package dependency or host-specific instruction variant is introduced. Browser checks cover browser interfaces; native code remains pending platform compilation and device/assistive-technology verification. Publication is a separate action.
