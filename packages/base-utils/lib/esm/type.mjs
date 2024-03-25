// packages/base-utils/src/type.ts
var isString = (val) => typeof val === "string";
var isNumber = (val) => typeof val === "number";
var isBigint = (val) => typeof val === "bigint";
var isBoolean = (val) => typeof val === "boolean";
var isFunction = (val) => typeof val === "function";
var isSymbol = (val) => typeof val === "symbol";
var isUndefined = (val) => typeof val === "undefined";
var isNull = (val) => val === null;
var isValueType = (val) => {
  return ["symbol", "string", "number", "bigint", "boolean"].includes(
    typeof val
  );
};
export {
  isBigint,
  isBoolean,
  isFunction,
  isNull,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isValueType
};
