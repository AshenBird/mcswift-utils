/// <reference types="node" />
import { ExecOptions } from "node:child_process";
export declare const Promisify: {
    exec: (command: string, options: ExecOptions) => Promise<string>;
};
