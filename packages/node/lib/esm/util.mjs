// packages/node/src/util.ts
import { platform } from "node:os";
var PlatformEnum = {
  aix: "posix",
  android: "posix",
  darwin: "mac",
  freebsd: "posix",
  haiku: "posix",
  linux: "posix",
  openbsd: "posix",
  sunos: "posix",
  cygwin: "posix",
  win32: "windows",
  netbsd: "posix"
};
var pipeCross = (imps) => {
  const imp = imps[PlatformEnum[platform()]];
  if (imp)
    return imp;
  throw new Error(`${platform()} \u7248\u672C\u672A\u5B9E\u73B0`);
};
export {
  pipeCross
};
