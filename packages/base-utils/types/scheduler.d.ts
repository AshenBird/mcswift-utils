/**
 * 一个队列调度器实现
 */
export declare class Scheduler {
    queueList: QueueRecord[];
    stop: boolean;
    options: SchedulerOptions;
    get size(): number | number[];
    get pause(): boolean;
    constructor(options?: SchedulerInitOptions);
    private optionInit;
    private pickShortestQueue;
    add<T>(task: Task<T>): Promise<T>;
    run(): Promise<void>;
    private runQueue;
    private wait;
    static wait: (time: number) => Promise<void>;
}
export type Task<T extends unknown> = () => Promise<T>;
export type TaskRecord<T> = {
    action: () => Promise<unknown>;
    resolve: (value: T) => void;
    reject: (err: any) => void;
};
export type TaskMap = Map<symbol, TaskRecord<any>>;
export type SchedulerOptions = {
    delay: number;
    checkRunAfterAdd: boolean;
    concurrency: number;
    cluster: boolean;
};
export type SchedulerInitOptions = Partial<SchedulerOptions>;
export type QueueRecord = {
    pause: boolean;
    map: TaskMap;
};
