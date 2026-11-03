import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdtempSync, readdirSync, readFileSync, readlinkSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const repository = fileURLToPath(new URL("../", import.meta.url));
export const skillName = "flawless-ui-ux";
export const packageRoot = join(repository, "skills", skillName);

export function temporaryWorkspace() {
  const parent = realpathSync(tmpdir());
  const root = realpathSync(mkdtempSync(join(parent, "flawless-install-")));
  return {
    root,
    cleanup() {
      // Verify the allocated absolute target before recursive cleanup on Windows.
      if (dirname(resolve(root)) !== parent || !basename(root).startsWith("flawless-install-") || realpathSync(root) !== root) {
        throw new Error("Refusing cleanup outside the allocated test directory");
      }
      rmSync(root, { recursive: true, force: true });
    },
  };
}

export function snapshot(root) {
  const entries = {};
  function visit(directory) {
    for (const entry of readdirSync(directory).sort()) {
      const path = join(directory, entry);
      const key = relative(root, path).replaceAll("\\", "/");
      const stat = lstatSync(path);
      if (stat.isSymbolicLink()) entries[key] = `link:${readlinkSync(path)}`;
      else if (stat.isDirectory()) {
        entries[`${key}/`] = "directory";
        visit(path);
      } else entries[key] = createHash("sha256").update(readFileSync(path)).digest("hex");
    }
  }
  visit(root);
  return entries;
}

export function findBash() {
  if (process.env.FLAWLESS_TEST_BASH) return process.env.FLAWLESS_TEST_BASH;
  const git = Bun.which("git");
  if (process.platform === "win32" && git) {
    const candidate = join(dirname(dirname(realpathSync(git))), "bin", "bash.exe");
    if (existsSync(candidate)) return candidate;
  }
  const bash = Bun.which("bash");
  if (bash) return bash;
  throw new Error("Bash is required; set FLAWLESS_TEST_BASH to its executable");
}
