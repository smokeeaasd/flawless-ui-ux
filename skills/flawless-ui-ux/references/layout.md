# Layout decisions and responsive structure

Use when structuring space, grouping, elevation, density, or responsive behavior. Pair with [Direction](direction.md) for new compositions and [Calibration](calibration.md) for refinement.

## Spatial rhythm and grouping ratios

Use a disciplined `4px`/`8px` spacing scale (`4, 8, 12, 16, 20, 24, 32, 48, 64, 96px`) and enforce **internal-tighter-than-external** spacing so grouping works without heavy boxes:

- **Internal vs. outer gap:** padding inside a group or card (`16px–24px`) should stay `<= 0.5x–0.65x` the gap separating independent sections (`40px–96px` on public surfaces; `20px–32px` on operational screens).
- **Heading attachment:** place `1.5x–2.5x` more space above a section heading than between the heading and its own content.
- **Section pacing:** alternate vertical rhythm (`clamp(3.5rem, 7vw, 6.5rem)` between major editorial/public bands; `1rem–1.5rem` between dense operational panels).

## Containers, concentric radii, and elevation

Group with proximity and alignment first; add borders or surface shifts only when ownership, selection, or layered depth requires them.

- **Concentric border radius:** nested rounded elements share the same center: `innerRadius = max(4px, outerRadius - innerInset)`. Example: a `20px` card with `12px` padding frames an inner image or chip at `8px`, never two mismatched `12px` corners stacked together.
- **Layered elevation & hairline borders:** prefer a `1px` low-opacity border plus two soft shadow layers (a tight contact shadow + a wide ambient shadow) on light surfaces, and stepped surface lightness + subtle `rgba(255,255,255,0.12)` top rim on dark surfaces.
- **Break equal-card monotony:** avoid stacking three or four identical icon-title-paragraph cards in every section. Use asymmetric grids (`grid-template-columns: 7fr 5fr`, `1.35fr 1fr`), aligned key-value rows, full-bleed contrasting bands, or a dominant focal piece beside compact supporting items.

```css
.split-feature {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: start;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20rem;
  gap: 1.5rem;
}
.workspace > * { min-inline-size: 0; }

@media (max-width: 60rem) {
  .split-feature,
  .workspace { grid-template-columns: minmax(0, 1fr); }
}
```

## Density and information path

Trace the first three things the visitor must recognize or act on. Use a quick squint test on rendered screenshots: the primary focal anchor should remain unmistakable without reading copy, while operational tables and controls remain compact, aligned, and immediately reachable above the fold.

## Responsive adaptation, scroll, and focus

- Adapt relationships, not thumbnails: keep labels paired with values, service names paired with prices, and row actions attached to their record at `390px` and intermediate widths.
- Choose one clear scroll owner; avoid nested scroll traps. Keep genuinely two-dimensional matrices inside a labeled, keyboard-accessible horizontal scroll region per [Tables](tables.md).
- Ensure sticky headers and bottom action bars never obscure focused controls or anchor jumps (`scroll-margin-top`), and test `200%` zoom and long labels without clipping.
