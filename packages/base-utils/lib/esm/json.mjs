import { Logger } from "./logger.mjs";
//#region packages/base-utils/src/json.ts
const jsonTryParse = (val, errorResult = void 0, reviver) => {
	try {
		return JSON.parse(val, reviver);
	} catch {
		Logger.error("JSON 解析失败");
		return errorResult;
	}
};
function toJsonString(val, errorResult = void 0, replacer = void 0, space) {
	try {
		return JSON.stringify(val, replacer || void 0, space || 2);
	} catch {
		Logger.error("JSON 化输出失败");
		return errorResult;
	}
}
var HumanFriendlyJSON = class {
	stringify = toJsonString;
	parse = jsonTryParse;
};
//#endregion
export { HumanFriendlyJSON, jsonTryParse, toJsonString };
