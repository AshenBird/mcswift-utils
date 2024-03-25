// packages/base-utils/src/logger.ts
import chalk from "chalk";
import { toJsonString } from "./index.mjs";
var getTimeText = () => {
  const date = /* @__PURE__ */ new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${timeString} `;
  return time;
};
var transform = (val) => {
  if (typeof val === "string")
    return val;
  const v = toJsonString(val);
  if (v)
    return v;
  return val;
};
var log = (info2) => {
  const { white, green } = chalk;
  console.log(green(getTimeText()), white(transform(info2)));
};
var info = (info2) => {
  const { gray, white } = chalk;
  console.log(gray(getTimeText()), white(transform(info2)));
};
var error = (info2) => {
  const { red, white } = chalk;
  console.log(red(getTimeText()), white(transform(info2)));
};
var warn = (info2) => {
  const { yellow, white } = chalk;
  console.log(yellow(getTimeText()), white(transform(info2)));
};
var debug = (info2) => {
  const { blue, white } = chalk;
  console.log(blue(getTimeText()), white(transform(info2)));
};
var Logger = class {
  static log = log;
  static info = info;
  static error = error;
  static warn = warn;
  static debug = debug;
};
export {
  Logger
};
