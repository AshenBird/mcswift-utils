
import type { CommandInit, Handle, Schema, } from "./types";

export class Command<T extends Schema = Schema> {
  name: string = "";
  handle: Handle<T>;
  schema: T;
  constructor(options:CommandInit<T>) {
    const {handle,schema,name} = options
    this.handle = handle;
    this.schema = schema;
    this.name = name;
  }
}
