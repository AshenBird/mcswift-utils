// packages/base-utils/src/other.ts
import { Logger } from "./logger.mjs";
var simpleClone = (val) => {
  try {
    return JSON.parse(JSON.stringify(val));
  } catch (e) {
    Logger.error(e);
    throw e;
  }
};
export {
  simpleClone
};
