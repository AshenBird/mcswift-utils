# 指南

欢迎来到 `@mcswift/mcswift-utils` 的官方文档。

这是一个基于 `pnpm workspace` 的 monorepo，包含了一系列基础工具库。你可以根据需要单独安装所需的模块，或者使用聚合包 `@mcswift/utils` 一次性引入。

## 安装方式

### 1. 单独安装子包

如果你只需要某些特定的功能，你可以选择单独安装：

```bash
npm install @mcswift/base-utils
# 或
pnpm add @mcswift/node
```

### 2. 使用聚合包安装全部工具

如果你在项目中需要用到多个工具包，你可以直接安装 `@mcswift/utils`：

```bash
npm install @mcswift/utils
# 或
pnpm add @mcswift/utils
```

然后在代码中引入对应模块：

```typescript
import { Logger } from "@mcswift/utils/common";
import { getAbsolutePath } from "@mcswift/utils/node";
import { getInstalledApp } from "@mcswift/utils/windows";
```

> 左侧边栏提供了各个子包的详细使用文档，请点击查阅。
