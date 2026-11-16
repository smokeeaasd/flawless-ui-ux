# Product studies

Four original executable cases cover numerical meaning, operational records, comparison and input recovery. Use the [example index](../assets/examples/index.html) directly or the optional server described in [Service studies](service-studies.md). All names and data are fictional. Local actions change memory only. These are deliberately bounded studies, not application scaffolds or a new component dependency.

## 3. Cash planning: preserve the arithmetic

Open [Cash workspace](../assets/examples/finance.html). The question is whether available cash and expected income cover unpaid obligations in a selected period. The initial week has cash 4,800, expected income 2,800 and unpaid obligations 1,700 USD: projected cash is 5,900. The month has income 6,100 and obligations 4,200: projection is 6,700. Expected and recorded money remain distinct.

**Before:** a dashboard could show a large balance and an unlabeled trend, leaving the period and obligation scope ambiguous. Four matching tiles would not explain whether a payment was counted twice.

**After:** a projection leads, its formula is nearby, and the contributing amounts are aligned with explicit roles. A local $500 rent action updates cash and unpaid obligations together. The projection stays unchanged because the obligation was already included. Paying twice is prevented. The weekly income breakdown retains its own fixed weekly label when the planning selector changes.

Inspect `periods`, `update` and the payment handler in [shared JavaScript](../assets/examples/shared.js). The small example makes the invariant visible rather than hiding it behind an API. This arithmetic is illustrative: do not impose it on a product with different rules, currencies or accounting semantics.

**Check:** select each period, verify the formula, mark rent paid, verify both contributing amounts decrease by 500 and both projections remain correct. The result must say the action is local. Check numeric alignment and labels at 390px. A passing chart scan cannot prove any of this. See [Charts](charts.md) for units, periods, missing values and honest comparisons.

## 4. A repair queue: useful density and mobile records

Open [Repair queue](../assets/examples/queue.html). A receptionist searches a specific person or identifier and marks a completed repair ready. Status and action belong to the same stable record.

**Before:** a fixed wide grid can push the action outside a phone viewport. Shrinking every cell preserves the silhouette but makes the task harder. Large decorative summaries can also bury the useful records.

**After:** desktop keeps an aligned table; phone widths put each record's identity first and pair remaining fields with labels. No field or action is removed. The long fictional name exercises wrapping. Search and status filtering combine; clear returns to all three records. A zero-match explanation is different from an empty dataset.

The local update changes the record's state, visible badge, available action, filter membership and result count together. If the active filter is “In repair,” marking ready removes that row. Feedback identifies the object and the surviving search control receives focus. No customer notification is claimed.

**Check:** search `R-104`, combine with “In repair,” mark it ready and observe zero matches. Clear filters and find the same record ready. Confirm the total is still three. Test by keyboard at desktop and phone widths; verify the changed table styling retains understandable semantics in the project's browser/assistive technology combination. CSS visual adaptation alone does not prove screen-reader behavior. See [Tables](tables.md) and [States](states.md).

## 5. A measurement table: retain two dimensions

Open [Sample comparison](../assets/examples/comparison.html). The task compares measurements across sites, so the example deliberately retains a table on phones. A labeled, keyboard-focusable local scroll region and a sticky row-heading column preserve comparison. The document itself should not scroll horizontally.

**Before:** per-site cards would force remembering earlier values while looking at the next site. Omitting units or replacing an absent measurement with zero would change meaning regardless of appearance.

**After:** the collection window, units, precision and notes remain attached. Zero rainfall is numeric zero; unavailable pH is “Not sampled.” The table provides no health or environmental conclusion from these illustrative values.

**Check:** at 320px focus the region and use horizontal arrow keys; verify the last column is reachable, the site label remains visible and text is not obscured. At wide widths check all columns together. Consider a stacked record representation only if the actual task changes from comparison to finding and acting on one record. A local scroll container is a decision, not a universal mobile cure.

## 6. An inquiry: recovery is the result

Open [Input and recovery](../assets/examples/form.html). There are three required fields and no service. The action checks input locally. The useful states are editing, invalid and locally valid; there is no artificial network loading.

**Before:** placeholders alone disappear during entry; a generic red message makes users hunt for the problem; resetting the form destroys their work. A “sent” confirmation would be false.

**After:** visible labels and hints remain, errors are associated with fields, an empty submission focuses a linked summary, valid corrections remove their stale error and all entries remain. A fully valid result explicitly says nothing was sent or saved. Later editing clears that result to avoid describing new input as already checked.

**Check:** submit empty, follow each error link, enter an invalid email, correct it and verify other entries persist. Complete all fields and submit, then edit again. Verify focus, summary content, invalid state and truthful result at phone and desktop sizes. The handler uses platform email validity; production rules still belong to the integration. No frontend check replaces server validation. See [Forms](forms.md), [Copy](copy.md) and [Interaction](interaction.md).

The bundled [inquiry flow](../assets/examples/inquiry.flow.json) is an executable CLI example for this local page only. Serve the examples over HTTP first, select this examples directory as the project, then pass `--url http://127.0.0.1:4178/form.html --flow inquiry.flow.json` to inspect. It checks empty-submit focus, fills fictional input, and observes invalid/valid states. Select the same unchanged flow explicitly for verify. It does not test all the recovery checks above or authorize submission on another site. See [Executable inspection](inspection.md).

## Transfer decisions, preserve boundaries

These cases intentionally choose different structures. A comparison table, adaptable record list and input form should not receive the same mobile treatment. When adapting source, preserve the actual data model, supported transitions, persistence and existing reliable components. Recheck the task with real content; the examples establish only their bounded local behavior.
