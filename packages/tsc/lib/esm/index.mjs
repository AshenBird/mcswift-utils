// packages/tsc/src/index.ts
import { execSync } from "node:child_process";
import { cwd as _cwd } from "node:process";
import { getCommandFile } from "@mcswift/node";
var generatorDeclare = async (inputDir, outDir, root = _cwd(), tsconfig = "./tsconfig.json") => {
  const tscPath = getCommandFile("tsc", root);
  execSync(
    [
      tscPath,
      `--rootDir ${inputDir}`,
      `--outDir ${outDir}`,
      `-p ${tsconfig}`,
      "--declaration",
      `--emitDeclarationOnly`
    ].join(" "),
    {
      cwd: root,
      stdio: "inherit"
    }
  );
  return;
};
export {
  generatorDeclare
};
