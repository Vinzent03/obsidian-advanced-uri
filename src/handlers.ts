import { FileView, MarkdownView, Notice, TAbstractFile, TFile } from "obsidian";
import AdvancedURI from "./main";
import { EnterDataModal } from "./modals/enter_data_modal";
import { FileModal } from "./modals/file_modal";
import Tools from "./tools";
import { Parameters } from "./types";
import { copyText, getAlternativeFilePath } from "./utils";
export default class Handlers {
    constructor(private readonly plugin: AdvancedURI) {}

    public get tools(): Tools {
        return this.plugin.tools;
    }

    handlePluginManagement(parameters: Parameters): void {
        if (parameters["enable-plugin"]) {
            const pluginId = parameters["enable-plugin"];

            if (app.plugins.getPlugin(pluginId)) {
                app.plugins.enablePluginAndSave(pluginId);
                new Notice(`Enabled ${pluginId}`);
            } else if (app.internalPlugins.plugins[pluginId]) {
                app.internalPlugins.plugins[pluginId].enable(true);
                new Notice(`Enabled ${pluginId}`);
            }
        } else if (parameters["disable-plugin"]) {
            const pluginId = parameters["disable-plugin"];

            if (app.plugins.getPlugin(pluginId)) {
                app.plugins.disablePluginAndSave(pluginId);
                new Notice(`Disabled ${pluginId}`);
            } else if (app.internalPlugins.plugins[pluginId]) {
                app.internalPlugins.plugins[pluginId].disable(true);
                new Notice(`Disabled ${pluginId}`);
            }
        }
    }
    handleFrontmatterKey(parameters: Parameters) {
        const key = parameters.frontmatterkey;
        const frontmatter = app.metadataCache.getCache(
            parameters.filepath ?? app.workspace.getActiveFile().path
        ).frontmatter;

        let res: string;
        if (key.startsWith("[") && key.endsWith("]")) {
            const list = key.substring(1, key.length - 1).split(",");
            let cache: any = frontmatter;
            for (const item of list) {
                if (cache instanceof Array) {
                    const index = parseInt(item);
                    if (Number.isNaN(index)) {
                        cache = cache.find((e) => e == item);
                    }
                    cache = cache[parseInt(item)];
                } else {
                    cache = cache[item];
                }
            }
            res = cache;
        } else {
            res = frontmatter[key];
        }

        copyText(res);
    }

    handleWorkspace(parameters: Parameters) {
        const workspaces =
            app.internalPlugins.getEnabledPluginById("workspaces");
        if (!workspaces) {
            new Notice("Workspaces plugin is not enabled");
            this.plugin.failure(parameters);
        } else {
            if (parameters.saveworkspace == "true") {
                const active = workspaces.activeWorkspace;
                workspaces.saveWorkspace(active);
                new Notice(`Saved current workspace to ${active}`);
            }
            if (parameters.workspace != undefined) {
                workspaces.loadWorkspace(parameters.workspace);
            }
            this.plugin.success(parameters);
        }
    }

