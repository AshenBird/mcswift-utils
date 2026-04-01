import { Options } from "../types";
import {
  ArrayOption,
  StringOption,
  NumberOption,
  BooleanOption,
} from "./Option";
import { TYPE } from "./const";

export type OptionsShape<T extends SchemaInit = SchemaInit> = {
  [Field in keyof T]: T[Field]["shape"];
};

export type OptionsInferType<T extends SchemaInit = SchemaInit> = {
  [Field in keyof T]: T[Field][typeof TYPE];
};

export type OptionTypeName = keyof OptionTypeMap;
export type OptionType = OptionTypeMap[keyof OptionTypeMap];
export type OptionTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  array: string[];
};

export type ParseErrorResult = {
  status: false;
  reason: "type" | "required" | "custom";
  message: string;
  data: unknown;
};
export type ParseSuccessResult<T> = {
  status: true;
  reason: "none";
  message: string;
  data: T;
};
export type ParseResult<T> = ParseErrorResult | ParseSuccessResult<T>;
export type Schema<O extends Options = Options> = {
  getType: (name: keyof O) => O[keyof O];
  parse: (val: O) => O;
  // shape: OptionsShape<T>;
  // check: (val: Record<string, unknown>) => val is OptionsInferType<T>;
  // parse: (val: Record<string, unknown>) => ParseResult<OptionsInferType<O>>;
};

export type OptionRaw = {
  _: string[];
  [name: string]: OptionType;
};
// export type _OptionSchemaInit<T extends OptionRaw = OptionRaw> = {
//   [Field in keyof T]:
// }
export type SchemaInit = {
  _?: ArrayOption;
} & {
  [name: string]: AllOption;
};

export type AllOption =
  | StringOption
  | NumberOption
  | BooleanOption
  | ArrayOption;

export type InferSchemaInit<T> = T extends Schema<infer Init> ? Init : never;
