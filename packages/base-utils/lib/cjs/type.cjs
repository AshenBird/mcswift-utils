"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/base-utils/src/type.ts
var type_exports = {};
__export(type_exports, {
  isBigint: () => isBigint,
  isBoolean: () => isBoolean,
  isFunction: () => isFunction,
  isNull: () => isNull,
  isNumber: () => isNumber,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUndefined: () => isUndefined,
  isValueType: () => isValueType
});
module.exports = __toCommonJS(type_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isBigint,
  isBoolean,
  isFunction,
  isNull,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isValueType
});
