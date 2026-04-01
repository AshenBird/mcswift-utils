import type { CommandInit, Handle, Options, Schema } from "./types";

export class Command<T extends Options = Options> {
  name: string = "";
  handle: Handle<T>;
  schema?: Schema<T>;
  constructor(options: CommandInit<T>) {
    const { handle, schema, name } = options;
    this.handle = handle;
    this.schema = schema;
    this.name = name;
  }
}
