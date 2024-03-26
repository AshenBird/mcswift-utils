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

// packages/node/src/path.ts
var path_exports = {};
__export(path_exports, {
  getAbsolutePath: () => getAbsolutePath,
  getCommandFile: () => getCommandFile,
  getDirectoryPaths: () => getDirectoryPaths,
  getFilePaths: () => getFilePaths
});
module.exports = __toCommonJS(path_exports);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var import_node_process = require("node:process");
var getAbsolutePath = (raw, base = (0, import_node_process.cwd)()) => {
  if ((0, import_node_path.isAbsolute)(raw)) {
    return raw;
  }
  return (0, import_node_path.resolve)(base, raw);
};
var getCommandFile = (command, root = "./") => {
  const p = getAbsolutePath(root);
  let filePath = "";
  const dir = (0, import_node_path.join)(p, "node_modules", ".bin");
  const dirents = (0, import_node_fs.readdirSync)(dir, {
    withFileTypes: true
  });
  for (const dirent of dirents) {
    if (dirent.name !== command)
      continue;
    filePath = (0, import_node_path.join)(dir, dirent.name);
    break;
  }
  return filePath;
};
var getFilePaths = (path, exclude = []) => {
  const result = [];
  const nextExclude = [];
  for (const ex of exclude) {
    if ((0, import_node_path.isAbsolute)(ex)) {
      nextExclude.push(ex);
      continue;
    }
    nextExclude.push(getAbsolutePath(ex, path));
  }
  const dirents = (0, import_node_fs.readdirSync)(path, { withFileTypes: true });
  for (const item of dirents) {
    const current = (0, import_node_path.join)(path, item.name);
    if (nextExclude.includes(current))
      continue;
    if (item.isFile()) {
      result.push(current);
      continue;
    }
    result.push(...getFilePaths(current, nextExclude));
  }
  return result;
};
var getDirectoryPaths = (path) => {
  const result = [];
  const dirents = (0, import_node_fs.readdirSync)(path, { withFileTypes: true });
  for (const item of dirents) {
    const current = (0, import_node_path.join)(path, item.name);
    if (item.isFile())
      continue;
    result.push(current, ...getDirectoryPaths(current));
  }
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAbsolutePath,
  getCommandFile,
  getDirectoryPaths,
  getFilePaths
});
