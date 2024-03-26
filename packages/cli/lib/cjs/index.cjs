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

// packages/cli/src/index.ts
var src_exports = {};
__export(src_exports, {
  Cli: () => Cli,
  Command: () => Command,
  optionHandle: () => optionHandle,
  resolveCliOption: () => resolveCliOption
});
module.exports = __toCommonJS(src_exports);
var import_node_process = require("node:process");
var import_zod = require("zod");
var resolveCliOption = (options) => {
  const coups = options.join(" ").split("--").map(
    (coup) => coup.split(" ").map((w) => w.trim()).filter((w) => !!w)
  ).filter((c) => c.length > 0);
  const result = {};
  for (const [k, v] of coups) {
    if (k.includes("=")) {
      if (v)
        throw new Error("\u778E\u5199\u53C2\u6570");
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
var optionHandle = (val) => {
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === "null") {
    return null;
  }
  return val;
};
var OptionsSchema = import_zod.z.object({});
var Cli = class {
  name;
  constructor(name = "") {
    this.name = name;
  }
  map = /* @__PURE__ */ new Map();
  use(name, handle, schema) {
    const command = new Command({
      name,
      handle,
      schema
    });
    this.map.set(name, command);
  }
  start() {
    const [_node, _entry, name, ...args] = import_node_process.argv;
    const command = this.map.get(name);
    if (!command) {
      return;
    }
    const options = resolveCliOption(args);
    if (command.schema) {
      command.schema.parse(options);
    }
    command.handle(options);
  }
};
var Command = class {
  name = "";
  handle;
  schema;
  constructor(initial) {
    const { name, handle, schema } = initial;
    this.name = name;
    this.handle = handle;
    this.schema = schema;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cli,
  Command,
  optionHandle,
  resolveCliOption
});
