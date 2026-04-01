Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_logger = require("./logger.cjs");
//#region packages/base-utils/src/other.ts
const simpleClone = (val) => {
	try {
		return JSON.parse(JSON.stringify(val));
	} catch (e) {
		require_logger.Logger.error(e);
		throw e;
	}
};
//#endregion
exports.simpleClone = simpleClone;
