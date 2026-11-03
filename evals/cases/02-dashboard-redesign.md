# 02: Dashboard redesign

Starting project: a fresh copy of [dashboard](../fixtures/dashboard/). Only submit the task block below, with the host's explicit invocation prefix.

## Task

```text
Redesign the existing Benchroom repair queue dashboard for a workshop receptionist who needs to find a customer's bicycle and mark completed work ready for pickup.

You may replace the layout, typography, spacing, and visual treatment. Keep the Benchroom name, indigo accent (#3949ab), all six supplied jobs, their IDs, customers, bicycles, due dates, estimates in GBP, and initial statuses. Preserve search by job ID, customer, or bicycle; the status filter; Clear filters; summary counts; the no-results state; and Mark ready with visible feedback. Counts describe the whole queue, not only filtered rows. State is intentionally in memory and resets on reload; do not add persistence, authentication, or a backend.

Make the queue easier to scan and operate on desktop and a narrow screen. Work within the existing HTML, CSS, and JavaScript files, using system fonts and local resources. Complete the redesign and use the available tools to verify the preserved workflows. Briefly explain the direction, checks, and limitations.
```

## Evaluator checks

- All six initial records still match `app.js` in the original fixture; only an exercised Mark ready action changes a status during the session.
- A fresh load shows six jobs, two in progress, and two ready. Search `maya` returns R-201; search `R-206` returns Sofia Costa; `cargo` returns R-202.
- Ready initially shows R-203 and R-206. An unmatched query shows a useful no-results state. Clear filters restores the full list.
- With Received selected, mark R-201 ready. It leaves that filtered list, the ready count becomes three, and feedback identifies R-201. Ready now includes it; Clear filters shows all six records. Reload restores the original state.
- Keyboard access and narrow-screen operation remain usable. Distinguish actual interactions from static inspection.
- The redesign improves a concrete scanning or action problem without fabricating metrics or integrations.
