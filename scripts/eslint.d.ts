declare module "eslint" {
  import ESLint from "@types/eslint"
  export * from "@types/eslint"
  export function loadESLint(options?:{
    useFlatConfig?:boolean,
    cwd:string
  }): Promise<ESLint>;
}
// async function loadESLint({ useFlatConfig, cwd = process.cwd() } = {}) {
//   const shouldESLintUseFlatConfig =
//     typeof useFlatConfig === "boolean"
//       ? useFlatConfig
//       : await shouldUseFlatConfig({ cwd });
//   return shouldESLintUseFlatConfig ? FlatESLint : ESLint;
// }
