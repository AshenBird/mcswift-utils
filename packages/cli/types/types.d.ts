import type { Cli } from "./Cli";
import type { Infer, Schema } from "./options/types";
export type Options<T extends Schema = Schema> = Infer<T>;
export interface Handle<T extends Schema = Schema> {
    (options: Options<T>, cli: Cli): unknown;
}
export type CommandInit<T extends Schema = Schema> = {
    name: string;
    handle: Handle<T>;
    schema: T;
};
export * from "./options/types";
