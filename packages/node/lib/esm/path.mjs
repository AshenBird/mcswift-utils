import { existsSync, readdirSync } from "node:fs";
import { isAbsolute, join, normalize, resolve } from "node:path";
import { cwd } from "node:process";
//#region packages/node/src/path.ts
const getAbsolutePath = (raw, base = cwd()) => {
	if (isAbsolute(raw)) return raw;
	return resolve(base, raw);
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
	const dir = join(p, "node_modules", ".bin");
	const f = resolve(p, "../");
	if (!existsSync(dir)) {
		if (!existsSync) return void 0;
		if (resolve(normalize("/")) === normalize(p)) return void 0;
		return getCommandFile(command, f);
	}
	const dirents = readdirSync(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		if (dirent.name !== command) continue;
		filePath = join(dir, dirent.name);
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
		if (isAbsolute(ex)) {
			nextExclude.push(ex);
			continue;
		}
		nextExclude.push(getAbsolutePath(ex, path));
	}
	const dirents = readdirSync(path, { withFileTypes: true });
	for (const item of dirents) {
		const current = join(path, item.name);
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
	const dirents = readdirSync(path, { withFileTypes: true });
	for (const item of dirents) {
		const current = join(path, item.name);
		if (item.isFile()) continue;
		result.push(current, ...getDirectoryPaths(current));
	}
	return result;
};
//#endregion
export { getAbsolutePath, getCommandFile, getDirectoryPaths, getFilePaths };
