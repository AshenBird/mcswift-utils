// packages/base-utils/src/trigger.ts
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
export {
  Trigger
};
