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

// packages/node/src/child_process.ts
var child_process_exports = {};
__export(child_process_exports, {
  Promisify: () => Promisify
});
module.exports = __toCommonJS(child_process_exports);
var import_node_child_process = require("node:child_process");
var exec = (command, options) => {
  return new Promise((resolve, reject) => {
    (0, import_node_child_process.exec)(command, options, (err, out) => {
      if (err)
        return reject(err);
      resolve(out);
    });
  });
};
var Promisify = {
  exec
};
Object.seal(Promisify);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Promisify
});
