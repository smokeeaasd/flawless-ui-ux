# Repository guidance

## Language and scope

- Write all repository content in English: code, comments, documentation, commits, and pull requests.
- Build a portable UI/UX skill, initially supporting OpenCode and Codex.
- Combine focused UI/UX review and refinement with contextual art direction.
- Do not introduce a deterministic interface detector, a dedicated runtime engine, browser extension, or live editing platform without a scope change.
- Keep exploratory research and personal working notes in the parent workspace. Keep maintained project documentation in this repository.

## Git workflow

- Use a short-lived Conventional Branch for every change, created from the latest `main`.
- Use `<type>/<kebab-case-description>`, for example `feat/add-art-direction` or `docs/update-installation`.
- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Use Conventional Commits: `<type>(optional-scope): <description>`. Use `!` for breaking changes when applicable.
- Open pull requests directly into `main`. There is no `develop`, release, or integration branch.
- Use a Conventional Commit title for each pull request, because the title becomes the squash commit subject.
- Merge through squash merge after applicable checks pass and review conversations are resolved.
- Do not push changes directly to `main`, force-push `main`, bypass protections, or merge without authorization.
- The initial empty commit is the one-time bootstrap required to establish `main` in an empty repository.

## Verification

- Run checks appropriate to the actual change. Do not claim checks or visual reviews that were not performed.
- Keep skill instructions portable and load supporting references only when relevant.
- Update maintained documentation when behavior, installation, or supported capabilities change.
- Never commit credentials, access tokens, local agent state, or private research artifacts.
