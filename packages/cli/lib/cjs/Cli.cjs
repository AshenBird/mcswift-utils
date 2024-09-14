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
var Cli = class {
  name;
  constructor(name = "") {
    this.name = name;
  }
  map = /* @__PURE__ */ new Map();
  use(arg1, arg2) {
    if (typeof arg1 === "string") {
      if (!arg2)
        throw null;
      this.map.set(arg1, arg2);
      return this;
    }
    if (arg1 instanceof import_Command.Command) {
      this.map.set(arg1.name, arg1);
      return this;
    }
    const command = new import_Command.Command(arg1);
    this.map.set(command.name, command);
    return this;
  }
  help() {
  }
  readme() {
  }
  banner() {
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
      if (command === "help")
        return this.help();
      if (command === "readme")
        return this.readme();
      import_base_utils.Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = options;
    if (command instanceof import_Command.Command && command.schema) {
      const result = command.schema.parse(options);
      if (!result.status) {
        return;
      }
      _options = result.data;
    }
    if (command instanceof import_Command.Command)
      await command.handle(_options, this);
    else
      await command(_options, this);
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
