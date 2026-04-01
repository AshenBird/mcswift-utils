Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("./_virtual/_rolldown/runtime.cjs");
const require_json = require("./json.cjs");
let chalk = require("chalk");
let node_console = require("node:console");
node_console = require_runtime.__toESM(node_console);
//#region packages/base-utils/src/logger.ts
const { red, white, green, yellow, blue, gray } = new chalk.Chalk();
const getTimeText = () => {
	return ` ${(/* @__PURE__ */ new Date()).toLocaleTimeString()} `;
};
const transform = (val) => {
	if (typeof val === "string") return val;
	const v = require_json.toJsonString(val);
	if (v) return v;
	return val;
};
const log = (info) => {
	node_console.default.log(green(getTimeText()), white(transform(info)));
};
const info = (info) => {
	node_console.default.log(gray(getTimeText()), white(transform(info)));
};
const error = (info) => {
	node_console.default.log(red(getTimeText()), white(transform(info)));
};
const warn = (info) => {
	node_console.default.log(yellow(getTimeText()), white(transform(info)));
};
const debug = (info) => {
	node_console.default.log(blue(getTimeText()), white(transform(info)));
};
const store = /* @__PURE__ */ new Map();
const convertToJsonRecord = (val) => {
	if (typeof val === "boolean") return val.toString();
	if (typeof val === "number") return val.toString();
	if (typeof val === "string") return val.toString();
	if (typeof val === "undefined") return "undefined";
	if (typeof val === "symbol") return val.toString();
	if (typeof val === "function") return val.toString();
	if (typeof val === "bigint") return `${val.toString()}n`;
	if (val === null) return "null";
	if (Array.isArray(val)) return JSON.stringify(val.map(convertToJsonRecord), void 0, 2);
	if (val instanceof Map) {
		const record = [...val.entries()].reduce((a, c) => {
			const [key, value] = c;
			a[convertToJsonRecord(key)] = convertToJsonRecord(value);
			return a;
		}, {});
		return `Map(${JSON.stringify(record, void 0, 2)})`;
	}
	if (val instanceof Set) {
		const arr = [...val.values()].map(convertToJsonRecord);
		return `Set(${JSON.stringify(arr, void 0, 2)})`;
	}
	const r = Object.entries(val).reduce((a, c) => {
		const [key, value] = c;
		a[key] = convertToJsonRecord(value);
		return a;
	}, {});
	try {
		return JSON.stringify(r, void 0, 2);
	} catch {
		return val.toString();
	}
};
var Logger = class {
	static log = log;
	static info = info;
	static error = error;
	static warn = warn;
	static debug = debug;
	channel;
	constructor(channel) {
		this.channel = channel;
		store.set(channel, this);
	}
	levelFac(level, color) {
		return (...args) => node_console.default.log(color(`[${getTimeText()}| ${level} | ${this.channel} ]`), ...args.map((info) => white(transform(info))));
	}
	log(...args) {
		this.levelFac("LOG", green)(...args.map(convertToJsonRecord));
	}
	info(...args) {
		this.levelFac("INFO", green)(...args.map(convertToJsonRecord));
	}
	error(...args) {
		this.levelFac("ERROR", red)(...args.map(convertToJsonRecord));
	}
	warn(...args) {
		this.levelFac("WARN", yellow)(...args.map(convertToJsonRecord));
	}
	debug(...args) {
		this.levelFac("DEBUG", blue)(...args.map(convertToJsonRecord));
	}
};
//#endregion
exports.Logger = Logger;
