import { __exportAll } from "./_virtual/_rolldown/runtime.mjs";
import { exec } from "node:child_process";
//#region packages/node/src/child_process.ts
var child_process_exports = /* @__PURE__ */ __exportAll({ Promisify: () => Promisify });
const exec$1 = (command, options) => {
	return new Promise((resolve, reject) => {
		exec(command, options, (err, out) => {
			if (err) return reject(err);
			resolve(out);
		});
	});
};
const Promisify = { exec: exec$1 };
Object.seal(Promisify);
//#endregion
export { Promisify, child_process_exports };
