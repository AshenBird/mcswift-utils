export declare const jsonTryParse: (val: string, errorResult?: unknown, reviver?: ((this: unknown, key: string, value: unknown) => unknown) | undefined) => any;
export declare function toJsonString(value: unknown, errorResult?: unknown, replacer?: ((this: unknown, key: string, value: unknown) => unknown) | undefined, space?: string | number | undefined): string;
export declare class HumanFriendlyJSON {
    stringify: typeof toJsonString;
    parse: (val: string, errorResult?: unknown, reviver?: ((this: unknown, key: string, value: unknown) => unknown) | undefined) => any;
}
