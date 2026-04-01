Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region packages/base-utils/src/trigger.ts
/**
* 一个环境无关的事件触发器实现
*/
var Trigger = class {
	callbackMap = /* @__PURE__ */ new Map();
	constructor() {}
	on(callback) {
		for (const [k, c] of this.callbackMap) if (Object.is(c, callback)) return k;
		const key = Symbol();
		this.callbackMap.set(key, callback);
		return key;
	}
	once(callback) {
		const key = Symbol();
		this.callbackMap.set(key, (payload) => {
			callback(payload);
			this.callbackMap.delete(key);
		});
	}
	off(arg) {
		if (typeof arg === "symbol") {
			this.callbackMap.delete(arg);
			return;
		}
		for (const [k, c] of this.callbackMap) if (Object.is(c, arg)) {
			this.callbackMap.delete(k);
			return;
		}
	}
	dispatch(payload) {
		for (const c of this.callbackMap.values()) this.run(c, payload);
	}
	async run(callback, payload) {
		callback(payload);
	}
};
//#endregion
exports.Trigger = Trigger;
