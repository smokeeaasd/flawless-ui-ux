# Case 11: instruction efficiency and design quality

Status: prepared; post-simplification host runs are pending.

This case evaluates whether the lighter guidance improves the relationship between effort and output. Smaller files alone are not success. Keep this case and its criteria outside the agent's project.

## Setup

Prepare identical clean React, Vite, and TypeScript scaffolds with dependencies already available. Use the same package manager, host, exact model/reasoning settings, permissions, browser availability, and other instructions. Preserve a starting snapshot and use independent copies and fresh sessions.

Compare three conditions: no skill, the previous package at revision b2399cf, and the candidate package. Install each skill condition from its own clean checkout or export; do not combine reference files from revisions. Verify installed contents. Disable duplicate and unrelated skills/plugins through supported host settings and record what actually remains active. Incomplete isolation must remain visible in the report.

Run in each target host when available. The historical Bloom report motivates this case but is separate evidence: its baseline transcript and complete timing profile were not available, and the skill run also loaded host/plugin instructions and lost browser access. Do not treat historical timing as a controlled candidate result.

## Task

Use this exact body in all conditions. For both skill conditions, prepend: `Use the flawless-ui-ux skill for this task.` Omit only that prefix in the no-skill baseline.

```text
Build a financial dashboard for Bloom, used by small business owners to track cash flow, expenses, and upcoming payments.

Include a financial overview, cash flow chart, recent transactions, spending by category, and upcoming bills. Users should be able to search transactions, filter by date and category, and inspect transaction details.

Use realistic local sample data. Clearly distinguish current balance from projected cash flow. Let users mark an upcoming bill as paid, updating its status and the relevant balances and totals.

Implement the dashboard and its interactions in the existing scaffold.
```

Do not supply the expected layout, prior output, diagnosis, target word budget, or a time limit designed to force a finish. Preserve the first completed result before any coaching; assisted improvements are separate observations.

## Record

Use the shared [report template](../report-template.md) and [rubric](../rubric.md). Save:

- Elapsed request-to-completion time, including interruptions and approvals; identify setup time separately. Record time to first implementation or preview only when observable.
- Actual skill/reference reads and rereads, sections or complete files, and their approximate word volume. File size is not token usage; an available file is not proof of reading.
- Other skill/plugin instructions, tool attempts, denied access, waiting, checks, and visible revision work. A server's lifetime is not automatically blocking time. Do not infer hidden reasoning time from this export.
- The complete output, source diff, and matched wide/narrow captures when tools permit. Keep agent and evaluator inspections separate.

## Assess the result

Check required search, combined filters, detail inspection, bill status, and coherent dependent totals. Verify current versus projected meaning and duplicate-update behavior. Preserve meaningful financial tests rather than trading correctness for a shorter run.

Inspect whether hierarchy, typography, color, proportions, and density support small-business financial work. Check the sidebar or chosen navigation at relevant heights, the meaning of destinations, and whether detail presentation fits the duration and context of the task. Modals, cards, anchors, and familiar fonts are not automatic failures.

Read generated copy as a sequence. Identify useful information, unnecessary repeated reassurance, unsupported claims, and instructions that would be lost through cleanup. Assess scope expansion and whether added features improved the requested task.

Report concrete improvements and remaining defects alongside elapsed time and actual reads. Fewer words or checks do not prove better design; longer execution needs an observable benefit. One generation does not establish a stable average. Repeat a comparison when variation or different tool conditions could change the conclusion, and preserve all results.

Until these observations exist, performance and visual improvement remain unobserved.
