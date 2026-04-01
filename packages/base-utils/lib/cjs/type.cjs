Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region packages/base-utils/src/type.ts
const isString = (val) => typeof val === "string";
const isNumber = (val) => typeof val === "number";
const isBigint = (val) => typeof val === "bigint";
const isBoolean = (val) => typeof val === "boolean";
const isFunction = (val) => typeof val === "function";
const isSymbol = (val) => typeof val === "symbol";
const isUndefined = (val) => typeof val === "undefined";
const isNull = (val) => val === null;
const isValueType = (val) => {
	return [
		"symbol",
		"string",
		"number",
		"bigint",
		"boolean"
	].includes(typeof val);
};
//#endregion
exports.isBigint = isBigint;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.isUndefined = isUndefined;
exports.isValueType = isValueType;
