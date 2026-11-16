# Historical installation fixture

`skill-2.0.0/` is the exact published skill tree identified by the existing 2.0.0 hashes in `src/installation-baselines.json`. The same skill content was bundled in 2.1.0. It is intentionally frozen, including the original assets, to test adoption and update after the current skill changes. Do not regenerate it from the current bundle. It is maintainer test data and is excluded from the npm package.

`skill-2.2.0/` was extracted from the published npm archive, not regenerated from the checkout. Its archive integrity is `sha512-5fh/zYgrsvFmL26rqbQ04OZpzpM7JQCua2aVk6tO41VlJpLjJAGIMNjfLkUzDocEMVLrLoeGaayI5UbdzZWsDg==`. The tree's hashes are recorded as the 2.2.0 baseline. Line-ending conversion is disabled for this fixture because the published native source examples contain CRLF bytes. Preserve all bytes when updating tests.
