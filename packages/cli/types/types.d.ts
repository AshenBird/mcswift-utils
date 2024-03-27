import { z } from "zod";
import { Cli } from "./Cli";
declare const _OptionsSchema: z.ZodObject<{
    [k: string]: z.ZodString | z.ZodBoolean | z.ZodNull | z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    [x: string]: string | number | boolean | null;
}, {
    [x: string]: string | number | boolean | null;
}>;
type _CommonOptionsSchema = typeof _OptionsSchema;
export interface CommonOptionsSchema extends _CommonOptionsSchema {
}
export type COS = CommonOptionsSchema;
export type CommandOption<T extends COS = COS> = z.infer<T>;
export type CO<T extends COS = COS> = CommandOption<T>;
export interface CommandHandle<T extends COS = COS> {
    (options: CO<T>, cli: Cli): unknown;
}
export type CH<T extends COS = COS> = CommandHandle<T>;
export interface CommandInitial<T extends COS = COS> {
    name: string | symbol;
    handle: CommandHandle<T>;
    schema?: T;
}
export type CI<T extends COS = COS> = CommandInitial<T>;
export {};
