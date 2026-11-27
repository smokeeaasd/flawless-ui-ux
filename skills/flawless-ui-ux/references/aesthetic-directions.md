# Aesthetic directions and visual finish

Use when creating a new interface or executing a broad redesign. Pair with [Direction](direction.md) for content architecture, [Typography](typography.md) for scale and pairing, [Color](color.md) for hue-tinted palettes, and [Layout](layout.md) for rhythm and elevation. Preserve established brand systems during focused refinements.

## Default posture and the signature element rule

For new surfaces and broad redesigns, start from deliberate visual character. Reduce expressiveness only when the product, brand identity, or task density explicitly calls for quietness. Safety-by-omission produces anonymous gray cards and timid typography.

Every created or broadly redesigned surface needs **one content-earned signature visual element**—never a template gimmick or fabricated claim, always rooted in the actual product:

- **Editorial typographic anchor:** an oversized display statement with tight tracking paired against crisp small-caps or tracked uppercase metadata and hairline rules.
- **Asymmetric focal composition:** a dominant lead visual, live data centerpiece, or split proportion (`7fr 5fr`) that breaks monotonous equal-column symmetry.
- **Tactile surface and border grammar:** hue-tinted multi-step elevation, concentric radii, or refined hairline dividers that replace generic boxed borders.
- **Intentional chromatic band:** one full-bleed dark or high-chroma focal region that anchors the primary offer, comparison, or action while surrounding reading zones stay calm.

If removing your signature element leaves a generic scaffold indistinguishable from any unrelated app, strengthen it before shipping.

## Five named aesthetic registers

Choose a register that fits the audience, reading distance, and task—or blend two deliberately—rather than defaulting to unstyled gray utility.

### 1. Editorial / Print-led

- **Best fit:** publications, cultural institutions, studios, long-form guides, independent brands, curated catalogs.
- **Typography posture:** expressive high-contrast display serif (e.g., Instrument Serif, Newsreader, Playfair Display, Fraunces) paired with a clean humanist/grotesque sans for UI and body. Display scale ratio `1.333–1.414`; tight display tracking (`-0.03em` to `-0.04em`), `line-height: 1.05–1.15`.
- **Surface and border grammar:** warm paper or off-white canvas (`oklch(0.985 0.006 85)`), deep ink (`oklch(0.18 0.015 60)`), `1px` hairline rules instead of rounded boxes, sharp or minimal radii (`0–4px`).
- **Spacing and rhythm:** asymmetric column grids, generous outer margins (`clamp(2rem, 6vw, 5rem)`), open vertical pacing between distinct narrative bands.
- **Signature move:** numbered index rules, pull-quote or lead-figure bleed, sticky marginalia/contents rail.
- **Failure mode:** stretching prose beyond `65ch`, low contrast on warm paper, or making operational controls look sluggish with oversized margins.

### 2. Technical / Precision Dense

- **Best fit:** developer tools, fintech ledgers, observability, release managers, operational queues.
- **Typography posture:** crisp neo-grotesque (e.g., Inter, Plus Jakarta Sans, Geist, IBM Plex Sans) paired with monospace (`JetBrains Mono`, `IBM Plex Mono`) for IDs, code, timestamps, and deltas. Scale ratio `1.125–1.20`; `font-variant-numeric: tabular-nums` on all comparable figures; tracked uppercase micro-labels (`0.75rem`, `+0.06em`).
- **Surface and border grammar:** cool slate-tinted canvas (`oklch(0.975 0.005 245)` light / `oklch(0.15 0.014 250)` dark), stepped surface layers (`2–4%` lightness delta), crisp `1px` low-opacity borders (`color-mix(in oklch, var(--ink) 10%, transparent)`), tight radii (`6px–8px`), near-zero shadows.
- **Spacing and rhythm:** strict `4px/8px` grid, compact internal padding (`10px–16px`), clear alignment across table columns and status badges.
- **Signature move:** razor-sharp aligned data ledgers, live key/value inspection strips, keyboard shortcut hints (`kbd`) styled with subtle top highlights.
- **Failure mode:** gray-on-gray washed contrast, floating decorative KPI cards above buried data, or cramming dense text below readable sizes.

### 3. Warm / Tactile Organic

- **Best fit:** hospitality, local craft/services, wellness, consumer planning, personal finance, food & retail.
- **Typography posture:** warm humanist sans or friendly contemporary serif (e.g., DM Sans, Bricolage Grotesque, Lora, Source Serif 4). Scale ratio `1.25–1.333`; comfortable `line-height: 1.55–1.65` for body copy.
- **Surface and border grammar:** warm stone, oat, or linen canvas (`oklch(0.97 0.012 75)`), soft elevated ivory cards (`oklch(0.995 0.005 75)`), subtle warm border (`color-mix`), generous concentric radii (`16px–24px` outer, `8px–12px` inner), soft layered ambient shadows.
- **Spacing and rhythm:** relaxed breathing room, distinct content-driven section shapes (menu rows beside visit block, rather than identical feature cards).
- **Signature move:** full-bleed warm contrast band for key visit/action details, natural uncropped photography paired with aligned price/detail rows.
- **Failure mode:** muddy beige text contrast, excessive pastel saturation, or inflated padding pushing key actions below the fold.

