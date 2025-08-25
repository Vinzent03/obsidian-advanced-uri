import {
    FileView,
    MarkdownView,
    Notice,
    TAbstractFile,
    TFile,
    View,
} from "obsidian";
import AdvancedURI from "./main";
import { EnterDataModal } from "./modals/enter_data_modal";
import { FileModal } from "./modals/file_modal";
import Tools from "./tools";
import { CanvasView, Parameters } from "./types";
import {
    copyText,
    getAlternativeFilePath,
    getObjFieldByPath,
    updateObjectFieldInplace,
    KeyPathError,
} from "./utils";
export default class Handlers {
    constructor(private readonly plugin: AdvancedURI) {}
    app = this.plugin.app;
    public get tools(): Tools {
        return this.plugin.tools;
    }

    handlePluginManagement(parameters: Parameters): void {
        if (parameters["enable-plugin"]) {
            const pluginId = parameters["enable-plugin"];

            if (
                pluginId in this.app.plugins.manifests &&
                !this.app.plugins.getPlugin(pluginId)
            ) {
                this.app.plugins.enablePluginAndSave(pluginId);
                new Notice(`Enabled ${pluginId}`);
            } else if (this.app.internalPlugins.plugins[pluginId]) {
                this.app.internalPlugins.plugins[pluginId].enable(true);
                new Notice(`Enabled ${pluginId}`);
            }
        } else if (parameters["disable-plugin"]) {
            const pluginId = parameters["disable-plugin"];

            if (this.app.plugins.getPlugin(pluginId)) {
                this.app.plugins.disablePluginAndSave(pluginId);
                new Notice(`Disabled ${pluginId}`);
            } else if (this.app.internalPlugins.plugins[pluginId]) {
                this.app.internalPlugins.plugins[pluginId].disable(true);
                new Notice(`Disabled ${pluginId}`);
            }
        }
    }

    handleFrontmatterKey(parameters: Parameters) {
        const key = parameters.frontmatterkey;
        const file = this.app.vault.getAbstractFileByPath(
            parameters.filepath ?? this.app.workspace.getActiveFile().path
        );

        // could not handle frontmatter key that is not a TFile
        if (!(file instanceof TFile)) {
            return;
        }

        const frontmatter =
            this.app.metadataCache.getFileCache(file).frontmatter;

        // update frontmatter if user passed data
        if (parameters.data) {
            // parse data
            let data = parameters.data;
            try {
                // This try catch is needed to allow passing strings as a data value without extra ".
                data = JSON.parse(data);
            } catch {
                try {
                    data = `"${data}"`;
                    data = JSON.parse(data);
                } catch (e) {
                    new Notice(
                        "Failed to parse data, check console for more details"
                    );
                    console.error(e);
                    return;
                }
            }

            // update frontmatter
            this.app.fileManager.processFrontMatter(file, (fm) => {
                try {
                    updateObjectFieldInplace({ originalObject: fm, key, data });
                } catch (e) {
                    console.error(e);
                    if (e instanceof KeyPathError) {
                        new Notice(`Invalid key in path.\n${e.message}`);
                    } else {
                        new Notice(
                            "Failed to update frontmatter, check console for more details"
                        );
                    }
                }
            });
            return;
        }

        // if no data is passed, just copy the frontmatter key value to clipboard
        copyText(getObjFieldByPath({ obj: frontmatter, key }));
    }

    handleWorkspace(parameters: Parameters) {
        const workspaces =
            this.app.internalPlugins.getEnabledPluginById("workspaces");
        if (!workspaces) {
            new Notice("Workspaces plugin is not enabled");
            this.plugin.failure(parameters);
        } else {
            if (parameters.saveworkspace == "true") {
                const active = workspaces.activeWorkspace;
                workspaces.saveWorkspace(active);
                new Notice(`Saved current workspace to ${active}`);
            }
            if (parameters.clipboard && parameters.clipboard != "false") {
                this.tools.copyURI({
                    workspace: workspaces.activeWorkspace,
                });
            } else if (parameters.workspace != undefined) {
                workspaces.loadWorkspace(parameters.workspace);
            }
            this.plugin.success(parameters);
        }
    }

