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
var PlatformEnum = /* @__PURE__ */ ((PlatformEnum2) => {
  PlatformEnum2["aix"] = "posix";
  PlatformEnum2["android"] = "posix";
  PlatformEnum2["darwin"] = "mac";
  PlatformEnum2["freebsd"] = "posix";
  PlatformEnum2["haiku"] = "posix";
  PlatformEnum2["linux"] = "posix";
  PlatformEnum2["openbsd"] = "posix";
  PlatformEnum2["sunos"] = "posix";
  PlatformEnum2["cygwin"] = "posix";
  PlatformEnum2["win32"] = "windows";
  PlatformEnum2["netbsd"] = "posix";
  return PlatformEnum2;
})(PlatformEnum || {});
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
