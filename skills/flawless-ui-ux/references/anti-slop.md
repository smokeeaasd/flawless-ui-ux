# Contextual prevention and craft upgrades

Use the final pass before delivering creation or redesign, and apply affected checks during refinement. Treat recurring generic patterns as **upgrade opportunities** toward higher visual craft—not a blind blacklist that strips legitimate layouts, cards, or expressive styles.

## Final pass

Inspect the complete rendered interface—opening, lower sections, narrow mobile view, and interactive states—using source for copy/icons and rendered screenshots + telemetry for visual finish:

- **Composition & symmetry:** check whether uniform 3-card grids or identical section silhouettes hide distinct content jobs. Break monotony with asymmetric splits, aligned lists, or contrasting focal bands where content differs.
- **Typography & scale:** confirm intended display/body fonts actually loaded, display-to-body ratio creates unmistakable hierarchy, and prose measure stays readable (`45–70ch`).
- **Surfaces, borders & palette:** replace disconnected dead grays, heavy single-layer drop shadows, and competing bright accents with hue-tinted OKLCH surfaces, `1px` low-opacity hairline borders, and disciplined accent focal points.
- **Arrows & icons:** keep arrows and icons that clarify direction, disclosure, or status; strip redundant decorative arrows beside already clear button labels or repeated card headings.
- **Copy & product truth:** read headings, descriptions, notes, and footer in sequence. Replace repetitive promotional slogans ("work smarter", "built for your everyday") with specific confirmed facts or remove redundant lines. Never invent testimonials, metrics, or backend claims.
- **Visual self-critique:** answer the 6 visual self-critique questions on actual screenshots (below and in `Review`).

Preserve deliberate brand voice, protected text, useful density, and visual richness.

## Generic defaults vs. crafted upgrades

| Common LLM default | Why it falls flat | Crafted visual replacement |
|---|---|---|
| Centered hero + 3 identical icon-title-body cards | Same silhouette for unrelated content; looks templated | Lead with real product output, asymmetric split (`7fr 5fr`), or distinct section shapes per content job |
| Timid `1.5x` heading over `16px` body (`Inter` everywhere) | Weak focal anchor; flat reading rhythm | Intentional pairing + scale ratio (`>= 2.2x` display/body on public pages) with `-0.03em` display tracking |
| Raw `#f5f5f5` / `#e5e5e5` grays + thick `1px #ccc` boxes | Sterile, disconnected layers | Hue-tinted OKLCH neutrals, `2–4%` surface lightness steps, `1px` low-opacity hairlines, two-layer shadows |
| 4 giant KPI cards pushing operational tables down | Hides actual work behind decorative summaries | Compact aligned summary strip above immediate scannable rows with `tabular-nums` |
| Repetitive payoff slogans across every band | Promotional noise with zero new product facts | Distinct factual answers per band (how it works, constraints, pricing/terms, real next step) |
| Fake "Saved!" / simulated spinners on local demos | Violates product truth | Honest local validation/state feedback noting the demo boundary |

## Six-question visual self-critique

Inspect your captured `1440px` and `390px` screenshots at 1:1 reading scale before finishing:

1. **First-glance anchor:** Does the eye land immediately on the single most important element or message?
2. **1 → 2 → 3 path:** Is the reading and action order unmistakable without hunting?
3. **Product specificity:** Would this visual composition, type pairing, and signature element still look wrong if pasted onto an unrelated competitor?
4. **Surface & border finish:** Do surfaces, hairlines, and elevation feel crisp and hue-unified rather than boxed in noisy gray strokes?
5. **Scale & alignment:** Are headings, micro-labels, numbers (`tabular-nums`), and controls aligned with clear proportional contrast?
6. **Breathing room vs. density:** Does whitespace frame the focal work intentionally while keeping operational actions immediately accessible?
