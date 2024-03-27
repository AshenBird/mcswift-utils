// packages/npm/src/index.ts
import { getAbsolutePath } from "@mcswift/node";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
var NpmPackage = class _NpmPackage {
  root;
  constructor(root) {
    this.root = getAbsolutePath(root);
    return new Proxy(this, {
      get(target, p) {
        const r = Reflect.get(target, p);
        if (!r)
          return target.data[p];
        if (typeof r === "function") {
          return r.bind(target);
        }
        return r;
      }
    });
  }
  cache = null;
  get data() {
    if (this.cache)
      return this.cache;
    return this.getPackageInfo();
  }
  getPackageInfo() {
    this.cache = _NpmPackage.getPackageInfo(this.root);
    Object.seal(this.cache);
    return this.cache;
  }
  setPackageInfo(key, value) {
    return _NpmPackage.setPackageInfo(key, value, this.root);
  }
  static getPackageInfo = (root = "./") => {
    const p = getAbsolutePath(root);
    const result = readJSONSync(`${p}/package.json`);
    return result;
  };
  static setPackageInfo = (key, value, root = "./") => {
    const p = getAbsolutePath(root);
    const content = this.getPackageInfo(root);
    content[key] = value;
    const result = writeJSONSync(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n"
    });
    return result;
  };
};
export {
  NpmPackage
};
