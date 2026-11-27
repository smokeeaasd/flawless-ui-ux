# Direction

Use for new interfaces, a new visual system, or an authorized replacement. Start from the task and available material, pair with [Aesthetic directions](aesthetic-directions.md), and commit to concrete visual decisions before writing layout code.

## Explore composition and aesthetic register

For new interfaces and broad redesigns, sketch at least **three genuinely different approaches** internally before coding. Vary **both information hierarchy and aesthetic register**—not just button colors on the same hero-plus-3-cards scaffold:

- What leads the first viewport (product output, price/offer ledger, typographic thesis, interactive proof, or operational queue)?
- Which aesthetic register fits best (Editorial/Print, Technical/Dense, Warm/Tactile, Atmospheric/Dark, or Bold/Graphic)?
- What is the **one content-earned signature visual element** that makes this screen unmistakable to its domain?
- How do typography, imagery, controls, and negative space create rhythm down the page?
- How does the mobile layout keep the primary task and signature character intact?

Pick the strongest approach. Keep exploration internal unless concepts are requested. For narrow refinements or strict existing design systems, stay within authorized scope.

## Compose around the product

Let the product's primary decision dictate the opening structure:

- A cash-planning workspace may lead with projected availability and upcoming obligations rather than generic KPI cards.
- A release tool may lead with deployment status and an interactive handoff timeline.
- A local workshop or café may lead with scannable offerings and prices paired with arrival hours.

Give visual presence to what matters most. An expressive photograph, live data ledger, typographic anchor, or interactive preview can carry the opening while supporting bands take distinct, appropriate shapes (comparison table, timeline, compact checklist, dark contrast visit band). Coherence comes from shared type roles, hue-tinted surfaces, and spacing rhythm—not repeating identical card boxes in every section.

## Establish the visual system contract

Before generating full screens, write a compact **working visual contract** in notes (never as visitor-facing slogan copy):

1. **Aesthetic register & mood:** e.g., *Technical/Precision Dense* or *Warm/Tactile Organic*.
2. **Signature visual element:** the single distinctive focal choice rooted in real content.
3. **Typography pairing & scale:** display family, body/UI family, mono family (if needed), modular ratio (`1.15–1.414`), and key weights/tracking.
4. **Palette & surface hierarchy:** canvas, primary surface, raised surface, hairline border, primary/muted ink, focal accent, and light/dark mapping.
5. **Spacing, radius & elevation rhythm:** base unit (`4px`/`8px`), internal vs. outer gap ratio, concentric radii, shadow/border style.
6. **Mobile adaptation rule:** what stacks, reorders, or compacts at `390px` while keeping identity and action clear.

Build one representative vertical slice (opening, real content, primary action, secondary band, narrow state) and verify that real copy, long labels, numerals, and font weights hold up before expanding.

## Use real material and carry finish through

Use real facts, supplied assets, and permitted media; identify illustrative data clearly and never fabricate testimonials, metrics, or nonexistent backend workflows. Consult [Service studies](service-studies.md) or [Product studies](product-studies.md) when a structural pattern needs clarification.

Carry the exact same craft tokens—type roles, hue-tinted neutrals, hairline dividers, and calibrated spacing—into lower bands, footers, empty states, validation messages, and detail views. Use [Typography](typography.md), [Layout](layout.md), and [Color](color.md) for concrete scales and CSS implementations.
