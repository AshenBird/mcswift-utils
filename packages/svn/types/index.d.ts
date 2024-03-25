export declare class Svn {
    static get info(): {
        Path: string;
        WorkingCopyRootPath: string;
        URL: string;
        RelativeURL: string;
        RepositoryRoot: string;
        RepositoryUUID: string;
        Revision: string;
        NodeKind: string;
        Schedule: string;
        LastChangedAuthor: string;
        LastChangedRev: string;
        LastChangedDate: string;
        raw: string;
    };
    static get revision(): string;
    static get status(): SvnStatusResult;
    static commit: (fileList: string[], message: string, root?: string) => void;
    static update: (root?: string) => void;
}
export default Svn;
export type SvnStatusRecord = {
    type: string;
    path: string;
    absolute: string;
};
export type SvnStatusResult = {
    counts: {
        total: number;
        [type: string]: number;
    };
    status: SvnStatusRecord[];
    raw: string;
};
