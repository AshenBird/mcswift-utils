import { AsyncParser } from "@json2csv/whatwg";
//#region packages/base-utils/src/csv.ts
const csvParser = new AsyncParser({ eol: "\n" }, {}, {});
/**
* @param data 对象数组,每个元素是一条数据，数据中 key 将作为列名，value 讲作为值
* @returns
*/
const CSVStringify = async (data) => {
	return await csvParser.parse(data);
};
var CSV = class {
	stringify = CSVStringify;
	parse = () => {};
};
//#endregion
export { CSV };
