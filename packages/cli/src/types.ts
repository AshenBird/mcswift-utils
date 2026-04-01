import type { Cli } from "./Cli";
import { Schema } from "./options/types";

export type Options = Record<string, string | number | boolean>;

/*-----------------------------------*/
export interface Handle<T extends Options> {
  (options: T, cli: Cli): unknown;
}

export type CommandInit<T extends Options> = {
  name: string;
  handle: Handle<T>;
  schema?: Schema<T>;
};

export * from "./options/types";
