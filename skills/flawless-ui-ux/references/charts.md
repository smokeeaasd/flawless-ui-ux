# Data meaning before chart styling

Use when summarizing quantities, trends, distributions, or comparisons. Never invent rising trendlines or decorative sparklines without real data.

## Core rules

- **Match chart to question:** bars for category magnitude (zero baseline), lines for ordered time trends (disclose cropped ranges), tables for exact lookup, or one bold figure + period when a chart adds no insight.
- **Honest encoding:** label units, periods, aggregation scope, and missing vs. zero points explicitly. Never compare mismatched units/periods on one axis without clear distinction.
- **Beyond color & hover:** pair series hues with line styles, markers, or direct labels; keep exact values reachable via keyboard/touch or an adjacent accessible table rather than hover-only tooltips.

```html
<figure>
  <figcaption>Sample received income and expenses, June–August</figcaption>
  <svg role="img" aria-labelledby="cash-title cash-desc" viewBox="0 0 480 240">
    <title id="cash-title">Monthly income exceeds expenses in each shown month</title>
    <desc id="cash-desc">Exact sample values are in the adjacent table.</desc>
  </svg>
</figure>
```

## Verification

Check plotted points against source data, test `390px` label legibility, inspect both light/dark themes, and confirm summary cards match chart filter scope.
