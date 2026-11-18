import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { mkdirSync, mkdtempSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
const cwd = fileURLToPath(new URL("../remotion-video/", import.meta.url));
const state = process.env.IAC_STATE_DIR || process.env.RUNNER_TEMP || join(homedir(), ".local/state/iac-routines");
mkdirSync(state, { recursive: true });
const output = mkdtempSync(join(state, "group-video-bundle-"));
for (const args of [["ci", "--no-audit", "--no-fund"], ["run", "lint"], ["run", "build", "--", "--out-dir", output]]) {
  const result = spawnSync("npm", args, { cwd, stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
