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

// packages/base-utils/src/logger.ts
var logger_exports = {};
__export(logger_exports, {
  Logger: () => Logger
});
module.exports = __toCommonJS(logger_exports);
var import_chalk = __toESM(require("chalk"), 1);
var import__ = require("./index.cjs");
var getTimeText = () => {
  const date = /* @__PURE__ */ new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${timeString} `;
  return time;
};
var transform = (val) => {
  if (typeof val === "string")
    return val;
  const v = (0, import__.toJsonString)(val);
  if (v)
    return v;
  return val;
};
var log = (info2) => {
  const { white, green } = import_chalk.default;
  console.log(green(getTimeText()), white(transform(info2)));
};
var info = (info2) => {
  const { gray, white } = import_chalk.default;
  console.log(gray(getTimeText()), white(transform(info2)));
};
var error = (info2) => {
  const { red, white } = import_chalk.default;
  console.log(red(getTimeText()), white(transform(info2)));
};
var warn = (info2) => {
  const { yellow, white } = import_chalk.default;
  console.log(yellow(getTimeText()), white(transform(info2)));
};
var debug = (info2) => {
  const { blue, white } = import_chalk.default;
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
