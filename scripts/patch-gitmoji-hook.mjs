/**
 * Patches the gitmoji commit hook to skip the interactive emoji prompt in
 * non-interactive environments (CI, scripts, agents).
 *
 * gitmoji-cli writes its `prepare-commit-msg` hook into `.husky/_/` on every
 * `prepare` run (i.e. after each install). That directory is git-ignored and
 * regenerated, so we can't edit it by hand. Instead this script runs right
 * after `gitmoji -i` in the `prepare` step and injects a TTY guard at the top
 * of the hook. Idempotent — safe to run repeatedly.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const HOOK_PATH = new URL("../.husky/_/prepare-commit-msg", import.meta.url);
const GUARD_MARKER = "non-interactive";
const GUARD = `# Skip in non-interactive environments (CI, scripts, agents)
if [ -z "\${CI+x}" ] && [ ! -t 0 ] && [ ! -t 1 ]; then
  exit 0
fi`;

if (!existsSync(HOOK_PATH)) {
  process.exit(0);
}

const hook = readFileSync(HOOK_PATH, "utf8");

if (hook.includes(GUARD_MARKER)) {
  process.exit(0);
}

// Insert the guard right after the shebang line.
const patched = hook.replace(
  /^(#!.*\n)/,
  `$1\n${GUARD}\n`,
);

writeFileSync(HOOK_PATH, patched);
