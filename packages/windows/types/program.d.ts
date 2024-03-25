type InstalledAppRecord = {
    path: string;
    name: string;
    extension: string;
};
type InstalledAppMap = Map<string, InstalledAppRecord>;
export declare const installedAppMap: Map<string, InstalledAppRecord>;
export declare const getInstalledApp: () => Promise<InstalledAppMap>;
export {};
