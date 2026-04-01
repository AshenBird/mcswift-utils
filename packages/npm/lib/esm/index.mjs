import { getAbsolutePath } from "@mcswift/node";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
//#region packages/npm/src/index.ts
var NpmPackage = class NpmPackage {
	root;
	constructor(root) {
		this.root = getAbsolutePath(root);
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
		const p = getAbsolutePath(root);
		const content = this.getPackageInfo(root);
		Reflect.deleteProperty(content, key);
		return writeJSONSync(`${p}/package.json`, content, {
			spaces: 2,
			EOL: "\n"
		});
	};
	static getPackageInfo = (root = "./") => {
		return readJSONSync(`${getAbsolutePath(root)}/package.json`);
	};
	static setPackageInfo = (key, value, root = "./") => {
		const p = getAbsolutePath(root);
		const content = this.getPackageInfo(root);
		content[key] = value;
		return writeJSONSync(`${p}/package.json`, content, {
			spaces: 2,
			EOL: "\n"
		});
	};
};
//#endregion
export { NpmPackage };
