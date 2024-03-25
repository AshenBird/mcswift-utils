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

// packages/base-utils/src/csv.ts
var csv_exports = {};
__export(csv_exports, {
  CSV: () => CSV
});
module.exports = __toCommonJS(csv_exports);
var import_whatwg = require("@json2csv/whatwg");
var csvParser = new import_whatwg.AsyncParser(
  {
    eol: "\n"
  },
  {},
  {}
);
var CSVStringify = async (data) => {
  const csv = await csvParser.parse(data);
  return csv;
};
var CSV = class {
  stringify = CSVStringify;
  // @todo
  parse = () => {
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CSV
});
