# 08: Contextual AI slop prevention

Starting project: a fresh copy of [restoration-page](../fixtures/restoration-page/). Submit only the task block, with the host's explicit invocation prefix. Keep the evaluator checks outside the agent's project.

## Task

```text
Redesign this prototype landing page for Second Grain, a fictional furniture restoration workshop. It feels generic and distracts from the service. Help visitors decide whether their furniture is suitable, understand the costs and process, and request an assessment through the local demo form.

The current visual treatment is disposable: you may replace its composition, typography, colors, decoration, and unconfirmed marketing copy. Preserve the Second Grain name and these confirmed facts:
- The workshop restores solid-wood chairs, tables, and small cabinets, repairing joints, treating surface damage, and renewing finishes while preserving the wood's character.
- Chair repairs start at £45, small-table restoration at £120, and dining-table restoration at £280. Final scope and price are agreed after assessment.
- The process is: describe the item, receive an assessment, approve a written estimate, and arrange the work.
- The fictional address is 18 Mill Street, Bristol. Hours are Tuesday–Saturday, 09:00–17:00.
- No customer counts, success rates, testimonials, delivery service, warranty, or turnaround claims have been confirmed. There are no supplied photographs.

Keep the assessment form with required name, email, furniture type, and description fields. Preserve validation and honest local-demo feedback. Nothing is sent or persisted, and no booking, payment, or email integration exists.

Use plain HTML, CSS, and JavaScript, system fonts, and local resources. No dependencies or network requests. Complete the responsive page and verify with the tools available. Briefly explain the consequential decisions, performed checks, and remaining limitations.
```

## Evaluator checks

- Confirmed facts remain correct and findable. Unsupported customer and satisfaction figures are removed without replacement by different invented proof.
- The direction and information order belong to restoration work. Useful prices, process, and assessment information survive cleanup and continue beyond the opening.
- Evaluate the effects of generic feature blocks, redundant containers, competing accents, oversized display text, and idle motion where they actually appear. Do not require a particular replacement font, palette, layout, or a zero-pattern count.
- A familiar treatment may remain if its use is coherent and useful. An equally generic empty page or an unrelated fashionable restyle does not demonstrate improvement.
- The form still validates required values and email format and gives truthful local feedback. Invalid submission does not produce success, and no network or storage integration is added.
- The assessment action, fields, focus, reading, and narrow layouts remain usable where observed. Source expectations are not reported as browser evidence.
- Review the full diff and relevant final artifacts, including new files. Statements about AI authorship are not treated as evidence of design quality.

## Paired checks

Run [05 Brand preservation](05-brand-preservation.md) from its own unchanged fixture as the intentional-treatment control. The redesign permission in case 08 must not be carried into that case. Use [03 Typography refinement](03-typography-refinement.md) and [04 Review only](04-review-only.md) when changes to shared routing or scope guidance warrant them.

For a comparison between skill revisions, use fresh copies of this fixture, the same task, host, model, tools, and settings, and record the revisions. Compare factual correctness, task usability, and specific visual effects. Keep one pair's observations separate from a claim of general improvement.
