// packages/base-utils/src/logger.ts
import { Chalk } from "chalk";
import { toJsonString } from "./json.mjs";
var { red, white, green, yellow, blue, gray } = new Chalk();
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
var store = /* @__PURE__ */ new Map();
var Logger = class {
  static log = log;
  static info = info;
  static error = error;
  static warn = warn;
  static debug = debug;
  channel;
  constructor(channel) {
    this.channel = channel;
    store.set(channel, this);
  }
  levelFac(level, color) {
    return (...args) => console.log(
      color(`${getTimeText()}|${level}|${this.channel}]`),
      ...args.map((info2) => white(transform(info2)))
    );
  }
  log(...args) {
    this.levelFac("LOG", green)(...args);
  }
  info(...args) {
    this.levelFac("INFO", green)(...args);
  }
  error(...args) {
    this.levelFac("ERROR", red)(...args);
  }
  warn(...args) {
    this.levelFac("WARN", yellow)(...args);
  }
  debug(...args) {
    this.levelFac("DEBUG", blue)(...args);
  }
};
export {
  Logger
};
