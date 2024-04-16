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

// packages/cli/src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  optionHandle: () => optionHandle,
  resolveCliOption: () => resolveCliOption
});
module.exports = __toCommonJS(utils_exports);
var resolveCliOption = (options, schema) => {
  if (schema)
    return resolveCliOptionWithSchema(options, schema);
  const first = options.join(" ").split("--");
  const coups = first.map(
    (coup) => coup.split(" ").map((w) => w.trim()).filter((w) => !!w)
  ).filter((c) => c.length > 0);
  const result = {};
  const nullNameOption = [];
  for (const [k, v] of coups) {
    if (k.includes("=")) {
      if (v) {
        nullNameOption.push(v);
        continue;
      }
      const nc = k.split("=");
      if (nc.length > 2)
        throw new Error("\u778E\u5199\u53C2\u6570");
      result[nc[0]] = optionHandle(nc[1]);
      continue;
    }
    if (typeof v === "undefined") {
      result[k] = true;
      continue;
    }
    result[k] = optionHandle(v);
  }
  return result;
};
var optionHandle = (val, forceString = false) => {
  if (val.startsWith("`") && val.endsWith("`")) {
    return val.slice(1, -1);
  }
  if (val.startsWith('"') && val.endsWith('"')) {
    return val.slice(1, -1);
  }
  if (forceString)
    return val;
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  const r = Number(val);
  if (!isNaN(r))
    return r;
  return val;
};
var resolveCliOptionWithSchema = (args, schema) => {
  const result = {};
  const _ = [];
  const getType = (name) => schema.shape[name].type;
  for (; ; ) {
    if (args.length === 0)
      break;
    const arg = args.shift();
    if (arg.startsWith("--")) {
      const raw = arg.slice(2);
      if (raw.includes("=")) {
        const [name2, val2] = raw.split("=");
        const value2 = optionHandle(val2, getType(name2) === "string");
        result[name2] = value2;
        continue;
      }
      const name = raw;
      if (getType(name) === "boolean") {
        result[name] = true;
        continue;
      }
      const val = args.shift();
      if (!val)
        throw new Error(`${name} option can't found value.`);
      const value = optionHandle(val, getType(name) === "string");
      result[name] = value;
      continue;
    }
    if (arg.startsWith("--")) {
    }
  }
  const report = schema.parse(result);
  if (report.status)
    return result;
  throw report;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  optionHandle,
  resolveCliOption
});
