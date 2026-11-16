# Migrating to 3.0

## Product setup moves into the agent

The terminal `flawless-ui-ux init` operation no longer creates product/design templates. Send the skill an init request inside your coding agent instead:

```text
$flawless-ui-ux init
```

Codex uses that form; slash-command hosts use `/flawless-ui-ux init`, and Pi uses `/skill:flawless-ui-ux init`. A natural-language request to this skill to initialize product context has the same meaning.

The agent inspects the project, asks about material missing facts or confirms a compact reading, and waits for an answer before writing a new product record. It records audience, tasks, purpose, real capabilities, platform/stack, constraints, binding brand facts, evidence and open decisions. It does not choose a visual direction, create a design record or build a screen during explicit init. The CLI no longer runs a questionnaire, prepares templates or launches an agent.

Creating a whole interface or broadly redesigning one without useful product context invokes this onboarding and then resumes the original task. Local extensions, focused refinement and review can proceed directly. Empty templates are not completed context. With no answer or write permission, the record remains pending.

## Preserve existing records

No file migration is required. The agent reuses authoritative product records; if none exists, it writes `.flawless-ui-ux/product.md`. The reader still supports `PRODUCT.md`, `docs/product.md`, `.flawless-ui-ux/product.md`, and the corresponding design locations, plus explicitly selected custom Markdown. Do not duplicate or move a useful record to adopt 3.0. Existing design documents and old empty design templates remain untouched by init.

Scripts that previously called terminal init must remove that setup step and hand product discovery to the coding agent. Legacy init calls return exit 2 and an explanation, without writes; `--format json` retains the schema-2 error envelope with operation `init`. `init --help` exits 0 with migration guidance. The operation is absent from the active command list.

## Update installed copies

Updating the npm package alone does not refresh installed skill files. From the 3.0.0 package, preview and apply updates with the existing update command:

```sh
npx flawless-ui-ux@3.0.0 update --dry-run
npx flawless-ui-ux@3.0.0 update
```

Use `--global` for global copies. Existing managed copies and exact unrecorded published 2.2.0 copies can be recognized. Local modifications, unknown contents, links and newer installations retain the existing preservation behavior. Inspect conflicts rather than forcing replacement. The historical 2.0.0 baseline remains supported.

## Reports remain compatible

Install reports remain schema 1; context/inspection/verification and their error reports remain schema 2. Check identities and versions do not change for this onboarding migration. Verify accepts complete compatible 2.0.x, 2.1.x, 2.2.x and 3.0.x baselines with matching check versions and the existing project/scope/browser constraints. The supported v1 migration remains available. Unknown tool versions, incompatible checks and incomplete runs remain rejected.

The removed terminal operation is the breaking change. Runtime dependencies and the other CLI operations remain unchanged. Release publication is separate from preparing these source changes.
