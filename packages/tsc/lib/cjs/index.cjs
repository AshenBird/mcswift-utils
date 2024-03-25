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

// packages/tsc/src/index.ts
var src_exports = {};
__export(src_exports, {
  generatorDeclare: () => generatorDeclare
});
module.exports = __toCommonJS(src_exports);
var import_node_child_process = require("node:child_process");
var import_node_process = require("node:process");
var import_node = require("@mcswift/node");
var generatorDeclare = async (inputDir, outDir, root = (0, import_node_process.cwd)(), tsconfig = "./tsconfig.json") => {
  const tscPath = (0, import_node.getCommandFile)("tsc", root);
  (0, import_node_child_process.execSync)(
    [
      tscPath,
      `--rootDir ${inputDir}`,
      `--outDir ${outDir}`,
      `-p ${tsconfig}`,
      "--declaration",
      `--emitDeclarationOnly`
    ].join(" "),
    {
      cwd: root,
      stdio: "inherit"
    }
  );
  return;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generatorDeclare
});
