// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";
// import json from "@eslint/json";
// import css from "@eslint/css";
// import { defineConfig } from "eslint/config";
//
// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginVue.configs["flat/essential"],
//   { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
//   { files: ["**/*.json"], plugins: { json }, language: "json/json" },
//   { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc" },
//   { files: ["**/*.css"], plugins: { css }, language: "css/css" },
// ]);


import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import css from "@eslint/css";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([

  // JS recommended rules
  js.configs.recommended,

  // Global browser env
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      globals: globals.browser
    }
  },

  // TypeScript
  ...tseslint.configs.recommended,

  // Vue (lepsze niż essential)
  ...pluginVue.configs["flat/recommended"],

  // Vue + TS parser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },

  // JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json"
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc"
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css"
  },

  // Custom rules pod projekt
  {
    rules: {
      "no-unused-vars": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-unused-vars": "warn"
    }
  }

]);
