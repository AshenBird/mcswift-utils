import { Logger } from "./logger";
export const jsonTryParse = (val: string, errorResult: any = undefined,reviver?: ((this: any, key: string, value: any) => any) | undefined) => {
  try {
    return JSON.parse(val,reviver);
  } catch {
    Logger.error("JSON 解析失败");
    return errorResult;
  }
};
export function toJsonString(
  value: any,
  errorResult?: any,
  replacer?: ((this: any, key: string, value: any) => any) | undefined,
  space?: string | number | undefined
): string;
export function toJsonString(
  val: unknown,
  errorResult: any = undefined,
  replacer:
    | ((this: any, key: string, value: any) => any)
    | undefined 
    | null = undefined,
  space?: string | number | undefined
) {
  try {
    return JSON.stringify(val, replacer||undefined, space||2);
  } catch (e) {
    Logger.error("JSON 化输出失败");
    return errorResult;
  }
}

export class HumanFriendlyJSON {
  stringify = toJsonString;
  parse = jsonTryParse
}
