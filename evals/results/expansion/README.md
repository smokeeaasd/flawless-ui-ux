# Expansion evaluation

Status: 9 pilot sessions and 27 final sessions completed. The requested models were GPT-6.1 Terra at low reasoning and Beam 1.0 at medium through `opencode/beam-free#medium`. This is a small, unblinded task comparison, not a general quality ranking or a release announcement.

## What the evidence supports

The expanded candidate supplies substantially more decision material and was used selectively in the observed runs. All three arms completed the selected primary workflows. Independent initial-state checks found fewer flagged runs with the candidate in this sample, but the candidate still produced accessibility errors and unfavorable text-enlargement results. The comparison does **not** establish a consistent aesthetic advantage, statistical significance, improved conversion, native correctness or a universal model improvement.

| Final arm | Completed sessions | Primary journey observed | Runs with page overflow at 390px | Runs with selected axe findings | Union of those flagged runs |
|---|---:|---:|---:|---:|---:|
| No skill | 9 | 9 | 0 | 4 | 4 |
| Original skill | 9 | 9 | 2 | 3 | 4 |
| Expanded candidate | 9 | 9 | 0 | 2 | 2 |

Each arm contains six Terra sessions (three tasks, two repeats) and three Beam sessions (one repeat). These are counts of observed conditions, not scores. The selected initial-state samples cover 1440 and 390 CSS pixels in one Edge/Chromium engine. No page runtime errors or remote asset requests were observed. A zero finding count is not full accessibility conformance.

## Function and scope

**Met for the exercised primary journeys:** all nine public-page outputs retained the entered name/email through invalid input and produced a truthful local inquiry result; all nine operational outputs demonstrated assignment and removal with the expected coverage transition, or the equivalent fully covered/empty-filter path; all nine refinements retained a working local note action. Four operational outputs required selectors adapted to their actual interaction model after the generic harness could not identify the control. Those harness gaps were retained and followed up, not classified as application failures.

The operational captures showed coverage moving from 3/7 to 4/7 and back after assigning/removing Mei on Wednesday. The original-skill Terra second repeat also filled all seven places, reached its empty needs-cover state and returned to all shifts. These observations do not exhaust every invalid assignment, duplicate, repeated activation or focus path; those remaining combinations are **Unobserved** unless separately documented in the individual model notes.

**Met for the protected refinement source:** all nine final refinements preserved normalized body copy, the exact original JavaScript and the three original brand variables. The two-region desktop composition remains visible in captures. This is stronger scope evidence than relying on a model's statement that it preserved the page. The pilot's typography tasks likewise retained their HTML/behavior; queue and form journeys were independently exercised.

## Access failures and unfavorable results

- Beam original-skill public and operational outputs had page-level overflow at 390px.
- Beam candidate operational output had unnamed volunteer selects (`.volSelect[data-shift="S2"]` and `S3`); the no-skill Beam output also had unnamed selects. These are retained **Failed** selected access criteria.
- Contrast findings occurred in the no-skill Beam public submit control; original-skill Beam operational footer; both original-skill Terra operational repeats; both no-skill Terra operational repeats; and the second candidate Terra operational repeat. The candidate's first operational Terra repeat had no findings in the selected initial states.
- A separate 320px diagnostic that doubled precomputed text sizes found overflow in **both candidate Terra refinements** and the first original-skill Terra refinement. No-skill refinements and Beam refinements did not overflow in that diagnostic. This is an approximation for investigation, not an actual browser-zoom or WCAG conformance test. The first candidate Terra session independently reported a similar unresolved enlargement edge case.
- Some Beam candidate sessions performed only source checks despite available browser tools; the public-page candidate did not read Direction. One Terra candidate combined reference read was truncated, so its full content was not observed. More material does not ensure the model reads or follows it.

No evaluated output was repaired to remove these results. Remaining screen-reader, complete keyboard, focus recovery, text spacing, additional engines, native devices and real-user behavior are **Unobserved**, not implicitly passed.

## Craft observations

The reviewed first-repeat comparison captures show task-specific public offers, operational records and restrained typography refinements in all three arms. Terra's candidate public page used aligned service rows and a separate visit/inquiry region; its initial operational view emphasized a compact coverage summary and records. The original and no-skill arms also produced coherent directions. Beam's candidate public page remained relatively plain; larger instructions did not produce a clear visual win there.

