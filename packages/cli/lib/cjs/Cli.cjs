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

// packages/cli/src/Cli.ts
var Cli_exports = {};
__export(Cli_exports, {
  Cli: () => Cli
});
module.exports = __toCommonJS(Cli_exports);
var import_base_utils = require("@mcswift/base-utils");
var import_process = require("process");
var import__ = require("./index.cjs");
var import_Command = require("./Command.cjs");
var HELP = Symbol("help");
var README = Symbol("readme");
var Cli = class {
  name;
  constructor(name = "") {
    this.name = name;
    this._use(HELP, this.help.bind(this));
    this._use(README, this.readme.bind(this));
  }
  map = /* @__PURE__ */ new Map();
  _use(arg1, arg2, arg3) {
    const command = arg1 instanceof import_Command.Command ? arg1 : new import_Command.Command({
      name: arg1,
      handle: arg2,
      schema: arg3
    });
    this.map.set(command.name, command);
  }
  use(arg1, arg2, arg3) {
    if (typeof arg1 === "string") {
      return this._use(arg1, arg2, arg3);
    }
    return this._use(arg1);
  }
  help() {
  }
  readme() {
  }
  async run(name, options = {}) {
    if (!Array.isArray(name))
      return this._run(name, options);
    for (const n of name) {
      await this._run(n, options);
    }
    return this;
  }
  async _run(name, options = {}) {
    const command = this.map.get(name);
    if (!command) {
      import_base_utils.Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = options;
    if (command.schema) {
      const result = command.schema.safeParse(options);
      if (!result.success) {
        for (const [field, errs] of Object.entries(result.error.formErrors.fieldErrors)) {
          import_base_utils.Logger.error(`${field}: ${errs?.join("\n           ")}`);
        }
        return;
      }
      _options = result.data;
    }
    await command.handle(_options, this);
    return this;
  }
  start() {
    const [_node, _entry, name, ...args] = import_process.argv;
    const options = (0, import__.resolveCliOption)(args);
    this.run(name, options);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cli
});
