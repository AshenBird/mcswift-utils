Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region packages/cli/src/utils.ts
const resolveCliOption = (options, schema) => {
	if (schema) return resolveCliOptionWithSchema(options, schema);
	const coups = options.join(" ").split("--").map((coup) => coup.split(" ").map((w) => w.trim()).filter((w) => !!w)).filter((c) => c.length > 0);
	const result = {};
	const nullNameOption = [];
	for (const [k, v] of coups) {
		if (k.includes("=")) {
			if (v) {
				nullNameOption.push(v);
				continue;
			}
			const nc = k.split("=");
			if (nc.length > 2) throw new Error("瞎写参数");
			result[nc[0]] = optionHandle(nc[1]);
			continue;
		}
		if (typeof v === "undefined") {
			result[k] = true;
			continue;
		}
		result[k] = optionHandle(v);
	}
	return result;
};
const optionHandle = (val, forceString = false) => {
	if (val.startsWith("`") && val.endsWith("`")) return val.slice(1, -1);
	if (val.startsWith("\"") && val.endsWith("\"")) return val.slice(1, -1);
	if (forceString) return val;
	if (val === "true") return true;
	if (val === "false") return false;
	const r = Number(val);
	if (!isNaN(r)) return r;
	return val;
};
const resolveCliOptionWithSchema = (args, schema) => {
	const result = {};
	for (;;) {
		if (args.length === 0) break;
		const arg = args.shift();
		if (arg.startsWith("--")) {
			const raw = arg.slice(2);
			if (raw.includes("=")) {
				const [name, val] = raw.split("=");
				result[name] = optionHandle(val, schema.getType(name) === "string");
				continue;
			}
			const name = raw;
			if (schema.getType(name) === "boolean") {
				result[name] = true;
				continue;
			}
			const val = args.shift();
			if (!val) throw new Error(`${name} option can't found value.`);
			result[name] = optionHandle(val, schema.getType(name) === "string");
			continue;
		}
	}
	const report = schema.parse(result);
	if (report.status) return result;
	throw report;
};
//#endregion
exports.optionHandle = optionHandle;
exports.resolveCliOption = resolveCliOption;
