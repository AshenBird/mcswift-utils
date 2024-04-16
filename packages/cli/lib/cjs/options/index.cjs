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

// packages/cli/src/options/index.ts
var options_exports = {};
__export(options_exports, {
  array: () => array,
  boolean: () => boolean,
  number: () => number,
  options: () => options,
  string: () => string
});
module.exports = __toCommonJS(options_exports);
var import_Option = require("./Option.cjs");
var import_const = require("./const.cjs");
var string = () => {
  return new import_Option.StringOption();
};
var number = () => {
  return new import_Option.NumberOption();
};
var boolean = () => {
  return new import_Option.BooleanOption();
};
var array = () => {
  return new import_Option.ArrayOption();
};
var options = (shape) => {
  const _shape = Object.entries(shape).reduce((r, [k, v]) => {
    r[k] = v.shape;
    return r;
  }, {});
  return {
    shape: _shape,
    check: (val) => {
      for (const [k, v] of Object.entries(shape)) {
        if (v.shape.required && (!val[k] || !!v.shape.alias && !val[v.shape.alias])) {
          return false;
        }
        if (!v.check(val[k]))
          return false;
      }
      return true;
    },
    parse: (val) => {
      for (const [k, v] of Object.entries(shape)) {
        if (v.shape.required && (!val[k] || !!v.shape.alias && !val[v.shape.alias])) {
          return {
            status: false,
            message: v.requiredErrorMessage(k),
            reason: "required",
            data: val
          };
        }
        if (!v.check(val[k])) {
          return {
            status: false,
            reason: "type",
            message: v.typeErrorMessage(k, val[k]),
            data: val
          };
        }
      }
      return {
        status: true,
        reason: "none",
        message: "pass",
        data: val
      };
    },
    [import_const.TYPE]: {}
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  array,
  boolean,
  number,
  options,
  string
});