### 4. Atmospheric / Dark Crafted

- **Best fit:** media tools, creative suites, audio/video workflows, developer platforms, high-focus night workspaces.
- **Typography posture:** sharp geometric or neo-grotesque sans (e.g., Space Grotesk, Geist, Syne for display accents + clean sans body). Scale ratio `1.25–1.333`; slightly opened body tracking (`+0.005em`) and lighter body ink (`oklch(0.92 0.01 250)`) to avoid halation on dark surfaces.
- **Surface and border grammar:** deep hue-tinted charcoal (`oklch(0.14 0.018 255)`—never pure `#000000`), elevated surfaces at `oklch(0.185 0.018 255)` and `oklch(0.23 0.018 255)`, crisp translucent white hairline borders (`rgba(255, 255, 255, 0.09)`), and a slightly brighter top highlight edge (`rgba(255, 255, 255, 0.16)`) instead of drop shadows.
- **Spacing and rhythm:** generous dark negative space around one luminous focal canvas, chart, or preview; restrained accent saturation confined to primary actions and active states.
- **Signature move:** subtle radial ambient wash behind the main product artifact, glass-like hairline top rim on elevated panels, crisp `tabular-nums` telemetry.
- **Failure mode:** glowing neon gradients on every card, illegible `rgba(255,255,255,0.35)` muted labels, or flat `#000` voids where cards have no edge separation.

### 5. Bold / Expressive Graphic

- **Best fit:** events, product launches, portfolios, interactive campaigns, design-forward SaaS landing pages.
- **Typography posture:** high-impact display sans or condensed grotesque (e.g., Instrument Sans, Outfit, Space Grotesk, Anton/Oswald selectively for short headers) paired with neutral readable body sans. Scale ratio `1.333–1.50`; strong display-to-body contrast (`>= 2.5x`).
- **Surface and border grammar:** stark figure-ground contrast, crisp `1.5px–2px` structural borders or bold asymmetric color blocks, disciplined 2-tone + 1 high-chroma accent palette.
- **Spacing and rhythm:** asymmetric split proportions (`7fr 5fr` or `1.4fr 1fr`), intentional scale jumps between hero display, specification grid, and footer.
- **Signature move:** bold typographic hero paired with a contrasting dark or chromatic interactive proof band, oversized numeric indices.
- **Failure mode:** competing bright accents in every section, low-contrast colored text on colored backgrounds, or sacrificing mobile scan order for desktop geometry.

## Before and after finish patterns

### 1. Hue-tinted neutrals over dead grays

Dead `#f5f5f5`, `#e5e5e5`, `#666666`, and `#000000` look sterile because real surfaces share ambient light. Shift neutrals subtly (`0.005–0.018` OKLCH chroma) toward the brand or warm/cool canvas hue:

```css
/* Generic: flat neutral grays with disconnected surface hierarchy */
.generic {
  --bg: #f5f5f5;
  --surface: #ffffff;
  --border: #d4d4d4;
  --text-muted: #737373;
}

/* Crafted: subtle cool-slate or warm-stone tint unifies canvas, borders, and ink */
.crafted {
  --bg: oklch(0.975 0.006 245);
  --surface: oklch(0.996 0.002 245);
  --surface-raised: oklch(1 0 0);
  --ink: oklch(0.19 0.018 245);
  --ink-muted: oklch(0.45 0.016 245);
  --border: oklch(0.25 0.02 245 / 0.11);
}
```

### 2. Hairline borders and multi-layer elevation over heavy shadows

Single-layer muddy box shadows (`0 4px 12px rgba(0,0,0,0.15)`) flatten depth. Combine a `1px` low-opacity hairline border with two soft ambient/contact shadow layers:

```css
.panel-generic {
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.panel-crafted {
  background: var(--surface);
  border: 1px solid oklch(0.22 0.02 245 / 0.09);
  border-radius: 16px;
  padding: 20px;
  box-shadow:
    0 1px 2px oklch(0.18 0.02 245 / 0.05),
    0 10px 28px -8px oklch(0.18 0.02 245 / 0.08);
}

/* Nested element obeys concentric radius: outer (16px) - padding (20px -> clamp or inner inset 8px) */
.panel-crafted .inner-chip {
  border-radius: 8px;
}
```

### 3. Optical typography tuning

```css
.display-title {
  font-size: clamp(2.125rem, 4.2vw + 1rem, 3.75rem);
  line-height: 1.06;
  letter-spacing: -0.03em;
  text-wrap: balance;
  font-optical-sizing: auto;
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.prose {
  max-inline-size: 62ch;
  line-height: 1.62;
  text-wrap: pretty;
}

.metric-value {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.015em;
}
```

### 4. Tactile interactive states

Avoid bouncy scale jumps or neon drop glows. Shift surface luminance, border crispness, or subtle `1px` lift on pointer hover while keeping keyboard focus rings unmistakable:

```css
.btn-secondary {
  background: var(--surface);
  border: 1px solid oklch(0.22 0.02 245 / 0.14);
  transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease;
}
.btn-secondary:hover {
  background: oklch(0.96 0.008 245);
  border-color: oklch(0.22 0.02 245 / 0.26);
}
.btn-secondary:active {
  transform: translateY(1px);
}
.btn-secondary:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
```
