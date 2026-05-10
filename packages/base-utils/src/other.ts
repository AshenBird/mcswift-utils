import { Logger } from "./logger";
export const simpleClone = (val: unknown) => {
  try {
    if (typeof val !== "object") return val;
    if (globalThis.structuredClone) {
      return globalThis.structuredClone(val);
    }
    return JSON.parse(JSON.stringify(val));
  } catch (e) {
    Logger.error(e);
    throw e;
  }
};
