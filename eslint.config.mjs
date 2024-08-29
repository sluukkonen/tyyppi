import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: ["**/dist", "**/coverage", "**/vitest.config.ts"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
)
