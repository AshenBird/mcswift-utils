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
  }
  map = /* @__PURE__ */ new Map();
  use(arg1, arg2) {
    if (typeof arg1 === "string") {
      if (!arg2)
        throw null;
      this.map.set(arg1, arg2);
      return this;
    }
    if (arg1 instanceof Command) {
      this.map.set(arg1.name, arg1);
      return this;
    }
    const command = new Command(arg1);
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
      Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = options;
    if (command instanceof Command && command.schema) {
      const result = command.schema.parse(options);
      if (!result.status) {
        return;
      }
      _options = result.data;
    }
    if (command instanceof Command)
      await command.handle(_options, this);
    else
      await command(_options, this);
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
