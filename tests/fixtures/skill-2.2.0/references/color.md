# Color roles, contrast and state

Use for palette decisions, theme work, weak contrast and competing emphasis. Preserve explicit brand colors and semantic conventions unless the task authorizes changing them. A single accent, a neutral canvas or a particular saturation level is not universally correct.

## Recover the existing meanings

Inspect a representative screen and its tokens. Identify page, surface, raised surface, primary text, supporting text, border, brand, action, selection and state colors. Some roles can share a value, but their purposes differ. A brand orange used for buttons need not also mean warning. A green income label and a green selected row must remain distinguishable by wording or structure.

Read colors in their actual neighborhoods. A supporting label that works on white may fail inside a tinted card. Opacity, gradients, images, overlays, disabled styles and theme overrides change the effective background. A source list of hex literals cannot establish these relationships.

Before changing the palette, distinguish a contrast defect from a distribution problem. If four saturated panels compete, reducing the area of one color can restore hierarchy without desaturating the entire brand. If a secondary label is faint, increase its usable contrast and use size or placement to preserve hierarchy. Making every label equally dark and bold is another way to lose structure.

## Measure relevant contrast

For web text, evaluate the applicable WCAG criterion against actual backgrounds: generally 4.5:1 for normal text and 3:1 for large text, with the criterion's definitions and exceptions. Meaningful authored control, focus and graphic information has separate non-text requirements. Decorative separators do not all need the same threshold. Use the authoritative [text contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) when applicability is uncertain.

A contrast calculator needs the actual foreground and background. When opacity is involved, composite colors first or use a rendered checker that resolves the pair. Inspect text over the lightest or darkest relevant image region, including different responsive crops. A shadow under text is not a general substitute for a stable readable background.

Do not conclude full accessibility conformance from passing these checks. Focus behavior, target spacing, text enlargement, state communication and control names require their own evidence.

## Build semantic tokens

Use role names that support changes across components. Keep primitive colors separate from the decision to use one for a role. For a small page, a compact role layer is sufficient; do not manufacture a large design-token framework when existing CSS variables solve the task.

```css
:root {
  --surface: #ffffff;
  --ink: #172c25;
  --ink-secondary: #465c52;
  --action: #245b43;
  --on-action: #ffffff;
  --focus: #195eaa;
}
.action { background: var(--action); color: var(--on-action); }
.support { color: var(--ink-secondary); }
.action:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
```

These illustrative values are not an approved palette for every product. Measure them in the actual control and surrounding surface. A focus ring must remain visible when the same control appears on another background. Preserve existing token names if that avoids unnecessary churn.

## Encode information beyond color

Use signs and labels for financial values, icons plus text for status, and explicit selected state for filters. In a chart, provide series names and another distinguishing cue when color alone would be ambiguous. A red border around an invalid field needs an associated explanation; an error summary can connect the user to the affected field.

Keep stable meanings across views. If blue indicates selection in one area and a passive badge in another, the distinction may need a different shape or wording. Avoid using warning colors for ordinary information when they would repeatedly imply urgency. Conversely, do not hide a consequential warning inside neutral metadata to keep the page calm.

## Theme as a role translation

Dark mode is not a blanket inversion. Surfaces, dividers, shadows, focus and muted text need a coherent mapping. A shadow visible on a light canvas can disappear on a dark one; a tinted raised surface may communicate layering more effectively. Adjust accents and chart series for contrast without changing their meanings.

Respect existing preference handling. A theme control should expose its current state and preserve the product's intended persistence. Test the first render, explicit switching, system preference changes where supported and the behavior of charts, menus, dialogs and embedded content. Do not introduce persistence solely to make a color pass look more complete if that expands scope.

## Worked diagnosis

A finance overview has readable totals but faint transaction categories on tinted pills. Confirm the computed foreground/background pair for those categories. If it fails, change the category text role or pill surface, not every green in the app. Verify the same role in dark mode and inside selected rows. Keep expense signs and income labels explicit. A new orange accent would not address the defect.

For a café homepage, the problem may instead be competing colors between photograph and heading. Test a different crop, the proportion of the color field, or a text placement that preserves image detail. There is no reason to impose the dashboard's palette or component language on it.

## Acceptance

Inspect normal, hover, focus, selected, disabled and error states actually supported by the implementation. Verify meaningful text and graphical distinctions at relevant sizes, and review both themes when they ship. Ask whether emphasis still matches the task after corrections. Record intentional exceptions and unmeasured image/gradient cases. Passing pairs are evidence of those pairs, not proof that the palette or interface is well designed.
