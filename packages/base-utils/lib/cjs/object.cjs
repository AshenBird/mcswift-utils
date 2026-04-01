Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region packages/base-utils/src/object.ts
const deepSeal = (val) => {
	return deppHandle(val, Object.seal);
};
const deepFreeze = (val) => {
	return deppHandle(val, Object.freeze);
};
const deppHandle = (val, handle) => {
	handle(val);
	if (typeof val !== "object") return val;
	if (Array.isArray(val)) {
		for (const child of val) handle(child);
		return val;
	}
	for (const child of Object.values(val)) handle(child);
	return val;
};
//#endregion
exports.deepFreeze = deepFreeze;
exports.deepSeal = deepSeal;
