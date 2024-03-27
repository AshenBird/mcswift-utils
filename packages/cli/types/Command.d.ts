import type { COS, CH, CI } from "./types";
export declare class Command<T extends COS = COS> {
    name: string;
    handle: CH<T>;
    schema?: T;
    constructor(initial: CI<T>);
}
