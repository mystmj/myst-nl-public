import { execSync } from "node:child_process";

function git(cmd: string, fallback: string) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || fallback;
  } catch {
    return fallback;
  }
}

export const buildHash = process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 7) || git("git rev-parse --short HEAD", "dev");
export const buildDatum = git("git log -1 --format=%cs", new Date().toISOString().slice(0, 10));