    async handleCommand(parameters: Parameters) {
        if (parameters.filepath) {
            if (parameters.mode) {
                if (parameters.mode == "new") {
                    const file = app.metadataCache.getFirstLinkpathDest(
                        parameters.filepath,
                        "/"
                    );
                    if (file instanceof TFile) {
                        parameters.filepath = getAlternativeFilePath(file);
                    }
                }
                await this.plugin.open({
                    file: parameters.filepath,
                    mode: "source",
                    parameters: parameters,
                });
                const view = app.workspace.getActiveViewOfType(MarkdownView);
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
            } else if (parameters.line) {
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
        if (parameters.commandid) {
            app.commands.executeCommandById(parameters.commandid);
        } else if (parameters.commandname) {
            const rawCommands = app.commands.commands;
            for (const command in rawCommands) {
                if (rawCommands[command].name === parameters.commandname) {
                    if (rawCommands[command].callback) {
                        rawCommands[command].callback();
                    } else {
                        rawCommands[command].checkCallback(false);
                    }
                    break;
                }
            }
        }
        this.plugin.success(parameters);
    }

    async handleEval(parameters: Parameters) {
        if (parameters.filepath) {
            if (parameters.mode) {
                if (parameters.mode == "new") {
                    const file = app.metadataCache.getFirstLinkpathDest(
                        parameters.filepath,
                        "/"
                    );
                    if (file instanceof TFile) {
                        parameters.filepath = getAlternativeFilePath(file);
                    }
                }
                await this.plugin.open({
                    file: parameters.filepath,
                    mode: "source",
                    parameters: parameters,
                });
                const view = app.workspace.getActiveViewOfType(MarkdownView);
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
            } else if (parameters.line) {
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
        const exists = await app.vault.adapter.exists(parameters.filepath);

        copyText((exists ? 1 : 0).toString());
        this.plugin.success(parameters);
    }
    async handleSearchAndReplace(parameters: Parameters) {
        let file: TFile;
        if (parameters.filepath) {
            const abstractFile = app.vault.getAbstractFileByPath(
                parameters.filepath
            );
            if (abstractFile instanceof TFile) {
                file = abstractFile;
            }
        } else {
            file = app.workspace.getActiveFile();
        }

        if (file) {
            let data = await app.vault.read(file);
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
        const view = app.workspace.getActiveViewOfType(FileView);
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
            file = app.vault.getAbstractFileByPath(parameters.filepath);
        } else {
            file = app.workspace.getActiveFile();
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
                        getAlternativeFilePath(file),
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
            const view = app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) return;
            const cache = app.metadataCache.getFileCache(view.file);
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
            const view = app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) return;
            const cache = app.metadataCache.getFileCache(view.file);
            const block = cache.blocks[parameters.block];
            view.editor.focus();
            view.editor.setCursor({ line: block.position.start.line, ch: 0 });
        } else {
            await this.plugin.open({
                file: parameters.filepath,
                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                parameters: parameters,
            });
            if (parameters.line != undefined) {
                await this.plugin.setCursorInLine(parameters);
            }
        }
        if (parameters.mode != undefined) {
            await this.plugin.setCursor(parameters);
        }
        if (parameters.uid) {
            const view = app.workspace.getActiveViewOfType(MarkdownView);

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

    handleCopyFileURI(withoutData: boolean, file?: TFile) {
        const view = app.workspace.getActiveViewOfType(FileView);
        if (!view && !file) return;
        if (view instanceof MarkdownView) {
            const pos = view.editor.getCursor();
            const cache = app.metadataCache.getFileCache(view.file);
            if (cache.headings) {
                for (const heading of cache.headings) {
                    if (
                        heading.position.start.line <= pos.line &&
                        heading.position.end.line >= pos.line
                    ) {
                        this.tools.copyURI({
                            filepath: view.file.path,
                            heading: heading.heading,
                        });
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
                        this.tools.copyURI({
                            filepath: view.file.path,
                            block: blockID,
                        });
                        return;
                    }
                }
            }
        }

        if (withoutData) {
            const file2 = file ?? app.workspace.getActiveFile();
            if (!file2) {
                new Notice("No file opened");
                return;
            }
            this.tools.copyURI({
                filepath: file2.path,
            });
        } else {
            const fileModal = new FileModal(
                this.plugin,
                "Choose a file",
                false
            );
            fileModal.open();
            fileModal.onChooseItem = (item, _) => {
                new EnterDataModal(this.plugin, item.source).open();
            };
        }
    }

    handleOpenSettings(parameters: Parameters) {
        if (app.setting.containerEl.parentElement === null) {
            app.setting.open();
        }
        if (parameters.settingid == "plugin-browser") {
            app.setting.openTabById("community-plugins");
            app.setting.activeTab.containerEl.find(".mod-cta").click();
        } else if (parameters.settingid == "theme-browser") {
            app.setting.openTabById("appearance");
            app.setting.activeTab.containerEl.find(".mod-cta").click();
        } else {
            app.setting.openTabById(parameters.settingid);
        }

        if (parameters.settingsection) {
            const elements =
                app.setting.tabContentContainer.querySelectorAll("*");
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
        parameters.settingid = "community-plugins";
        this.handleOpenSettings(parameters);
        app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
        new Notice("Waiting 10 seconds");
        await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

        if (Object.keys((app as any).plugins.updates).length !== 0) {
            app.setting.activeTab.containerEl
                .findAll(".mod-cta")
                .last()
                .click();
        }
        this.plugin.success(parameters);
    }

    async handleBookmarks(parameters: Parameters) {
        const bookmarksPlugin =
            app.internalPlugins.getEnabledPluginById("bookmarks");
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
}
