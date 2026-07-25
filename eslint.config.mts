import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

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
                ...globals.browser,
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
            "obsidianmd/commands/no-command-in-command-id": "off",
            "obsidianmd/commands/no-command-in-command-name": "off",
            "obsidianmd/settings-tab/prefer-setting-definitions": "off",
            "obsidianmd/ui/sentence-case": "off",
        },
    }
);
