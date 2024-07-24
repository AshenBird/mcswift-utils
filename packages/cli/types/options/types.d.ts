import { ArrayOption, StringOption, NumberOption, BooleanOption } from "./Option";
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
export type Infer<T extends AllOption | Schema> = T[typeof TYPE];
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
export type Schema<T extends SchemaInit = SchemaInit> = {
    shape: OptionsShape<T>;
    check: (val: Record<string, unknown>) => val is OptionsInferType<T>;
    parse: (val: Record<string, unknown>) => ParseResult<OptionsInferType<T>>;
    [TYPE]: OptionsInferType<T>;
};
export type OptionRaw = {
    _: string[];
    [name: string]: OptionType;
};
export type SchemaInit = {
    _?: ArrayOption;
} & {
    [name: string]: AllOption;
};
export type AllOption = StringOption | NumberOption | BooleanOption | ArrayOption;
export type InferSchemaInit<T> = T extends Schema<infer Init> ? Init : never;
