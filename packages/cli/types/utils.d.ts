import type { Options, Schema } from "./types";
export declare const resolveCliOption: <T extends Schema = Schema>(options: string[], schema?: T | undefined) => Options<T> | Options;
export declare const optionHandle: (val: string, forceString?: boolean) => string | boolean | number;
