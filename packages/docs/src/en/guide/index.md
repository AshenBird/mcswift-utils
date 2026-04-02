# Guide

Welcome to the official documentation for `@mcswift/mcswift-utils`.

This is a monorepo based on `pnpm workspace`, containing a collection of foundational utility libraries. You can install required modules individually as needed, or import them all at once using the aggregated package `@mcswift/utils`.

## Installation Methods

### 1. Install Sub-packages Individually

If you only need specific functionalities, you can choose to install them individually:

```bash
npm install @mcswift/base-utils
# or
pnpm add @mcswift/node
```

### 2. Use the Aggregated Package for All Tools

If you need to use multiple toolkits in your project, you can install `@mcswift/utils` directly:

```bash
npm install @mcswift/utils
# or
pnpm add @mcswift/utils
```

Then, import the corresponding modules in your code:

```typescript
import { Logger } from "@mcswift/utils/common";
import { getAbsolutePath } from "@mcswift/utils/node";
import { getInstalledApp } from "@mcswift/utils/windows";
```

> The left sidebar provides detailed documentation for each sub-package. Please click to read more.
