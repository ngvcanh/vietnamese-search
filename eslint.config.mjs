import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },

            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
        },

        rules: {
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unused-vars": "error",

            "no-console": "error",

            quotes: ["error", "double", {
                avoidEscape: true,
            }],

            semi: ["error", "always"],
            "comma-dangle": ["error", "always-multiline"],
            curly: ["error", "all"],

            "brace-style": ["error", "1tbs", {
                allowSingleLine: false,
            }],

            eqeqeq: ["error", "always"],
        },
    },
];