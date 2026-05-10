import type { Options } from "./types";

export const splitOptions = (options: string[]) => {
  const first = options
    .join(" ") // 重新拼接成字符串
    .split("--"); // 按照 -- 重新分隔
  const coups = first
    .map((coup) =>
      coup
        .split(" ")
        .map((w) => w.trim())
        .filter((w) => !!w),
    )
    .filter((c) => c.length > 0);
  const result: Options = {};
  const nullNameOption: string[] = [];
  for (const [k, v] of coups) {
    // 非空格分隔参数
    if (k.includes("=")) {
      if (v) {
        nullNameOption.push(v);
        continue;
      }
      const nc = k.split("=");
      if (nc.length > 2) throw new Error("瞎写参数");
      result[nc[0]] = optionHandle(nc[1]);
      continue;
    }
    // 开关参数
    if (typeof v === "undefined") {
      result[k] = true;
      continue;
    }
    // 通常参数
    result[k] = optionHandle(v);
  }
  return result;
};

// 将一些模式值转换成 js 兼容的值

export function optionHandle(
  val: string,
): string | boolean | number | (string | boolean | number)[];
export function optionHandle(val: string, sub: true): string | boolean | number;
export function optionHandle<T extends boolean = false>(val: string, sub?: T) {
  // case "bar foo",bar,"foo bar"
  // exclude case "foo,bar"
  Array: if (!sub && val.includes(",")) {
    const splited = val.split(",");
    if (
      splited.some((str) => {
        const cod1 = str.startsWith("`") && !str.endsWith("`");
        const cod2 = str.startsWith('"') && !str.endsWith('"');
        return cod1 || cod2;
      })
    )
      break Array;
    // 当处理子项时，我们将 sub 标志设为 true 强制进入子项逻辑
    return splited.map((str) => optionHandle(str, true));
  }
  if (val.startsWith("`") && val.endsWith("`")) {
    return val.slice(1, -1);
  }
  if (val.startsWith('"') && val.endsWith('"')) {
    return val.slice(1, -1);
  }
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  const r = Number(val);
  if (!isNaN(r)) return r;
  return val;
}
