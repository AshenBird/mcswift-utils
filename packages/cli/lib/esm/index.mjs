// packages/cli/src/index.ts
import { argv } from "node:process";
import { z } from "zod";
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
var OptionsSchema = z.object({});
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
    const [_node, _entry, name, ...args] = argv;
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
export {
  Cli,
  Command,
  optionHandle,
  resolveCliOption
};
