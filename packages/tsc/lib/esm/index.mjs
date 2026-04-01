import { execSync } from "node:child_process";
import { cwd } from "node:process";
import { getCommandFile } from "@mcswift/node";
//#region packages/tsc/src/index.ts
const generatorDeclare = async (inputDir, outDir, root = cwd(), tsconfig = "./tsconfig.json") => {
	execSync([
		getCommandFile("tsc", root),
		`--rootDir ${inputDir}`,
		`--outDir ${outDir}`,
		`-p ${tsconfig}`,
		"--declaration",
		`--emitDeclarationOnly`
	].join(" "), {
		cwd: root,
		stdio: "inherit"
	});
};
//#endregion
export { generatorDeclare };
