import { execSync } from "node:child_process";
import { cwd as _cwd } from "node:process";
import { getCommandFile } from "@mcswift/node"
export const generatorDeclare = async (
  inputDir: string,
  outDir: string,
  root: string = _cwd(),
  tsconfig: string = "./tsconfig.json"
) => {
  const tscPath = getCommandFile("tsc", root);
  execSync(
    [
      tscPath,
      `--rootDir ${inputDir}`,
      `--outDir ${outDir}`,
      `-p ${tsconfig}`,
      "--declaration",
      `--emitDeclarationOnly`,
    ].join(" "),
    {
      cwd: root,
      stdio: "inherit",
    }
  );
  return;
};
