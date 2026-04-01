# @mcswift/safe-run

[English](#english) | [中文](#中文)

---

## 中文

提供类似于 Go 语言风格的异常处理机制，避免繁琐的 `try...catch` 块，让你以线性的方式处理 Promise 异常和同步函数异常。

### 安装

```bash
npm install @mcswift/safe-run
# or
pnpm add @mcswift/safe-run
```

### 功能模块及使用文档

#### 1. `safeAwait` 处理 Promise

用于捕获任意 Promise 的异常，返回一个 `[error, result]` 元组。如果 `error` 不为 null，说明发生了异常。

```typescript
import { safeAwait } from "@mcswift/safe-run";

async function fetchData() {
  const [err, res] = await safeAwait(fetch("https://api.example.com/data"));
  
  if (err) {
    console.error("请求失败:", err);
    return;
  }
  
  console.log("请求成功:", res);
}
```

#### 2. `safeCall` 安全调用函数

用于安全地执行函数（支持同步或异步），接收散列参数，并返回 `[error, result]` 元组。如果函数返回 Promise，`safeCall` 也会返回 Promise。

```typescript
import { safeCall } from "@mcswift/safe-run";

function parseJson(str: string) {
  return JSON.parse(str);
}

// 同步调用
const [err, result] = safeCall(parseJson, "invalid json");
if (err) {
  console.log("解析失败:", err);
}

// 异步调用
const [asyncErr, asyncResult] = await safeCall(async () => {
  return "async data";
});
```

#### 3. `safeApply` 安全调用函数（数组传参）

与 `safeCall` 类似，但是参数以数组的形式传入（类似于 `Function.prototype.apply`）。

```typescript
import { safeApply } from "@mcswift/safe-run";

function sum(a: number, b: number) {
  return a + b;
}

const [err, result] = safeApply(sum, [1, 2]);
```

---

## English

Provides a Go-style error handling mechanism that avoids cumbersome `try...catch` blocks, allowing you to handle Promise exceptions and synchronous function errors in a linear fashion.

### Installation

```bash
npm install @mcswift/safe-run
# or
pnpm add @mcswift/safe-run
```

### Features & Documentation

#### 1. `safeAwait` - Handle Promises

Used to catch exceptions from any Promise, returning an `[error, result]` tuple. If `error` is not null, an exception occurred.

```typescript
import { safeAwait } from "@mcswift/safe-run";

async function fetchData() {
  const [err, res] = await safeAwait(fetch("https://api.example.com/data"));
  
  if (err) {
    console.error("Request failed:", err);
    return;
  }
  
  console.log("Request succeeded:", res);
}
```

#### 2. `safeCall` - Safely Call Functions

Used to safely execute functions (supports synchronous or asynchronous), taking arguments individually and returning an `[error, result]` tuple. If the function returns a Promise, `safeCall` will also return a Promise.

```typescript
import { safeCall } from "@mcswift/safe-run";

function parseJson(str: string) {
  return JSON.parse(str);
}

// Synchronous call
const [err, result] = safeCall(parseJson, "invalid json");
if (err) {
  console.log("Parsing failed:", err);
}

// Asynchronous call
const [asyncErr, asyncResult] = await safeCall(async () => {
  return "async data";
});
```

#### 3. `safeApply` - Safely Call Functions (Array Arguments)

Similar to `safeCall`, but arguments are passed as an array (similar to `Function.prototype.apply`).

```typescript
import { safeApply } from "@mcswift/safe-run";

function sum(a: number, b: number) {
  return a + b;
}

const [err, result] = safeApply(sum, [1, 2]);
```