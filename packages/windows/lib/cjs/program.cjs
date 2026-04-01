Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_commands = require("./commands.cjs");
let _mcswift_node_child_process = require("@mcswift/node/child_process");
//#region packages/windows/src/program.ts
const installedAppMap = /* @__PURE__ */ new Map();
const getInstalledApp = async () => {
	installedAppMap.clear();
	const stdout = await _mcswift_node_child_process.Promisify.exec(require_commands.getInstalledAppCommand, { shell: "powershell" });
	JSON.parse(stdout).forEach(infoHandle);
	return installedAppMap;
};
const infoHandle = (item) => {
	const names = item.PSChildName.split(".");
	const extension = names.pop();
	const name = names.join(".");
	if (installedAppMap.has(name)) throw new Error(`同名应用:${name}`);
	installedAppMap.set(name, {
		path: item["(default)"],
		name,
		extension
	});
};
//#endregion
exports.getInstalledApp = getInstalledApp;
exports.installedAppMap = installedAppMap;
