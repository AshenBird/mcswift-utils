export declare const jsonTryParse: (val: string, errorResult?: any, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any;
export declare function toJsonString(value: any, errorResult?: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
export declare class HumanFriendlyJSON {
    stringify: typeof toJsonString;
    parse: (val: string, errorResult?: any, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any;
}
