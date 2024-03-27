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

// packages/base-utils/src/json.ts
var json_exports = {};
__export(json_exports, {
  HumanFriendlyJSON: () => HumanFriendlyJSON,
  jsonTryParse: () => jsonTryParse,
  toJsonString: () => toJsonString
});
module.exports = __toCommonJS(json_exports);
var import_logger = require("./logger.cjs");
var jsonTryParse = (val, errorResult = void 0, reviver) => {
  try {
    return JSON.parse(val, reviver);
  } catch {
    import_logger.Logger.error("JSON \u89E3\u6790\u5931\u8D25");
    return errorResult;
  }
};
function toJsonString(val, errorResult = void 0, replacer = void 0, space) {
  try {
    return JSON.stringify(val, replacer || void 0, space || 2);
  } catch (_e) {
    import_logger.Logger.error("JSON \u5316\u8F93\u51FA\u5931\u8D25");
    return errorResult;
  }
}
var HumanFriendlyJSON = class {
  stringify = toJsonString;
  parse = jsonTryParse;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HumanFriendlyJSON,
  jsonTryParse,
  toJsonString
});
