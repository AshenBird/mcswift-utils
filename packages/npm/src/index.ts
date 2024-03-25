import { getAbsolutePath } from "@mcswift/node";

import type { NPM } from "@mcswift/types";
import { readJSONSync, writeJSONSync } from "fs-extra";
// import NPMPackageJson from "@npmcli/package-json"
export class NpmPackage  {
  root: string;
  constructor(root: string) {
    this.root = getAbsolutePath(root);
    return new Proxy(this,{
      get(target:any,p:string|symbol){
        const r = Reflect.get(target,p)
        if(!r)return target.data[p]
        if(typeof r === "function"){
          return r.bind(target)
        }
        return r
      }
    }) as NpmPackage & NPM.Package
  }
  private cache:NPM.Package|null = null
  get data(){
    if(this.cache)return this.cache
    return this.getPackageInfo();
  }
  getPackageInfo(){
    
    this.cache = NpmPackage.getPackageInfo(this.root)
    Object.seal(this.cache)
    return this.cache
  }
  setPackageInfo<K extends keyof Required<NPM.Package>>(key:K, value:Required<NPM.Package>[K]){
    return NpmPackage.setPackageInfo(key,value,this.root)
  }
  static getPackageInfo = (root = "./") => {
    
    const p = getAbsolutePath(root);
    const result = readJSONSync(`${p}/package.json`) as NPM.Package;
    return result;
  };
  static setPackageInfo = <K extends keyof Required<NPM.Package>>(key:K, value:Required<NPM.Package>[K], root = "./") => {
    const p = getAbsolutePath(root);
    const content = this.getPackageInfo(root)
    content[key] = value
    const result = writeJSONSync(`${p}/package.json`, content, {
      spaces: 2,
      EOL: "\n",
    });
    return result;
  };
}
