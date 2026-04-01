import { platform } from "node:os";
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
	const imp = imps[PlatformEnum[platform()]];
	if (imp) return imp;
	throw new Error(`${platform()} 版本未实现`);
};
//#endregion
export { pipeCross };
