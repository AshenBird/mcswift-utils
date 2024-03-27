// packages/cli/src/Cli.ts
import { Logger } from "@mcswift/base-utils";
import { argv } from "process";
import { resolveCliOption } from "./index.mjs";
import { Command } from "./Command.mjs";
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
    const command = arg1 instanceof Command ? arg1 : new Command({
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
      Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = options;
    if (command.schema) {
      const result = command.schema.safeParse(options);
      if (!result.success) {
        for (const [field, errs] of Object.entries(result.error.formErrors.fieldErrors)) {
          Logger.error(`${field}: ${errs?.join("\n           ")}`);
        }
        return;
      }
      _options = result.data;
    }
    await command.handle(_options, this);
    return this;
  }
  start() {
    const [_node, _entry, name, ...args] = argv;
    const options = resolveCliOption(args);
    this.run(name, options);
  }
};
export {
  Cli
};
