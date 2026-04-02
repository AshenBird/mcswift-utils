# @mcswift/mcswift-utils

[English](#english) | [中文](#中文)

---

## 中文

`@mcswift/mcswift-utils` 是一个基于 `pnpm workspace` 的前端和 Node.js 基础工具库 monorepo。这里包含了一系列旨在提高开发效率的独立 NPM 包。你可以选择单独安装所需的模块，或者使用聚合包 `@mcswift/utils` 一次性引入。

### 📦 包含的包 (Packages)

以下是本项目包含的所有子包列表。点击各个包的链接可以查看其具体的文档：

| 包名 | 描述 | 版本 |
| --- | --- | --- |
| [`@mcswift/utils`](./packages/utils/README.md) | **推荐**：聚合包，重新导出了其他所有包的模块。 | `1.0.16` |
| [`@mcswift/base-utils`](./packages/base-utils/README.md) | 跨平台的基础工具集合，包含日志、随机字符串、深拷贝等。 | `1.0.15` |
| [`@mcswift/cli`](./packages/cli/README.md) | 一个轻量级的 Node.js 命令行应用构建工具。 | `1.0.14` |
| [`@mcswift/esbuild`](./packages/esbuild/README.md) | esbuild 插件，用于在构建时自动为模块导入补全文件后缀。 | `1.0.14` |
| [`@mcswift/node`](./packages/node/README.md) | 针对 Node.js 的增强工具（路径处理、子进程、系统环境变量）。 | `1.0.14` |
| [`@mcswift/npm`](./packages/npm/README.md) | 快速读写和修改 `package.json` 的工具类。 | `1.0.15` |
| [`@mcswift/safe-run`](./packages/safe-run/README.md) | Go 语言风格的异常处理机制，避免繁琐的 `try...catch`。 | `1.0.15` |
| [`@mcswift/svn`](./packages/svn/README.md) | SVN (Subversion) 命令行操作封装工具。 | `1.0.14` |
| [`@mcswift/tsc`](./packages/tsc/README.md) | 基于 TypeScript 的 `.d.ts` 声明文件自动生成工具。 | `1.0.14` |
| [`@mcswift/types`](./packages/types/README.md) | 基础的 TypeScript 类型定义约束（如 JSON、NPM Package）。 | `1.0.14` |
| [`@mcswift/windows`](./packages/windows/README.md) | Windows 系统特有工具（如通过注册表获取已安装的软件）。 | `1.0.14` |

### 🛠️ 开发与构建

本项目使用 `pnpm workspace` 进行包管理。

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm run build
```

### 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源。

---

## English

`@mcswift/mcswift-utils` is a front-end and Node.js foundational utility library monorepo based on `pnpm workspace`. It contains a collection of independent NPM packages designed to improve development efficiency. You can choose to install individual modules as needed or use the aggregated package `@mcswift/utils` to import them all at once.

### 📦 Packages Included

Below is a list of all the sub-packages included in this project. Click the links to view specific documentation for each package:

| Package | Description | Version |
| --- | --- | --- |
| [`@mcswift/utils`](./packages/utils/README.md) | **Recommended**: Aggregated package that re-exports modules from all other packages. | `1.0.16` |
| [`@mcswift/base-utils`](./packages/base-utils/README.md) | Cross-platform basic utilities (logging, random strings, deep clone, etc.). | `1.0.15` |
| [`@mcswift/cli`](./packages/cli/README.md) | A lightweight Node.js command-line application building tool. | `1.0.14` |
| [`@mcswift/esbuild`](./packages/esbuild/README.md) | An esbuild plugin to automatically append file extensions to module imports during build. | `1.0.14` |
| [`@mcswift/node`](./packages/node/README.md) | Enhanced utilities for Node.js (path handling, child processes, system variables). | `1.0.14` |
| [`@mcswift/npm`](./packages/npm/README.md) | A utility class for quickly reading and writing `package.json`. | `1.0.15` |
| [`@mcswift/safe-run`](./packages/safe-run/README.md) | Go-style error handling mechanism to avoid cumbersome `try...catch` blocks. | `1.0.15` |
| [`@mcswift/svn`](./packages/svn/README.md) | Wrapper tool for SVN (Subversion) command-line operations. | `1.0.14` |
| [`@mcswift/tsc`](./packages/tsc/README.md) | A tool for automatically generating TypeScript `.d.ts` declaration files. | `1.0.14` |
| [`@mcswift/types`](./packages/types/README.md) | Fundamental TypeScript type definitions (e.g., JSON, NPM Package). | `1.0.14` |
| [`@mcswift/windows`](./packages/windows/README.md) | Windows-specific tools (e.g., fetching installed software via the registry). | `1.0.14` |

### 🛠️ Development & Build

This project uses `pnpm workspace` for package management.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

### 📄 License

This project is licensed under the [MIT License](./LICENSE).
