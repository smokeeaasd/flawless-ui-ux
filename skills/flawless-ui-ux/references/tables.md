# Records, tables and mobile decisions

Use when users find, compare, select, or act on structured records. See [Product studies](product-studies.md) for runnable examples and [Charts](charts.md) for aggregate displays.

## Choose the right representation

- **Cross-row magnitude comparison:** aligned `<table>` with `tabular-nums`, explicit units, and clear column headers.
- **Operational action queue:** compact record list keeping identifier, status, and primary action adjacent without decorative KPI sprawl above it.
- **True 2D matrix on phones (`390px`):** retain table semantics inside a labeled, keyboard-focusable horizontal scroll container (never shrink body text to `10px` or drop amounts):

```html
<p id="comparison-help">Scroll horizontally to compare all periods.</p>
<div class="table-scroll" role="region" aria-label="Quarterly comparison"
     aria-describedby="comparison-help" tabindex="0">
  <table>
    <thead><tr><th scope="col">Team</th><th scope="col">Q1</th><th scope="col">Q2</th></tr></thead>
    <tbody><tr><th scope="row">North</th><td>$12,000</td><td>$14,500</td></tr></tbody>
  </table>
</div>
```

```css
.table-scroll { overflow: auto; max-inline-size: 100%; }
.table-scroll:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
th, td { padding: 0.75rem; text-align: start; }
```

*(Only add `tabindex="0"` when the table actually overflows horizontally.)*

## Data integrity and controls

- Keep units, currencies, signs (`−$45`), dates, and filtered vs. total scopes explicit; distinguish `0` from *missing* or *N/A*.
- Keep search + filters accessible in zero-match states, clarify sort direction, and bind row actions to stable record keys (not array indices).
- Test `0`, `1`, and `50+` records, long names, `390px` stacking/scrolling, and `200%` text zoom.
