# Product structure

Use the section relevant to an unresolved navigation, content, data, or action decision. Work within the requested feature set and existing product rules.

## Navigation and detail

Choose destinations from distinct user tasks. In an application, a top-level destination should expose its own useful view; if links move within one page, present them as section navigation. A sidebar is one option, not a prerequisite for a dashboard. Fit its width and height to labels, controls, and available space. Keep navigation usable when the content scrolls.

Choose detail presentation from the amount of work and context needed:

- Inline disclosure fits a small explanation or local edit.
- A side panel can preserve comparison with a record list.
- A dialog fits a bounded decision or short inspection.
- A full view suits sustained work, deep content, or a destination users need to return to.

Use the surrounding product's navigation model. Preserve useful query and selection context on return. Add help, notifications, account switching, onboarding, or export only when they belong to the requested task.

## Records and measures

Choose fields for recognition, comparison, and action. Keep identifiers, status, units, periods, and relevant precision attached to values. Distinguish recorded and projected figures, missing values and zero, and filtered versus whole-dataset summaries.

When search or filters are requested, define matching, combination, clearing, and result counts consistently. An empty dataset and a query with no matches need different explanations. Keep relevant controls available in either case.

For updates, identify which records, totals, categories, counts, and views change together. A status change may remove a record from its current filter; give accurate feedback and sensible focus. Prevent duplicate consequential updates. Follow the specified persistence and integration behavior.

For example, marking a scheduled bill paid moves it into recorded expenses and updates the available balance and outstanding amount. A projection that already included that bill must not deduct it again. Verify the supplied rules rather than copying this example into unrelated products.

Use charts when their comparison is useful and supported by data. Choose scales, labels, and series that answer the question. Keep numeric information readable; a decorative trend is not an adequate substitute.

## Forms and journeys

Recover actual fields, validation rules, permitted actions, and the integration boundary. Group related decisions, place consequences near the relevant action, and choose steps only where dependencies or volume justify them.

Distinguish editing, invalid input, pending, confirmed success, and failure when the implementation can encounter those states. Preserve useful input on failure and provide a supported recovery. Keep routine reversible actions direct. A local demo can show a local result; it cannot claim a real payment, reservation, email, or account change.

For commercial or consequential actions, resolve unknown terms before promising an outcome. Continue independent work on confirmed information.

## Content and discovery

For an offer, establish what is provided, who it serves, relevant terms, useful evidence, and the next action. Arrange the questions particular to the product instead of inserting a standard section inventory. A demonstration, comparison, process, price list, or visual sequence should earn its place through information.

For sustained reading, organize meaningful headings, a comfortable measure, examples, and a useful way to locate and return to a topic. Use anchors where they genuinely serve reading.

For collections, expose the actual work and relevant metadata, connect discovery to detail, and preserve browsing context on return. Add search and filters only when needed. Essential information and actions must remain available beyond hover.

## Editorial pass

When generating copy or editing it with permission, read headings, descriptions, captions, action notes, and footer as one sequence. Identify each region's distinct contribution. Replace redundant promises with the concrete information needed there, or remove the redundant line. Rephrasing a payoff is not new information.

Use descriptive names for operational content and actions. Expressive copy can support a brand or campaign where it has a deliberate role. Preserve facts, necessary instructions, required wording, and visual identity; copy cleanup alone does not authorize restyling.

## Resolve navigation as a journey

List the start, destination and return context for the actual task. A record can be found through a filter, opened, changed and returned to the same result set. A gallery item can be opened and closed without jumping back to the top. A page's “Pricing” link can move to a section without pretending to open an application screen. This small map reveals missing destinations before decoration begins.

Use addressable routes when users need reload, bookmarking, sharing or sustained work and the project's architecture supports them. Use local state for a bounded disclosure that does not merit a destination. Keep query, selected object and open state separate: filtering the list should not silently replace an already open record with another record at the same array index. Identify objects by stable keys.

Check the actual destination of every prominent link. Placeholder anchors, disabled primary actions and “Learn more” links returning to the current section can make a static preview look complete while leaving no journey. Implement the authorized destination or state its absence honestly. Do not create an account, checkout or contact integration to hide an unknown requirement.

## Choose a detail container by work

A short confirmation can be a dialog; a multi-field record edit often needs a durable view or an established panel. Compare the amount of simultaneous context, keyboard travel, mobile space and recovery needed. A panel that works beside a wide table may become a full-width region on a phone. Preserve an explicit close/back path and the selected object's identity. Do not keep a narrow desktop panel over a horizontally clipped list simply because both fit in source.

For a table, read [Tables](tables.md) before choosing the mobile representation. For numeric comparisons use [Charts](charts.md). For input journeys read [Forms](forms.md) and [States](states.md). These own the detailed rules; this reference decides how the pieces relate.

## Test structural meaning

Walk through the task with a specific object rather than clicking every control once. Find a named record, open it, apply its supported action, then verify the list membership, detail, total and feedback. Clear filters and locate it again. For a public page, identify the offer, find its relevant terms and follow its next action. For reading, enter at a heading, follow a reference and return with orientation. For a collection, open an item with long metadata and return to its place.

Keep the structure honest when data is sparse. One record does not justify search and pagination. An intentionally static example does not need artificial loading. Large datasets may need server-side operations; a frontend-only filter of one page must not claim to search the whole account. Declare the available scope instead of manufacturing an impressive but misleading interface.
