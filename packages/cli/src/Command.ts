import type { CommandInit, Handle, Options, Schema } from "./types";

export class Command<T extends Options = Options> {
  private _name: string = "";
  private _description: string = "";
  private _readme?: string;
  handle: Handle<T>;
  schema?: Schema<T>;

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  constructor(options: CommandInit<T>) {
    const { handle, schema, name, description } = options;
    this.handle = handle;
    this.schema = schema;
    this._name = name;
    this._description = description || "";
    return this;
  }
}
export const isCommand = (value: unknown): value is Command =>
  value instanceof Command;
