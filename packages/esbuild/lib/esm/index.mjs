// packages/esbuild/src/index.ts
import * as Fs from "node:fs";
import Path from "node:path";
function isFunction(input) {
  return typeof input === "function";
}
function getFilter(options) {
  if (!options.filter) {
    return /.*/;
  }
  if (Object.prototype.toString.call(options.filter) !== "[object RegExp]") {
    console.warn(
      `Plugin "esbuild-plugin-file-path-extensions": Options.filter must be a RegExp object, but gets an '${typeof options.filter}' type. 
This request will match ANY file!`
    );
    return /.*/;
  }
  return options.filter ?? /.*/;
}
async function getIsEsm(build, options) {
  if (typeof options.esm === "undefined") {
    return build.initialOptions.define?.TSUP_FORMAT === '"esm"';
  }
  if (typeof options.esm === "boolean") {
    return options.esm;
  }
  return isFunction(options.esm) ? options.esm(build.initialOptions) : options.esm;
}
async function getEsmExtension(build, options) {
  if (typeof options.esmExtension === "undefined") {
    return "mjs";
  }
  if (typeof options.esmExtension === "string") {
    return options.esmExtension;
  }
  return isFunction(options.esmExtension) ? options.esmExtension(build.initialOptions) : options.esmExtension;
}
async function getCjsExtension(build, options) {
  if (typeof options.cjsExtension === "undefined") {
    return "cjs";
  }
  if (typeof options.cjsExtension === "string") {
    return options.cjsExtension;
  }
  return isFunction(options.cjsExtension) ? options.cjsExtension(build.initialOptions) : options.cjsExtension;
}
function pathExtIsJsLikeExtension(path) {
  const ext = Path.extname(path);
  if (
    // Regular extensions
    ext === ".js" || ext === ".cjs" || ext === ".mjs" || // TypeScript extensions
    ext === ".ts" || ext === ".cts" || ext === ".mts" || // JSX JavaScript extensions
    ext === "jsx" || ext === ".cjsx" || ext === ".mjsx" || // JSX TypeScript extensions
    ext === ".tsx" || ext === ".ctsx" || ext === ".mtsx" || // json TypeScript extensions
    ext === ".json"
  ) {
    return true;
  }
  return false;
}
async function handleResolve(args, build, options) {
  if (args.kind == "import-statement") {
    const isEsm = await getIsEsm(build, options);
    const esmExtension = await getEsmExtension(build, options);
    const cjsExtension = await getCjsExtension(build, options);
    if (typeof isEsm !== "boolean") {
      throw new TypeError(
        `isEsm must be a boolean, received ${typeof isEsm} (${isEsm})`
      );
    }
    if (typeof cjsExtension !== "string") {
      throw new TypeError(
        `cjsExtension must be a string, received ${typeof cjsExtension} (${cjsExtension})`
      );
    }
    if (typeof esmExtension !== "string") {
      throw new TypeError(
        `esmExtension must be a string, received ${typeof esmExtension} (${esmExtension})`
      );
    }
    if (args.importer) {
      const pathAlreadyHasExt = pathExtIsJsLikeExtension(args.path);
      if (!args.path.startsWith("."))
        return void 0;
      if (!pathAlreadyHasExt) {
        const targetAbsPath = Path.resolve(args.resolveDir, args.path);
        let resultPath = `${args.path}.${isEsm ? esmExtension : cjsExtension}`;
        if (Fs.existsSync(targetAbsPath)) {
          resultPath = `${args.path}/index.${isEsm ? esmExtension : cjsExtension}`;
        }
        return {
          path: resultPath,
          external: true,
          namespace: options.namespace
        };
      }
    }
  }
  return void 0;
}
var mandatoryFileExtensionsPlugin = (options = {
  filter: /.*/,
  cjsExtension: "cjs",
  esmExtension: "mjs"
}) => {
  const filter = getFilter(options);
  const { namespace } = options;
  return {
    name: "esbuild-plugin-file-path-extensions",
    setup(build) {
      build.initialOptions.bundle = true;
      if (options.esm) {
        if (build.initialOptions.outExtension) {
          build.initialOptions.outExtension[".js"] = `.${options.esmExtension}`;
        } else {
          build.initialOptions.outExtension = { ".js": `.${options.esmExtension}` };
        }
      } else {
        if (build.initialOptions.outExtension) {
          build.initialOptions.outExtension[".js"] = `.${options.cjsExtension}`;
        } else {
          build.initialOptions.outExtension = { ".js": `.${options.cjsExtension}` };
        }
      }
      build.onResolve(
        { filter, namespace },
        (args) => handleResolve(args, build, options)
      );
    }
  };
};
var version = "[VI]{{inject}}[/VI]";
export {
  mandatoryFileExtensionsPlugin,
  version
};
