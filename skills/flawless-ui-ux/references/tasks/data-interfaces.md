# Data interfaces

Use inside the selected workflow for dashboards, queues, tables, inboxes, monitoring views, and record-detail workspaces. Read the sections that affect the task. A typography refinement can stay with typography guidance; a data-interface request needs the decisions about records, views, actions, and meaning below.

## Model the work

Identify who uses the screen, what they need to find out, and what they do with the answer. An operator resolving overdue work needs a useful queue and intervention path; a manager comparing periods needs interpretable measures. The word dashboard does not establish either structure.

Inspect authoritative data sources, record identifiers, relevant fields, status values, units, time periods, permissions, and existing navigation. Determine whether the interface uses a complete dataset, a current page, or server-side queries. Treat timestamps and freshness as product facts. A local sample dataset should be identifiable as sample data rather than reported as business performance.

Define a useful default view and the relationship between overview and detail. Prioritize the information that changes the next decision. Add charts, summary tiles, filters, bulk actions, or customization only when they serve the requested work and available data.

## Records, views, and controls

Give each record a recognizable identity and meaningful status. Choose columns or fields for scanning and comparison rather than displaying every available property equally. Keep actions close to their object, with names that clarify the result. Distinguish opening a record from changing it; interactive cells must remain operable without making an entire row a conflicting click target.

Define what search matches, how filters combine, where sorting applies, and how a user restores the default view when those controls are required. Respect existing query and pagination contracts. A result count must describe the same scope as its label: all records, matching records, or the current page. Preserve necessary query or selection context across supported detail and return paths.

Do not introduce row selection or batch operations solely because the layout resembles an admin template. If batch work is requested, clarify what is selected, whether selection spans pages, and which selected records can actually receive the action.

## Measures and comparisons

Keep values attached to their meaning: unit, period, scope, and comparison basis. A rate needs a denominator; a change needs a comparable baseline. Do not combine different periods into a single total or treat missing values as zero to make a chart complete.

Use alignment, precision, and tabular figures where they aid comparison. Choose chart structure from the question, and provide enough labels or adjacent text to interpret it. Status and trends need wording or another cue in addition to color; an increase is not universally positive.

Distinguish filtered and whole-dataset summaries. If filtering changes a summary, recompute against the correct scope and make that scope understandable. If it does not, retain the total and label it accordingly. Preserve the existing rule during a visual redesign unless changing it is authorized.

## States and object actions

Apply states that the data and workflow can actually encounter:

| Situation | Required distinction |
|---|---|
| No records exist | Explain what belongs here and the applicable first action |
| A query matches nothing | Keep the query visible and provide a relevant clear or broaden path |
| Data is loading or unavailable | Preserve useful context and distinguish pending from failure |
| Data is stale or partial | Identify the actual limitation when the source exposes it |
| A record update is pending | Show which object and action are pending; prevent accidental duplicates where relevant |
| An update succeeds or fails | Reflect the confirmed outcome, update dependent views, or preserve a recovery path |
| An action is restricted | Follow actual permissions and explain the relevant limitation |

For an update, identify affected records, counts, filters, detail views, and focus. If a record leaves the active filter after a status change, communicate the result and leave the keyboard user in a sensible place. Follow the project's existing update and retry behavior; do not invent optimistic guarantees, persistence, or a server response.

## Density and responsive composition

Use density for the workload. A frequent operator may benefit from comparable rows and quiet repeated panels rather than a series of oversized cards. Keep primary identity, decision-relevant values, status, and action distinguishable through visual roles.

At smaller widths, decide which secondary details move into a detail view or disclosure while essential context remains reachable. A genuinely two-dimensional table can use a dedicated scrolling region. Preserve relationships and usable controls instead of hiding columns or clipping content solely to remove overflow. Reconsider surrounding navigation and filters as part of the composition.

Use [Craft](../craft.md) for hierarchy, typography, spacing, color, and reflow, and [Interaction](../interaction.md) for controls, feedback, and access.

## Verification cases

Derive checks from the supplied rules and the intervention:

- A representative record can be located and its state understood.
- Applicable search, combined filters, sorting, pagination, and clearing describe the intended record set.
- Summaries, units, periods, and comparisons retain their meaning.
- A supported object action gives accurate feedback and updates dependent views; relevant failure preserves a useful recovery path.
- Empty and no-match states remain distinct, and known records are not lost during redesign.
- Keyboard use, long labels, dense content, and representative narrow layouts remain usable where actually observed.

For a read-only review, inspect these paths without editing project files. For a focused refinement, select only checks it can affect. Report source-based expectations separately from performed interaction and rendered checks using [Review](../review.md).

## Example: filtered repair queue

In a local demo with six jobs and two ready for pickup, the summary describes the whole queue. Selecting Received changes visible rows without changing that summary. Marking a received job ready removes it from the current filtered view, raises the ready total to three, and identifies the updated job in feedback. Clearing filters restores all six records; reloading restores the supplied demo state.

This defines a concrete action path and dependent checks. It does not require charts, persistent storage, or a new dashboard layout to make the queue complete.
