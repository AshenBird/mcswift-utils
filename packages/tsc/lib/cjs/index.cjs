Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let node_child_process = require("node:child_process");
let node_process = require("node:process");
let _mcswift_node = require("@mcswift/node");
//#region packages/tsc/src/index.ts
const generatorDeclare = async (inputDir, outDir, root = (0, node_process.cwd)(), tsconfig = "./tsconfig.json") => {
	(0, node_child_process.execSync)([
		(0, _mcswift_node.getCommandFile)("tsc", root),
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
exports.generatorDeclare = generatorDeclare;
