# @mcswift/safe-run




Provides a Go-style error handling mechanism that avoids cumbersome `try...catch` blocks, allowing you to handle Promise exceptions and synchronous function errors in a linear fashion.

### Installation

```bash
npm install @mcswift/safe-run
# or
pnpm add @mcswift/safe-run
```

### Features & API Documentation

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

**Type Annotations:**
```typescript
type SafeResult<Result> =
  | [error: null, result: Result]
  | [error: Exclude<unknown, null>, result: null];

const safeAwait: <Result = unknown>(promise: Promise<Result>) => Promise<SafeResult<Result>>;
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

**Type Annotations:**
```typescript
function safeCall<Args extends any[] = any[], Result extends unknown = unknown>(
  func: (...args: Args) => Result,
  ...params: Args
): SafeResult<Result>;

function safeCall<Args extends any[] = any[], Result extends unknown = unknown>(
  func: (...args: Args) => Promise<Result>,
  ...params: Args
): Promise<SafeResult<Result>>;
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

**Type Annotations:**
```typescript
function safeApply<Args extends any[] = any[], Result extends unknown = unknown>(
  func: (...args: Args) => Result,
  params: Args
): SafeResult<Result>;

function safeApply<Args extends any[] = any[], Result extends unknown = unknown>(
  func: (...args: Args) => Promise<Result>,
  params: Args
): Promise<SafeResult<Result>>;
```