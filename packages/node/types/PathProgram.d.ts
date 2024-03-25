type PathProgramInfo = {
    name: string;
    type: string;
    call: string;
    path: string;
};
export declare const getPathProgram: () => Promise<Map<string, PathProgramInfo[]>>;
export {};
