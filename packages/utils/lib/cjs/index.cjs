"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/utils/src/index.ts
var src_exports = {};
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("./common.cjs"), module.exports);
__reExport(src_exports, require("./node.cjs"), module.exports);
__reExport(src_exports, require("./windows.cjs"), module.exports);
__reExport(src_exports, require("./cli.cjs"), module.exports);
__reExport(src_exports, require("@mcswift/esbuild"), module.exports);
__reExport(src_exports, require("@mcswift/npm"), module.exports);
__reExport(src_exports, require("@mcswift/svn"), module.exports);
__reExport(src_exports, require("@mcswift/tsc"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./common.cjs"),
  ...require("./node.cjs"),
  ...require("./windows.cjs"),
  ...require("./cli.cjs"),
  ...require("@mcswift/esbuild"),
  ...require("@mcswift/npm"),
  ...require("@mcswift/svn"),
  ...require("@mcswift/tsc")
});
