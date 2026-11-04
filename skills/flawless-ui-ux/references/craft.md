# Craft

Read the sections relevant to the visual change. Preserve existing tokens and component conventions unless replacing them is part of the intervention.

For concrete warning signals and legitimate counterexamples, use the relevant [prevention sections](anti-slop.md), especially [visual language](anti-slop.md#visual-language-and-system-fit) and [typography](anti-slop.md#typography-and-emphasis). Evaluate their consequences in the actual composition rather than banning a font, effect, or layout by name.

## Hierarchy

Decide what should be noticed first, understood next, and available on inspection. Use differences in scale, weight, placement, contrast, and grouping to establish that order. Give important content room to lead rather than making every element equally emphatic.

If the page reduces to many similar visual masses, choose the real priority and reduce competing emphasis. If a large title explains little, strengthen its wording or support it with a concrete statement. Semantic heading levels describe content structure; choose visual styles independently when necessary.

## Typography

Choose fonts for the reading task, product character, language coverage, and actual availability. Reuse an established type system during refinement. A familiar typeface can be right; changing it solely to look unusual can weaken recognition and introduce loading costs.

Build hierarchy with a small set of meaningful roles. Adjust measure, size, weight, and leading together. Body text should remain comfortable at the intended viewing distance; do not make important information faint or tiny to accommodate oversized display type.

Inspect real line breaks at narrow and wide sizes. Awkward last lines can often be improved by editing text, changing measure, or balancing a heading. Avoid forced line breaks that solve one viewport and damage another. Confirm that the intended font and weight actually load before judging spacing.

Respect the change boundary when choosing that correction. If wording and outer layout are fixed, use permitted typography adjustments and check the resulting fit. A title, section heading, field label, and numeric summary need distinguishable roles; making every role larger does not necessarily improve their hierarchy.

For numeric interfaces, align comparable values and consider tabular numerals. Preserve units and precision that affect decisions. For text-heavy surfaces, give paragraphs a bounded measure and clearly distinguish headings, body, and notes.

## Layout and spacing

Choose an alignment structure and reuse it. Make the space within a group smaller than the space separating unrelated groups. Treat outer margins, reading widths, and component spacing as related decisions rather than a sequence of local fixes.

Use containers when they communicate ownership, state, manipulation, or separation. A panel is useful when its boundary explains something. Nested containers that only repeat the same boundary usually consume room without adding meaning.

Use the actual workload to set emphasis. In a repair queue, the record identity, status, and next action may deserve more attention than whole-queue summaries. Check whether a global token or selector change affects other components before using it to correct one local spacing problem.

Inspect empty regions for intent. Whitespace can create focus and pacing; it can also expose missing content or a column that failed to use available width. Make the visual weight and reading order deliberate rather than filling every gap or removing every pause.

## Color

Assign roles before choosing individual values: backgrounds, content ink, secondary information, actions, boundaries, and status. Use the existing palette when it is a constraint. Give an accent a clear purpose so it remains useful for navigation or action.

Color must not be the sole carrier of state. Pair status with wording, shape, or another discernible cue. Assess contrast on the rendered combination, including overlays, images, and interaction states. For WCAG AA text contrast, the usual minimum is 4.5:1, or 3:1 for large text as defined by the criterion; meeting it alone does not establish accessibility compliance. [Contrast reference](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

A gradient, saturated palette, or subdued theme can serve the direction. Evaluate whether it helps meaning, character, and legibility. During refinement, improve the role and contrast of an intentional brand treatment before proposing its replacement.

## Imagery

Use pictures that demonstrate the product, explain a process, establish place, or contribute specific character. Inspect resolution, aspect ratio, crop, and focal point at the sizes actually used. A consistent visual treatment helps different images belong together.

Avoid stretching an image or placing text over a crop that becomes unreadable on a phone. Preserve meaningful details and source credits. Keep important information as accessible text rather than embedding it only in an image. The available material may justify photography, illustration, real UI, or typography alone; there is no universal image quota.

## Responsive composition

Reconsider hierarchy, ordering, image crops, and navigation at smaller widths instead of simply shrinking the desktop layout. Choose breakpoints where the actual content stops working. Test representative desktop and mobile sizes plus any intermediate width affected by the change.

Use flexible tracks and sensible minimums; check long labels, translated text where relevant, enlarged text, and empty or dense content. Do not hide meaningful overflow to make a screenshot look clean. Keep essential controls reachable when sticky regions, mobile browser chrome, or the keyboard reduce the visible area.

Text should reflow without losing information or functionality. A genuinely two-dimensional table, map, or canvas may need its own scrolling region; surrounding content still needs a usable layout. [Reflow reference](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

Use [Interaction](interaction.md) when responsive changes affect control behavior and [Review](review.md) to verify the result.
