# 03: Typography refinement

Starting project: a fresh copy of [dashboard](../fixtures/dashboard/), never the redesigned output. Only submit the task block below, with the explicit invocation prefix.

## Task

```text
Refine only the typography of the Benchroom dashboard. Make the page title, section headings, summary values, labels, and table text easier to distinguish and read at desktop and narrow widths.

Edit styles.css only. You may adjust system font stacks, font size, weight, line height, letter spacing, and text wrapping. Preserve the existing colors, backgrounds, borders, outer spacing, layout structure, wording, data, and interactions. Do not load fonts or add dependencies. Leave index.html and app.js unchanged. Broader usability fixes and a new visual direction are outside this request.

Use the verification tools available and briefly report what changed, what was checked, and any limits.
```

## Evaluator checks

- The diff contains only typography-related changes in `styles.css`; `index.html` and `app.js` are byte-for-byte unchanged. No new files are introduced by the agent.
- No colors, component layout, outer spacing, copy, data, or behavior were changed. Text reflow caused by permitted typography changes is acceptable.
- Title, headings, values, and labels have clearer relative roles; larger text does not clip or obscure essential controls.
- Source inspection alone is not recorded as a rendered readability or interaction check.
- Guidance loading is proportional when visible; reading all references is not necessary to pass.