    async handleCommand(parameters: Parameters) {
        if (parameters.filepath) {
            if (parameters.mode) {
                if (parameters.mode == "new") {
                    const file = this.app.metadataCache.getFirstLinkpathDest(
                        parameters.filepath,
                        "/"
                    );
                    if (file instanceof TFile) {
                        parameters.filepath = getAlternativeFilePath(
                            this.app,
                            file
                        );
                    }
                }
                await this.plugin.open({
                    file: parameters.filepath,
                    mode: "source",
                    parameters: parameters,
                });
                const view =
                    this.app.workspace.getActiveViewOfType(MarkdownView);
                if (view) {
                    const editor = view.editor;
                    const data = editor.getValue();
                    if (parameters.mode === "append") {
                        editor.setValue(data + "\n");
                        const lines = editor.lineCount();
                        editor.setCursor({ ch: 0, line: lines });
                    } else if (parameters.mode === "prepend") {
                        editor.setValue("\n" + data);
                        editor.setCursor({ ch: 0, line: 0 });
                    } else if (parameters.mode === "overwrite") {
                        editor.setValue("");
                    }
                }
            } else if (
                parameters.line != undefined ||
                parameters.column != undefined ||
                parameters.offset != undefined
            ) {
                await this.plugin.open({
                    file: parameters.filepath,
                    mode: "source",
                    parameters: parameters,
                });

                await this.plugin.setCursorInLine(parameters);
            } else {
                await this.plugin.open({
                    file: parameters.filepath,
                    setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                    parameters: parameters,
                });
            }
        } else if (parameters.openmode || parameters.viewmode) {
            // Open a new leaf without a file. For example in a new window or split
            await this.plugin.open({
                parameters: parameters,
            });
        }
        if (parameters.commandid) {
            this.app.commands.executeCommandById(parameters.commandid);
        } else if (parameters.commandname) {
            const rawCommands = this.app.commands.commands;
            for (const command in rawCommands) {
                if (rawCommands[command].name === parameters.commandname) {
                    if (rawCommands[command].callback) {
                        await rawCommands[command].callback();
                    } else {
                        rawCommands[command].checkCallback(false);
                    }
                    break;
                }
            }
        }

        if (parameters.confirm && parameters.confirm != "false") {
            await new Promise((r) => setTimeout(r, 750));
            const button = document.querySelector(
                ".mod-cta:not([style*='display: none'])"
            ) as any;
            if (button.click instanceof Function) {
                button.click();
            }
        }
        this.plugin.success(parameters);
    }

    async handleEval(parameters: Parameters) {
        if (parameters.filepath) {
            if (parameters.mode) {
                if (parameters.mode == "new") {
                    const file = this.app.metadataCache.getFirstLinkpathDest(
                        parameters.filepath,
                        "/"
                    );
                    if (file instanceof TFile) {
                        parameters.filepath = getAlternativeFilePath(
                            this.app,
                            file
                        );
                    }
                }
                await this.plugin.open({
                    file: parameters.filepath,
                    mode: "source",
                    parameters: parameters,
                });
                const view =
                    this.app.workspace.getActiveViewOfType(MarkdownView);
                if (view) {
                    const editor = view.editor;
                    const data = editor.getValue();
                    if (parameters.mode === "append") {
                        editor.setValue(data + "\n");
                        const lines = editor.lineCount();
                        editor.setCursor({ ch: 0, line: lines });
                    } else if (parameters.mode === "prepend") {
                        editor.setValue("\n" + data);
                        editor.setCursor({ ch: 0, line: 0 });
                    } else if (parameters.mode === "overwrite") {
                        editor.setValue("");
                    }
                }
            } else if (
                parameters.line != undefined ||
                parameters.column != undefined ||
                parameters.offset != undefined
            ) {
                await this.plugin.open({
                    file: parameters.filepath,
                    mode: "source",
                    parameters: parameters,
                });

                await this.plugin.setCursorInLine(parameters);
            } else {
                await this.plugin.open({
                    file: parameters.filepath,
                    setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                    parameters: parameters,
                });
            }
        }
        if (this.plugin.settings.allowEval) {
            //Call eval in a global scope
            const eval2 = eval;
            eval2(parameters.eval);
            this.plugin.success(parameters);
        } else {
            new Notice(
                "Eval is not allowed. Please enable it in the settings."
            );
            this.plugin.failure(parameters);
        }
    }

