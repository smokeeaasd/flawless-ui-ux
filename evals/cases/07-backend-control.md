# 07: Backend activation control

Starting project: a fresh copy of [backend](../fixtures/backend/), with flawless-ui-ux available and unrelated skills disabled. This is the additional negative control, not a seventh design scenario. Submit only the task block, with no skill mention or selection.

## Task

```text
Implement normalizeEmail(value) in normalize-email.mjs. It must accept a string, trim leading and trailing whitespace, and return the lowercase result. Throw TypeError for non-string inputs. Do not validate address format or add dependencies.

Add a small verification file using node:assert/strict that checks mixed case, surrounding whitespace, an empty string, and non-string input. Run it with Node and report the result.
```

## Evaluator checks

- The function implements the stated rules and the dependency-free verification actually runs.
- No UI/UX skill load or design-reference reads appear in an observable trace. Availability in the skill inventory does not count as activation.
- The agent does not introduce interface files, an art-direction discussion, or unrelated design work.
- If the host does not expose loading, mark activation unobserved. A normal-looking final answer alone cannot prove non-activation.
