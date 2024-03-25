// packages/base-utils/src/json.ts
import { Logger } from "./logger.mjs";
var jsonTryParse = (val, errorResult = void 0, reviver) => {
  try {
    return JSON.parse(val, reviver);
  } catch {
    Logger.error("JSON \u89E3\u6790\u5931\u8D25");
    return errorResult;
  }
};
function toJsonString(val, errorResult = void 0, replacer = void 0, space) {
  try {
    return JSON.stringify(val, replacer || void 0, space || 2);
  } catch (e) {
    Logger.error("JSON \u5316\u8F93\u51FA\u5931\u8D25");
    return errorResult;
  }
}
var HumanFriendlyJSON = class {
  stringify = toJsonString;
  parse = jsonTryParse;
};
export {
  HumanFriendlyJSON,
  jsonTryParse,
  toJsonString
};
