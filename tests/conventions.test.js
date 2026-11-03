import { describe, test } from "bun:test";
import assert from "node:assert/strict";
import { validateConventions } from "../scripts/check-conventions.js";

const valid = {
  branch: "test/validate-skill-installation",
  title: "test: validate skill installation",
  commits: [{ sha: "a".repeat(40), subject: "test(installer): cover existing destinations" }],
};

describe("repository conventions", () => {
  test("valid names, scopes, and breaking changes pass", () => {
    assert.deepEqual(validateConventions(valid), []);
    assert.deepEqual(validateConventions({ ...valid, title: "feat!: change configuration" }), []);
  });
  test("invalid branch names fail", () => {
    assert.ok(validateConventions({ ...valid, branch: "feature_branch" }).length);
  });
  test("nonconventional or multiline pull request titles fail", () => {
    for (const title of ["Update files", "feat: valid\ninvalid", "feat: valid\n"]) assert.ok(validateConventions({ ...valid, title }).length);
  });
  test("nonconventional commits and empty pull requests fail", () => {
    assert.ok(validateConventions({ ...valid, commits: [{ sha: "b".repeat(40), subject: "Update files" }] }).length);
    assert.ok(validateConventions({ ...valid, commits: [] }).length);
  });
});
