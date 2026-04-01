Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_child_process = require("./child_process.cjs");
const require_path = require("./path.cjs");
const require_util = require("./util.cjs");
const require_PathProgram = require("./PathProgram.cjs");
Object.defineProperty(exports, "child_process", {
	enumerable: true,
	get: function() {
		return require_child_process.child_process_exports;
	}
});
exports.getAbsolutePath = require_path.getAbsolutePath;
exports.getCommandFile = require_path.getCommandFile;
exports.getDirectoryPaths = require_path.getDirectoryPaths;
exports.getFilePaths = require_path.getFilePaths;
exports.getPathProgram = require_PathProgram.getPathProgram;
exports.pipeCross = require_util.pipeCross;
