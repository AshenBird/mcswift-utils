import type { CommandInit, Handle, Schema } from "./types";
export declare class Command<T extends Schema = Schema> {
    name: string;
    handle: Handle<T>;
    schema: T;
    constructor(options: CommandInit<T>);
}
