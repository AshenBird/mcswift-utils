"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/base-utils/src/trigger.ts
var trigger_exports = {};
__export(trigger_exports, {
  Trigger: () => Trigger
});
module.exports = __toCommonJS(trigger_exports);
var Trigger = class {
  // private proxy
  callbackMap = /* @__PURE__ */ new Map();
  constructor() {
  }
  on(callback) {
    for (const [k, c] of this.callbackMap) {
      if (Object.is(c, callback))
        return k;
    }
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
    for (const [k, c] of this.callbackMap) {
      if (Object.is(c, arg)) {
        this.callbackMap.delete(k);
        return;
      }
    }
  }
  dispatch(payload) {
    for (const c of this.callbackMap.values()) {
      this.run(c, payload);
    }
  }
  async run(callback, payload) {
    callback(payload);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Trigger
});
