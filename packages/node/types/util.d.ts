interface PlatformsImplement<T> {
    windows?: T;
    mac?: T;
    posix?: T;
}
export declare const pipeCross: <T>(imps: PlatformsImplement<T>) => NonNullable<T>;
export {};
