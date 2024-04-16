import type { Options, Schema } from "./types";

export const resolveCliOption = <T extends Schema = Schema>(
  options: string[],
  schema?: T | undefined
): Options<T> | Options => {
  if (schema) return resolveCliOptionWithSchema(options, schema);
  const first = options
    .join(" ") // 重新拼接成字符串
    .split("--"); // 按照 -- 重新分隔
  const coups = first
    .map((coup) =>
      coup
        .split(" ")
        .map((w) => w.trim())
        .filter((w) => !!w)
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
export const optionHandle = (
  val: string,
  forceString = false
): string | boolean | number => {
  if (val.startsWith("`") && val.endsWith("`")) {
    return val.slice(1, -1);
  }
  if (val.startsWith('"') && val.endsWith('"')) {
    return val.slice(1, -1);
  }
  if (forceString) return val;
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  const r = Number(val);
  if (!isNaN(r)) return r;
  return val;
};
const resolveCliOptionWithSchema = <T extends Schema = Schema>(
  args: string[],
  schema: T
): Options<T> => {
  const result = {} as Options<T>;
  const _: string[] = [];
  const getType = (name: string) => schema.shape[name].type;
  for (;;) {
    if (args.length === 0) break;
    const arg = args.shift() as string;
    // 标准名称
    if (arg.startsWith("--")) {
      const raw = arg.slice(2);
      if (raw.includes("=")) {
        const [name, val] = raw.split("=");
        const value = optionHandle(val, getType(name) === "string");
        // @ts-ignore
        result[name] = value;
        continue;
      }
      const name = raw;
      if (getType(name) === "boolean") {
        // @ts-ignore
        result[name] = true;
        continue;
      }
      const val = args.shift();
      if (!val) throw new Error(`${name} option can't found value.`);
      const value = optionHandle(val, getType(name) === "string");
      // @ts-ignore
      result[name] = value;
      continue;
    }
    // 别名 @todo
    if (arg.startsWith("--")) {
    }
  }
  const report = schema.parse(result);
  if (report.status) return result;
  throw report;
};
