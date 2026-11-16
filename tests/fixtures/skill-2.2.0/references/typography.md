# Typography as an information system

Use for font selection, reading comfort, numeric comparison and weak hierarchy. Preserve confirmed families during a focused refinement. A type replacement is not a harmless cleanup when the family carries the identity. Start with [Craft](craft.md) for scope and [Layout](layout.md) when the apparent text problem is actually a narrow container.

## Diagnose roles before sizes

Inventory a representative heading, paragraph, label, metadata item, amount and control. Record family, rendered size, weight, line height, measure and color. Distinguish loaded fonts from fallback: inspect the actual font request and computed styles, not only a CSS declaration. A missing weight can produce synthetic bold and change wrapping even when the family name looks right.

Ask what a reader should recognize without reading every word. The screen title locates the work; a section heading groups it; a label identifies a field; an amount is often a comparison target. Two roles with identical treatment can be ambiguous. Six roles with six unrelated treatments create another problem. Find the few distinctions that matter, then name tokens by role rather than by the value currently assigned.

On an operational dashboard, start with the data a user came to inspect. An oversized welcome heading above unreadably small rows reverses the priority. On a public page, a large heading may legitimately communicate the offer, but its scale must leave the explanation and action accessible. A label is not automatically secondary just because its string is short: a medication instruction or a destructive-action confirmation can be essential information.

## Establish a small working system

Use a compact initial set: display if needed, title, section, body, label, metadata and numeric value. Some roles may share a size and differ through weight or space. Do not introduce a role for every individual component. Existing product tokens are the starting point, including intentionally dense table roles.

For ordinary web prose, 1rem at the browser's usual default is a useful initial body size. It is not a universal accessibility minimum. A font with a small x-height may need a larger value; a dense utility label may legitimately be smaller when its importance, contrast, reading distance and enlargement behavior support it. Inspect real text at actual scale. A screenshot reduced to fit a chat is not a reliable reading-size test.

Tune measure and leading together. A narrow mobile paragraph needs different rhythm from a wide reading column. Prose around 45–75 characters per line is a useful investigation range, not a constraint for tables, code or poetry. If a line is exhausting to track, constrain the reading column before making all the text larger. If a heading breaks into five short fragments, inspect its container and content before shrinking the entire scale.

```css
:root {
  --type-body: 1rem;
  --type-label: .875rem;
  --type-section: 1.25rem;
  --type-title: 2rem;
}
.prose { max-inline-size: 65ch; line-height: 1.65; }
.amount { font-variant-numeric: tabular-nums; white-space: nowrap; }
.field-label { font-size: var(--type-label); font-weight: 600; }
```

These values illustrate role relationships, not a package-wide preset. A tiny settings dialog does not need the same title scale as a campaign page. Reuse project tokens if they already express the roles.

## Make numbers comparable

Use tabular numerals where the face supports them and repeated values benefit. Right-align same-unit quantities in a comparison column, keep the unit and sign attached, and distinguish missing from zero. Align dates and textual identifiers by their reading task rather than applying numeric alignment indiscriminately. A long account identifier may need grouping or a readable detail view, not a smaller global font.

A financial row showing `$45` in red loses meaning when color is unavailable. Prefer `−$45` or a clear expense label. A label such as “Change” needs a period and baseline if interpretation depends on them. Typography cannot repair an undefined measure; use [Charts](charts.md) and [Tables](tables.md) for that semantic decision.

## Work through a weak hierarchy

Suppose an overview has a 42px greeting, 32px totals, 11px transaction labels and six card subtitles. First identify the primary task: finding and comparing transactions. Preserve the greeting's wording if copy is protected. Reduce its visual priority, raise row text to a comfortable size, and remove only authorized redundant presentation. Use grouping and column alignment to support comparison. Then verify that summary totals remain discoverable; do not flatten all roles to the same size.

In another task, a guesthouse page has a small property name above an anonymous slogan. A creation or copy-enabled redesign may put the name and location into the primary heading and make booking information readable. A typography-only task may instead improve scale and wrapping without rewriting the slogan. The same visual symptom has different permitted interventions.

## Font choice and delivery

Select a family for its letterforms, language coverage, weights, numerals, licensing and availability. Test ambiguous characters in the actual context: uppercase I, lowercase l, zero and O matter in codes. Check punctuation, accents and the languages the product supports. Do not assume that an attractive Latin display face covers an international product.

Use only the weights needed. Provide a sensible fallback and avoid blocking the first useful text on a font download. Metric-compatible fallbacks reduce reflow, but verify the actual combination. Use `font-display` deliberately and preserve image/container space around text. A second family should have a distinct role; selecting two fashionable families does not establish hierarchy.

For fluid display type, combine font-relative and viewport terms rather than using viewport units alone. Verify enlargement and intermediate widths. Product labels and dense tools often benefit from a stable rem scale; there is no requirement for every heading to grow with the window.

## Verify and stop

Test a long heading, a long translated label, the largest realistic amount, missing font delivery and text enlarged to 200% where applicable. Check clipping, overlap and action reachability; do not demand pixel-identical wrapping across languages. Let controls grow or wrap when appropriate. Never use `overflow:hidden` as the general solution to enlarged text.

Inspect top, middle and lower regions. Verify that repeated roles remain consistent in dialogs, empty results and detail views. Measure actual text/background contrast using [Color](color.md). If readability improved only on the screenshot currently open, the pass is unfinished. Report what was rendered and what was inferred from source. Font novelty, a tidy token list and a passing contrast check are separate from a comfortable reading experience.
