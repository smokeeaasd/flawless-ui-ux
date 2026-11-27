# Color roles, contrast and state

Use for palette design, hue-tinted neutrals, theme work, weak contrast, and competing emphasis. Preserve explicit brand colors unless the task authorizes changing them.

## Build a hue-tinted palette with clear distribution

Raw neutral grays (`#f5f5f5`, `#e5e5e5`, `#737373`, `#000000`) look disconnected and generic. Derive your surface ladder and ink scale in **OKLCH** by carrying a subtle `0.005–0.018` chroma from the brand or canvas hue (cool slate `240–255` for technical/ops, warm stone `65–85` for editorial/tactile):

- **60% Canvas & calm negative space:** page background and generous open margins.
- **30% Structural surfaces, borders & text:** stepped card surfaces (`2–4%` lightness separation), `1px` low-opacity hairline borders, primary and muted ink.
- **10% Focal accent & semantic cues:** primary CTA, active navigation, key data highlights, and honest status indicators.

If four saturated panels compete on one screen, reduce accent surface area rather than desaturating the brand. Never use warning/error hues for decorative badges.

## Light and dark theme token recipe

Dark mode is a luminance and edge-lighting translation—never a blanket inversion or pure `#000000` void. Replace light-mode shadows with stepped dark surfaces (`+3–5%` lightness per elevation step) and subtle translucent top/edge hairline borders:

```css
:root {
  --hue: 245;
  --canvas: oklch(0.978 0.006 var(--hue));
  --surface: oklch(0.996 0.002 var(--hue));
  --surface-raised: oklch(1 0 0);
  --border: oklch(0.22 0.02 var(--hue) / 0.10);
  --ink: oklch(0.19 0.018 var(--hue));
  --ink-muted: oklch(0.45 0.016 var(--hue));
  --accent: oklch(0.50 0.18 258);
  --on-accent: oklch(0.99 0.005 258);
  --focus: oklch(0.52 0.20 250);
}

[data-theme="dark"] {
  --canvas: oklch(0.145 0.016 var(--hue));
  --surface: oklch(0.185 0.016 var(--hue));
  --surface-raised: oklch(0.225 0.016 var(--hue));
  --border: oklch(0.96 0.01 var(--hue) / 0.10);
  --border-top: oklch(0.98 0.01 var(--hue) / 0.16);
  --ink: oklch(0.93 0.008 var(--hue));
  --ink-muted: oklch(0.71 0.014 var(--hue));
  --accent: oklch(0.66 0.17 258);
  --on-accent: oklch(0.14 0.02 258);
  --focus: oklch(0.74 0.16 250);
}
```

## Measure relevant contrast and state semantics

- Measure text against **computed** backgrounds (including tinted cards, overlays, disabled styles, and responsive image crops): generally `4.5:1` for normal text and `3:1` for large text per [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), and `3:1` for meaningful UI controls and focus rings per [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- Keep focus rings unmistakably visible on both light and dark surfaces (`outline: 2px solid var(--focus); outline-offset: 2px`).
- Encode meaning beyond color alone: use `−` signs and clear labels on financial values, icons plus text for status, and distinct shapes or fills for selected filters.
- Inspect hover, focus, active, selected, disabled, and error states across both themes if supported before signing off.
