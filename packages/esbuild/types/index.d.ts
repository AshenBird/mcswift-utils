/**
 * fork from https://github.com/favware/esbuild-plugin-file-path-extensions/blob/main/src/index.ts
 */
import type { BuildOptions, OnLoadOptions, Plugin } from "esbuild";
export interface PluginOptions {
    /**
     * The [esbuild filter](https://esbuild.github.io/plugins/#filters) to
     * apply for the filtering of files to parse with this plugin
     *
     * @default /.*​/
     */
    filter?: OnLoadOptions["filter"];
    /**
     * The [esbuild namespace](https://esbuild.github.io/plugins/#namespaces) to
     * which the plugin should apply
     *
     * @default undefined
     */
    namespace?: OnLoadOptions["namespace"];
    /**
     * Whether the current build is for ESM or not.
     *
     * Accepts either a boolean value or a function that returns a boolean value.
     * The function may also return a Promise which will be resolved first.
     *
     * In order to account for the cross-target capabilities of `tsup` the default is:
     * @default build.initialOptions?.define?.TSUP_FORMAT === '"esm"'
     *
     */
    esm?: boolean | ((initialOptions: BuildOptions) => Awaitable<boolean>);
    /**
     * The extension to apply for CJS code.
     * @remark Make sure to **NOT** start with a leading `.`.
     *
     * @default 'js'
     */
    cjsExtension?: string | ((initialOptions: BuildOptions) => Awaitable<string>);
    /**
     * The extension to apply for ESM code.
     * @remark Make sure to **NOT** start with a leading `.`.
     *
     * @default 'mjs'
     */
    esmExtension?: string | ((initialOptions: BuildOptions) => Awaitable<string>);
}
export declare const mandatoryFileExtensionsPlugin: (options?: PluginOptions) => Plugin;
/**
 * The [esbuild-plugin-file-path-extensions](https://github.com/favware/esbuild-plugin-file-path-extensions/#readme) version
 * that you are currently using.
 */
export declare const version: string;
type Awaitable<T> = PromiseLike<T> | T;
export {};
