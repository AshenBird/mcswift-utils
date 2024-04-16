// packages/cli/src/options/Option.ts
import { TYPE } from "./const.mjs";
var AbstractOption = class {
  type;
  _alias = "";
  _required = false;
  [TYPE];
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
export {
  AbstractOption,
  ArrayOption,
  BooleanOption,
  NumberOption,
  StringOption
};
