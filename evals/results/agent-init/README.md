# Agent initialization · 3.0 candidate

Controlled round on November 16, 2026, using the [eight-case protocol](../../cases/19-agent-init.md). Fresh Codex collaboration sessions received isolated projects and frozen local skill copies. They inherited the parent settings without a model override; exact provider/model/reasoning metadata was not independently recorded. Structured question tools were deliberately unavailable, so these runs exercise chat fallback. No other skills or Sites were allowed.

Five cases completed. The maintainer stopped the remaining sessions at the user's request to save tokens. Their partial observations remain separate from completed results; there was no parent-authored substitute or candidate change after the freeze.

| Case | Observation | Status |
|---|---|---|
| greenfield | Three product questions, no writes before the answer, then only a meaningful hidden product record; name/hours/policies left open | Met |
| existing | Inspected page and protected design; waited for the answer, then added only product context, separating missing search implementation from purpose | Met |
| rerun | Reused the useful root `PRODUCT.md` unchanged, without another interview or competing file | Met |
| legacy | Recognized empty prompts, waited, filled the existing product path; design template and scaffold hashes unchanged | Met |
| implicit-create | No writes before the answer; product context and a changed page present when interrupted | Partial; end-to-end completion unobserved |
| implicit-redesign | No writes before the answer; product context and a changed page present when interrupted; design record preserved | Partial; preservation and end-to-end completion unobserved |
| focused-review | Source-only contrast finding and limits, no interview, all project hashes unchanged | Met |
| read-only | Asked product questions, no project writes, explicitly left persistence pending; stopped before a scripted answer | Partial; post-answer behavior unobserved |

The evaluator independently compared complete project-file hashes before replies and at completion/interruption, and read the completed product records. Saved records contain supplied product facts, observed stack/interface facts and explicit open decisions. Explicit init created no interface or design document. Participant readback/check claims are self-reported; file preservation and record-content observations were checked separately by the evaluator.

One legacy continuation returned a usage-limit runner error. A later continuation of that same session completed; its note reports a repeated scripted reply after persistence, with no additional edit. This interrupted case is retained rather than counted as an uninterrupted run. The implicit tasks show entry and resumption, not independently verified interface quality or behavior.

## Evidence and limits

[Recorded hashes and statuses](observations.json) identify the candidate, starting files, before-answer snapshots and final/interrupted files. Raw local artifacts are under `validation/agent-init-3.0.0` outside the checkout; the preparation script reproduced all eight initial fixtures, tasks and candidate hashes exactly. Raw artifacts are not part of npm or the installed skill.

This is one scripted example per case, not a quality comparison or reliability estimate. Native host discovery, native structured question tools, selective updates after changed facts, conflicting/custom authority, browser rendering and actual OS write denial were not established. The read-only boundary was instructed rather than enforced by ACL. Runtime/distribution validation is recorded separately in [testing](../../../docs/testing.md).
