"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/base-utils/src/index.ts
var src_exports = {};
__export(src_exports, {
  GBK: () => GBK
});
module.exports = __toCommonJS(src_exports);
var GBK = __toESM(require("./gbk/index.cjs"), 1);
__reExport(src_exports, require("./pinyin-sort/index.cjs"), module.exports);
__reExport(src_exports, require("./json.cjs"), module.exports);
__reExport(src_exports, require("./logger.cjs"), module.exports);
__reExport(src_exports, require("./object.cjs"), module.exports);
__reExport(src_exports, require("./other.cjs"), module.exports);
__reExport(src_exports, require("./scheduler.cjs"), module.exports);
__reExport(src_exports, require("./string.cjs"), module.exports);
__reExport(src_exports, require("./trigger.cjs"), module.exports);
__reExport(src_exports, require("./type.cjs"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GBK,
  ...require("./pinyin-sort/index.cjs"),
  ...require("./json.cjs"),
  ...require("./logger.cjs"),
  ...require("./object.cjs"),
  ...require("./other.cjs"),
  ...require("./scheduler.cjs"),
  ...require("./string.cjs"),
  ...require("./trigger.cjs"),
  ...require("./type.cjs")
});
