import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const types = "(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)";
const branchPattern = new RegExp(`^${types}/[a-z0-9]+(?:-[a-z0-9]+)*$`);
const subjectPattern = new RegExp(`^${types}(?:\\([a-z0-9][a-z0-9._/-]*\\))?!?: \\S[^\\r\\n]*$`);
const matches = (pattern, value) => typeof value === "string" && !/[\r\n]/.test(value) && pattern.test(value);

export function validateConventions({ branch, title, commits }) {
  const errors = [];
  if (!matches(branchPattern, branch)) errors.push("Use a Conventional Branch: <type>/<kebab-case-description>.");
  if (!matches(subjectPattern, title)) errors.push("Use a Conventional Commit subject as the pull request title.");
  if (!commits.length) errors.push("The pull request must contain at least one commit.");
  for (const { sha, subject } of commits) {
    if (!matches(subjectPattern, subject)) errors.push(`Commit ${sha.slice(0, 12)} must use Conventional Commits.`);
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const { BASE_SHA: base, HEAD_SHA: head } = process.env;
    if (![base, head].every((sha) => /^[a-f\d]{40,64}$/i.test(sha ?? ""))) throw new Error("BASE_SHA and HEAD_SHA must be commit hashes.");
    const output = execFileSync("git", ["log", "--format=%H%x00%s", `${base}..${head}`], { encoding: "utf8" }).trimEnd();
    const commits = output ? output.split(/\r?\n/).map((line) => {
      const separator = line.indexOf("\0");
      return { sha: line.slice(0, separator), subject: line.slice(separator + 1) };
    }) : [];
    const errors = validateConventions({ branch: process.env.BRANCH_NAME, title: process.env.PR_TITLE, commits });
    if (errors.length) {
      for (const error of errors) console.error(error);
      process.exitCode = 1;
    } else console.log("Branch, commits, and pull request title follow the repository conventions.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
