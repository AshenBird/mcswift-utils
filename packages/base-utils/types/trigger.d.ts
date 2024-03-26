/**
 * 一个环境无关的事件触发器实现
 */
export declare class Trigger<T = undefined> {
    private callbackMap;
    constructor();
    on(callback: (payload: T) => void): symbol;
    once(callback: (payload: T) => void): void;
    off(key: symbol): void;
    off(callback: (payload?: T) => unknown): void;
    dispatch(payload: T): void;
    private run;
}
