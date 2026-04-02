# @mcswift/esbuild




An improved esbuild plugin based on `esbuild-plugin-file-path-extensions`, which automatically appends the correct file extension (e.g., `.mjs` or `.cjs`) to relative import paths during bundling. It is ideal for handling module import paths when building dual packages (ESM and CJS).

### Installation

```bash
npm install @mcswift/esbuild
# or
pnpm add @mcswift/esbuild
```

### Usage Guide & API Documentation

Import and use the `mandatoryFileExtensionsPlugin` in your esbuild build script.

#### 1. Building ESM Modules

```typescript
import { build } from "esbuild";
import { mandatoryFileExtensionsPlugin } from "@mcswift/esbuild";

build({
  entryPoints: ["src/index.ts"],
  outdir: "dist/esm",
  format: "esm",
  bundle: true,
  plugins: [
    mandatoryFileExtensionsPlugin({
      esm: true,           // Mark current build as ESM
      esmExtension: "mjs", // Append .mjs extension by default
    }),
  ],
});
```

#### 2. Building CJS Modules

```typescript
import { build } from "esbuild";
import { mandatoryFileExtensionsPlugin } from "@mcswift/esbuild";

build({
  entryPoints: ["src/index.ts"],
  outdir: "dist/cjs",
  format: "cjs",
  bundle: true,
  plugins: [
    mandatoryFileExtensionsPlugin({
      esm: false,          // Mark current build as CJS
      cjsExtension: "cjs", // Append .cjs extension by default
    }),
  ],
});
```

**Type Annotations:**
```typescript
import type { Plugin, BuildOptions, OnLoadOptions } from "esbuild";

type Awaitable<T> = PromiseLike<T> | T;

export interface PluginOptions {
  filter?: OnLoadOptions["filter"];
  namespace?: OnLoadOptions["namespace"];
  esm?: boolean | ((initialOptions: BuildOptions) => Awaitable<boolean>);
  cjsExtension?: string | ((initialOptions: BuildOptions) => Awaitable<string>);
  esmExtension?: string | ((initialOptions: BuildOptions) => Awaitable<string>);
}

export const mandatoryFileExtensionsPlugin: (options?: PluginOptions) => Plugin;
export const version: string;
```

### Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `filter` | `RegExp` | `/.*/` | Regular expression for filtering files to which the plugin should apply |
| `namespace` | `string` | `undefined` | The esbuild namespace to which the plugin applies |
| `esm` | `boolean \| Function` | Auto-inferred | Whether the current build format is ESM |
| `cjsExtension` | `string \| Function` | `"cjs"` | The default extension specified for CJS builds (without the leading `.`) |
| `esmExtension` | `string \| Function` | `"mjs"` | The default extension specified for ESM builds (without the leading `.`) |
