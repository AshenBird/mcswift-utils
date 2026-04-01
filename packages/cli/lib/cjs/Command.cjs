Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region packages/cli/src/Command.ts
var Command = class {
	name = "";
	handle;
	schema;
	constructor(options) {
		const { handle, schema, name } = options;
		this.handle = handle;
		this.schema = schema;
		this.name = name;
	}
};
//#endregion
exports.Command = Command;
