Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let node_fs = require("node:fs");
//#region packages/node/src/PathProgram.ts
const typeRecord = {
	ps1: "powershell",
	cmd: "cmd",
	exe: "exe",
	bat: "cmd"
};
const canExec = [
	"ps1",
	"cmd",
	"exe",
	"bat"
];
let pathProgramMap;
const getPathProgram = async () => {
	if (pathProgramMap) return pathProgramMap;
	pathProgramMap = /* @__PURE__ */ new Map();
	if (!process.env.Path) return pathProgramMap;
	const paths = [...new Set(process.env.Path.split(";").filter((item) => !!item))];
	const tasks = [];
	paths.forEach((path) => {
		if (!(0, node_fs.existsSync)(path)) return;
		const task = new Promise(readDirTaskInitFac(path));
		tasks.push(task);
	});
	await Promise.all(tasks);
	return pathProgramMap;
};
const readDirTaskInitFac = (path) => {
	const result = (resolve, reject) => {
		(0, node_fs.readdir)(path, { withFileTypes: true }, (err, files) => {
			if (err) return reject(err);
			files.forEach((dirent) => createRecord(dirent, path));
			resolve();
		});
	};
	return result;
};
const createRecord = (dirent, path) => {
	if (!pathProgramMap) return;
	if (dirent.isDirectory()) return;
	const fileName = dirent.name;
	if (!fileNameCheck(fileName)) return;
	const names = fileName.split(".");
	const extension = names.pop().toLowerCase();
	if (!canExec.includes(extension)) return;
	const call = names.join(".");
	const record = {
		name: fileName,
		type: typeRecord[extension],
		call,
		path
	};
	if (!pathProgramMap.has(call)) {
		pathProgramMap.set(call, [record]);
		return;
	}
	pathProgramMap.get(call).push(record);
};
const fileNameCheck = (fileName) => !(!fileName.includes(".") || fileName.startsWith(".") || fileName.endsWith("."));
//#endregion
exports.getPathProgram = getPathProgram;
