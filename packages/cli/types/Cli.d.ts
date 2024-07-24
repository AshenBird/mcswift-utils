import { Command } from "./Command";
import type { Handle, Options, Schema, CommandInit } from "./types";
export declare class Cli {
    readonly name: string;
    constructor(name?: string);
    private map;
    /**
     *
     * @param name
     * @param handle
     * @param schema
     */
    use<T extends Schema = Schema>(init: CommandInit<T>): this;
    /**
     * @param command
     */
    use<T extends Schema = Schema>(command: Command<T>): this;
    use(name: string, handle: Handle): this;
    help(): void;
    readme(): void;
    banner(): void;
    run(name: string | string[], options?: Options): Promise<void | this>;
    private _run;
    start(): void;
}
