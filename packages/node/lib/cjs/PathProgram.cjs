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

// packages/node/src/PathProgram.ts
var PathProgram_exports = {};
__export(PathProgram_exports, {
  getPathProgram: () => getPathProgram
});
module.exports = __toCommonJS(PathProgram_exports);
var import_node_fs = require("node:fs");
var typeRecord = {
  ps1: "powershell",
  cmd: "cmd",
  exe: "exe",
  bat: "cmd"
};
var canExec = ["ps1", "cmd", "exe", "bat"];
var pathProgramMap;
var getPathProgram = async () => {
  if (pathProgramMap)
    return pathProgramMap;
  pathProgramMap = /* @__PURE__ */ new Map();
  if (!process.env.Path) {
    return pathProgramMap;
  }
  const paths = [
    ...new Set(process.env.Path.split(";").filter((item) => !!item))
  ];
  const tasks = [];
  paths.forEach((path) => {
    if (!(0, import_node_fs.existsSync)(path))
      return;
    const task = new Promise(readDirTaskInitFac(path));
    tasks.push(task);
  });
  await Promise.all(tasks);
  return pathProgramMap;
};
var readDirTaskInitFac = (path) => {
  const result = (resolve, reject) => {
    const thenHandle = (dirents) => {
      dirents.forEach((dirent) => createRecord(dirent, path));
      resolve();
    };
    (0, import_node_fs.readdir)(path, { withFileTypes: true }, (err, files) => {
      if (err)
        return reject(err);
      files.forEach((dirent) => createRecord(dirent, path));
      resolve();
    });
  };
  return result;
};
var createRecord = (dirent, path) => {
  if (!pathProgramMap)
    return;
  if (dirent.isDirectory())
    return;
  const fileName = dirent.name;
  if (!fileNameCheck(fileName))
    return;
  const names = fileName.split(".");
  const extension = names.pop().toLowerCase();
  if (!canExec.includes(extension))
    return;
  const call = names.join(".");
  const record = {
    name: fileName,
    type: typeRecord[extension],
    call,
    path
  };
  if (!pathProgramMap.has(call)) {
    pathProgramMap.set(call, [record]);
    return;
  }
  pathProgramMap.get(call).push(record);
};
var fileNameCheck = (fileName) => !(!fileName.includes(".") || fileName.startsWith(".") || fileName.endsWith("."));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPathProgram
});
