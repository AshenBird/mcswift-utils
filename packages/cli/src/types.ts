import type { Cli } from "./Cli";

export type Options = Record<
  string,
  string | number | boolean | (string | number | boolean)[]
>;

/*-----------------------------------*/
export interface Handle<T extends Options> {
  (options: T, cli: Cli): unknown;
}

export interface Schema<O extends Options> {
  check(options: Options): CheckResult;
  parse(args: string[]): O;
}

export type CommandInit<T extends Options> = {
  name: string;
  handle: Handle<T>;
  schema?: Schema<T>;
  description?: string; // default ""
  readme?: string; // default ""
};

export type CheckResult = {
  status: "pass" | "fail";
  errors: {
    option: string;
    value: any;
    message: string;
    type: "miss required" | "wrong type";
  }[];
};
export interface OptionItem {
  name: string;
  type: "string" | "number" | "boolean";
  required?: boolean; // default false
  description?: string; // default ""
}

export type SchemaInit = {
  options: OptionItem[];
};