    async handleDoesFileExist(parameters: Parameters) {
        const exists = await this.app.vault.adapter.exists(parameters.filepath);

        copyText((exists ? 1 : 0).toString());
        this.plugin.success(parameters);
    }
    async handleSearchAndReplace(parameters: Parameters) {
        let file: TFile;
        if (parameters.filepath) {
            const abstractFile = this.app.vault.getAbstractFileByPath(
                parameters.filepath
            );
            if (abstractFile instanceof TFile) {
                file = abstractFile;
            }
        } else {
            file = this.app.workspace.getActiveFile();
        }

        if (file) {
            let data = await this.app.vault.read(file);
            if (parameters.searchregex) {
                try {
                    const [, , pattern, flags] =
                        parameters.searchregex.match(/(\/?)(.+)\1([a-z]*)/i);
                    const regex = new RegExp(pattern, flags);
                    data = data.replace(regex, parameters.replace);
                    this.plugin.success(parameters);
                } catch (error) {
                    new Notice(
                        `Can't parse ${parameters.searchregex} as RegEx`
                    );
                    this.plugin.failure(parameters);
                }
            } else {
                data = data.replaceAll(parameters.search, parameters.replace);
                this.plugin.success(parameters);
            }

            await this.plugin.writeAndOpenFile(file.path, data, parameters);
        } else {
            new Notice("Cannot find file");
            this.plugin.failure(parameters);
        }
    }

    async handleSearch(parameters: Parameters) {
        if (parameters.filepath) {
            await this.plugin.open({
                file: parameters.filepath,
                parameters: parameters,
            });
        }
        const view = this.app.workspace.getActiveViewOfType(FileView);
        view.currentMode.showSearch();
        const search = view.currentMode.search;
        search.searchInputEl.value = parameters.search;
        search.searchInputEl.dispatchEvent(new Event("input"));
    }

    async handleWrite(
        parameters: Parameters,
        createdDailyNote: boolean = false
    ) {
        let file: TAbstractFile | null;
        if (parameters.filepath) {
            file = this.app.vault.getAbstractFileByPath(parameters.filepath);
        } else {
            file = this.app.workspace.getActiveFile();
        }

        if (parameters.filepath || file) {
            let outFile: TFile;
            let path = parameters.filepath ?? file.path;
            if (parameters.mode === "overwrite") {
                outFile = await this.plugin.writeAndOpenFile(
                    path,
                    parameters.data,
                    parameters
                );
                this.plugin.success(parameters);
            } else if (parameters.mode === "prepend") {
                if (file instanceof TFile) {
                    outFile = await this.plugin.prepend(file, parameters);
                } else {
                    outFile = await this.plugin.prepend(path, parameters);
                }
                this.plugin.success(parameters);
            } else if (parameters.mode === "append") {
                if (file instanceof TFile) {
                    outFile = await this.plugin.append(file, parameters);
                } else {
                    outFile = await this.plugin.append(path, parameters);
                }
                this.plugin.success(parameters);
            } else if (parameters.mode === "new") {
                if (file instanceof TFile) {
                    outFile = await this.plugin.writeAndOpenFile(
                        getAlternativeFilePath(this.app, file),
                        parameters.data,
                        parameters
                    );
                    this.plugin.hookSuccess(parameters, outFile);
                } else {
                    outFile = await this.plugin.writeAndOpenFile(
                        path,
                        parameters.data,
                        parameters
                    );
                    this.plugin.hookSuccess(parameters, outFile);
                }
            } else if (!createdDailyNote && file instanceof TFile) {
                new Notice("File already exists");
                this.plugin.openExistingFileAndSetCursor(file.path, parameters);
                this.plugin.failure(parameters);
            } else {
                outFile = await this.plugin.writeAndOpenFile(
                    path,
                    parameters.data,
                    parameters
                );
                this.plugin.success(parameters);
            }
            if (parameters.uid) {
                this.tools.writeUIDToFile(outFile, parameters.uid);
            }
        } else {
            new Notice("Cannot find file");
            this.plugin.failure(parameters);
        }
    }

