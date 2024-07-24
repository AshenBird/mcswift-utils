import { OptionTypeName, OptionType, OptionTypeMap } from "./types";
import { TYPE } from "./const";
export declare abstract class AbstractOption<T extends OptionTypeName, S extends OptionType = OptionTypeMap[T]> {
    readonly type: T;
    private _alias;
    private _required;
    [TYPE]?: S;
    requiredErrorMessage(name: string): string;
    typeErrorMessage(name: string, val: unknown): string;
    get shape(): {
        type: T;
        alias: string;
        required: boolean;
    };
    constructor(type: T);
    abstract check(val: unknown): val is S;
    alias(name: string): this;
    required(): this & {
        [TYPE]: S;
    };
}
export declare class StringOption extends AbstractOption<"string"> {
    constructor();
    check(val: unknown): val is string;
}
export declare class NumberOption extends AbstractOption<"number"> {
    constructor();
    check(val: unknown): val is number;
}
export declare class BooleanOption extends AbstractOption<"boolean"> {
    constructor();
    check(val: unknown): val is boolean;
}
export declare class ArrayOption extends AbstractOption<"array"> {
    constructor();
    check(val: unknown): val is string[];
}
