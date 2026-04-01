Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_runtime = require("./_virtual/_rolldown/runtime.cjs");
let _mcswift_node = require("@mcswift/node");
let node_child_process = require("node:child_process");
let node_path = require("node:path");
node_path = require_runtime.__toESM(node_path);
//#region packages/svn/src/index.ts
const update = (root = "./") => {
	(0, node_child_process.execSync)(`cd ${(0, _mcswift_node.getAbsolutePath)(root)} && svn update`, { encoding: "utf-8" });
};
const commit = (fileList, message, root = "./") => {
	(0, node_child_process.execSync)(`cd ${(0, _mcswift_node.getAbsolutePath)(root)} && svn commit ${fileList.join(" ")} -m '${message}' --depth empty`, { encoding: "utf-8" });
};
const getStatus = (root = "./") => {
	const p = (0, _mcswift_node.getAbsolutePath)(root);
	const svnStatusRaw = (0, node_child_process.execSync)(`cd ${p} && svn st`, { encoding: "utf-8" });
	const statusList = svnStatusRaw.split("\n").map((line) => line.split(" ").filter((i) => !!i && i !== " "));
	const result = {
		counts: { total: 0 },
		status: [],
		raw: svnStatusRaw
	};
	for (const [type, path] of statusList) {
		if (!type) continue;
		result.status.push({
			type,
			path,
			absolute: node_path.join(p, path)
		});
		result.counts.total += 1;
		if (result.counts[type]) {
			result.counts[type] += 1;
			continue;
		}
		result.counts[type] = 1;
	}
	return result;
};
const getRevision = (root = "./") => {
	return getInfo((0, _mcswift_node.getAbsolutePath)(root)).Revision;
};
const getInfo = (root = "./") => {
	const svnInfoRaw = (0, node_child_process.execSync)(`cd ${(0, _mcswift_node.getAbsolutePath)(root)} && svn info`, { encoding: "utf-8" });
	const infoList = svnInfoRaw.split("\n").map((line) => {
		return line.split(":").map((i) => i.trim());
	});
	const result = {};
	for (const [k, v] of infoList) result[k.split(" ").join("")] = v;
	result.raw = svnInfoRaw;
	return result;
};
var Svn = class {
	static get info() {
		return getInfo();
	}
	static get revision() {
		return getRevision();
	}
	static get status() {
		return getStatus();
	}
	static commit = commit;
	static update = update;
};
//#endregion
exports.Svn = Svn;
exports.default = Svn;
