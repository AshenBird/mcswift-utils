Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("./_virtual/_rolldown/runtime.cjs");
let node_child_process = require("node:child_process");
//#region packages/node/src/child_process.ts
var child_process_exports = /* @__PURE__ */ require_runtime.__exportAll({ Promisify: () => Promisify });
const exec = (command, options) => {
	return new Promise((resolve, reject) => {
		(0, node_child_process.exec)(command, options, (err, out) => {
			if (err) return reject(err);
			resolve(out);
		});
	});
};
const Promisify = { exec };
Object.seal(Promisify);
//#endregion
exports.Promisify = Promisify;
Object.defineProperty(exports, "child_process_exports", {
	enumerable: true,
	get: function() {
		return child_process_exports;
	}
});
