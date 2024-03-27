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

// packages/base-utils/src/logger.ts
var logger_exports = {};
__export(logger_exports, {
  Logger: () => Logger
});
module.exports = __toCommonJS(logger_exports);
var import_chalk = require("chalk");
var import_json = require("./json.cjs");
var { red, white, green, yellow, blue, gray } = new import_chalk.Chalk();
var getTimeText = () => {
  const date = /* @__PURE__ */ new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${timeString} `;
  return time;
};
var transform = (val) => {
  if (typeof val === "string")
    return val;
  const v = (0, import_json.toJsonString)(val);
  if (v)
    return v;
  return val;
};
var log = (info2) => {
  console.log(green(getTimeText()), white(transform(info2)));
};
var info = (info2) => {
  console.log(gray(getTimeText()), white(transform(info2)));
};
var error = (info2) => {
  console.log(red(getTimeText()), white(transform(info2)));
};
var warn = (info2) => {
  console.log(yellow(getTimeText()), white(transform(info2)));
};
var debug = (info2) => {
  console.log(blue(getTimeText()), white(transform(info2)));
};
var Logger = class {
  static log = log;
  static info = info;
  static error = error;
  static warn = warn;
  static debug = debug;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Logger
});
