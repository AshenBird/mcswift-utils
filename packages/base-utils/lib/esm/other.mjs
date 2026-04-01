import { Logger } from "./logger.mjs";
//#region packages/base-utils/src/other.ts
const simpleClone = (val) => {
	try {
		return JSON.parse(JSON.stringify(val));
	} catch (e) {
		Logger.error(e);
		throw e;
	}
};
//#endregion
export { simpleClone };
