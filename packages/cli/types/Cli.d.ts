import { Command } from "./Command";
import { COS, CH, CO } from "./types";
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
    private _use;
    /**
     *
     * @param name
     * @param handle
     * @param schema
     */
    use<T extends COS = COS>(name: string, handle: CH<T>, schema?: T): void;
    /**
     *
     * @param command
     */
    use<T extends COS = COS>(command: Command<T>): void;
    help(): void;
    readme(): void;
    run(name: string | string[], options?: CO): Promise<this | undefined>;
    _run(name: string, options?: CO): Promise<this | undefined>;
    start(): void;
}
