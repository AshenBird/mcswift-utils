type PinyinOption = {
    checkPolyphone?: boolean;
    charcase?: string;
};
export declare class Pinyin {
    options: PinyinOption;
    char_dict: string;
    full_dict: Record<string, string>;
    polyphone: Record<string, string>;
    constructor(ops?: PinyinOption);
    getFullChars(str: string): string;
    getCamelChars(str: string): string;
    _getFullChar(str: string): string | false | undefined;
    _capitalize(str: string): string | undefined;
    _getChar(ch: string): string;
    _getResult(chars: string[]): string;
    static fn: Pinyin;
    static getBeginPinyin: (str: string) => string;
    static getBeginCharAt: (str: string) => number;
    static getPyCharCode: (str: string) => number[];
    static comparePyCharCode: (a: string, b: string) => 0 | 1 | -1;
    static data_letter_sort: (data: Record<string, string>[], name: string) => {
        tag: unknown[];
        list: any[];
    };
}
export declare const instance: Pinyin;
export {};
