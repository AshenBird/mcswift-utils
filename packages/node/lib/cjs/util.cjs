Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let node_os = require("node:os");
//#region packages/node/src/util.ts
const PlatformEnum = {
	aix: "posix",
	android: "posix",
	darwin: "mac",
	freebsd: "posix",
	haiku: "posix",
	linux: "posix",
	openbsd: "posix",
	sunos: "posix",
	cygwin: "posix",
	win32: "windows",
	netbsd: "posix"
};
const pipeCross = (imps) => {
	const imp = imps[PlatformEnum[(0, node_os.platform)()]];
	if (imp) return imp;
	throw new Error(`${(0, node_os.platform)()} 版本未实现`);
};
//#endregion
exports.pipeCross = pipeCross;
