# Records, tables and mobile decisions

Use when users find, compare, select or act on records. A table is a relationship between fields, not merely a desktop component to squeeze into a phone. Start by identifying the task and the minimum information needed to complete it. See [Product studies](product-studies.md) for executable examples and [Charts](charts.md) for aggregate comparisons.

## Choose a representation

Identify whether the user compares the same field across many rows, understands one record at a time, or edits a matrix whose two axes both matter. Then decide:

| Task | Useful starting model | Main risk |
|---|---|---|
| Compare amounts across invoices | Aligned table with stable columns | Hiding units, periods or amounts on narrow screens |
| Find the next repair to collect | Compact record list with identity, status and action | Decorative summaries taking space from the queue |
| Inspect one transaction on a phone | Stacked record summary with a detail path if needed | Losing the relationship between label and value |
| Edit a timetable or comparison matrix | Locally scrollable two-dimensional region | Keyboard users cannot reach or move the region |

These are options, not device rules. A short phone table can remain a table; a desktop queue can be a list. Do not convert a true comparison matrix into cards if doing so destroys the user's ability to compare columns.

## Prioritize fields

For each field ask whether it is needed to recognize the record, make the decision, perform the action, or explain a consequence. Put recognition and decision fields first. An internal ID can move to detail; the amount in a finance task usually cannot. Preserve access to secondary fields rather than silently dropping them.

Keep dates, signs, units and status attached to their values. Use clear column names and appropriate header semantics. Align quantities sharing a unit; avoid right-aligning textual categories just to make the grid symmetrical. Distinguish zero, missing, pending and not applicable. If an aggregate covers all records while the list is filtered, label that scope rather than implying it sums the visible rows.

For long identifiers or descriptions, decide between wrapping, a readable truncation with another access path, and a detail view. A tooltip available only on hover is not a complete access path. Do not wrap a price so its sign or currency appears detached on the next line. Long text should not force every neighboring field into unreadable columns.

## Search, filters and sorting

Define what matches: description, category, identifier or another documented field. Normalize only as appropriate to the product. Show how filters combine, provide a way to clear them, and distinguish an empty dataset from no matching results. A result count should describe the filtered set accurately. Search must not accidentally search hidden explanatory text as if it were record content.

Sorting needs a stable meaning and an exposed direction. Sort numbers numerically, dates by their actual value and labels according to the relevant locale when necessary. Keep filtering and sorting separate from mutations. If a row changes state and leaves a filtered list, explain the result and choose sensible focus instead of leaving focus on a removed element.

Selection needs a clear scope: visible rows, matching rows or the whole dataset. Bulk actions must not change that scope silently when a filter changes. Preserve a record's identity during updates rather than associating actions only with a current array position.

## Adapt a finance list

A desktop table shows description, date, category and amount. At 390px the amount is outside the visible region. If the primary phone task is checking a transaction, a useful adaptation is a row with description and amount on the first line, then date and category below. Keep all four values and a predictable reading order. A CSS layout change must not remove the table's useful accessible relationships; a semantic list may be simpler for a small record-oriented surface.

Do not make the whole dashboard 11px to retain four columns. Do not remove the amount. Do not declare the problem resolved because the outer document has no overflow. Test whether a visitor can identify the record and its value without discovering an invisible sideways gesture.

If comparison across columns genuinely requires the table, preserve it with a labeled region and keyboard access. Use native table structure inside the scroll container:

```html
<p id="comparison-help">Scroll horizontally to compare all periods.</p>
<div class="table-scroll" role="region" aria-label="Quarterly comparison"
     aria-describedby="comparison-help" tabindex="0">
  <table>
    <caption>Recorded revenue by quarter, sample data</caption>
    <thead><tr><th scope="col">Team</th><th scope="col">Q1</th><th scope="col">Q2</th></tr></thead>
    <tbody><tr><th scope="row">North</th><td>$12,000</td><td>$14,500</td></tr></tbody>
  </table>
</div>
```

```css
.table-scroll { overflow: auto; max-inline-size: 100%; }
.table-scroll:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
th, td { padding: .75rem; text-align: start; }
```

Focusability here serves an actual scrolling task; do not add `tabindex="0"` to every static table. Check whether the region overflows at the relevant size and whether supported browsers already expose useful keyboard behavior. Avoid creating unnecessary tab stops where no scrolling is needed. Keep its label specific and its focus ring visible.

## Actions and states

Place an action with the record it changes. A repeated “Open” needs record context in its accessible name when context is otherwise ambiguous. Separate navigation from destructive actions and avoid putting several tiny icon-only controls in each row. If a row is clickable, embedded controls must not trigger accidental row navigation. Prefer a clear link or button when an entire interactive row would complicate semantics.

Use honest pending and completion states. Do not announce that an invoice was sent when a local demo only changed a label. Preserve input and selection on failure where the product supports it. When a record disappears, explain whether it was deleted, moved, filtered or unavailable; these are different outcomes.

## Stress and verify

Test no data, one record, many records, a long name, a large amount and a missing optional field. Exercise search plus each filter, then clear both and verify the original set returns. Test narrow and intermediate widths, 200% text enlargement and keyboard focus through actions and any scroll region. Inspect both themes if present. Check that resizing does not duplicate records or create two keyboard paths to the same action.

For virtualized collections, verify focus, announcements, item position and navigation with the actual component; the presence of a thousand rows in a source array does not prove usable rendering. Introduce virtualization only when observed scale or performance justifies it. Report sample size, conditions and untested behavior. A beautiful table with missing amounts is a task failure, not a successful visual refinement.
