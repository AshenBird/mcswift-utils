import { getInstalledAppCommand } from "./commands.mjs";
import { Promisify } from "@mcswift/node/child_process";
//#region packages/windows/src/program.ts
const installedAppMap = /* @__PURE__ */ new Map();
const getInstalledApp = async () => {
	installedAppMap.clear();
	const stdout = await Promisify.exec(getInstalledAppCommand, { shell: "powershell" });
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
export { getInstalledApp, installedAppMap };
