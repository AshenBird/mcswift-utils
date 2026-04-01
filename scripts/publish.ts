// import { execSync } from "child_process";
import { root } from "./utils";
import { emptyDirSync, ensureDirSync } from "fs-extra";
import { copySync } from "fs-extra/esm";
import { join } from "node:path";

export const publish = async (name: string) => {
  const sourceDir = join(root, "packages", name);
  const publishDir = join(root, ".publish", name);
  emptyDirSync(publishDir);
  ensureDirSync(publishDir);
  const cpList = ["lib", "package.json", "README.md", "LICENSE"];
  for (const item of cpList) {
    const src = join(sourceDir, item);
    const dest = join(publishDir, item);
    ensureDirSync(dest);
    copySync(src, dest);
  }

  // execSync(`cd ${root} && pnpm publish -r --access public`, { encoding: "utf-8" });
};
