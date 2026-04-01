Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let node_fs = require("node:fs");
let node_path = require("node:path");
let node_process = require("node:process");
//#region packages/node/src/path.ts
const getAbsolutePath = (raw, base = (0, node_process.cwd)()) => {
	if ((0, node_path.isAbsolute)(raw)) return raw;
	return (0, node_path.resolve)(base, raw);
};
/**
* 向上查找 npm 安装的命令
* @param command
* @param root
* @returns
*/
const getCommandFile = (command, root = "./") => {
	const p = getAbsolutePath(root);
	let filePath = "";
	const dir = (0, node_path.join)(p, "node_modules", ".bin");
	const f = (0, node_path.resolve)(p, "../");
	if (!(0, node_fs.existsSync)(dir)) {
		if (!node_fs.existsSync) return void 0;
		if ((0, node_path.resolve)((0, node_path.normalize)("/")) === (0, node_path.normalize)(p)) return void 0;
		return getCommandFile(command, f);
	}
	const dirents = (0, node_fs.readdirSync)(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		if (dirent.name !== command) continue;
		filePath = (0, node_path.join)(dir, dirent.name);
		break;
	}
	if (!filePath) return getCommandFile(command, f);
	return filePath;
};
/**
* 递归获取路径下所有的文件路径
* @param path
* @param result
* @returns
*/
const getFilePaths = (path, exclude = []) => {
	const result = [];
	const nextExclude = [];
	for (const ex of exclude) {
		if ((0, node_path.isAbsolute)(ex)) {
			nextExclude.push(ex);
			continue;
		}
		nextExclude.push(getAbsolutePath(ex, path));
	}
	const dirents = (0, node_fs.readdirSync)(path, { withFileTypes: true });
	for (const item of dirents) {
		const current = (0, node_path.join)(path, item.name);
		if (nextExclude.includes(current)) continue;
		if (item.isFile()) {
			result.push(current);
			continue;
		}
		result.push(...getFilePaths(current, nextExclude));
	}
	return result;
};
/**
* 递归获取路径下所有的目录路径
* @param path
* @param result
* @returns
*/
const getDirectoryPaths = (path) => {
	const result = [];
	const dirents = (0, node_fs.readdirSync)(path, { withFileTypes: true });
	for (const item of dirents) {
		const current = (0, node_path.join)(path, item.name);
		if (item.isFile()) continue;
		result.push(current, ...getDirectoryPaths(current));
	}
	return result;
};
//#endregion
exports.getAbsolutePath = getAbsolutePath;
exports.getCommandFile = getCommandFile;
exports.getDirectoryPaths = getDirectoryPaths;
exports.getFilePaths = getFilePaths;
