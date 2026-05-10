import {
  ExecOptions,
  exec as _exec,
  spawn as _spawn,
} from "node:child_process";
const exec = function (command: string, options: ExecOptions) {
  const { resolve, reject, promise } = Promise.withResolvers<string>();
  const child = _exec(command, options);
  let out = "";
  child.stdout?.on("data", (data) => {
    out += data.toString();
  });
  child.stderr?.on("error", (err) => {
    reject(err);
    child.kill(1);
  });
  child.addListener("exit", (code) => {
    if (code === 0) {
      resolve(out);
    }
  });
  return promise;
};

// @todo spawn 实现

export const Promisify = {
  exec,
};

Object.seal(Promisify);
