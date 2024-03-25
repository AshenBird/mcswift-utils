import { ExecOptions, exec as _exec } from "node:child_process";
const exec = (command: string, options: ExecOptions) => {
  return new Promise<string>((resolve, reject) => {
    _exec(command, options, (err, out) => {
      if (err) return reject(err);
      resolve(out);
    });
  });
}

export const Promisify = {
  exec
}

Object.seal(Promisify)
