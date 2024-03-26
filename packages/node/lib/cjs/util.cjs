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

// packages/node/src/util.ts
var util_exports = {};
__export(util_exports, {
  pipeCross: () => pipeCross
});
module.exports = __toCommonJS(util_exports);
var import_node_os = require("node:os");
var PlatformEnum = {
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
var pipeCross = (imps) => {
  const imp = imps[PlatformEnum[(0, import_node_os.platform)()]];
  if (imp)
    return imp;
  throw new Error(`${(0, import_node_os.platform)()} \u7248\u672C\u672A\u5B9E\u73B0`);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pipeCross
});
