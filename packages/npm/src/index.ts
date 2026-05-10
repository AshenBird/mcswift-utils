import { getAbsolutePath } from "@mcswift/node";

import type { NPM } from "@mcswift/types";
import { readJSONSync, writeJSONSync } from "fs-extra/esm";
import { simpleClone } from "@mcswift/base-utils";
export { NPM };
export class NpmPackage {
  root: string;
  constructor(root: string) {
    this.root = getAbsolutePath(root);
    return new Proxy(this, {
      get(target: any, p: string | symbol) {
        const r = Reflect.get(target, p);
        if (!r) return target.data[p];
        if (typeof r === "function") {
          return r.bind(target);
        }
        return r;
      },
    }) as NpmPackage & NPM.Package;
  }
  private cache: NPM.Package | null = null;
  get data() {
    if (!this.cache) this.getPackageInfo();
    return simpleClone(this.cache);
  }
  get<K extends keyof Required<NPM.Package>>(key: K): NPM.Package[K] {
    return this.data[key];
  }
  set<K extends keyof Required<NPM.Package>>(
    key: K,
    value: NPM.Package[K],
    withSave = false,
  ) {
    if (!this.cache) {
      this.getPackageInfo();
    }
    Reflect.set(this.cache as NPM.Package, key, value);
    if (withSave) {
      this.save();
    }
  }
  save() {
    const p = getAbsolutePath(this.root);
    const content = NpmPackage.getPackageInfo(this.root);
    const result = writeJSONSync(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n",
    });
    return result;
  }
  delete<K extends keyof Required<NPM.Package>>(key: K, withSave = false) {
    if (!this.cache) {
      this.getPackageInfo();
    }
    Reflect.deleteProperty(this.cache as NPM.Package, key);
    if (withSave) {
      this.save();
    }
  }
  private getPackageInfo() {
    this.cache = NpmPackage.getPackageInfo(this.root);
    // Object.seal(this.cache);
    return this.cache;
  }
  static delete = <K extends keyof Required<NPM.Package>>(
    key: K,
    root = "./",
  ) => {
    const p = getAbsolutePath(root);
    const content = this.getPackageInfo(root);
    Reflect.deleteProperty(content, key);
    const result = writeJSONSync(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n",
    });
    return result;
  };
  static getPackageInfo = (root = "./") => {
    const p = getAbsolutePath(root);
    const result = readJSONSync(`${p}/package.json`) as NPM.Package;
    return result;
  };
  static set = <K extends keyof Required<NPM.Package>>(
    key: K,
    value: Required<NPM.Package>[K],
    root = "./",
  ) => {
    const p = getAbsolutePath(root);
    const content = this.getPackageInfo(root);
    content[key] = value;
    const result = writeJSONSync(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n",
    });
    return result;
  };

  static get = <K extends keyof Required<NPM.Package>>(key: K, root = "./") => {
    const content = this.getPackageInfo(root);
    return content[key];
  };
}
