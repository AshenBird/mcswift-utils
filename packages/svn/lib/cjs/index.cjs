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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/svn/src/index.ts
var src_exports = {};
__export(src_exports, {
  Svn: () => Svn,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_node = require("@mcswift/node");
var import_node_child_process = require("node:child_process");
var Path = __toESM(require("node:path"), 1);
var update = (root = "./") => {
  const p = (0, import_node.getAbsolutePath)(root);
  (0, import_node_child_process.execSync)(`cd ${p} && svn update`, { encoding: "utf-8" });
};
var commit = (fileList, message, root = "./") => {
  const p = (0, import_node.getAbsolutePath)(root);
  (0, import_node_child_process.execSync)(
    `cd ${p} && svn commit ${fileList.join(" ")} -m '${message}' --depth empty`,
    { encoding: "utf-8" }
  );
};
var getStatus = (root = "./") => {
  const p = (0, import_node.getAbsolutePath)(root);
  const svnStatusRaw = (0, import_node_child_process.execSync)(`cd ${p} && svn st`, { encoding: "utf-8" });
  const statusList = svnStatusRaw.split("\n").map((line) => line.split(" ").filter((i) => !!i && i !== " "));
  const result = {
    counts: {
      total: 0
    },
    status: [],
    raw: svnStatusRaw
  };
  for (const [type, path] of statusList) {
    if (!type)
      continue;
    result.status.push({
      type,
      path,
      absolute: Path.join(p, path)
    });
    result.counts.total += 1;
    if (result.counts[type]) {
      result.counts[type] += 1;
      continue;
    }
    result.counts[type] = 1;
  }
  return result;
};
var getRevision = (root = "./") => {
  const p = (0, import_node.getAbsolutePath)(root);
  return getInfo(p).Revision;
};
var getInfo = (root = "./") => {
  const p = (0, import_node.getAbsolutePath)(root);
  const svnInfoRaw = (0, import_node_child_process.execSync)(`cd ${p} && svn info`, { encoding: "utf-8" });
  const infoList = svnInfoRaw.split("\n").map((line) => {
    return line.split(":").map((i) => i.trim());
  });
  const result = {};
  for (const [k, v] of infoList) {
    result[k.split(" ").join("")] = v;
  }
  result.raw = svnInfoRaw;
  return result;
};
var Svn = class {
  static get info() {
    return getInfo();
  }
  static get revision() {
    return getRevision();
  }
  static get status() {
    return getStatus();
  }
  static commit = commit;
  static update = update;
};
var src_default = Svn;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Svn
});
