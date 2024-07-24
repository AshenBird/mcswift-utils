import { StringOption, NumberOption, BooleanOption, ArrayOption } from "./Option";
import { SchemaInit, Schema } from "./types";
export declare const string: () => StringOption;
export declare const number: () => NumberOption;
export declare const boolean: () => BooleanOption;
export declare const array: () => ArrayOption;
/**
 * 我们约定，`_` 参数必须是字符串数组
 * @param shape
 */
export declare const options: <T extends SchemaInit = SchemaInit>(shape: T) => Schema<T>;
