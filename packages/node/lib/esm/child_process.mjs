// packages/node/src/child_process.ts
import { exec as _exec } from "node:child_process";
var exec = (command, options) => {
  return new Promise((resolve, reject) => {
    _exec(command, options, (err, out) => {
      if (err)
        return reject(err);
      resolve(out);
    });
  });
};
var Promisify = {
  exec
};
Object.seal(Promisify);
export {
  Promisify
};
