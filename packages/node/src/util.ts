import {platform} from "node:os"

interface PlatformsImplement<T> {
  windows?:T;
  mac?:T;
  posix?:T
}

enum PlatformEnum {
  aix="posix",
  android= "posix",
  darwin="mac",
  freebsd="posix",
  haiku="posix",
  linux="posix",
  openbsd="posix",
  sunos="posix",
  cygwin="posix",
  win32="windows",
  netbsd="posix"
}

export const pipeCross = <T>(imps:PlatformsImplement<T>)=>{
  const imp = imps[PlatformEnum[platform()]]
  if(imp)return imp;
  throw new Error(`${platform()} 版本未实现`)
};

