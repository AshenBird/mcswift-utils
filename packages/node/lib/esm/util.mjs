// packages/node/src/util.ts
import { platform } from "node:os";
var PlatformEnum = /* @__PURE__ */ ((PlatformEnum2) => {
  PlatformEnum2["aix"] = "posix";
  PlatformEnum2["android"] = "posix";
  PlatformEnum2["darwin"] = "mac";
  PlatformEnum2["freebsd"] = "posix";
  PlatformEnum2["haiku"] = "posix";
  PlatformEnum2["linux"] = "posix";
  PlatformEnum2["openbsd"] = "posix";
  PlatformEnum2["sunos"] = "posix";
  PlatformEnum2["cygwin"] = "posix";
  PlatformEnum2["win32"] = "windows";
  PlatformEnum2["netbsd"] = "posix";
  return PlatformEnum2;
})(PlatformEnum || {});
var pipeCross = (imps) => {
  const imp = imps[PlatformEnum[platform()]];
  if (imp)
    return imp;
  throw new Error(`${platform()} \u7248\u672C\u672A\u5B9E\u73B0`);
};
export {
  pipeCross
};
