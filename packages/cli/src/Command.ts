import type { COS, CH, CI } from "./types";

export class Command<T extends COS = COS> {
  name: string = "";
  handle: CH<T>;
  schema?: T;
  constructor(initial: CI<T>) {
    const { name, handle, schema } = initial;
    this.handle = handle;
    this.schema = schema;
    if (typeof name === "symbol") {
      if (!name.description)
        throw new Error(
          "must provide 'description' when 'Command' name use symbol type."
        );
      this.name = name.description;
      return;
    }
    this.name = name;
  }
}
