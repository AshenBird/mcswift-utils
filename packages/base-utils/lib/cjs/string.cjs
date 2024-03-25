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

// packages/base-utils/src/string.ts
var string_exports = {};
__export(string_exports, {
  nanoid: () => nanoid,
  randomString: () => randomString
});
module.exports = __toCommonJS(string_exports);
var import_nanoid = require("nanoid");
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var alphabet = letters + letters.toLowerCase() + numbers;
var nanoid = (0, import_nanoid.customAlphabet)(alphabet);
var randomString = nanoid;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nanoid,
  randomString
});
