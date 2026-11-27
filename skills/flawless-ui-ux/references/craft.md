# Craft

Read the owning reference before making a craft decision. Preserve established tokens and components during focused refinement.

- **[Aesthetic directions](aesthetic-directions.md):** named visual registers, the signature-element rule, and before/after CSS finish patterns.
- **[Typography](typography.md):** modular scale ratios, curated font pairings by product tone, optical tracking/leading, and tabular numerals.
- **[Layout](layout.md):** `4px`/`8px` spacing rhythms, grouping ratios, concentric radii, layered elevation, and asymmetric composition.
- **[Color](color.md):** OKLCH hue-tinted neutrals, 60/30/10 distribution, light/dark surface translation, and WCAG contrast measurement.
- **[Motion](motion.md):** purposeful state transitions, micro-interaction timing, and `prefers-reduced-motion` alternatives.
- **[Performance](performance.md):** responsive images, font loading, layout stability, and runtime budgets.
- **[Tables](tables.md)**, **[Charts](charts.md)**, and **[Forms](forms.md):** domain-specific structural and visual craft.

## Core visual craft principles

- **Hierarchy through proportion, not uniform boldness:** give the primary subject clear scale, position, and breathing room. Distinguish secondary metadata through quieter ink, size, and placement—never by making every label bold or boxed.
- **Proximity before borders:** keep internal spacing tighter (`<= 0.5x–0.65x`) than spacing between distinct groups. Use `1px` low-opacity hairline dividers or subtle surface shifts before wrapping everything in heavy stroked cards.
- **Optical finish:** tune display tracking (`-0.025em` to `-0.04em`), `text-wrap: balance` on headings, `tabular-nums` on figures, hue-tinted neutrals instead of raw `#000`/`#f5f5f5`, and concentric nested radii.
- **Earned imagery and detail:** give key visuals proper scale and deliberate crops; inspect text/image contrast against actual regions and mobile crops. Refer to [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (`4.5:1` normal, `3:1` large) on real computed backgrounds.
- **Responsive relationship preservation:** test `390px`, intermediate widths, and `200%` text zoom. Let containers grow naturally, keep paired labels/values together, and never use `overflow: hidden` as a crutch for broken wrapping.
