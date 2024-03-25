import type { NPM } from "@mcswift/types";
export declare class NpmPackage {
    root: string;
    constructor(root: string);
    private cache;
    get data(): NPM.Package;
    getPackageInfo(): NPM.Package;
    setPackageInfo<K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K]): void;
    static getPackageInfo: (root?: string) => NPM.Package;
    static setPackageInfo: <K extends keyof NPM.Package>(key: K, value: Required<NPM.Package>[K], root?: string) => void;
}
