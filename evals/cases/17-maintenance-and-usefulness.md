# 17: Maintenance and focused design usefulness

Status: prepared, not executed. Runtime tests establish CLI behavior; they do not establish model quality, speed, or design improvement.

## Design comparison

Use one host, one exact model/reasoning setting, and three tasks. Each task has two independent arms: no skill and explicit skill. Six independent sessions constitute the initial round. A second host/model is a separately reported round.

Freeze one starting project per task, record its hash or commit, and copy it into disposable directories. For A/B use identical clean scaffolds with the same dependencies and tool versions. For C copy the [dashboard fixture](../fixtures/dashboard/). Do not share generated outputs, conversation history, design records, or cached task content between arms. Check project/global/inherited instructions and skills; record incomplete isolation rather than assuming absence. Doctor inventories available copies but does not prove active loading.

Submit the exact same prompt in both arms. Only the skill invocation differs: prefix the assisted prompt with `Use the flawless-ui-ux skill.` or the host's explicit selection. Freeze starting files, prompts, model, reasoning, tools, time limit, and permitted follow-ups before running. Choose a common feasible limit (for example 15 minutes); do not extend only one arm. Separate setup time from execution time. If clarification is needed, apply the same factual answer to both arms and save it. Do not add design coaching to just one arm.

### A: Create a local-service interface

```
Build a homepage for Morrow, a small coastal guesthouse with eight rooms. Guests need to compare rooms, understand the location, and ask about availability by email. The character is quiet and personal, with the building and surrounding landscape central to the experience. Use the existing scaffold.
```

### B: Create a task-oriented product interface

```
Build the overview screen for Ledger, a finance app used by independent consultants to check unpaid invoices, upcoming expenses, and the cash available for the next month. Include useful sample records and working controls for filtering the overview. Use the existing scaffold.
```

### C: Refine existing work

```
Improve this dashboard's hierarchy, readability, and visual finish. Preserve its records, calculations, navigation, and existing interactions. Keep the wording unchanged.
```

### Evidence and judgment

Use the [report template](../report-template.md) for each arm. Record exact inputs, host/model, tools, skill revision plus uncommitted diff, observed loading, elapsed time, first preview time if visible, blockers, code changes, and captures at identical widths/states. Assign neutral output labels and review before revealing the arm when practical.

Describe specific differences in task completion, legibility, hierarchy, product fit, content fidelity, and functionality. Use Met / Failed / Unobserved with examples. Record regressions and costs even when one screenshot looks preferable. No automatic aesthetic score, proof of superiority from novelty, or inference of activation from appearance.

Creation arms are independent matched tasks. Optional sequential refinement of a baseline is a separate experiment with a fresh copy and an unassisted refinement control. Do not present sequential screenshots as independent creation results. Existing site/README examples remain prior sequential-refinement evidence. These cases cover web interfaces only; they cannot support native effectiveness claims.

Save artifacts outside the installed package, without credentials or private data. Record the outcome in [the round index](../results/2.1.0/README.md); leave unfinished arms pending.

## Maintenance and report acceptance

Use isolated project and home/config directories, never personal global installations for destructive fixtures.

1. Install two agents sharing a path and one with a distinct path. Doctor should group copies and report both scopes without installing missing copies.
2. Preview update and compare directory hashes: no writes. Update clean copies and check their installation records.
3. Modify a reference in one copy. Update must report its path and leave every selected copy unchanged. Repeat separately for a deleted tracked file and an added custom file.
4. Preview an exact 2.0.0 copy without metadata, then adopt it. Unknown copies, links, and newer versions must not be replaced.
5. Inspect the [workflow fixture](../fixtures/workflows/) with its documented flow, `--output`, and `--html`. Open `report.html` locally and check findings, coverage, URL/state/viewport captions, screenshots, steps, and narrow/wide readability.
6. Correct an observed issue in a disposable fixture. Verify into a new HTML directory with the same explicit flow/browser. Compare categories with JSON; missing targets/incomplete checks must not be called repairs.

Automated equivalents belong to maintenance, HTML, installation, browser, and workflow tests. Human observations and model comparisons remain separately pending.
