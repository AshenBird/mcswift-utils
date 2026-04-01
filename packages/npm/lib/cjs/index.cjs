Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let _mcswift_node = require("@mcswift/node");
let fs_extra_esm = require("fs-extra/esm");
//#region packages/npm/src/index.ts
var NpmPackage = class NpmPackage {
	root;
	constructor(root) {
		this.root = (0, _mcswift_node.getAbsolutePath)(root);
		return new Proxy(this, { get(target, p) {
			const r = Reflect.get(target, p);
			if (!r) return target.data[p];
			if (typeof r === "function") return r.bind(target);
			return r;
		} });
	}
	cache = null;
	get data() {
		if (this.cache) return this.cache;
		return this.getPackageInfo();
	}
	getPackageInfo() {
		this.cache = NpmPackage.getPackageInfo(this.root);
		Object.seal(this.cache);
		return this.cache;
	}
	setPackageInfo(key, value) {
		return NpmPackage.setPackageInfo(key, value, this.root);
	}
	deletePackageInfo(key) {
		return NpmPackage.deletePackageInfo(key, this.root);
	}
	static deletePackageInfo = (key, root = "./") => {
		const p = (0, _mcswift_node.getAbsolutePath)(root);
		const content = this.getPackageInfo(root);
		Reflect.deleteProperty(content, key);
		return (0, fs_extra_esm.writeJSONSync)(`${p}/package.json`, content, {
			spaces: 2,
			EOL: "\n"
		});
	};
	static getPackageInfo = (root = "./") => {
		return (0, fs_extra_esm.readJSONSync)(`${(0, _mcswift_node.getAbsolutePath)(root)}/package.json`);
	};
	static setPackageInfo = (key, value, root = "./") => {
		const p = (0, _mcswift_node.getAbsolutePath)(root);
		const content = this.getPackageInfo(root);
		content[key] = value;
		return (0, fs_extra_esm.writeJSONSync)(`${p}/package.json`, content, {
			spaces: 2,
			EOL: "\n"
		});
	};
};
//#endregion
exports.NpmPackage = NpmPackage;
