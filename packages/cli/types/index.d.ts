import { ZodBoolean, ZodNull, ZodString, z } from "zod";
export declare const resolveCliOption: (options: string[]) => Record<string, string | boolean | null>;
export declare const optionHandle: (val: string) => (string | boolean | null);
declare const OptionsSchema: z.ZodObject<{
    [k: string]: ZodString | ZodBoolean | ZodNull;
}, "strip", z.ZodTypeAny, {
    [x: string]: string | boolean | null;
}, {
    [x: string]: string | boolean | null;
}>;
type OptionsSchema = typeof OptionsSchema;
type CommandInitial<T extends OptionsSchema = OptionsSchema> = {
    name: string;
    handle: (options: z.infer<T>) => unknown;
    schema?: T;
};
export declare class Cli {
    readonly name: string;
    constructor(name?: string);
    private map;
    use<T extends OptionsSchema = OptionsSchema>(name: string, handle: (options: z.infer<T>) => unknown, schema?: T): void;
    start(): void;
}
export declare class Command<T extends OptionsSchema = OptionsSchema> {
    name: string;
    handle: (options: z.infer<T>) => unknown;
    schema?: T;
    constructor(initial: CommandInitial<T>);
}
export {};