    async handleOpen(parameters: Parameters) {
        if (parameters.heading != undefined) {
            await this.plugin.open({
                file: parameters.filepath + "#" + parameters.heading,
                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                parameters: parameters,
            });
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) return;
            const cache = this.app.metadataCache.getFileCache(view.file);
            const heading = cache.headings.find(
                (e) => e.heading === parameters.heading
            );
            view.editor.focus();
            view.editor.setCursor({
                line: heading.position.start.line + 1,
                ch: 0,
            });
        } else if (parameters.block != undefined) {
            await this.plugin.open({
                file: parameters.filepath + "#^" + parameters.block,
                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                parameters: parameters,
            });
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) return;
            const cache = this.app.metadataCache.getFileCache(view.file);
            const block = cache.blocks[parameters.block.toLowerCase()];
            view.editor.focus();
            if (block) {
                view.editor.setCursor({
                    line: block.position.start.line,
                    ch: 0,
                });
            }
        } else {
            await this.plugin.open({
                file: parameters.filepath,
                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                parameters: parameters,
            });
            if (
                parameters.line != undefined ||
                parameters.column != undefined ||
                parameters.offset != undefined
            ) {
                await this.plugin.setCursorInLine(parameters);
            }
        }
        if (parameters.mode != undefined) {
            await this.plugin.setCursor(parameters);
        }
        if (parameters.uid) {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);

            this.tools.writeUIDToFile(view.file, parameters.uid);
        }
        this.plugin.success(parameters);
    }

    async handleOpenBlock(parameters: Parameters) {
        const file = this.tools.getFileFromBlockID(parameters.block);
        if (file) {
            await this.plugin.chooseHandler(
                {
                    ...parameters,
                    filepath: file.path,
                },
                false
            );
        }
    }

    handleCopyFileURI(withoutData: boolean, withFormat: boolean, file?: TFile) {
        const view = this.app.workspace.getActiveViewOfType(FileView);
        if (!view && !file) return;
        file = file ?? view.file;
        if (view instanceof MarkdownView) {
            const pos = view.editor.getCursor();
            const cache = this.app.metadataCache.getFileCache(view.file);
            if (cache.headings) {
                for (const heading of cache.headings) {
                    if (
                        heading.position.start.line <= pos.line &&
                        heading.position.end.line >= pos.line
                    ) {
                        this.tools.copyURI(
                            {
                                filepath: view.file.path,
                                heading: heading.heading,
                            },
                            withFormat,
                            file
                        );
                        return;
                    }
                }
            }
            if (cache.blocks) {
                for (const blockID of Object.keys(cache.blocks)) {
                    const block = cache.blocks[blockID];
                    if (
                        block.position.start.line <= pos.line &&
                        block.position.end.line >= pos.line
                    ) {
                        this.tools.copyURI(
                            {
                                filepath: view.file.path,
                                block: block.id,
                            },
                            withFormat,
                            file
                        );
                        return;
                    }
                }
            }
        }

        if (withoutData) {
            const file2 = file ?? this.app.workspace.getActiveFile();
            if (!file2) {
                new Notice("No file opened");
                return;
            }
            this.tools.copyURI(
                {
                    filepath: file2.path,
                },
                withFormat,
                file
            );
        } else {
            const fileModal = new FileModal(
                this.plugin,
                "Choose a file",
                false
            );
            fileModal.open();
            fileModal.onChooseItem = (item, _) => {
                new EnterDataModal(this.plugin, withFormat, item.source).open();
            };
        }
    }

    handleOpenSettings(parameters: Parameters) {
        if (this.app.setting.containerEl.parentElement === null) {
            this.app.setting.open();
        }
        if (parameters.settingid == "plugin-browser") {
            this.app.setting.openTabById("community-plugins");
            this.app.setting.activeTab.containerEl.find(".mod-cta").click();
        } else if (parameters.settingid == "theme-browser") {
            this.app.setting.openTabById("appearance");
            this.app.setting.activeTab.containerEl.find(".mod-cta").click();
        } else {
            this.app.setting.openTabById(parameters.settingid);
        }

        if (parameters.settingsection) {
            const elements =
                this.app.setting.tabContentContainer.querySelectorAll("*");
            const heading: Element = Array.prototype.find.call(
                elements,
                (e: Element) => e.textContent == parameters.settingsection
            );

            if (heading) {
                heading.scrollIntoView();
            }
        }
        this.plugin.success(parameters);
    }

    async handleUpdatePlugins(parameters: Parameters) {
        new Notice("Checking for updates…");
        await this.app.plugins.checkForUpdates();

        const updateCount = Object.keys(this.app.plugins.updates).length;
        if (updateCount > 0) {
            parameters.settingid = "community-plugins";
            this.handleOpenSettings(parameters);
            this.app.setting.activeTab.containerEl
                .findAll(".mod-cta")
                .last()
                .click();
        }
        this.plugin.success(parameters);
    }

    async handleBookmarks(parameters: Parameters) {
        const bookmarksPlugin =
            this.app.internalPlugins.getEnabledPluginById("bookmarks");
        const bookmarks = bookmarksPlugin.getBookmarks();
        const bookmark = bookmarks.find((b) => b.title == parameters.bookmark);
        let openMode;
        if (parameters.openmode == "true" || parameters.openmode == "false") {
            openMode = parameters.openmode == "true";
        } else {
            openMode = parameters.openmode;
        }
        bookmarksPlugin.openBookmark(bookmark, openMode as any);
    }

    async handleCanvas(parameters: Parameters) {
        if (parameters.filepath) {
            await this.plugin.open({
                file: parameters.filepath,
                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                parameters: parameters,
            });
        }
        const activeView = (this.app.workspace as any).activeLeaf.view as View;
        if (activeView.getViewType() != "canvas") {
            new Notice("Active view is not a canvas");
            return;
        }
        const canvasView = activeView as CanvasView;
        if (parameters.canvasnodes) {
            const ids = parameters.canvasnodes.split(",");
            const nodes = canvasView.canvas.nodes;
            const selectedNodes = ids.map((id) => nodes.get(id));
            const selection = canvasView.canvas.selection;

            canvasView.canvas.updateSelection(() => {
                for (const node of selectedNodes) {
                    selection.add(node);
                }
            });

            canvasView.canvas.zoomToSelection();
        }
        if (parameters.canvasviewport) {
            const [x, y, zoom] = parameters.canvasviewport.split(",");
            if (x != "-") {
                if (x.startsWith("--") || x.startsWith("++")) {
                    const tx = canvasView.canvas.tx + Number(x.substring(1));
                    canvasView.canvas.tx = tx;
                } else {
                    canvasView.canvas.tx = Number(x);
                }
            }
            if (y != "-") {
                if (y.startsWith("--") || y.startsWith("++")) {
                    const ty = canvasView.canvas.ty + Number(y.substring(1));
                    canvasView.canvas.ty = ty;
                } else {
                    canvasView.canvas.ty = Number(y);
                }
            }
            if (zoom != "-") {
                if (zoom.startsWith("--") || zoom.startsWith("++")) {
                    const tZoom =
                        canvasView.canvas.tZoom + Number(zoom.substring(1));
                    canvasView.canvas.tZoom = tZoom;
                } else {
                    canvasView.canvas.tZoom = Number(zoom);
                }
            }
            canvasView.canvas.markViewportChanged();
        }
    }
}
