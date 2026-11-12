# Releasing

Use the release version from `package.json`, a matching changelog entry, and a GitHub tag and release name of `v<version>`. The package is public on npm; this does not change the GitHub repository's visibility. Publication is a separate action from preparing a release branch or draft release.

## Prepare

1. Make changes on a conventional release branch. Set the package version, update the changelog and release notes, and include the matching logo and banner assets used by the README.
2. Run the tests with browser fixtures enabled, then inspect `npm pack --dry-run --json`. Confirm that only the runtime, skill, installer, README, changelog, license, and README image assets are included.
3. Open a PR to main. Wait for the Windows/Ubuntu package checks and conventions check, then merge through the repository's normal PR workflow.

The release notes describe shipped functionality, runtime requirements, and remaining limitations. Do not claim unperformed host/model quality or latency evaluations.

## Publish

Use a clean main checkout at the approved commit, with the pinned dependencies installed. Authenticate to npm with `npm login`; complete any interactive authentication locally. Do not put credentials or tokens in release files.

```bash
git switch main
git pull --ff-only origin main
bun install --frozen-lockfile
npm whoami
npm pack --dry-run --json
npm publish --access public
```

Publishing uses the explicit public npm registry in `publishConfig`. A name/version pair cannot be republished. For later releases, choose a new version first. A successful dry run does not establish authentication, namespace ownership, or a successful registry upload.

From the same approved checkout in Bash, read the intended version and confirm its actual registry metadata and entry point:

```bash
flawless_version=$(node -p "require('./package.json').version")
npm view "flawless-ui-ux@$flawless_version" version dist.integrity bin --json
npx --yes "flawless-ui-ux@$flawless_version" --version
bunx "flawless-ui-ux@$flawless_version" --version
```

## GitHub release

After the registry confirms the intended package version, publish the draft release with its matching `v<version>` tag targeting the same approved main commit. If no draft exists, create one with the prepared notes and explicit target commit. Do not tag an unmerged working branch as the final release.

The tag, package version, and release notes must agree. If npm publication succeeds but GitHub release creation fails, retry the GitHub step without trying to republish the npm version. If a draft exists while authentication or merge is pending, keep it visibly marked as a draft.

Future CI publication can use npm trusted publishing after its package-to-workflow trust is configured. The initial manual publication does not require a new publishing workflow or a stored CI token.
