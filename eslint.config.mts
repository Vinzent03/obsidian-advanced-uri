import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

const browserGlobals = globals.browser as Record<
    string,
    false | "readonly" | "writable"
>;

export default defineConfig(
    globalIgnores([
        "node_modules",
        "dist",
        "docs",
        "esbuild.config.mjs",
        "main.js",
        "package.json",
        "pnpm-lock.yaml",
        "tsconfig.json",
    ]),
    {
        languageOptions: {
            globals: {
                ...browserGlobals,
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["eslint.config.mts", "manifest.json"],
                },
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".json"],
            },
        },
    },
    ...obsidianmd.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-deprecated": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "obsidianmd/commands/no-command-in-command-id": "off",
            "obsidianmd/commands/no-command-in-command-name": "off",
            "obsidianmd/settings-tab/prefer-setting-definitions": "off",
        },
    }
);
