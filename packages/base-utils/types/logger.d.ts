export declare class Logger {
    static log: (info: unknown) => void;
    static info: (info: unknown) => void;
    static error: (info: unknown) => void;
    static warn: (info: unknown) => void;
    static debug: (info: unknown) => void;
    private channel;
    constructor(channel: string);
    private levelFac;
    log(...args: unknown[]): void;
    info(...args: unknown[]): void;
    error(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    debug(...args: unknown[]): void;
}
