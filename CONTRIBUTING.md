# Contributing

## Language

Use English for code, comments, documentation, commits, issues, and pull requests.

## Reduced Git workflow

1. Update your local `main` from `origin/main`.
2. Create a short-lived branch using `<type>/<kebab-case-description>`.
3. Make focused changes and commit using Conventional Commits.
4. Run the checks applicable to your changes.
5. Push the branch and open a pull request with `main` as its base.
6. Resolve review conversations and merge using squash merge once authorized.
7. Delete the merged branch; GitHub is configured to do this automatically.

There is no `develop` branch. Features, fixes, maintenance, and documentation all target `main` directly through pull requests.

## Naming

Allowed branch and commit types are `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.

Branch examples:

```text
feat/add-direction-guide
fix/correct-skill-trigger
docs/explain-opencode-installation
chore/configure-repository
```

Commit and pull request title examples:

```text
feat: add contextual art direction
fix(codex): correct the installation path
docs: explain the review workflow
feat!: replace the configuration format
```

Use a concise English description. A scope is optional. Breaking changes may use `!` and a `BREAKING CHANGE:` footer.

The pull request title becomes the squash commit subject. Individual branch commits must also follow Conventional Commits.

## Main branch protection

The intended rules require pull requests, linear history, resolved review conversations, and block branch deletion and force pushes. No approving review is required initially, so a solo maintainer can merge their own pull requests. There is no standing bypass actor.

The main ruleset is stored in `.github/rulesets/main.json`. This JSON file describes the intended GitHub configuration; committing it does not activate rules by itself.

The required `conventions` GitHub Actions check validates the source branch name, every introduced commit subject, and the pull request title. Native branch-name rules were rejected by the GitHub API for this repository, so naming conventions are enforced at merge time through this check. This does not prevent someone from pushing a nonconforming source branch; it prevents that pull request from passing the merge gate.

Required status checks should be added only after the corresponding checks exist and have been verified. No nonexistent CI check should block the initial setup.

## Repository boundary

Maintain project documentation here. Keep exploratory research, personal notes, and temporary planning material in the parent workspace.
