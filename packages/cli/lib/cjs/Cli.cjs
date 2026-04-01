Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_Command = require("./Command.cjs");
const require_utils = require("./utils.cjs");
require("./index.cjs");
let _mcswift_base_utils = require("@mcswift/base-utils");
let node_process = require("node:process");
//#region packages/cli/src/Cli.ts
var Cli = class {
	name;
	constructor(name = "") {
		this.name = name;
	}
	map = /* @__PURE__ */ new Map();
	use(arg1, arg2) {
		if (typeof arg1 === "string") {
			if (!arg2) throw null;
			this.map.set(arg1, arg2);
			return this;
		}
		if (arg1 instanceof require_Command.Command) {
			this.map.set(arg1.name, arg1);
			return this;
		}
		const command = new require_Command.Command(arg1);
		this.map.set(command.name, command);
		return this;
	}
	help() {}
	readme() {}
	banner() {}
	async run(name, options = {}) {
		if (!Array.isArray(name)) return this._run(name, options);
		for (const n of name) await this._run(n, options);
		return this;
	}
	async _run(name, options = {}) {
		const command = this.map.get(name);
		if (!command) {
			if (command === "help") return this.help();
			if (command === "readme") return this.readme();
			_mcswift_base_utils.Logger.warn(`Can't found ${name} command. Please check you input.`);
			return this;
		}
		let _options = options;
		if (command instanceof require_Command.Command && command.schema) _options = command.schema.parse(options);
		if (command instanceof require_Command.Command) await command.handle(_options, this);
		else await command(_options, this);
		return this;
	}
	start() {
		const [_node, _entry, name, ...args] = node_process.argv;
		const options = require_utils.resolveCliOption(args);
		this.run(name, options);
	}
};
//#endregion
exports.Cli = Cli;
