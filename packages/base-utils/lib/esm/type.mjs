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
export { isBigint, isBoolean, isFunction, isNull, isNumber, isString, isSymbol, isUndefined, isValueType };
