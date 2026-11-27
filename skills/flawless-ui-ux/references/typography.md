# Typography as an information system

Use for font selection, scale calibration, reading comfort, numeric alignment, and hierarchy. Preserve confirmed brand families during focused refinements. Start with [Craft](craft.md) for cross-cutting decisions and [Layout](layout.md) when wrapping defects stem from container sizing.

## Choose scale ratio and pairings from the surface

Select both modular ratio and font character from density, reading distance, and product personality:

| Surface / tone | Ratio | Display family posture | Body / UI posture | Display tracking & leading |
|---|---|---|---|---|
| **Editorial / Reading** | `1.333–1.414` | Expressive serif (`Newsreader`, `Instrument Serif`, `Fraunces`) | Clean sans or readable serif (`1.6–1.7` lh) | `-0.03em` to `-0.04em`, `1.05–1.12` lh |
| **Marketing / Brand Launch** | `1.333–1.50` | Geometric or condensed display (`Space Grotesk`, `Instrument Sans`, `Syne`) | Neutral sans (`Inter`, `Plus Jakarta Sans`, `1.55` lh) | `-0.025em` to `-0.035em`, `1.04–1.12` lh |
| **Balanced Web App / SaaS** | `1.25` | Neo-grotesque or humanist (`Plus Jakarta Sans`, `DM Sans`, `Geist`) | Same family or clean sans (`1.5` lh) | `-0.02em`, `1.12–1.22` lh |
| **Dense Ops / Fintech / Dev** | `1.125–1.20` | Crisp grotesque (`Inter`, `IBM Plex Sans`, `Geist`) | Same sans (`1.45` lh) + Mono (`IBM Plex Mono`, `JetBrains Mono`) | `-0.015em`, `1.15–1.25` lh |
| **Warm Craft / Hospitality** | `1.25–1.333` | Warm serif or humanist (`Lora`, `Fraunces`, `Bricolage Grotesque`) | Humanist sans (`DM Sans`, `1.55–1.62` lh) | `-0.02em`, `1.10–1.18` lh |

System stacks remain valid when delivery speed, native platform parity, or tight operational density calls for them—judge the rendered result, not novelty alone.

## Optical tuning rules

- **Role discipline:** establish 5–6 clear roles (`display`, `title`, `section`, `body`, `label`, `micro/mono`). Adjacent sizes need clear separation (`>= 1.2x` or distinct weight + uppercase tracking); six uncoordinated sizes create visual noise.
- **Weight pairing:** pair bold/semibold display (`600–700`, or `400–500` for high-contrast serifs) with regular `400` body and `500–600` interactive labels. Avoid synthetic bold by loading only needed weights.
- **Measure & wrapping:** constrain prose to `45–70ch` (`max-inline-size: 62ch`). Apply `text-wrap: balance` to headings and `text-wrap: pretty` to body paragraphs.
- **Micro-labels & eyebrows:** uppercase `0.75rem` (`12px`) labels with `letter-spacing: 0.06em–0.08em`, weight `600`, and muted ink give crisp structural orientation above headlines or metric blocks.
- **Fluid vs. stable scales:** use `clamp()` combining `rem` and `vw` for public display headings so scaling survives zoom; keep operational tool labels on a crisp, predictable `rem` scale.

```css
:root {
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --type-micro: 0.75rem;      /* 12px - eyebrows, badges, kbd */
  --type-label: 0.875rem;     /* 14px - UI controls, table cells */
  --type-body: 1rem;          /* 16px - primary reading */
  --type-section: 1.25rem;    /* 20px - section headings */
  --type-title: clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem);
  --type-display: clamp(2.25rem, 1.4rem + 3.6vw, 4rem);
}

.display {
  font-family: var(--font-display);
  font-size: var(--type-display);
  line-height: 1.06;
  letter-spacing: -0.03em;
  text-wrap: balance;
  font-optical-sizing: auto;
}

.prose { max-inline-size: 62ch; font-size: var(--type-body); line-height: 1.62; text-wrap: pretty; }
.eyebrow { font-size: var(--type-micro); font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; }
.amount { font-family: var(--font-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }
```

## Numeric comparison and legibility

- Apply `font-variant-numeric: tabular-nums` wherever amounts, counts, percentages, or timestamps align vertically. Right-align same-unit quantities in comparison columns; keep signs and units attached (`−$45`, not red `$45` alone).
- Verify ambiguous glyphs (`I`, `l`, `1`, `0`, `O`) and diacritics in the chosen font for the product's actual languages.
- Diagnose weak hierarchy by testing real content: if an oversized greeting buries a tiny `11px` transaction table, rebalance scale so primary task content leads.

## Verify delivery and extremes

Confirm the intended font actually loaded in network/computed styles rather than silently falling back. Inspect a long heading, translated labels, largest realistic numbers, `200%` text zoom, and narrow `390px` viewports without `overflow: hidden` clipping. Coordinate numeric semantics with [Charts](charts.md) and [Tables](tables.md), and foreground/background contrast with [Color](color.md).
