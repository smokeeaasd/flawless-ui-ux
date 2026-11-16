# Data meaning before chart styling

Use when a surface summarizes quantities, trends, distributions or relationships. Start with the question a viewer should answer, the supplied data and its provenance. Do not invent a rising trend to fill a dashboard. A decorative sparkline can imply measured history even when its designer intended only atmosphere.

## Define the comparison

State the measure, unit, period, aggregation and relevant population. “Revenue” might mean invoiced, recognized or received money. “Users” might mean registered accounts, active people or sessions. A chart cannot resolve an undefined metric. Recover the product's definitions and distinguish recorded data from projections and illustrative examples.

Choose a representation from the comparison. Bars support comparison of magnitudes across categories; lines support change along an ordered axis; a table supports exact lookup; a histogram shows a distribution of observations. A single clear number with its period can be more useful than a chart of three nearly equal values. Do not add pie, donut, gauge or sparkline decorations merely because the surface is called a dashboard.

For an operational screen, identify what decision changes because of the display. A freelancer checking cash availability may need upcoming obligations and expected receipts, not a generic monthly revenue curve. A service queue may need oldest waiting work rather than a growth percentage. Use the established data model and do not create additional business logic to make the visualization impressive.

## Scale honestly

Make axis direction, baseline and units explicit. Bars encode length and normally need a zero baseline for magnitude comparison. A line may use a narrower range when it helps show variation, but expose that range clearly. Log scales and dual axes require a genuine need and labels that support interpretation. Do not use a tiny range change to imply dramatic business improvement.

Choose readable tick values suited to the domain. When a chart spans $0–$7,000, ticks at $0, $2k, $4k and $6k may be easier to scan than arbitrary decimal thousands, provided the scale and extent remain correct. A formatter must not change the data or hide important precision. Round display ticks deliberately; preserve exact values in a table or accessible detail when needed.

If two series are compared, verify common periods and units. A line of cumulative revenue beside bars of monthly expense can be misleading even with accurate individual values. Label different scopes and avoid visual juxtaposition that implies equivalence. Treat missing observations differently from zero. Decide whether a gap, a note or a projection style communicates the truth.

## Preserve access to the numbers

Supply a concise description of the question and important result. Provide a data table or another usable numeric alternative when exact values matter. An `aria-label` listing every point can work for a tiny static example but becomes exhausting for a large interactive visualization. Use a library with appropriate accessibility support when the complexity warrants it.

```html
<figure>
  <figcaption>Sample received income and expenses, June–August</figcaption>
  <svg role="img" aria-labelledby="cash-title cash-desc" viewBox="0 0 480 240">
    <title id="cash-title">Monthly income exceeds expenses in each shown month</title>
    <desc id="cash-desc">Exact sample values are in the adjacent table.</desc>
    <!-- Draw the supplied values using one documented scale. -->
  </svg>
  <table>
    <caption>Chart data in dollars</caption>
    <thead><tr><th scope="col">Month</th><th scope="col">Income</th><th scope="col">Expenses</th></tr></thead>
    <tbody><tr><th scope="row">June</th><td>4,200</td><td>2,100</td></tr></tbody>
  </table>
</figure>
```

This is a semantic skeleton, not a finished chart or an instruction to draw empty placeholders. Choose the implementation appropriate to the project's framework and actual dataset. Keep titles and descriptions factual; a chart that sometimes falls below expenses must not retain a fixed optimistic description.

## Color, labels and interaction

Use series colors consistently across the chart, legend, filters and other views. Distinguish series beyond color when necessary through line style, labels, markers or arrangement. Measure meaningful graphical contrast, not just legend text. Dense labels should not obscure the data; a tooltip is supplementary information, not the sole way to learn a critical value.

If the chart is interactive, ensure the relevant operation has a keyboard and touch path. Hover cannot be the only route. Expose selected period, toggled series and range state accurately. Avoid making every data mark a separate tab stop in a large dataset without a coherent navigation model. Preserve understandable focus when the range changes.

Animations can explain a transition between ranges, but do not repeatedly redraw the chart whenever the user scrolls into view. Respect reduced motion and avoid implying false chronology through decorative motion. Loading and empty states should say whether data is arriving, unavailable or absent; a flat line is not an honest placeholder for unknown data.

## Mobile and summary consistency

Retain the comparison question on a narrow screen. Reduce tick density or change orientation before shrinking every label. Keep the legend near the plot and preserve access to exact values. A horizontally scrollable timeline can be justified for detailed inspection, but a six-point summary should not require it without a reason.

Verify the chart and summary use the same definition and period when they claim to agree. A summary based on all records can coexist with a filtered chart only if their scopes are clear. A “net cash flow” card should use the documented income-minus-expense rule; do not infer account balance from that subtraction without the starting balance and other flows.

## Acceptance

Check one point manually against its source and scale, then verify the mapping systematically where implementation complexity warrants it. Exercise ranges, series switches and empty/missing data. Inspect label collisions at narrow and intermediate widths, both themes and relevant enlargement settings. Compare the underlying values before and after a visual refinement. Record which claims were checked; screenshots alone cannot establish data integrity or the correctness of calculations.
