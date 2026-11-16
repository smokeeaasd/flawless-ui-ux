# Craft

Read the section that affects the current design decision. Preserve established tokens and components during focused refinement.

This is a map for cross-cutting choices. Read [Typography](typography.md) for type roles, family evaluation and resizing; [Layout](layout.md) for grouping, density and adaptation; and [Color](color.md) for semantic roles and actual contrast. These contain the worked procedures and code. For a data surface also load [Tables](tables.md) or [Charts](charts.md); for input use [Forms](forms.md). Do not treat the short overview here as a substitute for the owning decision.

## Hierarchy and layout

Give the most useful information enough scale, position, and surrounding space to lead. Distinguish supporting roles through more than color: size, weight, alignment, grouping, and placement work together. Making every label prominent weakens the hierarchy.

Use a shared alignment structure. Keep space within a group smaller than space between unrelated groups. Relate outer margins, content widths, and component spacing. A container should communicate ownership, state, or separation; repeated nested borders can obscure those relationships.

Judge empty space by its effect. It can frame an image or create rhythm; it can also indicate an unbalanced grid or missing substance. Change proportions before automatically filling or removing it. Preserve useful density in working interfaces and suitable presence in expressive ones.

## Typography

Choose a family for actual content and character, with appropriate language coverage, weights, licensing, and availability. Verify the intended font loads; distinguish its role from the fallback. Familiar fonts are valid when they fit. Replacing a family without improving its relationship to the content is not personalization.

Establish a comfortable reading scale for the audience and viewing conditions. For ordinary web body text, the inherited browser size (often 16 CSS px) is a useful starting point, not a WCAG minimum or a universal type scale. Judge the chosen family's rendered size, weight, and leading; supporting text and control labels still need to be comfortably readable.

Test real headings, long labels, paragraphs, and numbers. Adjust measure, size, weight, and leading together. Use tabular figures where they aid comparison. Check at actual viewing size; a passing contrast ratio or an empty automated report does not establish legibility. Avoid shrinking the interface to fit a miniature preview.

Resolve awkward wrapping through permitted changes to measure, typography, or wording. Forced line breaks need checks at affected widths. Preserve protected copy and outer layout during typography-only work.

## Color

Assign surface, text, emphasis, and state roles before choosing isolated values. Keep supporting text readable while maintaining hierarchy through type and grouping. A rich palette can remain coherent when its distribution has purpose.

Measure text against its actual background, including tinted surfaces and relevant states: generally 4.5:1 for normal text and 3:1 for large text, subject to the criterion's definitions and exceptions. Use [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) for applicability. A scan of CSS colors against white is only a candidate finder; it does not resolve computed backgrounds, cascade, opacity, or text roles.

Distinguish information by wording, shape, or another cue as well as color. Improve contrast with compatible foreground/background choices, size, and composition rather than making every text role equally emphatic.

## Imagery and detail

Use assets that explain the product, establish its character, or show real material. Inspect suitability, crop, resolution, and usage rights. Preserve required credits and distinguish illustrative imagery from actual customer or product evidence.

Give important imagery sufficient scale. Match crop and placement to nearby text instead of treating the image as a leftover slot. Let borders, shadows, textures, illustrations, or motion contribute where useful; develop a consistent treatment without applying every effect everywhere.

Inspect a candidate asset at its intended size and crop. Identify its subject, focal area, embedded text, contrast needs and mobile treatment. A photograph with useful empty space on the right may support nearby text; cropping it into a square can eliminate that relationship. Do not assume an attractive thumbnail survives the composition. Provide alternative text describing its useful information, or empty alternative text when it is purely decorative and the surrounding text already supplies the meaning.

Distinguish an actual product screenshot, a concept and an illustration. A conceptual drawing can explain a process but must not imply a shipped feature or real customer result. Use original diagrams or permitted material where suitable; do not fill every empty slot with unrelated stock. If no appropriate image exists, a strong information composition can be complete without one. Keep credits and licensing obligations with the asset.

For assets that affect loading and stability, use [Performance](performance.md). For animated detail use [Motion](motion.md). Neither an oversized background image nor a motion library is a default requirement for visual character.

## Responsive composition

Reconsider arrangement as available space changes. Stack, reorder, simplify presentation, or disclose secondary detail while retaining essential content and actions. Keep genuinely two-dimensional tables in a local scroll region; do not shrink the entire screen to avoid overflow.

Inspect long content, intermediate widths, navigation height, and bottom sections. Check zoom and reflow where relevant. Fixed, sticky, and overflow rules must work together; a hidden or clipped control is not a finished responsive solution.

For web typography, relative units and unitless leading help preserve user text preferences. Viewport-only font sizing can counteract enlargement; include a font-relative component when using fluid type and verify actual resizing. Let text containers grow or wrap as needed rather than clipping enlarged content.
