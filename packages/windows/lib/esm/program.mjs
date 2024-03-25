// packages/windows/src/program.ts
import { getInstalledAppCommand as command } from "./commands.mjs";
import { Promisify } from "@mcswift/node/child_process";
var installedAppMap = /* @__PURE__ */ new Map();
var getInstalledApp = async () => {
  installedAppMap.clear();
  const stdout = await Promisify.exec(command, {
    shell: "powershell"
  });
  const raw = JSON.parse(stdout);
  raw.forEach(infoHandle);
  return installedAppMap;
};
var infoHandle = (item) => {
  const names = item.PSChildName.split(".");
  const extension = names.pop();
  const name = names.join(".");
  if (installedAppMap.has(name))
    throw new Error(`\u540C\u540D\u5E94\u7528:${name}`);
  installedAppMap.set(name, {
    path: item["(default)"],
    name,
    extension
  });
};
export {
  getInstalledApp,
  installedAppMap
};
