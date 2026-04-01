Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_commands = require("./commands.cjs");
const require_program = require("./program.cjs");
exports.getInstalledApp = require_program.getInstalledApp;
exports.getInstalledAppCommand = require_commands.getInstalledAppCommand;
exports.installedAppMap = require_program.installedAppMap;
