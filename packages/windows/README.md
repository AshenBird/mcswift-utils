# @mcswift/windows

[English](#english) | [中文](#中文)

---

## 中文

提供针对 Windows 操作系统的专属工具方法，例如通过注册表和 PowerShell 获取系统已安装应用的信息。

### 安装

```bash
npm install @mcswift/windows
# or
pnpm add @mcswift/windows
```

### 使用指南及接口文档

#### 1. 获取已安装的应用程序

通过读取 Windows 注册表 (`App Paths`)，获取系统中已安装并在注册表中注册的应用程序列表及其可执行文件路径。

```typescript
import { getInstalledApp, installedAppMap } from "@mcswift/windows";

async function fetchWindowsApps() {
  // 执行 PowerShell 命令并解析注册表信息
  const apps = await getInstalledApp();
  
  // apps 等同于 installedAppMap，返回一个 Map 对象
  // 键为程序名（不带后缀），值为程序的具体路径和后缀信息
  if (apps.has("chrome")) {
    console.log("Chrome 路径:", apps.get("chrome")?.path);
  }
  
  // 遍历所有获取到的应用
  for (const [name, info] of apps) {
    console.log(`${name}: ${info.path} (后缀: ${info.extension})`);
  }
}

fetchWindowsApps();
```

**类型注释：**
```typescript
type InstalledAppRecord = {
  path: string;
  name: string;
  extension: string;
};

type InstalledAppMap = Map<string, InstalledAppRecord>;

const installedAppMap: InstalledAppMap;
const getInstalledApp: () => Promise<InstalledAppMap>;
```

#### 2. 内置的 PowerShell 命令串

你也可以直接获取并使用库中内置的 PowerShell 原始命令字符串：

```typescript
import { getInstalledAppCommand } from "@mcswift/windows";

// 返回拼接好的 PowerShell 命令字符串，用于查询 App Paths
console.log(getInstalledAppCommand);
```

**类型注释：**
```typescript
const getInstalledAppCommand: string;
```

---

## English

Provides specific utility methods for the Windows operating system, such as retrieving information about installed applications via the Registry and PowerShell.

### Installation

```bash
npm install @mcswift/windows
# or
pnpm add @mcswift/windows
```

### Usage Guide & API Documentation

#### 1. Get Installed Applications

By reading the Windows Registry (`App Paths`), this function retrieves a list of applications installed and registered in the system, along with their executable file paths.

```typescript
import { getInstalledApp, installedAppMap } from "@mcswift/windows";

async function fetchWindowsApps() {
  // Execute PowerShell command and parse registry information
  const apps = await getInstalledApp();
  
  // `apps` is equivalent to `installedAppMap`, returning a Map object
  // Key is the program name (without extension), value is the specific path and extension info
  if (apps.has("chrome")) {
    console.log("Chrome path:", apps.get("chrome")?.path);
  }
  
  // Iterate through all fetched applications
  for (const [name, info] of apps) {
    console.log(`${name}: ${info.path} (Extension: ${info.extension})`);
  }
}

fetchWindowsApps();
```

**Type Annotations:**
```typescript
type InstalledAppRecord = {
  path: string;
  name: string;
  extension: string;
};

type InstalledAppMap = Map<string, InstalledAppRecord>;

const installedAppMap: InstalledAppMap;
const getInstalledApp: () => Promise<InstalledAppMap>;
```

#### 2. Built-in PowerShell Command Strings

You can also directly access and use the built-in raw PowerShell command strings provided by the library:

```typescript
import { getInstalledAppCommand } from "@mcswift/windows";

// Returns the concatenated PowerShell command string used to query App Paths
console.log(getInstalledAppCommand);
```

**Type Annotations:**
```typescript
const getInstalledAppCommand: string;
```