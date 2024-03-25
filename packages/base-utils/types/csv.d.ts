export declare class CSV {
    stringify: (data: Record<string, unknown>[]) => Promise<import("@json2csv/whatwg/TransformStream.js").AwaitableReadableStream<string>>;
    parse: () => void;
}
