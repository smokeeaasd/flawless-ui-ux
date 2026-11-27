# Executable inspection

Use the CLI when its executable, package runner, or checkout is available. Running `context`, `inspect`, or `verify` does not install the skill or mutate application code. Otherwise use host browser/file tools and state which checks remain unperformed.

Replace `flawless-ui-ux` below with `node /known/checkout/bin/flawless-ui-ux.js` when running from a checkout:

```bash
flawless-ui-ux context --project /project --format json
flawless-ui-ux inspect --project /project --source src/App.tsx --url http://localhost:5173 --output /artifacts/new-run --html --format json
flawless-ui-ux verify /artifacts/new-run/run.json --output /artifacts/new-verification --html --format json
```

`--source`, `--url`, and `--viewport WIDTHxHEIGHT` can repeat. Defaults sample `1440x900` and `390x844`. `--selector` narrows the region. Source paths must stay inside the project. Ordinary inspection is observational; it does not start servers, download browsers, submit forms, or edit sources.

## Rendered visual-system telemetry

Each rendered browser observation includes a `visualMetrics` object summarizing actual computed styles across visible elements:

- `fontFamilyCount` & `fontFamilies`: confirms which primary font families actually computed (helpful for catching silent fallback to `Arial` or `sans-serif`, or font sprawl).
- `fontSizeCount`, `fontSizes`, `bodyFontSize`, `maxFontSize`, & `displayToBodyRatio`: measures real type-scale separation (`~1.5–1.8` feels timid on public pages; `>= 2.2` signals strong display hierarchy; `1.15–1.6` suits dense operational workspaces).
- `fontWeightCount` & `fontWeights`: flags flat single-weight pages or excessive uncoordinated weights.
- `textColorCount`, `textColors`, `backgroundColorCount`, & `backgroundColors`: exposes palette discipline vs. uncoordinated hex sprawl.
- `borderRadiusCount`, `borderRadii`, & `cardLikeContainerCount`: helps catch mismatched corner radii or "everything wrapped in a card" layouts.

These numbers are objective review context—never an aesthetic score. Pair `visualMetrics` with the screenshots in `--output` (`--html` renders `report.html` with captures and the visual-system summary table) to run the visual self-critique in `Review`.

## Selected flows and cross-screen consistency

For authorized interaction checks, pass `--flow path/to/flow.json` (`schemaVersion: 1`, name, up to 12 uniquely identified steps: `click`, `fill`, `press`, `expect` visible/hidden/focused, and `observe`). Non-read-only network writes, WebSockets, and popups are blocked. `verify` requires the exact same unchanged `--flow` file explicitly.

For cross-screen consistency, pass multiple `--url` targets with `--consistency`. Computed styles are grouped by HTML role (and optional `data-flawless-role` attributes), viewport, and state for contextual review.

## Interpreting results and resolving the runner

- **Exit codes:** `0` = completed with no confirmed errors; `1` = confirmed error findings (`accessibility.*`, `render.broken-image`, `runtime.page-error`, `flow.expect.*`); `2` = invalid input or incomplete coverage.
- **Runner & browser:** run `doctor --project /project --format json` if availability is unclear. Select an explicit Chromium executable with `--browser-executable "/abs/path"` or `FLAWLESS_BROWSER_EXECUTABLE`. Always serve local HTML over HTTP(S) (`--url` rejects `file:`), verify the running server belongs to the intended project, and use a fresh output directory outside the project for review-only work.
- **Verification discipline:** inspect `coverage` and `limits` before trusting zero findings. Repeat the exact same scope with `verify` after fixes; a missing target is reported `unverified`, not fixed.
