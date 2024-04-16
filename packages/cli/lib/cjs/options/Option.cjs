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

// packages/cli/src/options/Option.ts
var Option_exports = {};
__export(Option_exports, {
  AbstractOption: () => AbstractOption,
  ArrayOption: () => ArrayOption,
  BooleanOption: () => BooleanOption,
  NumberOption: () => NumberOption,
  StringOption: () => StringOption
});
module.exports = __toCommonJS(Option_exports);
var import_const = require("./const.cjs");
var AbstractOption = class {
  type;
  _alias = "";
  _required = false;
  [import_const.TYPE];
  requiredErrorMessage(name) {
    return `'${name}' is required. But not found.`;
  }
  typeErrorMessage(name, val) {
    return `'${name}' expected ${this.type}, but get a ${typeof val}.`;
  }
  get shape() {
    const result = {
      type: this.type,
      alias: this._alias,
      required: this._required
    };
    Object.freeze(result);
    return result;
  }
  constructor(type) {
    this.type = type;
  }
  alias(name) {
    this._alias = name;
    return this;
  }
  required() {
    this._required = true;
    return this;
  }
};
var StringOption = class extends AbstractOption {
  constructor() {
    super("string");
  }
  check(val) {
    return typeof val === "string";
  }
};
var NumberOption = class extends AbstractOption {
  constructor() {
    super("number");
  }
  check(val) {
    return typeof val === "number";
  }
};
var BooleanOption = class extends AbstractOption {
  constructor() {
    super("boolean");
  }
  check(val) {
    return typeof val === "boolean";
  }
};
var ArrayOption = class extends AbstractOption {
  constructor() {
    super("array");
  }
  check(val) {
    if (!Array.isArray(val))
      return false;
    return val.every((v) => typeof v === "string");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AbstractOption,
  ArrayOption,
  BooleanOption,
  NumberOption,
  StringOption
});
