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

// packages/npm/src/index.ts
var src_exports = {};
__export(src_exports, {
  NpmPackage: () => NpmPackage
});
module.exports = __toCommonJS(src_exports);
var import_node = require("@mcswift/node");
var import_fs_extra = require("fs-extra");
var NpmPackage = class _NpmPackage {
  root;
  constructor(root) {
    this.root = (0, import_node.getAbsolutePath)(root);
    return new Proxy(this, {
      get(target, p) {
        const r = Reflect.get(target, p);
        if (!r)
          return target.data[p];
        if (typeof r === "function") {
          return r.bind(target);
        }
        return r;
      }
    });
  }
  cache = null;
  get data() {
    if (this.cache)
      return this.cache;
    return this.getPackageInfo();
  }
  getPackageInfo() {
    this.cache = _NpmPackage.getPackageInfo(this.root);
    Object.seal(this.cache);
    return this.cache;
  }
  setPackageInfo(key, value) {
    return _NpmPackage.setPackageInfo(key, value, this.root);
  }
  static getPackageInfo = (root = "./") => {
    const p = (0, import_node.getAbsolutePath)(root);
    const result = (0, import_fs_extra.readJSONSync)(`${p}/package.json`);
    return result;
  };
  static setPackageInfo = (key, value, root = "./") => {
    const p = (0, import_node.getAbsolutePath)(root);
    const content = this.getPackageInfo(root);
    content[key] = value;
    const result = (0, import_fs_extra.writeJSONSync)(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n"
    });
    return result;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NpmPackage
});
