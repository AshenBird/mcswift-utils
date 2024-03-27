
export const resolveCliOption = (options: string[]) => {
  const coups = options
    .join(" ") // 重新拼接成字符串
    .split("--") // 按照 -- 重新分隔
    .map((coup) =>
      coup
        .split(" ")
        .map((w) => w.trim())
        .filter((w) => !!w)
    )
    .filter((c) => c.length > 0);
  const result: Record<string, string | boolean | null|number> = {};
  for (const [k, v] of coups) {
    // 非空格分隔参数
    if (k.includes("=")) {
      if (v) throw new Error("瞎写参数");
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
export const optionHandle = (val: string): string | boolean | null|number => {
  if (val.startsWith('`') && val.endsWith('`')) {
    return val.slice(1, -1)
  }
  if (val.startsWith('"') && val.endsWith('"')) {
    return val.slice(1, -1)
  }
  if (val === "true") {
    return true;
  }
  if (val === "false") {
    return false;
  }
  if (val === "null") {
    return null;
  }
  const r = Number(val)
  if (!isNaN(r))return r
  return val;
};

