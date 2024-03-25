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

// packages/windows/src/program.ts
var program_exports = {};
__export(program_exports, {
  getInstalledApp: () => getInstalledApp,
  installedAppMap: () => installedAppMap
});
module.exports = __toCommonJS(program_exports);
var import_commands = require("./commands.cjs");
var import_child_process = require("@mcswift/node/child_process");
var installedAppMap = /* @__PURE__ */ new Map();
var getInstalledApp = async () => {
  installedAppMap.clear();
  const stdout = await import_child_process.Promisify.exec(import_commands.getInstalledAppCommand, {
    shell: "powershell"
  });
  const raw = JSON.parse(stdout);
  raw.forEach(infoHandle);
  return installedAppMap;
};
var infoHandle = (item) => {
  const names = item.PSChildName.split(".");
  const extension = names.pop();
  const name = names.join(".");
  if (installedAppMap.has(name))
    throw new Error(`\u540C\u540D\u5E94\u7528:${name}`);
  installedAppMap.set(name, {
    path: item["(default)"],
    name,
    extension
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInstalledApp,
  installedAppMap
});
