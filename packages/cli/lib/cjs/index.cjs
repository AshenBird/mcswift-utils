Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_Command = require("./Command.cjs");
const require_utils = require("./utils.cjs");
const require_Cli = require("./Cli.cjs");
exports.Cli = require_Cli.Cli;
exports.Command = require_Command.Command;
exports.optionHandle = require_utils.optionHandle;
exports.resolveCliOption = require_utils.resolveCliOption;
