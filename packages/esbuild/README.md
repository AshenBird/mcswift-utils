# @mcswift/esbuild

[English](#english) | [中文](#中文)

---

## 中文

基于 `esbuild-plugin-file-path-extensions` 改进的 esbuild 插件，用于在打包时自动为相对导入路径追加正确的文件扩展名（如 `.mjs` 或 `.cjs`），非常适合在构建双包（ESM 和 CJS）时处理模块导入路径。

### 安装

```bash
npm install @mcswift/esbuild
# or
pnpm add @mcswift/esbuild
```

### 使用指南及接口文档

在你的 esbuild 构建脚本中引入并使用 `mandatoryFileExtensionsPlugin`。

#### 1. 构建 ESM 模块

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
      esm: true,           // 标记当前为 ESM 构建
      esmExtension: "mjs", // 默认追加 .mjs 后缀
    }),
  ],
});
```

#### 2. 构建 CJS 模块

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
      esm: false,          // 标记当前为 CJS 构建
      cjsExtension: "cjs", // 默认追加 .cjs 后缀
    }),
  ],
});
```

**类型注释：**
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

### 配置选项

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `filter` | `RegExp` | `/.*/` | 需要应用该插件的文件过滤正则 |
| `namespace` | `string` | `undefined` | 插件应用的 esbuild namespace |
| `esm` | `boolean \| Function` | 自动推导 | 当前构建是否为 ESM 格式 |
| `cjsExtension` | `string \| Function` | `"cjs"` | 为 CJS 构建指定的默认扩展名（不要带前面的 `.`） |
| `esmExtension` | `string \| Function` | `"mjs"` | 为 ESM 构建指定的默认扩展名（不要带前面的 `.`） |

---

## English

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
