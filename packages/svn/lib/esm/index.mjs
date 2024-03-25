// packages/svn/src/index.ts
import { getAbsolutePath } from "@mcswift/node";
import { execSync } from "node:child_process";
import * as Path from "node:path";
var update = (root = "./") => {
  const p = getAbsolutePath(root);
  execSync(`cd ${p} && svn update`, { encoding: "utf-8" });
};
var commit = (fileList, message, root = "./") => {
  const p = getAbsolutePath(root);
  execSync(
    `cd ${p} && svn commit ${fileList.join(" ")} -m '${message}' --depth empty`,
    { encoding: "utf-8" }
  );
};
var getStatus = (root = "./") => {
  const p = getAbsolutePath(root);
  const svnStatusRaw = execSync(`cd ${p} && svn st`, { encoding: "utf-8" });
  const statusList = svnStatusRaw.split("\n").map((line) => line.split(" ").filter((i) => !!i && i !== " "));
  const result = {
    counts: {
      total: 0
    },
    status: [],
    raw: svnStatusRaw
  };
  for (const [type, path] of statusList) {
    if (!type)
      continue;
    result.status.push({
      type,
      path,
      absolute: Path.join(p, path)
    });
    result.counts.total += 1;
    if (result.counts[type]) {
      result.counts[type] += 1;
      continue;
    }
    result.counts[type] = 1;
  }
  return result;
};
var getRevision = (root = "./") => {
  const p = getAbsolutePath(root);
  return getInfo(p).Revision;
};
var getInfo = (root = "./") => {
  const p = getAbsolutePath(root);
  const svnInfoRaw = execSync(`cd ${p} && svn info`, { encoding: "utf-8" });
  const infoList = svnInfoRaw.split("\n").map((line) => {
    return line.split(":").map((i) => i.trim());
  });
  const result = {};
  for (const [k, v] of infoList) {
    result[k.split(" ").join("")] = v;
  }
  result.raw = svnInfoRaw;
  return result;
};
var Svn = class {
  static get info() {
    return getInfo();
  }
  static get revision() {
    return getRevision();
  }
  static get status() {
    return getStatus();
  }
  static commit = commit;
  static update = update;
};
var src_default = Svn;
export {
  Svn,
  src_default as default
};
