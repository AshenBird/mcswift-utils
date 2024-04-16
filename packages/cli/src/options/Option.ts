import { OptionTypeName, OptionType, OptionTypeMap,  } from "./types";
import { TYPE } from "./const"


export abstract class AbstractOption<T extends OptionTypeName, S extends OptionType = OptionTypeMap[T]> {
  readonly type: T;
  private _alias: string = "";
  private _required: boolean = false;
  [TYPE]?: S;
  requiredErrorMessage(name: string) {
    return `'${name}' is required. But not found.`;
  }
  typeErrorMessage(name: string, val: unknown) {
    return `'${name}' expected ${this.type}, but get a ${typeof val}.`;
  }
  get shape() {
    const result = {
      type: this.type,
      alias: this._alias,
      required: this._required,
    };
    Object.freeze(result);
    return result;
  }
  constructor(type: T) {
    this.type = type;
  }
  abstract check(val: unknown): val is S;

  alias(name: string) {
    this._alias = name;
    return this;
  }
  required() {
    this._required = true;
    return this as this & { [TYPE]: S };
  }
}
export class StringOption extends AbstractOption<"string"> {
  constructor() {
    super("string");
  }
  check(val: unknown): val is string {
    return typeof val === "string";
  };
}
export class NumberOption extends AbstractOption<"number"> {
  constructor() {
    super("number");
  }
  check(val: unknown): val is number {
    return typeof val === "number";
  }
}

export class BooleanOption extends AbstractOption<"boolean"> {
  constructor() {
    super("boolean");
  }
  check(val: unknown): val is boolean {
    return typeof val === "boolean";
  }
}

export class ArrayOption extends AbstractOption<"array"> {
  constructor() {
    super("array");
  }
  check(val: unknown): val is string[] {
    if (!Array.isArray(val)) return false;
    return val.every((v) => typeof v === "string");
  }
}
