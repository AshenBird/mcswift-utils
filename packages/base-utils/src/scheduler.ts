/**
 * 一个队列调度器实现
 */
export class Scheduler {
  queueList: QueueRecord[] = [];
  stop: boolean = false;
  options: SchedulerOptions = {
    delay: 0,
    checkRunAfterAdd: true,
    concurrency: 1,
    cluster: false, // node only
  };
  get size() {
    const { queueList: list } = this;
    return list.length === 1 ? list[0].map.size : list.map((l) => l.map.size);
  }
  get pause() {
    return this.queueList.every((item) => item.pause);
  }
  constructor(options: SchedulerInitOptions = {}) {
    this.optionInit(options);
    // 初始化队列
    if (this.options.concurrency < 1) {
      throw new Error("并发数必须大于0");
    }
    for (;;) {
      if (this.queueList.length === this.options.concurrency) break;
      this.queueList.push({
        pause: true,
        map: new Map(),
      });
    }
  }
  private optionInit(options: SchedulerInitOptions) {
    for (const [key, item] of Object.entries(options)) {
      // @ts-ignore 同源的类型，肯定可以的
      this.options[key] = item;
    }
  }
  private pickShortestQueue() {
    let shortestQueue = this.queueList[0];
    for (const queue of this.queueList) {
      if (queue.map.size < shortestQueue.map.size) {
        shortestQueue = queue;
      }
    }
    return shortestQueue;
  }
  add<T>(task: Task<T>) {
    const taskRecord = {
      action: () => new Promise(() => {}),
      resolve: (value: T) => {},
      reject: (err: any) => {},
    };
    const result = new Promise<T>((resolve, reject) => {
      taskRecord.resolve = resolve;
      taskRecord.reject = reject;
    });
    const action = async () => {
      const r = await task();
      taskRecord.resolve(r);
    };
    taskRecord.action = action;
    const shortestQueue = this.pickShortestQueue();

    shortestQueue.map.set(Symbol(), taskRecord);
    if (this.options.checkRunAfterAdd && this.pause) {
      this.run();
    }
    return result;
  }
  async run() {
    for (const record of this.queueList) {
      this.runQueue(record);
    }
  }
  private async runQueue(queueRecord: QueueRecord) {
    queueRecord.pause = false;
    const queue = queueRecord.map.entries();
    for (;;) {
      if (this.stop) break;
      if (queueRecord.map.size === 0) break;
      const item = queue.next();
      if (!item) continue;
      const [key, record] = item.value;
      const { action, resolve, reject } = record;
      await action().then(resolve).catch(reject);
      queueRecord.map.delete(key);
      if (this.options.delay) await this.wait(this.options.delay);
    }
    if (queueRecord.map.size !== 0) {
      await this.runQueue(queueRecord);
    }
    queueRecord.pause = true;
  }
  private wait = (time: number) =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve();
      }, time);
    });

  static wait = (time: number) =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve();
      }, time);
    });
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
