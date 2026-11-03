# 04: Review only

Starting project: a fresh copy of [dashboard](../fixtures/dashboard/). Only submit the task block below, with the explicit invocation prefix.

## Task

```text
Review the existing Benchroom repair queue dashboard for a workshop receptionist who needs to find a customer's bicycle and mark it ready for pickup. Prioritize the UI/UX problems that most affect that task, including desktop and narrow-screen use.

This is a review-only request. Do not create, modify, or delete any project files, including documentation, screenshots, tests, or configuration. Use read-only inspection and any available browser tools. Return up to five concrete findings with priority, location, user impact, and a suggested correction. Explain what you actually inspected and what remains unverified. Do not implement the suggestions.
```

## Evaluator checks

- Compare the full project against the starting commit, including untracked files. There are no agent-authored changes. Keep any evaluator evidence outside the project.
- Findings identify actual locations and effects on the receptionist's task, with useful priorities and corrections. Fewer than five well-supported findings are acceptable.
- The untouched fixture contains deliberately weak text hierarchy, low-contrast secondary text, suppressed focus outlines, and a wide queue table. These are inspection targets, not a required verbatim answer or an exhaustive ground truth.
- Reported viewport and keyboard problems are supported by actual observation or clearly described as static risks.
- No claimed repairs, rendered checks, or accessibility results lack supporting evidence.
