import { Logger } from "./logger";
export const jsonTryParse = (val: string, errorResult: unknown = undefined,reviver?: ((this: unknown, key: string, value: unknown) => unknown) | undefined) => {
  try {
    return JSON.parse(val,reviver);
  } catch {
    Logger.error("JSON 解析失败");
    return errorResult;
  }
};
export function toJsonString(
  value: unknown,
  errorResult?: unknown,
  replacer?: ((this: unknown, key: string, value: unknown) => unknown) | undefined,
  space?: string | number | undefined
): string;
export function toJsonString(
  val: unknown,
  errorResult: unknown = undefined,
  replacer:
    | ((this: unknown, key: string, value: unknown) => unknown)
    | undefined 
    | null = undefined,
  space?: string | number | undefined
) {
  try {
    return JSON.stringify(val, replacer||undefined, space||2);
  } catch (_e:unknown) {
    Logger.error("JSON 化输出失败");
    return errorResult;
  }
}

export class HumanFriendlyJSON {
  stringify = toJsonString;
  parse = jsonTryParse
}