These observations are qualitative and unblinded. Matching initial-state captures were collected for every final run; detailed subjective review was sampled, so comprehensive craft acceptance across all states remains **Unobserved**. No aesthetic score or blanket preference is assigned. The second-repeat text-enlargement failures are material counterevidence to a simple “larger skill is better” conclusion.

## Pilot

All nine Terra pilot sessions completed. Independent checks at 1440 and 390px found no document overflow or selected axe violations. Search/filter/update/clear, form error retention/correction and the local interest-form action worked across all arms. This pilot did not separate the arms on those criteria.

The no-skill pilot sessions attempted browser launch but were blocked by sandbox Crashpad pipes. Later arms received an explicit reminder that a permitted local launch could request escalation. Parent verification covered every arm under the same browser afterward, but model verification effort in the pilot is not a fair skill-effect comparison. This deviation is preserved; all final prompts contained the same escalation guidance.

## Runner and freeze limitations

Terra used fresh delegated Codex sessions with the explicitly requested model/reasoning settings, rather than the nested CLI that had previously been unable to execute reliably. Its reference reads are attributed session notes, not a complete independent read trace. Other skills/Sites were prohibited in the task instructions; this does not prove host-wide discovery was disabled. Beam used separate standalone OpenCode runs with skill/task/external-directory tools denied and local skill content read as files. Its JSONL traces record actual reads. Provider-internal reasoning behavior is not inferred from prose.

One Terra session returned a service usage-limit error before starting. A single retry succeeded; the failure was not counted as an extra completed sample. No model run hit the 15-minute cap. Parallel execution prevents speed/cost comparisons from these elapsed times. The evaluator knew the arm labels and authored the candidate.

The [protocol](protocol.json) records baseline, frozen candidate, prompts and source hashes. After final freezing, one executable inquiry-flow JSON, its usage paragraph and explicit existing-browser/HTTP CLI selection guidance were added to the distributed bundle. The latter addresses observed attempts that used a missing default browser despite a supplied Edge, or passed a file URL. Configured-browser HTTP inspection and explicit verify replay were independently checked through the actual CLI; these additions were **not** part of the model-tested snapshot. No final holdout was used to tune design guidance and then re-reported as unseen.

## Artifacts and reproducibility

- [Word counts](word-counts.json): entry/reference inventory and counting method.
- [Protocol and hashes](protocol.json): frozen inputs and post-freeze delta.
- [Per-run evidence](runs.json): attributed model notes, independent selected observations, checks and rubric boundaries.
- [Artifact hashes](artifacts.json): preserved sources, results, traces and independent captures.
- [Validation record](validation.json): test runs, example checks, CLI coverage and final package preview.
- [Evaluation case](../../cases/18-skill-expansion.md): tasks, isolation and rubric.

Large raw projects, JSONL traces, CLI reports and screenshots remain in the external `validation/expansion-round` directory alongside this checkout, excluded from npm. `pilot-independent`, `final-independent-1`, `final-independent-2`, `final-functions` and `final-adapted` contain parent observations. `studies-qa-1` contains the bundled examples' checks; `cli-study-1` contains completed source/rendered/interaction coverage for inspect and verify. The included maintainer scripts reproduce these checks in an appropriately prepared local environment.

## Package validation

The full browser-enabled suite initially passed 76 of 80 tests. One test incorrectly substituted the current bundle for historical 2.0.0; three installation matrices exceeded their existing time budgets under concurrent work. A frozen exact historical fixture, separate current-copy adoption test and larger matrix budgets resolved those failures. The affected suites then passed **42/42**; final package/distribution checks passed **6/6**. Together with unaffected passing tests this covers 81 distinct tests, not one final monolithic run.

The skill validator passed. Eight bundled web studies passed 32 width/accessibility samples plus their local state transitions. Actual CLI inspect and verify completed all requested source/rendered/interaction coverage for the inquiry flow. `npm pack --dry-run` included the portable skill, examples and runtime while excluding evaluation and historical fixture material. The two native sources remain explicitly uncompiled/device-unverified. No package publication, tag or GitHub release was performed.
