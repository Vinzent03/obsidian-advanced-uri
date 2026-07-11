# AGENTS.md

This file provides guidance to any coding agent when working with code in this repository.

## Project Environment

- **Target:** Obsidian Plugin (runs inside Electron/Node.js and Chromium environment on desktop; JavaScript environment on mobile).
- **Language:** TypeScript (ES6+).
- **Build Tool:** `esbuild` via `npm run build`.
- **API Access:** Obsidian API (`obsidian` module). Node.js built-ins (e.g., `fs`, `path`) are accessible *only* on desktop. For cross-platform compatibility, use Obsidian's Vault API.

## Development Rules

- **No Browser-Only Assumptions:** Code executes within Obsidian, not a standard web browser. Do not use browser-isolated sandboxing assumptions.
- **Obsidian API First:** Always utilize the official `obsidian` API for file I/O (`this.app.vault`), workspace manipulation, and settings management instead of raw DOM or Node.js methods where applicable.
- **Memory Management:** Always register events, intervals, and DOM elements using `this.registerEvent`, `this.registerInterval`, or inside the `onunload()` lifecycle method to prevent memory leaks.
- **Asynchronous Operations:** Use `async/await` for all Vault and Network operations to keep the Obsidian UI responsive.

## Build & Command Cheatsheet

- **Development Build (Watch):** `npm run dev`
- **Production Build:** `npm run build`
- **Installation Path:** `.obsidian/plugins/obsidian-advanced-uri/`
