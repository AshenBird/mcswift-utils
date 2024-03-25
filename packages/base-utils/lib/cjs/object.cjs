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

// packages/base-utils/src/object.ts
var object_exports = {};
__export(object_exports, {
  deepFreeze: () => deepFreeze,
  deepSeal: () => deepSeal
});
module.exports = __toCommonJS(object_exports);
var deepSeal = (val) => {
  return deppHandle(val, Object.seal);
};
var deepFreeze = (val) => {
  return deppHandle(val, Object.freeze);
};
var deppHandle = (val, handle) => {
  handle(val);
  if (typeof val !== "object")
    return val;
  if (Array.isArray(val)) {
    for (const child of val) {
      handle(child);
    }
    return val;
  }
  for (const child of Object.values(val)) {
    handle(child);
  }
  return val;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deepFreeze,
  deepSeal
});
