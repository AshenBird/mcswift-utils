Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_logger = require("./logger.cjs");
//#region packages/base-utils/src/json.ts
const jsonTryParse = (val, errorResult = void 0, reviver) => {
	try {
		return JSON.parse(val, reviver);
	} catch {
		require_logger.Logger.error("JSON 解析失败");
		return errorResult;
	}
};
function toJsonString(val, errorResult = void 0, replacer = void 0, space) {
	try {
		return JSON.stringify(val, replacer || void 0, space || 2);
	} catch {
		require_logger.Logger.error("JSON 化输出失败");
		return errorResult;
	}
}
var HumanFriendlyJSON = class {
	stringify = toJsonString;
	parse = jsonTryParse;
};
//#endregion
exports.HumanFriendlyJSON = HumanFriendlyJSON;
exports.jsonTryParse = jsonTryParse;
exports.toJsonString = toJsonString;
